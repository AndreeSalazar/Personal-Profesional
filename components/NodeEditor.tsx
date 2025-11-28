'use client'

import { useCallback, useEffect, useState } from 'react'
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
  Edge,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { useStore } from '@/store/useStore'
import CustomNode from './CustomNode'

// Component to show processing effects on edges
function EdgeProcessingEffects({ edges }: { edges: Edge[] }) {
  const [processingEdges, setProcessingEdges] = useState<Set<string>>(new Set())
  const [executingEdges, setExecutingEdges] = useState<Set<string>>(new Set())
  
  useEffect(() => {
    const handleNodeSave = (event: CustomEvent) => {
      const savedNodeId = event.detail?.nodeId
      
      // Find all edges connected to the saved node
      const connectedEdges = edges
        .filter(edge => edge.source === savedNodeId || edge.target === savedNodeId)
        .map(edge => edge.id)
      
      setProcessingEdges(new Set(connectedEdges))
      
      // Clear after animation
      setTimeout(() => {
        setProcessingEdges(new Set())
      }, 1500)
    }
    
    const handleNodeExecute = (event: CustomEvent) => {
      const executedNodeId = event.detail?.nodeId
      
      // Find all edges that flow FROM the executed node (execution flow)
      const connectedEdges = edges
        .filter(edge => edge.source === executedNodeId)
        .map(edge => edge.id)
      
      setExecutingEdges(new Set(connectedEdges))
    }
    
    const handleNodeExecuteComplete = () => {
      // Clear after animation
      setTimeout(() => {
        setExecutingEdges(new Set())
      }, 2000)
    }
    
    window.addEventListener('node-saved', handleNodeSave as EventListener)
    window.addEventListener('node-execute', handleNodeExecute as EventListener)
    window.addEventListener('node-execute-complete', handleNodeExecuteComplete as EventListener)
    return () => {
      window.removeEventListener('node-saved', handleNodeSave as EventListener)
      window.removeEventListener('node-execute', handleNodeExecute as EventListener)
      window.removeEventListener('node-execute-complete', handleNodeExecuteComplete as EventListener)
    }
  }, [edges])
  
  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      {/* Processing edges (yellow) */}
      {edges
        .filter(edge => processingEdges.has(edge.id))
        .map(edge => (
          <motion.div
            key={`processing-${edge.id}`}
            className="absolute"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              ease: 'easeInOut',
            }}
          >
            {/* Animated light pulse along edge */}
            <motion.div
              className="w-3 h-3 bg-yellow-400 rounded-full"
              style={{
                filter: 'drop-shadow(0 0 10px rgba(255, 255, 0, 1))',
                boxShadow: '0 0 20px rgba(255, 255, 0, 0.8)',
              }}
              animate={{
                x: ['0%', '100%'],
                y: ['0%', '100%'],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </motion.div>
        ))}
      
      {/* Executing edges (green) */}
      {edges
        .filter(edge => executingEdges.has(edge.id))
        .map((edge, idx) => (
          <motion.div
            key={`executing-${edge.id}`}
            className="absolute"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2,
              delay: idx * 0.3,
              ease: 'easeInOut',
            }}
          >
            {/* Multiple data particles flowing along edge */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="w-4 h-4 bg-emerald-400 rounded-full"
                style={{
                  filter: 'drop-shadow(0 0 15px rgba(16, 185, 129, 1))',
                  boxShadow: '0 0 25px rgba(16, 185, 129, 0.9)',
                }}
                animate={{
                  x: ['0%', '100%'],
                  y: ['0%', '100%'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: 'linear',
                }}
              />
            ))}
          </motion.div>
        ))}
    </div>
  )
}

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
    initializeExample,
    initialized,
  } = useStore()

  const [nodes, setNodesState, onNodesChange] = useNodesState(storeNodes)
  const [edges, setEdgesState, onEdgesChange] = useEdgesState(storeEdges)

  // Initialize example on mount
  useEffect(() => {
    if (!initialized) {
      initializeExample()
    }
  }, [initialized, initializeExample])

  // Sync with store (only when store changes externally)
  useEffect(() => {
    if (storeNodes.length > 0) {
      // Convert store nodes to React Flow format
      const reactFlowNodes = storeNodes.map((node) => ({
        id: node.id,
        type: 'custom',
        position: node.position,
        data: {
          label: node.label,
          type: node.nodeType,
          code: node.code,
          inheritedFrom: node.inheritedFrom,
        },
      }))
      
      // Only update if nodes are different
      const currentIds = nodes.map(n => n.id).sort().join(',')
      const newIds = reactFlowNodes.map(n => n.id).sort().join(',')
      
      if (currentIds !== newIds || nodes.length === 0) {
        setNodesState(reactFlowNodes)
      }
    }
  }, [storeNodes, nodes.length])

  useEffect(() => {
    if (storeEdges.length > 0) {
      // Convert store edges to React Flow format
      const reactFlowEdges = storeEdges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
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
      }))
      
      // Only update if edges are different
      const currentIds = edges.map(e => e.id).sort().join(',')
      const newIds = reactFlowEdges.map(e => e.id).sort().join(',')
      
      if (currentIds !== newIds || edges.length === 0) {
        setEdgesState(reactFlowEdges)
      }
    }
  }, [storeEdges, edges.length])

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
      
      {/* Floating particles with more variety */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-primary/20 rounded-full"
          style={{
            width: `${2 + Math.random() * 3}px`,
            height: `${2 + Math.random() * 3}px`,
          }}
          initial={{
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%',
            opacity: 0,
            scale: 0,
          }}
          animate={{
            y: [null, `-${100 + Math.random() * 50}px`, `${100 + Math.random() * 50}px`],
            x: [null, `${Math.random() * 100 - 50}px`],
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: 'easeInOut',
          }}
        />
      ))}
      
      {/* Connection flow animation */}
      {edges.length > 0 && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {edges.map((edge, idx) => (
            <motion.div
              key={edge.id}
              className="absolute"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.3, scale: 1 }}
              transition={{ delay: 1.5 + idx * 0.2 }}
            >
              {/* Animated dots along edges */}
              <motion.div
                className="w-2 h-2 bg-primary rounded-full"
                animate={{
                  x: ['0%', '100%'],
                  y: ['0%', '100%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: idx * 0.5,
                  ease: 'linear',
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
      
      <div className="relative z-10 w-full h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges.map(edge => ({
            ...edge,
            animated: true,
            style: {
              ...edge.style,
              stroke: '#FF6B35',
              strokeWidth: 2,
              filter: 'drop-shadow(0 0 3px rgba(255, 107, 53, 0.5))',
            },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: '#FF6B35',
            },
          }))}
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
      
      {/* Processing light effects on edges */}
      <EdgeProcessingEffects edges={edges} />
    </div>
  )
}

