'use client'

import { motion } from 'framer-motion'
import { Clock, Code2, Rocket, Star } from 'lucide-react'
import React, { useMemo } from 'react'
import Link from 'next/link'
import ContactBar from '@/components/ContactBar'
import Breadcrumbs from '@/components/Breadcrumbs'
import { useLanguage } from '@/contexts/LanguageContext'
import { getComingSoonProjects } from '../projects/projectsData'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
}

export default function ComingSoonPage() {
  const { t } = useLanguage()
  const comingSoonProjects = useMemo(() => getComingSoonProjects(t), [t])

  return (
    <div className="min-h-screen w-full flex flex-col bg-black overflow-x-hidden metallic-overlay relative">
      {/* Animated background effects */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 30%, rgba(168, 85, 247, 0.03) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.03) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.05) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 30%, rgba(168, 85, 247, 0.03) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ willChange: 'background' }}
      />
      
      {/* Floating particles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-purple-500/15 rounded-full"
          initial={{
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%',
            opacity: 0,
          }}
          animate={{
            y: [null, '-80px', '80px'],
            x: [null, Math.random() * 40 - 20 + 'px'],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: 8 + i * 3,
            repeat: Infinity,
            delay: i * 0.5,
            ease: 'easeInOut',
          }}
          style={{ willChange: 'transform' }}
        />
      ))}
      
      <div className="relative z-10">
        <ContactBar />
      </div>
      
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 py-6 md:py-12 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Breadcrumbs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6"
          >
            <Breadcrumbs />
          </motion.div>

          {/* Header */}
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <motion.div
                  className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/10 border border-purple-500/20 relative overflow-hidden"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 200, 
                    damping: 15,
                    delay: 0.2 
                  }}
                  whileHover={{ 
                    rotate: 360, 
                    scale: 1.15,
                    boxShadow: '0 0 30px rgba(168, 85, 247, 0.5)'
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-transparent to-purple-500/20"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                  <Clock className="text-purple-400 relative z-10" size={28} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.h1 
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1 tracking-tight"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {t('projects.comingSoon.title')} <motion.span 
                      className="text-purple-400 inline-block"
                      animate={{
                        textShadow: [
                          '0 0 10px rgba(168, 85, 247, 0.5)',
                          '0 0 20px rgba(168, 85, 247, 0.8)',
                          '0 0 10px rgba(168, 85, 247, 0.5)',
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      {t('projects.comingSoon.subtitle')}
                    </motion.span>
                  </motion.h1>
                  <motion.p 
                    className="text-gray-400 text-sm sm:text-base md:text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Proyectos en desarrollo activo que estarán disponibles próximamente
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Coming Soon Projects Grid */}
          {comingSoonProjects && comingSoonProjects.length > 0 ? (
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            >
              {comingSoonProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={cardVariants}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    delay: 0.3 + index * 0.15,
                    type: 'spring',
                    stiffness: 120,
                    damping: 18
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    transition: { 
                      type: 'spring',
                      stiffness: 300,
                      damping: 20
                    },
                  }}
                  className="group relative bg-gradient-to-br from-black/90 via-black/70 to-black/90 backdrop-blur-md rounded-2xl p-6 md:p-8 border-2 border-purple-500/30 hover:border-purple-500/60 transition-all duration-500 overflow-hidden perspective-1000 brushed-metal shadow-2xl"
                  style={{
                    boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.05), 0 12px 40px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(168, 85, 247, 0.2), 0 0 30px rgba(168, 85, 247, 0.1)',
                    transformStyle: 'preserve-3d',
                    willChange: 'transform',
                  }}
                >
                  {/* Animated Gradient Background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-15 transition-opacity duration-500`}
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      ease: 'linear',
                    }}
                  />

                  {/* Pulsing Border Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none"
                    style={{
                      background: `linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.4), transparent)`,
                      backgroundSize: '200% 100%',
                    }}
                    animate={{
                      backgroundPosition: ['200% 0', '-200% 0'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />

                  {/* Coming Soon Badge */}
                  <div className="flex items-start justify-between mb-4">
                    <motion.div
                      initial={{ rotate: -180, scale: 0, y: -20 }}
                      animate={{ rotate: 0, scale: 1, y: 0 }}
                      transition={{
                        delay: 0.4 + index * 0.15,
                        type: 'spring',
                        stiffness: 300,
                        damping: 20,
                      }}
                      whileHover={{ 
                        rotate: 360,
                        scale: 1.2,
                        y: -5,
                        transition: { duration: 0.6 }
                      }}
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center relative z-10 shadow-lg group/icon`}
                    >
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${project.color} rounded-xl opacity-0 group-hover/icon:opacity-100 blur-md transition-opacity duration-300`}
                      />
                      <project.icon className="text-white relative z-10" size={22} />
                    </motion.div>
                    <motion.span
                      initial={{ opacity: 0, scale: 0, rotate: -180 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ 
                        delay: 0.45 + index * 0.15,
                        type: 'spring',
                        stiffness: 300
                      }}
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      className="px-3 py-1.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold border border-purple-500/40 relative overflow-hidden group/badge"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-transparent to-purple-500/30 opacity-0 group-hover/badge:opacity-100"
                        animate={{
                          x: ['-100%', '100%'],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      />
                      <motion.span
                        animate={{
                          textShadow: [
                            '0 0 0px rgba(168, 85, 247, 0)',
                            '0 0 8px rgba(168, 85, 247, 0.8)',
                            '0 0 0px rgba(168, 85, 247, 0)',
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        className="relative z-10 flex items-center gap-1.5"
                      >
                        <Clock size={12} />
                        {t('projects.comingSoon.title')}
                      </motion.span>
                    </motion.span>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <Link href={`/projects/${(project as any).slug || project.id}`}>
                      <motion.h3 
                        className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors cursor-pointer hover:underline"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          delay: 0.5 + index * 0.15,
                          type: 'spring',
                          stiffness: 200,
                          damping: 20
                        }}
                        whileHover={{ 
                          x: 6,
                          scale: 1.02,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <motion.span
                          className="inline-block"
                          animate={{
                            textShadow: [
                              '0 0 0px rgba(168, 85, 247, 0)',
                              '0 0 10px rgba(168, 85, 247, 0.5)',
                              '0 0 0px rgba(168, 85, 247, 0)',
                            ],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        >
                          {t(project.titleKey)}
                        </motion.span>
                      </motion.h3>
                    </Link>
                    <motion.p 
                      className="text-gray-400 mb-4 text-sm leading-relaxed"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        delay: 0.6 + index * 0.15,
                        type: 'spring',
                        stiffness: 100
                      }}
                    >
                      {t(project.descriptionKey)}
                    </motion.p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{
                            delay: 0.7 + index * 0.15 + techIndex * 0.06,
                            type: 'spring',
                            stiffness: 300,
                            damping: 20,
                          }}
                          whileHover={{ 
                            scale: 1.15, 
                            y: -3,
                            backgroundColor: 'rgba(168, 85, 247, 0.1)',
                            borderColor: 'rgba(168, 85, 247, 0.5)',
                            color: '#c084fc',
                            transition: { duration: 0.2 }
                          }}
                          className="px-3 py-1.5 bg-black/60 backdrop-blur-sm text-gray-300 text-xs rounded-full border border-purple-500/20 font-medium cursor-pointer transition-all duration-300 relative overflow-hidden group/tech"
                          style={{
                            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 2px 8px rgba(0, 0, 0, 0.3)',
                          }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-purple-500/10 opacity-0 group-hover/tech:opacity-100"
                            animate={{
                              x: ['-100%', '100%'],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: 'linear',
                            }}
                          />
                          <span className="relative z-10">{tech}</span>
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-gray-400 text-lg mb-2">No hay proyectos próximamente</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

