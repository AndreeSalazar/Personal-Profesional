'use client'

import { motion } from 'framer-motion'
import { Mail, Github, Phone, Linkedin, ExternalLink } from 'lucide-react'

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
      className="w-full bg-dark-lighter border-b border-dark-lighter px-8 py-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-4">
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
                className={`p-2 rounded-lg bg-dark ${contact.color} group-hover:bg-primary/20 transition-colors relative overflow-hidden`}
                whileHover={{ 
                  rotate: 360,
                  scale: 1.1,
                }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <contact.icon size={18} className="relative z-10" />
              </motion.div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">
                  {contact.label}
                </div>
                <div className={`text-sm font-medium ${contact.color} group-hover:text-primary transition-colors flex items-center gap-1`}>
                  {contact.value}
                  {contact.href.startsWith('http') && (
                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

