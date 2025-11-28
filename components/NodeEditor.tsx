'use client'

import { useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
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
      // Update store after changes are applied - only sync position changes
      setTimeout(() => {
        const updatedNodes = storeNodes.map((storeNode) => {
          const reactFlowNode = nodes.find((n) => n.id === storeNode.id)
          if (reactFlowNode) {
            return {
              ...storeNode,
              position: reactFlowNode.position,
            }
          }
          return storeNode
        })
        setNodes(updatedNodes)
      }, 0)
    },
    [nodes, storeNodes, onNodesChange, setNodes]
  )

  // Handle edge changes and sync to store
  const handleEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      onEdgesChange(changes)
      setTimeout(() => {
        const updatedEdges = edges.map((e) => ({
          id: e.id,
          source: e.source,
          target: e.target,
          type: e.type,
          animated: e.animated,
          style: e.style,
          markerEnd: e.markerEnd,
        }))
        setEdges(updatedEdges as any)
      }, 0)
    },
    [edges, onEdgesChange, setEdges]
  )

  return (
    <div className="w-full h-full bg-black grid-background relative overflow-hidden">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 30%, rgba(255, 107, 53, 0.05) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 70%, rgba(255, 107, 53, 0.05) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(255, 107, 53, 0.08) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 30%, rgba(255, 107, 53, 0.05) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/20 rounded-full"
          initial={{
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%',
            opacity: 0,
          }}
          animate={{
            y: [null, '-100px', '100px'],
            x: [null, Math.random() * 50 - 25 + 'px'],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 5 + i * 2,
            repeat: Infinity,
            delay: i * 0.5,
            ease: 'easeInOut',
          }}
        />
      ))}
      
      <div className="relative z-10 w-full h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={handleNodesChange}
          onEdgesChange={handleEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          className="bg-transparent"
        >
          <Background 
            color="rgba(255, 255, 255, 0.02)" 
            gap={20} 
            size={1}
          />
          <Controls
            className="bg-black/60 backdrop-blur-sm border border-white/10"
            showInteractive={false}
          />
          <MiniMap
            className="bg-black/60 backdrop-blur-sm border border-white/10"
            nodeColor="#FF6B35"
            maskColor="rgba(0, 0, 0, 0.8)"
          />
        </ReactFlow>
      </div>
    </div>
  )
}

