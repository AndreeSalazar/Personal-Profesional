'use client'

import { motion } from 'framer-motion'
import { Plus, FileCode, Settings, Mail, Github, Twitter, Instagram, Linkedin, Phone, User, FolderOpen } from 'lucide-react'
import { useStore } from '@/store/useStore'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import SearchBar from './SearchBar'
import { useLanguage } from '@/contexts/LanguageContext'

const getNodeTypes = (t: (key: string) => string) => [
  { name: t('sidebar.assembler'), type: 'assembler' as const, count: 1 },
  { name: t('sidebar.compilerC'), type: 'compiler' as const, count: 1 },
  { name: t('sidebar.compilerCpp'), type: 'compiler' as const, count: 1 },
  { name: t('sidebar.compilerRust'), type: 'compiler' as const, count: 1 },
  { name: t('sidebar.parameter'), type: 'parameter' as const, count: 0 },
]

export default function Sidebar() {
  const { addNode, nodes } = useStore()
  const pathname = usePathname()
  const { t } = useLanguage()
  const nodeTypes = getNodeTypes(t)

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
      className="w-64 h-full bg-black/95 backdrop-blur-sm border-r border-white/5 flex flex-col brushed-metal metallic-overlay relative"
      style={{
        boxShadow: 'inset -1px 0 0 rgba(255, 255, 255, 0.05), 4px 0 20px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-20 pointer-events-none"
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
      {/* Logo */}
      <div className="p-6 border-b border-white/5 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50" />
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="text-primary text-2xl font-bold tracking-tight mb-4 relative z-10"
          style={{
            textShadow: '0 0 20px rgba(255, 107, 53, 0.3), 0 2px 4px rgba(0, 0, 0, 0.5)',
            letterSpacing: '0.1em',
          }}
        >
          <motion.span
            animate={{
              textShadow: [
                '0 0 20px rgba(255, 107, 53, 0.3), 0 2px 4px rgba(0, 0, 0, 0.5)',
                '0 0 30px rgba(255, 107, 53, 0.5), 0 2px 8px rgba(0, 0, 0, 0.8)',
                '0 0 20px rgba(255, 107, 53, 0.3), 0 2px 4px rgba(0, 0, 0, 0.5)',
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            NODE LAB.
          </motion.span>
        </motion.h1>
        <div className="relative z-10">
          <SearchBar />
        </div>
      </div>

      {/* Navigation */}
      <div className="p-4 border-b border-white/5 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white/2 to-transparent opacity-30" />
        <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-3 font-bold relative z-10" style={{ letterSpacing: '0.15em' }}>
          {t('sidebar.navigation')}
        </h2>
        <div className="space-y-2 relative z-10">
          {[
            { href: '/', icon: FileCode, label: t('nav.editor') },
            { href: '/profile', icon: User, label: t('nav.profile') },
            { href: '/projects', icon: FolderOpen, label: t('nav.projects') },
          ].map((item) => {
            const isActive = pathname === item.href
            return (
              <motion.div
                key={item.href}
                whileHover={{ x: 4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 relative overflow-hidden group ${
                    isActive
                      ? 'bg-primary/20 text-primary border border-primary/40 shadow-lg shadow-primary/20'
                      : 'bg-black/40 hover:bg-black/60 text-gray-400 hover:text-white border border-white/5 hover:border-white/10'
                  }`}
                  style={{
                    backdropFilter: 'blur(10px)',
                    boxShadow: isActive 
                      ? 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 4px 12px rgba(255, 107, 53, 0.2)'
                      : 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 2px 8px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100"
                    animate={{
                      x: isActive ? ['-100%', '100%'] : ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                  <item.icon size={18} className="relative z-10" />
                  <span className="text-sm font-medium relative z-10">{item.label}</span>
                  {isActive && (
                    <motion.div
                      className="absolute right-2 w-1.5 h-1.5 rounded-full bg-primary"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [1, 0.7, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  )}
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Node Types */}
      <div className="flex-1 overflow-y-auto p-4 relative">
        <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-4 font-bold" style={{ letterSpacing: '0.15em' }}>
          NODOS
        </h2>
        <div className="space-y-2">
          {nodeTypes.map((nodeType, index) => (
            <motion.button
              key={nodeType.name}
              initial={{ opacity: 0, x: -20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ 
                delay: 0.3 + index * 0.1,
                type: 'spring',
                stiffness: 200
              }}
              whileHover={{ 
                x: 4, 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAddNode(nodeType.type, nodeType.name)}
              className="w-full text-left px-4 py-3 bg-black/40 hover:bg-black/60 rounded-lg transition-all duration-300 group border border-white/5 hover:border-primary/30 relative overflow-hidden"
              style={{
                backdropFilter: 'blur(10px)',
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 2px 8px rgba(0, 0, 0, 0.3)',
              }}
            >
              {/* Animated shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent opacity-0 group-hover:opacity-100"
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
              <div className="flex items-center justify-between relative z-10">
                <span className="text-white text-sm font-medium group-hover:text-primary transition-colors">
                  {nodeType.name}
                </span>
                {nodeType.count > 0 && (
                  <motion.span 
                    className="text-gray-500 text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20"
                    whileHover={{ scale: 1.2 }}
                  >
                    {nodeType.count}
                  </motion.span>
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
      <div className="p-4 border-t border-white/5 space-y-4 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-30" />
        <div className="relative z-10">
          <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold" style={{ letterSpacing: '0.15em' }}>
            LEGAL
          </h3>
          <motion.a
            href="#"
            whileHover={{ x: 4, scale: 1.02 }}
            className="text-gray-400 hover:text-white text-sm transition-all block px-3 py-2 rounded-lg bg-black/40 hover:bg-black/60 border border-white/5 hover:border-primary/30"
            style={{
              backdropFilter: 'blur(10px)',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 2px 8px rgba(0, 0, 0, 0.3)',
            }}
          >
            EULA
          </motion.a>
        </div>

        <div className="relative z-10">
          <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-3 font-bold" style={{ letterSpacing: '0.15em' }}>
            CONTACTO
          </h3>
          <div className="space-y-2">
            {[
              { href: 'mailto:eddi.salazar.dev@gmail.com', icon: Mail, text: 'eddi.salazar.dev@gmail.com' },
              { href: 'https://github.com/AndreeSalazar', icon: Github, text: 'AndreeSalazar', external: true },
              { href: 'tel:+51945375729', icon: Phone, text: '+51 945 375 729' },
              { href: 'https://www.linkedin.com/in/andreé-salazar-0b1b81304/', icon: Linkedin, text: 'LinkedIn', external: true },
            ].map((contact, idx) => {
              const Icon = contact.icon
              return (
                <motion.a
                  key={contact.href}
                  href={contact.href}
                  target={contact.external ? '_blank' : undefined}
                  rel={contact.external ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  whileHover={{ x: 4, scale: 1.02 }}
                  className="text-gray-400 hover:text-white text-sm transition-all flex items-center gap-2 px-3 py-2 rounded-lg bg-black/40 hover:bg-black/60 border border-white/5 hover:border-primary/30 group/contact relative overflow-hidden"
                  style={{
                    backdropFilter: 'blur(10px)',
                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 2px 8px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 opacity-0 group-hover/contact:opacity-100"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                  <Icon size={14} className="relative z-10" />
                  <span className="relative z-10 font-medium">{contact.text}</span>
                </motion.a>
              )
            })}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

