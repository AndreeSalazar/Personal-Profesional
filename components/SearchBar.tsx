'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Command, X, FileCode, User, FolderOpen, Home } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface SearchItem {
  id: string
  title: string
  description: string
  path: string
  icon: any
  category: string
}

const searchItems: SearchItem[] = [
  {
    id: 'editor',
    title: 'Editor de Nodos',
    description: 'Editor visual de código basado en nodos',
    path: '/',
    icon: FileCode,
    category: 'Principal',
  },
  {
    id: 'profile',
    title: 'Mi Perfil',
    description: 'Información personal, habilidades y tecnologías',
    path: '/profile',
    icon: User,
    category: 'Perfil',
  },
  {
    id: 'projects',
    title: 'Mis Proyectos',
    description: 'Proyectos destacados y logros en desarrollo',
    path: '/projects',
    icon: FolderOpen,
    category: 'Proyectos',
  },
]

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredItems = searchItems.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K to open search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
      }
      // Escape to close
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
        setQuery('')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % filteredItems.length)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length)
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (filteredItems[selectedIndex]) {
          handleSelect(filteredItems[selectedIndex])
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, selectedIndex, filteredItems])

  const handleSelect = (item: SearchItem) => {
    router.push(item.path)
    setIsOpen(false)
    setQuery('')
    setSelectedIndex(0)
  }

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      {/* Search Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 bg-black/60 backdrop-blur-sm hover:bg-black/80 rounded-lg border border-white/10 hover:border-primary/50 transition-all text-gray-400 hover:text-white text-sm relative overflow-hidden group"
        style={{
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 2px 8px rgba(0, 0, 0, 0.3)',
        }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <Search size={16} className="relative z-10" />
        <span className="hidden md:inline relative z-10">Buscar...</span>
        <kbd className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 bg-black/60 rounded border border-white/10 text-xs relative z-10">
          <Command size={12} />
          <span>K</span>
        </kbd>
      </motion.button>

      {/* Search Modal - Using Portal to render at root level */}
      {mounted && createPortal(
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/80 backdrop-blur-md"
                style={{ 
                  zIndex: 99998,
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
              />

              {/* Search Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl mx-4"
                style={{ 
                  zIndex: 99999,
                  position: 'fixed',
                }}
              >
              <div className="bg-black/95 backdrop-blur-sm rounded-xl border border-white/10 shadow-2xl overflow-hidden brushed-metal relative"
                style={{
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 20px 60px rgba(0, 0, 0, 0.8)',
                }}
              >
                {/* Animated background gradient */}
                <motion.div
                  className="absolute inset-0 opacity-10 pointer-events-none"
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
                {/* Search Input */}
                <div className="flex items-center gap-3 p-4 border-b border-white/5 relative z-10"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent)',
                  }}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <Search size={20} className="text-gray-400" />
                  </motion.div>
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value)
                      setSelectedIndex(0)
                    }}
                    placeholder="Buscar páginas..."
                    className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-lg"
                  />
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-1 hover:bg-black/60 rounded transition-colors"
                  >
                    <X size={18} className="text-gray-400" />
                  </motion.button>
                </div>

                {/* Results */}
                <div className="max-h-96 overflow-y-auto relative z-10">
                  {filteredItems.length > 0 ? (
                    <div className="p-2">
                      {filteredItems.map((item, index) => {
                        const Icon = item.icon
                        return (
                          <motion.button
                            key={item.id}
                            onClick={() => handleSelect(item)}
                            onMouseEnter={() => setSelectedIndex(index)}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all relative overflow-hidden group ${
                              index === selectedIndex
                                ? 'bg-primary/20 border border-primary/40'
                                : 'bg-transparent hover:bg-black/60 border border-transparent hover:border-white/10'
                            }`}
                            style={index === selectedIndex ? {
                              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 4px 12px rgba(255, 107, 53, 0.2)',
                            } : {
                              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                            }}
                            whileHover={{ x: 4, scale: 1.01 }}
                          >
                            <motion.div
                              className={`absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100`}
                              animate={{
                                x: ['-100%', '100%'],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'linear',
                              }}
                            />
                            <motion.div
                              className={`p-2 rounded-lg relative z-10 ${
                                index === selectedIndex ? 'bg-primary/30' : 'bg-black/60'
                              }`}
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.5 }}
                            >
                              <Icon
                                size={18}
                                className={index === selectedIndex ? 'text-primary' : 'text-gray-400'}
                              />
                            </motion.div>
                            <div className="flex-1 text-left relative z-10">
                              <div className={`font-medium ${
                                index === selectedIndex ? 'text-primary' : 'text-white'
                              }`}>
                                {item.title}
                              </div>
                              <div className="text-xs text-gray-400 mt-0.5">
                                {item.description}
                              </div>
                            </div>
                            <motion.div
                              className={`text-xs px-2 py-1 rounded-full relative z-10 ${
                                index === selectedIndex
                                  ? 'bg-primary/20 text-primary border border-primary/30'
                                  : 'bg-black/60 text-gray-500 border border-white/10'
                              }`}
                              whileHover={{ scale: 1.1 }}
                            >
                              {item.category}
                            </motion.div>
                          </motion.button>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-gray-400">
                      <p>No se encontraron resultados</p>
                      <p className="text-xs mt-2">Intenta con otros términos</p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="p-3 border-t border-white/5 bg-black/60 flex items-center justify-between text-xs text-gray-500 relative z-10"
                  style={{
                    background: 'linear-gradient(to top, rgba(255, 255, 255, 0.03), transparent)',
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-black/60 rounded border border-white/10">↑↓</kbd>
                      <span>Navegar</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-black/60 rounded border border-white/10">↵</kbd>
                      <span>Seleccionar</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-black/60 rounded border border-white/10">Esc</kbd>
                    <span>Cerrar</span>
                  </div>
                </div>
              </div>
            </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  )
}

