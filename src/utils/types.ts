export type NodeType = "text" | "image" | "list" | "page" | "heading1" | "heading2" | "heading3";

export type NodeData = {
  id: string,
  type: NodeType,
  value: string,
}

export type Page = {
  id: string,
  slug: string,
  title: string,
  nodes: NodeData[],
  cover: string,
}

export interface PageStore {
  nodes: NodeData[]
  title: string
  cover: string
  addNode(index: number, node: NodeData): void
  removeNodeByIndex(index: number): void
  changeNodeType(index: number, type: NodeType): void,
  changeNodeValue(index: number, value: string): void,
  reorderNodes(id1: string, id2: string): void,
  setTitle(title: string): void,
  setCoverImage(cover: string): void,
  setNodes(nodes: NodeData[]): void,
}