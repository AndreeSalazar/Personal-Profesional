'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Pin } from 'lucide-react'
import { useStore } from '@/store/useStore'

const terminals = [
  { id: 'nasm', label: 'Terminal NASM' },
  { id: 'c', label: 'Terminal C' },
  { id: 'cpp', label: 'Terminal C++' },
  { id: 'rust', label: 'Terminal Rust' },
]

export default function Terminal() {
  const { terminalOutputs, activeTerminal, setActiveTerminal } = useStore()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [terminalOutputs])

  const getOutputColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-400'
      case 'error':
        return 'text-red-400'
      case 'info':
        return 'text-blue-400'
      default:
        return 'text-white'
    }
  }

  return (
    <motion.div
      initial={{ y: 300 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="h-64 bg-dark-light border-t border-dark-lighter flex flex-col"
    >
      {/* Terminal Tabs */}
      <div className="flex items-center border-b border-dark-lighter">
        {terminals.map((terminal) => (
          <button
            key={terminal.id}
            onClick={() => setActiveTerminal(terminal.id as any)}
            className={`px-4 py-2 text-sm transition-colors ${
              activeTerminal === terminal.id
                ? 'bg-dark-lighter text-white border-b-2 border-primary'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {terminal.label}
          </button>
        ))}
        <div className="flex-1" />
        <button className="p-2 text-gray-400 hover:text-white transition-colors">
          <Pin size={16} />
        </button>
        <button className="p-2 text-gray-400 hover:text-white transition-colors">
          <X size={16} />
        </button>
      </div>

      {/* Terminal Output */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 terminal"
      >
        <AnimatePresence>
          {terminalOutputs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-500"
            >
              Terminal listo. Ejecuta código para ver la salida.
            </motion.div>
          ) : (
            terminalOutputs.map((output) => (
              <motion.div
                key={output.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`mb-2 whitespace-pre-wrap ${getOutputColor(
                  output.type
                )}`}
              >
                {output.message}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

