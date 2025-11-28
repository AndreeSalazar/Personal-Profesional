'use client'

import { motion } from 'framer-motion'
import { Code, Rocket, Cpu, Zap } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
}

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15,
    },
  },
  hover: {
    scale: 1.2,
    rotate: 360,
    transition: {
      duration: 0.5,
    },
  },
}

export default function ProfileSection() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full bg-dark-light border-b border-dark-lighter p-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={itemVariants}
          className="flex items-start gap-8"
        >
          {/* Avatar/Icon Section */}
          <motion.div
            variants={iconVariants}
            whileHover="hover"
            className="relative"
          >
            <motion.div
              className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center glow-orange relative overflow-hidden"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(255, 107, 53, 0.3)',
                  '0 0 40px rgba(255, 107, 53, 0.6)',
                  '0 0 20px rgba(255, 107, 53, 0.3)',
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/50 to-transparent"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              <Code size={40} className="text-white relative z-10" />
            </motion.div>
            <motion.div
              className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-dark"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.7, 1],
                boxShadow: [
                  '0 0 0px rgba(34, 197, 94, 0.5)',
                  '0 0 15px rgba(34, 197, 94, 0.8)',
                  '0 0 0px rgba(34, 197, 94, 0.5)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>

          {/* Content */}
          <div className="flex-1">
            <motion.h1
              variants={itemVariants}
              className="text-4xl font-bold text-white mb-2"
            >
              Eddi Andreé Salazar Matos
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-xl text-primary mb-4 font-semibold"
            >
              Systems & Full Stack Developer
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-gray-300 mb-6 leading-relaxed max-w-3xl"
            >
              Desarrollador de sistemas y full stack desde Lima, Perú 🇵🇪. 
              Construyo herramientas, motores de renderizado y arquitecturas limpias. 
              Especializado en C++/Rust/ASM para rendimiento y TypeScript/Python para productos.
            </motion.p>

            {/* Skills Tags */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3"
            >
              {[
                { icon: Cpu, label: 'C++', color: 'bg-blue-500/20 text-blue-400' },
                { icon: Zap, label: 'Rust', color: 'bg-orange-500/20 text-orange-400' },
                { icon: Code, label: 'TypeScript', color: 'bg-primary/20 text-primary' },
                { icon: Rocket, label: 'Vulkan', color: 'bg-purple-500/20 text-purple-400' },
              ].map((skill, index) => (
                <motion.div
                  key={skill.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.5 + index * 0.1,
                    type: 'spring',
                    stiffness: 200,
                  }}
                  whileHover={{
                    scale: 1.1,
                    y: -2,
                  }}
                  className={`px-4 py-2 rounded-full ${skill.color} border border-current/20 flex items-center gap-2 cursor-pointer`}
                >
                  <skill.icon size={16} />
                  <span className="text-sm font-medium">{skill.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

