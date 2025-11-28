'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Save, X, Undo, Redo, Zap, CheckCircle } from 'lucide-react'
import { useStore } from '@/store/useStore'

export default function CodeEditor() {
  const { selectedNodeId, nodes, updateNode, addTerminalOutput } = useStore()
  const [code, setCode] = useState('')
  const [isSaved, setIsSaved] = useState(true)

  const selectedNode = nodes.find((n) => n.id === selectedNodeId)

  useEffect(() => {
    if (selectedNode) {
      // Always show the node's code directly (no inheritance preview in editor)
      // User can modify in real time
      let nodeCode = selectedNode.code || ''
      
      // If node has inheritedFrom, add a helpful comment at the top
      if (selectedNode.inheritedFrom) {
        const parentNode = nodes.find((n) => n.id === selectedNode.inheritedFrom)
        if (parentNode) {
          // Add comment showing inheritance but keep code editable
          nodeCode = `// ⬇️ Heredado de: ${parentNode.label}\n// Aquí para modificar en tiempo real para que el B herede al A y el Output pueda funcionar\n\n${nodeCode}`
        }
      }
      
      setCode(nodeCode)
      setIsSaved(true)
    } else {
      setCode('')
    }
  }, [selectedNode, nodes])

  const handleCodeChange = (value: string) => {
    setCode(value)
    setIsSaved(false)
  }

  const [isProcessing, setIsProcessing] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [isExecuting, setIsExecuting] = useState(false)
  const [executionProgress, setExecutionProgress] = useState(0)
  const [executionStage, setExecutionStage] = useState('')

  const handleSave = () => {
    if (selectedNodeId) {
      setIsProcessing(true)
      setProcessingProgress(0)
      
      // Remove inheritance comment lines before saving
      const cleanCode = code.split('\n')
        .filter(line => !line.trim().startsWith('// ⬇️') && !line.trim().startsWith('// Modifica'))
        .join('\n')
        .trim()
      
      // Simulate processing with progress
      const progressInterval = setInterval(() => {
        setProcessingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval)
            return 100
          }
          return prev + 10
        })
      }, 50)
      
      // After processing animation
      setTimeout(() => {
        updateNode(selectedNodeId, { code: cleanCode })
        setIsSaved(true)
        setIsProcessing(false)
        setProcessingProgress(0)
        
        // Visual feedback
        addTerminalOutput({
          id: Date.now().toString(),
          type: 'success',
          message: `✅ Código guardado exitosamente en: ${selectedNode?.label || 'nodo'}`,
          timestamp: new Date(),
        })
        
        // Trigger node update animation
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('node-saved', { 
            detail: { nodeId: selectedNodeId } 
          }))
        }
        
        // Animate save button
        setTimeout(() => {
          setIsSaved(false)
          setTimeout(() => setIsSaved(true), 100)
        }, 2000)
      }, 500)
    }
  }

  const handleExecute = () => {
    if (selectedNodeId) {
      setIsExecuting(true)
      setExecutionProgress(0)
      setExecutionStage('Iniciando compilación...')
      
      // Trigger execution animation event
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('node-execute', { 
          detail: { nodeId: selectedNodeId } 
        }))
      }
      
      addTerminalOutput({
        id: Date.now().toString(),
        type: 'info',
        message: '>>> Iniciando compilación...',
        timestamp: new Date(),
      })
      
      // Simulate compilation progress
      const compileInterval = setInterval(() => {
        setExecutionProgress((prev) => {
          if (prev >= 33) {
            clearInterval(compileInterval)
            return 33
          }
          return prev + 3
        })
      }, 50)
      
      setTimeout(() => {
        setExecutionStage('Linker: Procesando...')
        setExecutionProgress(33)
        
        addTerminalOutput({
          id: (Date.now() + 1).toString(),
          type: 'success',
          message: '>>> Linker: Éxito.',
          timestamp: new Date(),
        })
        
        // Simulate linking progress
        const linkInterval = setInterval(() => {
          setExecutionProgress((prev) => {
            if (prev >= 66) {
              clearInterval(linkInterval)
              return 66
            }
            return prev + 3
          })
        }, 50)
        
        setTimeout(() => {
          setExecutionStage('Ejecutando código...')
          setExecutionProgress(66)
          
          addTerminalOutput({
            id: (Date.now() + 2).toString(),
            type: 'info',
            message: '>>> Ejecutando...',
            timestamp: new Date(),
          })
          
          // Simulate execution progress
          const execInterval = setInterval(() => {
            setExecutionProgress((prev) => {
              if (prev >= 100) {
                clearInterval(execInterval)
                return 100
              }
              return prev + 2
            })
          }, 30)
          
          setTimeout(() => {
            // Execute code based on node type and inheritance chain
            // Use the CURRENT code from the node (which may have been modified)
            let output = 'Sin salida'
            
            // Get the current code from the node (may have been modified)
            const currentNodeCode = selectedNode?.code || code || ''
            // Remove comment lines for execution
            const cleanCode = currentNodeCode.split('\n')
              .filter(line => !line.trim().startsWith('//'))
              .join('\n')
              .trim()
            
            if (selectedNode?.id === 'node-a-source') {
              // Node A: Source - output the current text (may have been modified)
              output = cleanCode || 'Hola Mundo'
            } else if (selectedNode?.id === 'node-b-compiler') {
              // Node B: Compiler - gets input from Node A and converts to binary
              const sourceNode = nodes.find(n => n.id === 'node-a-source')
              // Use current code from source node (may have been modified)
              const inputText = sourceNode?.code?.split('\n')
                .filter(line => !line.trim().startsWith('//'))
                .join('')
                .trim() || 'Hola Mundo'
              
              // Execute the compiler function from the code
              try {
                const binary = inputText.split('').map(char => 
                  char.charCodeAt(0).toString(2).padStart(8, '0')
                ).join(' ')
                output = `Binario generado:\n${binary}\n\nConversión exitosa de "${inputText}" a binario.`
              } catch (e) {
                output = `Error en compilación: ${e}`
              }
            } else if (selectedNode?.id === 'node-c-output') {
              // Node C: Output - gets binary from Node B and converts back to text
              const compilerNode = nodes.find(n => n.id === 'node-b-compiler')
              const sourceNode = nodes.find(n => n.id === 'node-a-source')
              
              // Use current code from source node (may have been modified)
              const inputText = sourceNode?.code?.split('\n')
                .filter(line => !line.trim().startsWith('//'))
                .join('')
                .trim() || 'Hola Mundo'
              
              // Generate binary (simulating what compiler would produce)
              const binary = inputText.split('').map(char => 
                char.charCodeAt(0).toString(2).padStart(8, '0')
              ).join(' ')
              
              // Convert back to text
              const result = binary.split(' ').map(bin => 
                String.fromCharCode(parseInt(bin, 2))
              ).join('')
              
              output = `Fuente: ${inputText}\nCompilado a: ${binary}\nResultado: ${result}\n\n✅ Ejecución exitosa!`
            } else if (selectedNode?.id === 'node-d-hex') {
              // Node D: Hex converter - uses current source code
              const sourceNode = nodes.find(n => n.id === 'node-a-source')
              const inputText = sourceNode?.code?.split('\n')
                .filter(line => !line.trim().startsWith('//'))
                .join('')
                .trim() || 'Hola Mundo'
              const hex = inputText.split('').map(char => 
                char.charCodeAt(0).toString(16).padStart(2, '0').toUpperCase()
              ).join(' ')
              output = `Hexadecimal generado:\n${hex}\n\nConversión exitosa de "${inputText}" a hexadecimal.`
            } else if (selectedNode?.id === 'node-e-base64') {
              // Node E: Base64 encoder - uses current source code
              const sourceNode = nodes.find(n => n.id === 'node-a-source')
              const inputText = sourceNode?.code?.split('\n')
                .filter(line => !line.trim().startsWith('//'))
                .join('')
                .trim() || 'Hola Mundo'
              try {
                const base64 = btoa(inputText)
                output = `Base64 generado:\n${base64}\n\nCodificación exitosa de "${inputText}" a Base64.`
              } catch (e) {
                output = `Error al codificar: ${e}`
              }
            } else if (selectedNode?.id === 'node-f-validator') {
              // Node F: Validator - validates current output
              const outputNode = nodes.find(n => n.id === 'node-c-output')
              const sourceNode = nodes.find(n => n.id === 'node-a-source')
              const expected = sourceNode?.code?.split('\n')
                .filter(line => !line.trim().startsWith('//'))
                .join('')
                .trim() || 'Hola Mundo'
              
              // Simulate output from node C
              const inputText = expected
              const binary = inputText.split('').map(char => 
                char.charCodeAt(0).toString(2).padStart(8, '0')
              ).join(' ')
              const actual = binary.split(' ').map(bin => 
                String.fromCharCode(parseInt(bin, 2))
              ).join('')
              
              const isValid = actual === expected
              output = `Validación:\n\nEsperado: "${expected}"\nObtenido: "${actual}"\n\n${isValid ? '✅ Validación exitosa' : '❌ Error de validación'}`
            } else {
              // For other nodes, try to execute the code
              try {
                // Try to extract and execute code
                if (cleanCode.includes('return')) {
                  const match = cleanCode.match(/return\s+(.+?);/)
                  if (match) {
                    output = match[1].replace(/['"]/g, '').trim()
                  } else {
                    output = cleanCode || 'Sin salida'
                  }
                } else if (cleanCode.includes('console.log')) {
                  const match = cleanCode.match(/console\.log\(['"](.+?)['"]\)/)
                  if (match) {
                    output = match[1]
                  } else {
                    output = cleanCode || 'Sin salida'
                  }
                } else {
                  // For simple text nodes, just output the text
                  output = cleanCode || 'Sin salida'
                }
              } catch (e) {
                output = cleanCode || 'Sin salida'
              }
            }
            
                setExecutionProgress(100)
                setExecutionStage('Completado ✓')
                
                addTerminalOutput({
                  id: (Date.now() + 3).toString(),
                  type: 'output',
                  message: `${output}\n\nExit code: 0`,
                  timestamp: new Date(),
                })
                
                // Complete execution animation
                setTimeout(() => {
                  setIsExecuting(false)
                  setExecutionProgress(0)
                  setExecutionStage('')
                  
                  // Trigger completion event
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('node-execute-complete', { 
                      detail: { nodeId: selectedNodeId } 
                    }))
                  }
                }, 1000)
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
          {selectedNode.inheritedFrom && (() => {
            const parentNode = nodes.find((n) => n.id === selectedNode.inheritedFrom)
            return parentNode ? (
              <motion.div 
                className="flex items-center gap-2 text-xs"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <motion.span 
                  className="text-primary"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  ⬇️
                </motion.span>
                <span className="text-gray-400">
                  Hereda de: <span className="text-primary font-medium">{parentNode.label}</span>
                </span>
              </motion.div>
            ) : null
          })()}
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            onClick={handleSave}
            whileHover={!isProcessing ? { scale: 1.08, y: -3 } : {}}
            whileTap={!isProcessing ? { scale: 0.92 } : {}}
            animate={isProcessing ? {
              boxShadow: [
                '0 0 20px rgba(255, 107, 53, 0.6), 0 0 40px rgba(255, 107, 53, 0.4)',
                '0 0 30px rgba(255, 107, 53, 0.8), 0 0 60px rgba(255, 107, 53, 0.6)',
                '0 0 20px rgba(255, 107, 53, 0.6), 0 0 40px rgba(255, 107, 53, 0.4)',
              ],
              scale: [1, 1.05, 1],
            } : isSaved ? {
              boxShadow: [
                '0 4px 12px rgba(255, 107, 53, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                '0 4px 20px rgba(34, 197, 94, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                '0 4px 12px rgba(255, 107, 53, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              ],
            } : {}}
            className={`px-4 py-2 text-white rounded-lg transition-all flex items-center gap-2 text-sm font-medium relative overflow-hidden group ${
              isProcessing
                ? 'bg-primary'
                : isSaved 
                  ? 'bg-green-600/80 hover:bg-green-600' 
                  : 'bg-primary hover:bg-primary-dark'
            }`}
            style={{
              boxShadow: isProcessing 
                ? '0 0 30px rgba(255, 107, 53, 0.8), 0 0 60px rgba(255, 107, 53, 0.6)'
                : '0 4px 12px rgba(255, 107, 53, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            }}
            disabled={isProcessing}
          >
            {/* Processing glow effect */}
            {isProcessing && (
              <>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary via-yellow-400 to-primary"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </>
            )}
            
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20"
              animate={!isProcessing ? {
                x: ['-100%', '100%'],
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            
            <motion.div
              animate={isProcessing ? {
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              } : isSaved ? {
                rotate: [0, 360],
              } : {}}
              transition={{
                duration: isProcessing ? 0.5 : 0.5,
                repeat: isProcessing ? Infinity : 0,
                ease: 'linear',
              }}
            >
              {isProcessing ? (
                <Zap size={16} className="relative z-10" />
              ) : isSaved ? (
                <CheckCircle size={16} className="relative z-10" />
              ) : (
                <Save size={16} className="relative z-10" />
              )}
            </motion.div>
            <span className="relative z-10">
              {isProcessing 
                ? `Procesando... ${processingProgress}%` 
                : isSaved 
                  ? 'Guardado ✓' 
                  : 'Guardar'}
            </span>
            
            {/* Progress bar */}
            {isProcessing && (
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-yellow-400"
                initial={{ width: '0%' }}
                animate={{ width: `${processingProgress}%` }}
                transition={{ duration: 0.1 }}
                style={{
                  boxShadow: '0 0 10px rgba(255, 255, 0, 0.8)',
                }}
              />
            )}
          </motion.button>
          <motion.button
            onClick={handleExecute}
            whileHover={!isExecuting ? { scale: 1.08, y: -3 } : {}}
            whileTap={!isExecuting ? { scale: 0.92 } : {}}
            animate={isExecuting ? {
              boxShadow: [
                '0 0 25px rgba(34, 197, 94, 0.6), 0 0 50px rgba(34, 197, 94, 0.4)',
                '0 0 40px rgba(34, 197, 94, 0.8), 0 0 80px rgba(34, 197, 94, 0.6)',
                '0 0 25px rgba(34, 197, 94, 0.6), 0 0 50px rgba(34, 197, 94, 0.4)',
              ],
              scale: [1, 1.05, 1],
            } : {}}
            className={`px-4 py-2 text-white rounded-lg transition-all flex items-center gap-2 text-sm font-medium relative overflow-hidden group ${
              isExecuting
                ? 'bg-green-600/90'
                : 'bg-black/60 hover:bg-black/80 border border-white/10 hover:border-primary/30'
            }`}
            style={{
              backdropFilter: 'blur(10px)',
              boxShadow: isExecuting 
                ? '0 0 40px rgba(34, 197, 94, 0.8), 0 0 80px rgba(34, 197, 94, 0.6)'
                : 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 2px 8px rgba(0, 0, 0, 0.3)',
            }}
            disabled={isExecuting}
          >
            {/* Execution processing glow effect */}
            {isExecuting && (
              <>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-green-500 via-emerald-400 to-green-500"
                  animate={{
                    opacity: [0.4, 0.7, 0.4],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 1,
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
                    duration: 0.8,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </>
            )}
            
            <motion.div
              animate={isExecuting ? {
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              } : {}}
              transition={{
                duration: 1,
                repeat: isExecuting ? Infinity : 0,
                ease: 'linear',
              }}
            >
              <Play 
                size={16} 
                className={`relative z-10 ${isExecuting ? 'fill-white' : ''}`}
              />
            </motion.div>
            <span className="relative z-10">
              {isExecuting 
                ? `${executionStage} ${executionProgress}%` 
                : 'Ejecutar'}
            </span>
            
            {/* Progress bar */}
            {isExecuting && (
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-emerald-400"
                initial={{ width: '0%' }}
                animate={{ width: `${executionProgress}%` }}
                transition={{ duration: 0.1 }}
                style={{
                  boxShadow: '0 0 10px rgba(34, 197, 94, 0.8)',
                }}
              />
            )}
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
          <div className="relative w-full h-full">
            <textarea
              value={code}
              onChange={(e) => handleCodeChange(e.target.value)}
              onFocus={(e) => {
                // Ensure cursor is visible - don't force to end, let user position it
                e.target.style.caretColor = '#FF6B35'
              }}
              onBlur={(e) => {
                // Keep caret color even when not focused
                e.target.style.caretColor = '#FF6B35'
              }}
              className="w-full h-full bg-transparent text-white code-editor resize-none outline-none relative z-10"
              placeholder="Escribe tu código aquí..."
              spellCheck={false}
              style={{
                caretColor: '#FF6B35 !important',
                fontSize: '14px',
                lineHeight: '1.6',
                fontFamily: 'var(--font-mono)',
              }}
            />
          </div>
          </div>

          <div className="p-4 border-t border-white/5 text-xs text-gray-500">
            <p>Tip: Ctrl+P extrae selección a parámetro</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

