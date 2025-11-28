'use client'

import { memo } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
import { motion } from 'framer-motion'
import { useStore } from '@/store/useStore'

function CustomNode({ data, id, selected }: NodeProps) {
  const { selectedNodeId } = useStore()
  const isSelected = selectedNodeId === id || selected

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        boxShadow: isSelected 
          ? [
              '0 0 10px rgba(255, 107, 53, 0.3)',
              '0 0 20px rgba(255, 107, 53, 0.5)',
              '0 0 10px rgba(255, 107, 53, 0.3)',
            ]
          : [
              '0 0 0px rgba(255, 107, 53, 0)',
              '0 0 5px rgba(255, 107, 53, 0.1)',
              '0 0 0px rgba(255, 107, 53, 0)',
            ],
      }}
      transition={{ 
        duration: 0.2,
        boxShadow: {
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      }}
      whileHover={{
        scale: 1.05,
        y: -2,
        transition: { duration: 0.2 },
      }}
      className={`px-4 py-3 rounded-lg border-2 min-w-[200px] relative overflow-hidden ${
        isSelected
          ? 'bg-primary/20 border-primary glow-orange'
          : 'bg-black/60 backdrop-blur-sm border-white/10'
      } transition-all duration-200`}
      style={{
        backdropFilter: 'blur(10px)',
      }}
    >
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
      <div className="text-white font-medium text-sm mb-1 relative z-10">{data.label || id}</div>
      {data.type && (
        <motion.div 
          className="text-xs text-gray-400 uppercase tracking-wider relative z-10"
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {data.type}
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

