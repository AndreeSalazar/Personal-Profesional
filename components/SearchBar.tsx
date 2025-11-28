'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Command, X, FileCode, User, FolderOpen, Home } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'

interface SearchItem {
  id: string
  titleKey: string
  descriptionKey: string
  path: string
  icon: any
  categoryKey: string
}

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const { t } = useLanguage()

  useEffect(() => {
    setMounted(true)
  }, [])

  const searchItems: SearchItem[] = [
    {
      id: 'editor',
      titleKey: 'search.editorTitle',
      descriptionKey: 'search.editorDesc',
      path: '/',
      icon: FileCode,
      categoryKey: 'search.categoryMain',
    },
    {
      id: 'profile',
      titleKey: 'search.profileTitle',
      descriptionKey: 'search.profileDesc',
      path: '/profile',
      icon: User,
      categoryKey: 'search.categoryProfile',
    },
    {
      id: 'projects',
      titleKey: 'search.projectsTitle',
      descriptionKey: 'search.projectsDesc',
      path: '/projects',
      icon: FolderOpen,
      categoryKey: 'search.categoryProjects',
    },
  ]

  const filteredItems = searchItems.filter(
    (item) =>
      t(item.titleKey).toLowerCase().includes(query.toLowerCase()) ||
      t(item.descriptionKey).toLowerCase().includes(query.toLowerCase()) ||
      t(item.categoryKey).toLowerCase().includes(query.toLowerCase())
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

  // Get item with translated text for display
  const getItemDisplay = (item: SearchItem) => ({
    ...item,
    title: t(item.titleKey),
    description: t(item.descriptionKey),
    category: t(item.categoryKey),
  })

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      {/* Search Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1.5 md:py-2 bg-black/60 backdrop-blur-sm hover:bg-black/80 rounded-lg border border-white/10 hover:border-primary/50 transition-all text-gray-400 hover:text-white text-sm relative overflow-hidden group"
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
        <Search size={16} className="relative z-10 md:w-4 md:h-4" />
        <span className="hidden sm:inline relative z-10">{t('search.placeholder')}</span>
        <kbd className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 bg-black/60 rounded border border-white/10 text-xs relative z-10">
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
                className="fixed top-4 md:top-1/2 left-0 md:left-1/2 transform md:-translate-x-1/2 md:-translate-y-1/2 w-full md:w-auto md:max-w-2xl mx-0 md:mx-4 h-[calc(100vh-2rem)] md:h-auto flex flex-col"
                style={{ 
                  zIndex: 99999,
                  position: 'fixed',
                }}
              >
              <div className="bg-black/95 backdrop-blur-sm rounded-t-2xl md:rounded-xl border border-white/10 shadow-2xl overflow-hidden brushed-metal relative flex flex-col h-full md:h-auto"
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
                <div className="flex items-center gap-2 md:gap-3 p-3 md:p-4 border-b border-white/5 relative z-10 shrink-0"
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
                    <Search size={18} className="text-gray-400 md:w-5 md:h-5" />
                  </motion.div>
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value)
                      setSelectedIndex(0)
                    }}
                    placeholder={t('search.pages')}
                    className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-base md:text-lg"
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
                <div className="flex-1 overflow-y-auto relative z-10 min-h-0">
                  {filteredItems.length > 0 ? (
                    <div className="p-2 md:p-2">
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
                            className={`w-full flex items-center gap-2 md:gap-3 p-2.5 md:p-3 rounded-lg transition-all relative overflow-hidden group ${
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
                              className={`p-1.5 md:p-2 rounded-lg relative z-10 shrink-0 ${
                                index === selectedIndex ? 'bg-primary/30' : 'bg-black/60'
                              }`}
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.5 }}
                            >
                              <Icon
                                size={16}
                                className={`md:w-[18px] md:h-[18px] ${index === selectedIndex ? 'text-primary' : 'text-gray-400'}`}
                              />
                            </motion.div>
                            <div className="flex-1 text-left relative z-10 min-w-0">
                              <div className={`font-medium text-sm md:text-base ${
                                index === selectedIndex ? 'text-primary' : 'text-white'
                              }`}>
                                {t(item.titleKey)}
                              </div>
                              <div className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                                {t(item.descriptionKey)}
                              </div>
                            </div>
                            <motion.div
                              className={`text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded-full relative z-10 shrink-0 hidden sm:block ${
                                index === selectedIndex
                                  ? 'bg-primary/20 text-primary border border-primary/30'
                                  : 'bg-black/60 text-gray-500 border border-white/10'
                              }`}
                              whileHover={{ scale: 1.1 }}
                            >
                              {t(item.categoryKey)}
                            </motion.div>
                          </motion.button>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-gray-400">
                      <p>{t('search.noResults')}</p>
                      <p className="text-xs mt-2">{t('search.noResultsDesc')}</p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="p-2 md:p-3 border-t border-white/5 bg-black/60 flex items-center justify-between text-xs text-gray-500 relative z-10 shrink-0"
                  style={{
                    background: 'linear-gradient(to top, rgba(255, 255, 255, 0.03), transparent)',
                  }}
                >
                  <div className="flex items-center gap-2 md:gap-4 flex-wrap">
                    <div className="flex items-center gap-1">
                      <kbd className="px-1 md:px-1.5 py-0.5 bg-black/60 rounded border border-white/10 text-[10px] md:text-xs">↑↓</kbd>
                      <span className="hidden sm:inline">{t('search.navigate')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <kbd className="px-1 md:px-1.5 py-0.5 bg-black/60 rounded border border-white/10 text-[10px] md:text-xs">↵</kbd>
                      <span className="hidden sm:inline">{t('search.select')}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <kbd className="px-1 md:px-1.5 py-0.5 bg-black/60 rounded border border-white/10 text-[10px] md:text-xs">Esc</kbd>
                    <span className="hidden sm:inline">{t('search.close')}</span>
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

