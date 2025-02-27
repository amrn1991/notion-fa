import { PageStore } from "./types";
import { create } from 'zustand'

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
  setTitle: (title) => set((state) => ({ ...state, title })),
  setCoverImage: (cover) => set((state) => ({ ...state, cover })),
  setNodes: (nodes) => set((state) => ({ ...state, nodes }))
}))

export default usePageStore;