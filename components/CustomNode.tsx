'use client'

import { memo, useEffect, useState } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
import { motion } from 'framer-motion'
import { useStore } from '@/store/useStore'

function CustomNode({ data, id, selected }: NodeProps) {
  const { selectedNodeId, nodes, edges } = useStore()
  const isSelected = selectedNodeId === id || selected
  const [isProcessing, setIsProcessing] = useState(false)
  const [pulseIntensity, setPulseIntensity] = useState(0)
  const [isExecuting, setIsExecuting] = useState(false)
  const [executionPulse, setExecutionPulse] = useState(0)
  
  // Listen for node save events
  useEffect(() => {
    const handleNodeSave = (event: CustomEvent) => {
      const savedNodeId = event.detail?.nodeId
      
      // Check if this node is connected to the saved node
      const isConnected = edges.some(edge => 
        (edge.source === savedNodeId && edge.target === id) ||
        (edge.target === savedNodeId && edge.source === id)
      )
      
      if (isConnected || savedNodeId === id) {
        setIsProcessing(true)
        setPulseIntensity(1)
        
        // Animate processing
        setTimeout(() => {
          setPulseIntensity(0)
          setTimeout(() => setIsProcessing(false), 500)
        }, 1000)
      }
    }
    
    window.addEventListener('node-saved', handleNodeSave as EventListener)
    return () => {
      window.removeEventListener('node-saved', handleNodeSave as EventListener)
    }
  }, [id, edges])
  
  // Listen for node execute events
  useEffect(() => {
    const handleNodeExecute = (event: CustomEvent) => {
      const executedNodeId = event.detail?.nodeId
      
      // Check if this node is in the execution chain
      const isInChain = edges.some(edge => 
        edge.source === executedNodeId && edge.target === id
      ) || executedNodeId === id
      
      if (isInChain) {
        setIsExecuting(true)
        setExecutionPulse(1)
        
        // Animate execution with delay based on position in chain
        const delay = executedNodeId === id ? 0 : 300
        setTimeout(() => {
          setExecutionPulse(0)
          setTimeout(() => setIsExecuting(false), 800)
        }, 1500 + delay)
      }
    }
    
    const handleNodeExecuteComplete = () => {
      setIsExecuting(false)
      setExecutionPulse(0)
    }
    
    window.addEventListener('node-execute', handleNodeExecute as EventListener)
    window.addEventListener('node-execute-complete', handleNodeExecuteComplete as EventListener)
    return () => {
      window.removeEventListener('node-execute', handleNodeExecute as EventListener)
      window.removeEventListener('node-execute-complete', handleNodeExecuteComplete as EventListener)
    }
  }, [id, edges])

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
      animate={{ 
        scale: isProcessing || isExecuting ? [1, 1.15, 1] : 1, 
        opacity: 1,
        rotateY: 0,
        boxShadow: isExecuting
          ? [
              '0 0 40px rgba(34, 197, 94, 0.9), 0 0 80px rgba(34, 197, 94, 0.7)',
              '0 0 60px rgba(16, 185, 129, 1), 0 0 120px rgba(16, 185, 129, 0.8)',
              '0 0 40px rgba(34, 197, 94, 0.9), 0 0 80px rgba(34, 197, 94, 0.7)',
            ]
          : isProcessing
            ? [
                '0 0 30px rgba(255, 107, 53, 0.8), 0 0 60px rgba(255, 107, 53, 0.6)',
                '0 0 50px rgba(255, 255, 0, 0.9), 0 0 100px rgba(255, 255, 0, 0.7)',
                '0 0 30px rgba(34, 197, 94, 0.8), 0 0 60px rgba(34, 197, 94, 0.6)',
                '0 0 30px rgba(255, 107, 53, 0.8), 0 0 60px rgba(255, 107, 53, 0.6)',
              ]
            : isSelected 
              ? [
                  '0 0 20px rgba(255, 107, 53, 0.4)',
                  '0 0 40px rgba(255, 107, 53, 0.6)',
                  '0 0 20px rgba(255, 107, 53, 0.4)',
                ]
              : [
                  '0 0 0px rgba(255, 107, 53, 0)',
                  '0 0 10px rgba(255, 107, 53, 0.2)',
                  '0 0 0px rgba(255, 107, 53, 0)',
                ],
      }}
      transition={{ 
        duration: isProcessing ? 0.3 : 0.3,
        type: 'spring',
        stiffness: 200,
        boxShadow: {
          duration: isProcessing ? 0.5 : 2,
          repeat: isProcessing ? Infinity : Infinity,
          ease: 'easeInOut',
        },
      }}
      whileHover={!isProcessing ? {
        scale: 1.08,
        y: -4,
        rotateY: 2,
        transition: { 
          type: 'spring',
          stiffness: 300,
          damping: 20
        },
      } : {}}
      className={`px-4 py-3 rounded-xl border-2 min-w-[200px] relative overflow-hidden ${
        isExecuting
          ? 'bg-green-600/30 border-green-500 glow-green'
          : isProcessing
            ? 'bg-primary/30 border-primary glow-orange'
            : isSelected
              ? 'bg-primary/20 border-primary glow-orange'
              : 'bg-black/60 backdrop-blur-sm border-white/10'
      } transition-all duration-300`}
      style={{
        backdropFilter: 'blur(10px)',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Execution light effect */}
      {isExecuting && (
        <>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-green-500 via-emerald-400 to-green-500"
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 0.4,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          {/* Execution pulsing rings */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`exec-${i}`}
              className="absolute inset-0 border-2 border-green-400 rounded-xl"
              animate={{
                scale: [1, 1.8 + i * 0.4, 1],
                opacity: [0.9, 0, 0.9],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeOut',
              }}
            />
          ))}
          {/* Data flow particles */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-2 h-2 bg-emerald-400 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: '50%',
                filter: 'blur(1px)',
                boxShadow: '0 0 10px rgba(16, 185, 129, 0.8)',
              }}
              animate={{
                y: ['-20px', '20px', '-20px'],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut',
              }}
            />
          ))}
        </>
      )}
      
      {/* Processing light effect */}
      {isProcessing && (
        <>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary via-yellow-400 to-primary"
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          {/* Pulsing rings */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`proc-${i}`}
              className="absolute inset-0 border-2 border-primary rounded-xl"
              animate={{
                scale: [1, 1.5 + i * 0.3, 1],
                opacity: [0.8, 0, 0.8],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: 'easeOut',
              }}
            />
          ))}
        </>
      )}
      
      {/* Animated background shimmer */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-primary border-2 border-dark relative z-10"
        style={{ borderRadius: '50%' }}
      >
        <motion.div
          className="absolute inset-0 bg-primary rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </Handle>
      <motion.div 
        className="text-white font-medium text-sm mb-1 relative z-10"
        animate={isSelected ? {
          x: [0, 2, 0],
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {data.label || id}
      </motion.div>
      {data.type && (
        <motion.div 
          className="text-xs text-gray-400 uppercase tracking-wider relative z-10 flex items-center gap-2"
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-primary"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          {data.type}
        </motion.div>
      )}
      {data.inheritedFrom && (
        <motion.div
          className="text-xs text-primary/70 mt-1 relative z-10 flex items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.span
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            ⬇️
          </motion.span>
          <span>Hereda</span>
        </motion.div>
      )}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-primary border-2 border-dark relative z-10"
        style={{ borderRadius: '50%' }}
      >
        <motion.div
          className="absolute inset-0 bg-primary rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        />
      </Handle>
    </motion.div>
  )
}

export default memo(CustomNode)

