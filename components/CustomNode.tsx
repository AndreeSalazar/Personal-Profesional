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
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={`px-4 py-3 rounded-lg border-2 min-w-[200px] ${
        isSelected
          ? 'bg-primary/20 border-primary glow-orange'
          : 'bg-dark-lighter border-dark-lighter'
      } transition-all duration-200`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-primary border-2 border-dark"
        style={{ borderRadius: '50%' }}
      />
      <div className="text-white font-medium text-sm mb-1">{data.label || id}</div>
      {data.type && (
        <div className="text-xs text-gray-400 uppercase tracking-wider">
          {data.type}
        </div>
      )}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-primary border-2 border-dark"
        style={{ borderRadius: '50%' }}
      />
    </motion.div>
  )
}

export default memo(CustomNode)

