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
      className="w-full h-full bg-dark-light flex flex-col"
    >
      {/* Header */}
      <div className="border-b border-dark-lighter p-4 flex items-center justify-between">
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
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded transition-colors flex items-center gap-2 text-sm"
          >
            <Save size={16} />
            Guardar
          </button>
          <button
            onClick={handleExecute}
            className="px-4 py-2 bg-dark-lighter hover:bg-dark-lighter/80 text-white rounded transition-colors flex items-center gap-2 text-sm"
          >
            <Play size={16} />
            Ejecutar
          </button>
        </div>
      </div>

      {/* Code Area */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-dark-lighter flex items-center gap-2">
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

        <div className="flex-1 p-4 overflow-auto">
          <textarea
            value={code}
            onChange={(e) => handleCodeChange(e.target.value)}
            className="w-full h-full bg-dark text-white code-editor resize-none outline-none"
            placeholder="Escribe tu código aquí..."
            spellCheck={false}
          />
        </div>

        <div className="p-4 border-t border-dark-lighter text-xs text-gray-500">
          <p>Tip: Ctrl+P extrae selección a parámetro</p>
        </div>
      </div>
    </motion.div>
  )
}

