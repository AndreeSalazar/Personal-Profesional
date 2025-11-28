'use client'

import { motion } from 'framer-motion'
import { Plus, FileCode, Settings, Mail, Github, Twitter, Instagram } from 'lucide-react'
import { useStore } from '@/store/useStore'

const nodeTypes = [
  { name: 'Assembler', type: 'assembler' as const, count: 1 },
  { name: 'Compiler C', type: 'compiler' as const, count: 1 },
  { name: 'Compiler C++', type: 'compiler' as const, count: 1 },
  { name: 'Compiler Rust', type: 'compiler' as const, count: 1 },
  { name: 'Parámetro', type: 'parameter' as const, count: 0 },
]

export default function Sidebar() {
  const { addNode, nodes } = useStore()

  const handleAddNode = (type: string, name: string) => {
    const newNode = {
      id: `${type}-${Date.now()}`,
      type: 'custom', // React Flow node type
      nodeType: type as any,
      label: name,
      code: '',
      position: {
        x: Math.random() * 400 + 100,
        y: Math.random() * 400 + 100,
      },
      data: {
        label: name,
        type: type,
      },
    }
    addNode(newNode)
  }

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-64 h-full bg-dark-light border-r border-dark-lighter flex flex-col"
    >
      {/* Logo */}
      <div className="p-6 border-b border-dark-lighter">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-primary text-2xl font-bold tracking-tight"
        >
          NODE LAB.
        </motion.h1>
      </div>

      {/* Node Types */}
      <div className="flex-1 overflow-y-auto p-4">
        <h2 className="text-xs uppercase tracking-wider text-gray-400 mb-4 font-semibold">
          NODOS
        </h2>
        <div className="space-y-2">
          {nodeTypes.map((nodeType, index) => (
            <motion.button
              key={nodeType.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              onClick={() => handleAddNode(nodeType.type, nodeType.name)}
              className="w-full text-left px-4 py-3 bg-dark-lighter hover:bg-dark-lighter/80 rounded transition-all duration-200 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-white text-sm font-medium">
                  {nodeType.name}
                </span>
                {nodeType.count > 0 && (
                  <span className="text-gray-500 text-xs">
                    {nodeType.count}
                  </span>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Color Picker */}
        <div className="mt-8">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500 cursor-pointer hover:scale-110 transition-transform" />
            <div className="w-4 h-4 rounded-full bg-white cursor-pointer hover:scale-110 transition-transform" />
            <div className="w-4 h-4 rounded-full border border-white cursor-pointer hover:scale-110 transition-transform" />
            <button className="ml-2 text-gray-400 hover:text-white transition-colors">
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="p-4 border-t border-dark-lighter space-y-4">
        <div>
          <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-2 font-semibold">
            LEGAL
          </h3>
          <a
            href="#"
            className="text-gray-300 hover:text-white text-sm transition-colors block"
          >
            EULA
          </a>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-2 font-semibold">
            SOCIAL
          </h3>
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="text-gray-300 hover:text-primary transition-colors"
            >
              <Twitter size={16} />
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-primary transition-colors"
            >
              <Instagram size={16} />
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-primary transition-colors"
            >
              <Github size={16} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-2 font-semibold">
            SUPPORT
          </h3>
          <a
            href="mailto:support@nodelab.studio"
            className="text-gray-300 hover:text-white text-sm transition-colors flex items-center gap-2"
          >
            <Mail size={14} />
            support@nodelab.studio
          </a>
        </div>
      </div>
    </motion.div>
  )
}

