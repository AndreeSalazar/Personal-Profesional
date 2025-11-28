import { create } from 'zustand'
import { Node, Edge, TerminalOutput } from '@/types'

interface AppState {
  nodes: Node[]
  edges: Edge[]
  selectedNodeId: string | null
  terminalOutputs: TerminalOutput[]
  activeTerminal: 'nasm' | 'c' | 'cpp' | 'rust'
  initialized: boolean
  
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
  initializeExample: () => void
}

// Example nodes for "Hola Mundo" in binary
const getExampleNodes = (): Node[] => [
  {
    id: 'node-a-source',
    type: 'custom',
    nodeType: 'code',
    label: 'Fuente: Hola Mundo',
    code: 'Hola Mundo',
    position: { x: 250, y: 150 },
    data: {
      label: 'Fuente: Hola Mundo',
      type: 'code',
    },
  },
  {
    id: 'node-b-compiler',
    type: 'custom',
    nodeType: 'compiler',
    label: 'Compilador Binario',
    code: `// Compilador: Convierte texto a binario
function textToBinary(text) {
  return text.split('').map(char => 
    char.charCodeAt(0).toString(2).padStart(8, '0')
  ).join(' ');
}

// Heredado de: Fuente: Hola Mundo
// Aquí puedes modificar en tiempo real para que el B herede al A
const input = "Hola Mundo";
const binary = textToBinary(input);
return binary;`,
    inheritedFrom: 'node-a-source',
    position: { x: 500, y: 150 },
    data: {
      label: 'Compilador Binario',
      type: 'compiler',
    },
  },
  {
    id: 'node-c-output',
    type: 'custom',
    nodeType: 'code',
    label: 'Output: Ejecutar',
    code: `// Output: Ejecuta el binario y muestra resultado
// Heredado de: Compilador Binario
// El Output puede funcionar con el binario generado
const binaryCode = "01001000 01101111 01101100 01100001 00100000 01001101 01110101 01101110 01100100 01101111";

function binaryToText(binary) {
  return binary.split(' ').map(bin => 
    String.fromCharCode(parseInt(bin, 2))
  ).join('');
}

const result = binaryToText(binaryCode);
console.log("Resultado:", result);
return result;`,
    inheritedFrom: 'node-b-compiler',
    position: { x: 750, y: 150 },
    data: {
      label: 'Output: Ejecutar',
      type: 'code',
    },
  },
  {
    id: 'node-d-hex',
    type: 'custom',
    nodeType: 'compiler',
    label: 'Convertidor Hexadecimal',
    code: `// Convertidor: Texto a Hexadecimal
function textToHex(text) {
  return text.split('').map(char => 
    char.charCodeAt(0).toString(16).padStart(2, '0').toUpperCase()
  ).join(' ');
}

// Ejemplo de uso
const input = "Hola Mundo";
const hex = textToHex(input);
return hex;`,
    position: { x: 250, y: 350 },
    data: {
      label: 'Convertidor Hexadecimal',
      type: 'compiler',
    },
  },
  {
    id: 'node-e-base64',
    type: 'custom',
    nodeType: 'compiler',
    label: 'Codificador Base64',
    code: `// Codificador Base64
function textToBase64(text) {
  return btoa(text);
}

// Ejemplo de uso
const input = "Hola Mundo";
const base64 = textToBase64(input);
return base64;`,
    position: { x: 500, y: 350 },
    data: {
      label: 'Codificador Base64',
      type: 'compiler',
    },
  },
  {
    id: 'node-f-validator',
    type: 'custom',
    nodeType: 'code',
    label: 'Validador de Salida',
    code: `// Validador: Verifica que el output sea correcto
function validateOutput(output, expected) {
  return output === expected;
}

// Ejemplo
const output = "Hola Mundo";
const expected = "Hola Mundo";
const isValid = validateOutput(output, expected);
return isValid ? "✅ Validación exitosa" : "❌ Error de validación";`,
    position: { x: 750, y: 350 },
    data: {
      label: 'Validador de Salida',
      type: 'code',
    },
  },
]

const getExampleEdges = (): Edge[] => [
  {
    id: 'edge-a-to-b',
    source: 'node-a-source',
    target: 'node-b-compiler',
  },
  {
    id: 'edge-b-to-c',
    source: 'node-b-compiler',
    target: 'node-c-output',
  },
  {
    id: 'edge-a-to-d',
    source: 'node-a-source',
    target: 'node-d-hex',
  },
  {
    id: 'edge-a-to-e',
    source: 'node-a-source',
    target: 'node-e-base64',
  },
  {
    id: 'edge-c-to-f',
    source: 'node-c-output',
    target: 'node-f-validator',
  },
]

export const useStore = create<AppState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  terminalOutputs: [],
  activeTerminal: 'nasm',
  initialized: false,
  
  initializeExample: () => {
    if (get().initialized) return
    set({
      nodes: getExampleNodes(),
      edges: getExampleEdges(),
      initialized: true,
    })
  },
  
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

