import { create } from 'zustand'
import { Node, Edge, TerminalOutput } from '@/types'

interface AppState {
  nodes: Node[]
  edges: Edge[]
  selectedNodeId: string | null
  terminalOutputs: TerminalOutput[]
  activeTerminal: 'nasm' | 'c' | 'cpp' | 'rust'
  
  setNodes: (nodes: Node[]) => void
  setEdges: (edges: Edge[]) => void
  addNode: (node: Node) => void
  updateNode: (id: string, updates: Partial<Node>) => void
  deleteNode: (id: string) => void
  setSelectedNode: (id: string | null) => void
  addEdge: (edge: Edge) => void
  deleteEdge: (id: string) => void
  addTerminalOutput: (output: TerminalOutput) => void
  clearTerminal: () => void
  setActiveTerminal: (terminal: 'nasm' | 'c' | 'cpp' | 'rust') => void
}

export const useStore = create<AppState>((set) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  terminalOutputs: [],
  activeTerminal: 'nasm',
  
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  addNode: (node) => set((state) => ({ nodes: [...state.nodes, node] })),
  updateNode: (id, updates) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === id ? { ...node, ...updates } : node
      ),
    })),
  deleteNode: (id) =>
    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== id),
      edges: state.edges.filter(
        (edge) => edge.source !== id && edge.target !== id
      ),
    })),
  setSelectedNode: (id) => set({ selectedNodeId: id }),
  addEdge: (edge) => set((state) => ({ edges: [...state.edges, edge] })),
  deleteEdge: (id) =>
    set((state) => ({ edges: state.edges.filter((edge) => edge.id !== id) })),
  addTerminalOutput: (output) =>
    set((state) => ({
      terminalOutputs: [...state.terminalOutputs, output],
    })),
  clearTerminal: () => set({ terminalOutputs: [] }),
  setActiveTerminal: (terminal) => set({ activeTerminal: terminal }),
}))

