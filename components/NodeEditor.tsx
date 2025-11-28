'use client'

import { useCallback, useEffect } from 'react'
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Connection,
  addEdge,
  useNodesState,
  useEdgesState,
  MarkerType,
  NodeChange,
  EdgeChange,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { useStore } from '@/store/useStore'
import CustomNode from './CustomNode'

const nodeTypes = {
  custom: CustomNode,
}

export default function NodeEditor() {
  const {
    nodes: storeNodes,
    edges: storeEdges,
    setNodes,
    setEdges,
    addEdge: addStoreEdge,
    setSelectedNode,
  } = useStore()

  const [nodes, setNodesState, onNodesChange] = useNodesState(storeNodes)
  const [edges, setEdgesState, onEdgesChange] = useEdgesState(storeEdges)

  // Sync with store (only when store changes externally)
  useEffect(() => {
    if (JSON.stringify(storeNodes) !== JSON.stringify(nodes)) {
      setNodesState(storeNodes)
    }
  }, [storeNodes])

  useEffect(() => {
    if (JSON.stringify(storeEdges) !== JSON.stringify(edges)) {
      setEdgesState(storeEdges)
    }
  }, [storeEdges])

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge = {
        ...params,
        id: `edge-${params.source}-${params.target}`,
        type: 'smoothstep',
        animated: true,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#FF6B35',
        },
        style: {
          stroke: '#FF6B35',
          strokeWidth: 2,
        },
      }
      const updatedEdges = addEdge(newEdge, edges)
      setEdgesState(updatedEdges)
      addStoreEdge(newEdge as any)
    },
    [edges, setEdgesState, addStoreEdge]
  )

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      setSelectedNode(node.id)
    },
    [setSelectedNode]
  )

  // Handle node changes and sync to store
  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      onNodesChange(changes)
      // Update store after changes are applied
      setTimeout(() => {
        const updatedNodes = nodes.map((n) => ({ ...n }))
        setNodes(updatedNodes)
      }, 0)
    },
    [nodes, onNodesChange, setNodes]
  )

  // Handle edge changes and sync to store
  const handleEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      onEdgesChange(changes)
      setTimeout(() => {
        const updatedEdges = edges.map((e) => ({ ...e }))
        setEdges(updatedEdges)
      }, 0)
    },
    [edges, onEdgesChange, setEdges]
  )

  return (
    <div className="w-full h-full bg-dark grid-background">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        defaultNodeType="custom"
        fitView
        className="bg-dark"
      >
        <Background color="#1A1A1A" gap={20} size={1} />
        <Controls
          className="bg-dark-lighter border border-dark-lighter"
          showInteractive={false}
        />
        <MiniMap
          className="bg-dark-lighter border border-dark-lighter"
          nodeColor="#FF6B35"
          maskColor="rgba(10, 10, 10, 0.8)"
        />
      </ReactFlow>
    </div>
  )
}

