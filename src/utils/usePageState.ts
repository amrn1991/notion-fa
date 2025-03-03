import { arrayMove } from "@dnd-kit/sortable";
import { supabase } from "./SupabaseClient";
import { NodeData, NodeType, Page } from "./types";
import { useSyncedState } from "./useSyncedState";

type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any
  ? A
  : never;

function debounce<TCallback extends Function>(
  callback: TCallback,
  delay = 300
) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (...args: ArgumentTypes<TCallback>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), delay);
  };
}

const updatePage = debounce(
  async (page: Partial<Page> & Pick<Page, "id">) => {
    await supabase.from("pages").update(page).eq("id", page.id);
  },
  500
);

export const usePageStore = (initialState: Page) => {
  const [page, setPage] = useSyncedState(initialState, updatePage);

  const changeNodeType = async (index: number, type: NodeType) => {
    const newNodes = [...page.nodes]
    newNodes[index].type = type
    newNodes[index].value = ""
    setPage({ ...page, nodes: newNodes })
  }
  const changeNodeValue = (index: number, value: string) => {
    const newNodes = [...page.nodes];
    newNodes[index].value = value;
    setPage({ ...page, nodes: newNodes });
  }
  const addNode = (index: number, node: NodeData) => {
    const newNodes = [...page.nodes];
    newNodes.splice(index, 0, node);
    setPage({ ...page, nodes: newNodes });
  }
  const removeNodeByIndex = (index: number) => {
    const newNodes = [...page.nodes];
    newNodes.splice(index, 1)
    setPage({ ...page, nodes: newNodes })
  }

  const reorderNodes = (id1: string, id2: string) => {
    const index1 = page.nodes.findIndex(node => node.id === id1)
    const index2 = page.nodes.findIndex(node => node.id === id2)
    return { ...page, nodes: arrayMove(page.nodes, index1, index2) }
  }

  const setTitle = (title: string) => ({ ...page, title });
  const setCoverImage = (cover: string) => ({ ...page, cover });
  const setNodes = (nodes: NodeData[]) => ({ ...page, nodes })

  return {
    nodes: page.nodes,
    title: page.title,
    cover: page.cover,
    changeNodeType,
    changeNodeValue,
    addNode,
    removeNodeByIndex,
    setTitle,
    setCoverImage,
    setNodes,
    reorderNodes
  };
}
