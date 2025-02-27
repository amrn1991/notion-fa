import { PageStore } from "./types";
import { create } from 'zustand'
import { arrayMove } from "@dnd-kit/sortable"

const usePageStore = create<PageStore>()((set) => ({
  nodes: [],
  title: "عنوان",
  cover: "https://picsum.photos/1080/300",
  changeNodeType: (index, type) => set((state) => {
    const newNodes = [...state.nodes]
    newNodes[index].type = type
    newNodes[index].value = ""
    return { ...state, nodes: newNodes };
  }),
  changeNodeValue: (index, value) => set((state) => {
    const newNodes = [...state.nodes];
    newNodes[index].value = value;
    return { ...state, nodes: newNodes };
  }),
  addNode: (index, node) => set((state) => {
    const newNodes = [...state.nodes];
    newNodes.splice(index, 0, node);
    return { ...state, nodes: newNodes };
  })
  ,
  removeNodeByIndex: (index) => set((state) => {
    const newNodes = [...state.nodes];
    newNodes.splice(index, 1)
    return { ...state, nodes: newNodes }
  }),
  reorderNodes: (id1, id2) => set((state) => {
    const index1 = state.nodes.findIndex(node => node.id === id1)
    const index2 = state.nodes.findIndex(node => node.id === id2)
    return { ...state, nodes: arrayMove(state.nodes, index1, index2) }
  }),
  setTitle: (title) => set((state) => ({ ...state, title })),
  setCoverImage: (cover) => set((state) => ({ ...state, cover })),
  setNodes: (nodes) => set((state) => ({ ...state, nodes }))
}))

export default usePageStore;