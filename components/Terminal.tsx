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
      className="h-48 bg-black/95 backdrop-blur-sm border-t border-white/5 flex flex-col shrink-0 brushed-metal relative overflow-hidden"
      style={{
        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 -4px 20px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-10 pointer-events-none"
        animate={{
          background: [
            'linear-gradient(90deg, transparent, rgba(255, 107, 53, 0.1), transparent)',
            'linear-gradient(180deg, transparent, rgba(255, 107, 53, 0.1), transparent)',
            'linear-gradient(90deg, transparent, rgba(255, 107, 53, 0.1), transparent)',
          ],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <div className="relative z-10 w-full h-full flex flex-col">
        {/* Terminal Tabs */}
        <div 
          className="flex items-center border-b border-white/5 relative" 
          style={{
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent)',
          }}
        >
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
            <div className="relative">
              {/* Animated scanline effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none z-0"
                animate={{
                  y: ['-100%', '100%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              {terminalOutputs.map((output, index) => (
                <motion.div
                  key={output.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  exit={{ opacity: 0 }}
                  className={`mb-2 whitespace-pre-wrap relative z-10 ${getOutputColor(
                    output.type
                  )}`}
                >
                  {output.type !== 'output' && (
                    <motion.span
                      className="text-gray-500 text-xs mr-2 inline-block"
                      animate={{
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      {output.timestamp.toLocaleTimeString()}
                    </motion.span>
                  )}
                  <span className={output.type === 'output' ? 'block' : ''}>
                    {output.message}
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

