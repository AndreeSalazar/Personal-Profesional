export interface Node {
  id: string
  type?: string // React Flow node type (defaults to 'custom')
  nodeType: 'code' | 'parameter' | 'assembler' | 'compiler' // Our custom type
  label: string
  code?: string
  inheritedFrom?: string
  position: { x: number; y: number }
  data: {
    label: string
    type: string
    style?: number
    weight?: number
    modes?: string[]
  }
}

export interface Edge {
  id: string
  source: string
  target: string
  sourceHandle?: string
  targetHandle?: string
}

export interface TerminalOutput {
  id: string
  type: 'info' | 'success' | 'error' | 'output'
  message: string
  timestamp: Date
}

