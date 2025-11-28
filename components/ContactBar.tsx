'use client'

import { motion } from 'framer-motion'
import { Mail, Github, Phone, Linkedin, ExternalLink } from 'lucide-react'
import SearchBar from './SearchBar'

const contacts = [
  {
    icon: Mail,
    label: 'Email',
    value: 'eddi.salazar.dev@gmail.com',
    href: 'mailto:eddi.salazar.dev@gmail.com',
    color: 'text-blue-400',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'AndreeSalazar',
    href: 'https://github.com/AndreeSalazar',
    color: 'text-gray-300',
  },
  {
    icon: Phone,
    label: 'Teléfono',
    value: '+51 945 375 729',
    href: 'tel:+51945375729',
    color: 'text-green-400',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'Andreé Salazar',
    href: 'https://www.linkedin.com/in/andreé-salazar-0b1b81304/',
    color: 'text-blue-500',
  },
]

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
}

export default function ContactBar() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full bg-black/95 backdrop-blur-sm border-b border-white/5 px-6 py-3 shrink-0 brushed-metal relative"
      style={{
        boxShadow: '0 2px 20px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
      }}
    >
      {/* Animated background particles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary/20 rounded-full"
          initial={{
            x: Math.random() * 100 + '%',
            y: '50%',
            opacity: 0,
          }}
          animate={{
            x: [null, Math.random() * 100 + '%'],
            y: ['50%', Math.random() * 100 + '%'],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.5,
            ease: 'easeInOut',
          }}
        />
      ))}
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-center justify-between flex-wrap gap-3">
          {/* Search Bar - Only show on main pages */}
          <div className="hidden md:block">
            <SearchBar />
          </div>
          
          <div className="flex items-center justify-between flex-wrap gap-3 flex-1 md:justify-end">
            {contacts.map((contact, index) => (
            <motion.a
              key={contact.label}
              variants={itemVariants}
              href={contact.href}
              target={contact.href.startsWith('http') ? '_blank' : undefined}
              rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              whileHover={{
                scale: 1.05,
                x: 5,
              }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <motion.div
                className={`p-1.5 rounded-lg bg-black/60 backdrop-blur-sm ${contact.color} group-hover:bg-primary/20 transition-colors relative overflow-hidden border border-white/5`}
                style={{
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 2px 8px rgba(0, 0, 0, 0.3)',
                }}
                whileHover={{ 
                  rotate: 360,
                  scale: 1.1,
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 4px 12px rgba(255, 107, 53, 0.3)',
                }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <contact.icon size={16} className="relative z-10" />
              </motion.div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">
                  {contact.label}
                </div>
                <div className={`text-xs font-medium ${contact.color} group-hover:text-primary transition-colors flex items-center gap-1`}>
                  {contact.value}
                  {contact.href.startsWith('http') && (
                    <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              </div>
            </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

