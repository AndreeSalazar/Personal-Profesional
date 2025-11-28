'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Save, X, Undo, Redo } from 'lucide-react'
import { useStore } from '@/store/useStore'

export default function CodeEditor() {
  const { selectedNodeId, nodes, updateNode, addTerminalOutput } = useStore()
  const [code, setCode] = useState('')
  const [isSaved, setIsSaved] = useState(true)

  const selectedNode = nodes.find((n) => n.id === selectedNodeId)

  useEffect(() => {
    if (selectedNode) {
      setCode(selectedNode.code || '')
      setIsSaved(true)
    } else {
      setCode('')
    }
  }, [selectedNode])

  const handleCodeChange = (value: string) => {
    setCode(value)
    setIsSaved(false)
  }

  const handleSave = () => {
    if (selectedNodeId) {
      updateNode(selectedNodeId, { code })
      setIsSaved(true)
      addTerminalOutput({
        id: Date.now().toString(),
        type: 'success',
        message: 'Código guardado exitosamente',
        timestamp: new Date(),
      })
    }
  }

  const handleExecute = () => {
    if (selectedNodeId) {
      addTerminalOutput({
        id: Date.now().toString(),
        type: 'info',
        message: '>>> Iniciando compilación...',
        timestamp: new Date(),
      })
      
      setTimeout(() => {
        addTerminalOutput({
          id: (Date.now() + 1).toString(),
          type: 'success',
          message: '>>> Linker: Éxito.',
          timestamp: new Date(),
        })
        
        setTimeout(() => {
          addTerminalOutput({
            id: (Date.now() + 2).toString(),
            type: 'info',
            message: '>>> Ejecutando...',
            timestamp: new Date(),
          })
          
          setTimeout(() => {
            addTerminalOutput({
              id: (Date.now() + 3).toString(),
              type: 'output',
              message: `--- SALIDA DEL PROGRAMA ---\n${code || 'Sin salida'}\n---------------------------\nExit code: 0`,
              timestamp: new Date(),
            })
          }, 500)
        }, 500)
      }, 500)
    }
  }

  if (!selectedNode) {
    return (
      <div className="w-full h-full bg-dark-light flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-500 text-center"
        >
          <p className="text-lg mb-2">Selecciona un nodo</p>
          <p className="text-sm">para editar su código</p>
        </motion.div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full h-full bg-black/90 backdrop-blur-sm flex flex-col brushed-metal relative overflow-hidden"
      style={{
        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
      }}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-10 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at 0% 0%, rgba(255, 107, 53, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 100% 100%, rgba(255, 107, 53, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 0% 0%, rgba(255, 107, 53, 0.15) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <div className="relative z-10 w-full h-full flex flex-col">
        {/* Header */}
        <div 
          className="border-b border-white/5 p-4 flex items-center justify-between relative" 
          style={{
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent)',
            boxShadow: '0 1px 0 rgba(255, 255, 255, 0.05)',
          }}
        >
        <div>
          <h2 className="text-white font-semibold text-lg mb-1">
            {selectedNode.label}
          </h2>
          {selectedNode.inheritedFrom && (
            <p className="text-xs text-gray-400">
              Código heredado de: {selectedNode.inheritedFrom}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            onClick={handleSave}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-all flex items-center gap-2 text-sm font-medium relative overflow-hidden group"
            style={{
              boxShadow: '0 4px 12px rgba(255, 107, 53, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            <Save size={16} className="relative z-10" />
            <span className="relative z-10">Guardar</span>
          </motion.button>
          <motion.button
            onClick={handleExecute}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-black/60 hover:bg-black/80 text-white rounded-lg transition-all flex items-center gap-2 text-sm font-medium border border-white/10 hover:border-primary/30"
            style={{
              backdropFilter: 'blur(10px)',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 2px 8px rgba(0, 0, 0, 0.3)',
            }}
          >
            <Play size={16} />
            Ejecutar
          </motion.button>
        </div>
        </div>

        {/* Code Area */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-white/5 flex items-center gap-2">
          <button className="text-gray-400 hover:text-white transition-colors">
            <Undo size={16} />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <Redo size={16} />
          </button>
          <div className="flex-1" />
          <AnimatePresence>
            {isSaved && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs text-gray-500"
              >
                Guardado
              </motion.span>
            )}
          </AnimatePresence>
          </div>

          <div className="flex-1 p-4 overflow-auto relative">
          {/* Animated cursor effect */}
          <motion.div
            className="absolute top-4 left-4 w-0.5 h-6 bg-primary z-20"
            animate={{
              opacity: [1, 0, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 opacity-5 pointer-events-none"
            animate={{
              background: [
                'radial-gradient(circle at 0% 0%, rgba(255, 107, 53, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 100% 100%, rgba(255, 107, 53, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 0% 0%, rgba(255, 107, 53, 0.1) 0%, transparent 50%)',
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <textarea
            value={code}
            onChange={(e) => handleCodeChange(e.target.value)}
            className="w-full h-full bg-transparent text-white code-editor resize-none outline-none relative z-10"
            placeholder="Escribe tu código aquí..."
            spellCheck={false}
          />
          </div>

          <div className="p-4 border-t border-white/5 text-xs text-gray-500">
            <p>Tip: Ctrl+P extrae selección a parámetro</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

