'use client'

import { motion } from 'framer-motion'
import { Github, ExternalLink, Star, Code2, Rocket, Award, ArrowLeft, Filter, Search } from 'lucide-react'
import React, { useState, useMemo, useCallback } from 'react'
import Link from 'next/link'
import ContactBar from '@/components/ContactBar'
import Breadcrumbs from '@/components/Breadcrumbs'
import { useLanguage } from '@/contexts/LanguageContext'
import { getAllAchievements } from './projectsData'

const getAchievements = getAllAchievements

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

// Optimized animation variants - moved outside component to avoid recreation

export default function ProjectsPage() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterTech, setFilterTech] = useState<string | null>(null)

  // Memoize achievements to avoid recalculation
  const achievements = useMemo(() => getAchievements(t), [t])

  // Classify technologies by proficiency level
  const techLevels = useMemo(() => {
    const allTechs = Array.from(new Set(achievements.flatMap((a) => a.tech)))
    
    // Classification based on usage and proficiency
    const highTechs = [
      'C++', 'Vulkan API', 'TypeScript', 'Python', 'JavaScript', 
      'Angular', 'HTML5', 'CSS3', 'Rust', 'ASM (NASM)', 'C'
    ]
    const mediumTechs = [
      'GLSL', 'CMake', 'Qt', 'PyQt', 'RxJS', 'EGUI', 'wgpu', 'Vulkan'
    ]
    const lowTechs = [
      'Vector Math', '2D/3D', t('projects.tech.multiplataforma'), 
      'Node System', '64-bit'
    ]
    
    return {
      high: allTechs.filter(tech => highTechs.includes(tech)),
      medium: allTechs.filter(tech => mediumTechs.includes(tech)),
      low: allTechs.filter(tech => lowTechs.includes(tech) || !highTechs.includes(tech) && !mediumTechs.includes(tech))
    }
  }, [achievements, t])

  // Memoize filtered projects - Sort featured first
  const filteredProjects = useMemo(() => {
    const filtered = achievements.filter((project) => {
      const title = t(project.titleKey)
      const description = t(project.descriptionKey)
      const matchesSearch =
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesTech = !filterTech || project.tech.includes(filterTech)
      return matchesSearch && matchesTech
    })
    // Sort: featured projects first, then by id
    return filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return a.id - b.id
    })
  }, [achievements, searchQuery, filterTech, t])

  // Memoize callbacks
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }, [])

  const handleTechFilter = useCallback((tech: string | null) => {
    setFilterTech((current) => current === tech ? null : tech)
  }, [])

  return (
    <div className="min-h-screen w-full flex flex-col bg-black overflow-x-hidden metallic-overlay relative">
      {/* Animated background effects - Optimized */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 30%, rgba(255, 107, 53, 0.03) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 70%, rgba(255, 107, 53, 0.03) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(255, 107, 53, 0.05) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 30%, rgba(255, 107, 53, 0.03) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ willChange: 'background' }}
      />
      
      {/* Floating particles - Optimized: Reduced from 5 to 3 for better performance */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-primary/15 rounded-full"
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
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <motion.div
                  className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 relative overflow-hidden"
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
                    boxShadow: '0 0 30px rgba(255, 107, 53, 0.5)'
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                  <Rocket className="text-primary relative z-10" size={28} />
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
                    {t('projects.title').split(' ')[0]} <motion.span 
                      className="text-primary inline-block"
                      animate={{
                        textShadow: [
                          '0 0 10px rgba(255, 107, 53, 0.5)',
                          '0 0 20px rgba(255, 107, 53, 0.8)',
                          '0 0 10px rgba(255, 107, 53, 0.5)',
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      {t('projects.title').split(' ').slice(1).join(' ')}
                    </motion.span>
                  </motion.h1>
                  <motion.p 
                    className="text-gray-400 text-sm sm:text-base md:text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {t('projects.subtitle')}
                  </motion.p>
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: 0.3,
                  type: 'spring',
                  stiffness: 100,
                  damping: 15
                }}
                whileHover={{ 
                  scale: 1.02,
                  y: -4,
                  transition: { duration: 0.3 }
                }}
                className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-6 mb-4 md:mb-6 relative overflow-hidden group brushed-metal"
                style={{
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 8px 32px rgba(0, 0, 0, 0.4)',
                }}
              >
                {/* Animated background pattern */}
                <motion.div
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                  animate={{
                    x: [0, 60, 0],
                    y: [0, 60, 0],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                
                {/* Glowing border effect */}
                <motion.div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(90deg, transparent, rgba(255, 107, 53, 0.3), transparent)`,
                    backgroundSize: '200% 100%',
                  }}
                  animate={{
                    backgroundPosition: ['200% 0', '-200% 0'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                
                <div className="relative z-10">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-primary/20 mt-1">
                      <Code2 className="text-primary" size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2">
                        {t('projects.statsDescription')}
                      </h3>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        {t('projects.statsText')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-4 border-t border-primary/20">
                    {[
                      { labelKey: 'projects.statsProjects', value: '8+', icon: Rocket, color: 'from-blue-500 to-cyan-500' },
                      { labelKey: 'projects.statsLanguages', value: '10+', icon: Code2, color: 'from-purple-500 to-pink-500' },
                      { labelKey: 'projects.statsTechnologies', value: '20+', icon: Star, color: 'from-yellow-500 to-orange-500' },
                      { labelKey: 'projects.statsYear', value: '2024', icon: Award, color: 'from-green-500 to-emerald-500' },
                    ].map((stat, idx) => {
                      const Icon = stat.icon
                      return (
                        <motion.div
                          key={stat.labelKey}
                          initial={{ opacity: 0, scale: 0, rotate: -180 }}
                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                          transition={{ 
                            delay: 0.6 + idx * 0.15,
                            type: 'spring',
                            stiffness: 200,
                            damping: 15
                          }}
                          whileHover={{ 
                            scale: 1.15, 
                            y: -5,
                            rotate: 5,
                            transition: { duration: 0.2 }
                          }}
                          className="text-center relative group/stat"
                        >
                          <motion.div
                            className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover/stat:opacity-20 rounded-lg blur-xl transition-opacity duration-300`}
                          />
                          <motion.div
                            className="relative z-10"
                            whileHover={{ scale: 1.1 }}
                          >
                            <motion.div
                              className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}
                              animate={{
                                scale: [1, 1.1, 1],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: idx * 0.3,
                                ease: 'easeInOut',
                              }}
                            >
                              {stat.value}
                            </motion.div>
                            <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                              {t(stat.labelKey)}
                            </div>
                          </motion.div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Search and Filter */}
            <div className="mb-4 md:mb-6 space-y-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder={t('projects.search')}
                  className="w-full pl-9 md:pl-10 pr-4 py-2 md:py-2.5 bg-dark-lighter border border-dark-lighter rounded-lg text-sm md:text-base text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              
              {/* Triangular Filter Layout */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-4 md:p-6 relative overflow-hidden brushed-metal"
                style={{
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 8px 32px rgba(0, 0, 0, 0.4)',
                }}
              >
                {/* Animated background pattern */}
                <motion.div
                  className="absolute inset-0 opacity-[0.02]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                  animate={{
                    x: [0, 60, 0],
                    y: [0, 60, 0],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <Filter size={18} className="text-primary" />
                    <h3 className="text-lg font-bold text-white">Filtros por Nivel</h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-primary/30 via-primary/10 to-transparent" />
                  </div>
                  
                  {/* All Button */}
                  <div className="flex justify-center mb-6">
                    <motion.button
                      onClick={() => setFilterTech(null)}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all relative overflow-hidden ${
                        filterTech === null
                          ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg shadow-primary/50'
                          : 'bg-dark-lighter text-gray-300 hover:bg-dark-lighter/80 border border-white/10'
                      }`}
                    >
                      {filterTech === null && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-primary/50 via-transparent to-primary/50"
                          animate={{
                            x: ['-100%', '100%'],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                        />
                      )}
                      <span className="relative z-10">{t('projects.all')}</span>
                    </motion.button>
                  </div>
                  
                  {/* Triangular Layout */}
                  <div className="flex flex-col items-center gap-4">
                    {/* High Level - Top (Triangle Peak) */}
                    {techLevels.high.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="w-full"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
                          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/30">
                            High
                          </span>
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
                        </div>
                        <div className="flex flex-wrap justify-center gap-2">
                          {techLevels.high.map((tech, idx) => (
                            <motion.button
                              key={tech}
                              onClick={() => handleTechFilter(tech)}
                              initial={{ opacity: 0, scale: 0, y: -10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              transition={{ delay: 0.4 + idx * 0.05, type: 'spring', stiffness: 300 }}
                              whileHover={{ scale: 1.1, y: -3 }}
                              whileTap={{ scale: 0.95 }}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all relative overflow-hidden group ${
                                filterTech === tech
                                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/50'
                                  : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/20'
                              }`}
                            >
                              {filterTech === tech && (
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-r from-emerald-400/50 via-transparent to-emerald-400/50"
                                  animate={{
                                    x: ['-100%', '100%'],
                                  }}
                                  transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: 'linear',
                                  }}
                                />
                              )}
                              <span className="relative z-10">{tech}</span>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                    
                    {/* Medium Level - Middle */}
                    {techLevels.medium.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="w-full"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
                          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider px-3 py-1 bg-amber-500/10 rounded-full border border-amber-500/30">
                            Medium
                          </span>
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
                        </div>
                        <div className="flex flex-wrap justify-center gap-2">
                          {techLevels.medium.map((tech, idx) => (
                            <motion.button
                              key={tech}
                              onClick={() => handleTechFilter(tech)}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.6 + idx * 0.05, type: 'spring', stiffness: 300 }}
                              whileHover={{ scale: 1.1, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all relative overflow-hidden group ${
                                filterTech === tech
                                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/50'
                                  : 'bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20'
                              }`}
                            >
                              {filterTech === tech && (
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-r from-amber-400/50 via-transparent to-amber-400/50"
                                  animate={{
                                    x: ['-100%', '100%'],
                                  }}
                                  transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: 'linear',
                                  }}
                                />
                              )}
                              <span className="relative z-10">{tech}</span>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                    
                    {/* Low Level - Bottom (Triangle Base) */}
                    {techLevels.low.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="w-full"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                          <span className="text-xs font-bold text-blue-400 uppercase tracking-wider px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/30">
                            Low
                          </span>
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                        </div>
                        <div className="flex flex-wrap justify-center gap-2">
                          {techLevels.low.map((tech, idx) => (
                            <motion.button
                              key={tech}
                              onClick={() => handleTechFilter(tech)}
                              initial={{ opacity: 0, scale: 0, y: 10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              transition={{ delay: 0.8 + idx * 0.05, type: 'spring', stiffness: 300 }}
                              whileHover={{ scale: 1.1, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all relative overflow-hidden group ${
                                filterTech === tech
                                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/50'
                                  : 'bg-blue-500/10 text-blue-300 border border-blue-500/30 hover:bg-blue-500/20'
                              }`}
                            >
                              {filterTech === tech && (
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-r from-blue-400/50 via-transparent to-blue-400/50"
                                  animate={{
                                    x: ['-100%', '100%'],
                                  }}
                                  transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: 'linear',
                                  }}
                                />
                              )}
                              <span className="relative z-10">{tech}</span>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
            >
              {filteredProjects.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                variants={cardVariants}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ 
                  delay: Math.min(index * 0.08, 0.4), // Reduced delay for faster initial render
                  type: 'spring',
                  stiffness: 120,
                  damping: 18
                }}
                whileHover={{
                  y: -12,
                  scale: 1.03,
                  rotateY: 2,
                  transition: { 
                    type: 'spring',
                    stiffness: 300,
                    damping: 20
                  },
                }}
                className="group relative bg-gradient-to-br from-black/90 via-black/70 to-black/90 backdrop-blur-md rounded-2xl p-6 md:p-8 border-2 border-white/10 hover:border-primary/60 transition-all duration-500 overflow-hidden perspective-1000 brushed-metal shadow-2xl"
                style={{
                  boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.05), 0 12px 40px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 107, 53, 0.15), 0 0 30px rgba(255, 107, 53, 0.1)',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                }}
              >
                {/* Animated Gradient Background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
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

                {/* Animated Border Glow */}
                <motion.div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none"
                  style={{
                    background: `linear-gradient(90deg, transparent, rgba(255, 107, 53, 0.6), transparent)`,
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

                {/* Shimmer Effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                  style={{
                    background: `linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)`,
                    backgroundSize: '200% 200%',
                  }}
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />

                {/* Floating particles effect - Optimized: Only show on hover, reduced count */}
                {[...Array(2)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-primary/25 rounded-full opacity-0 group-hover:opacity-100"
                    initial={{
                      x: Math.random() * 100 + '%',
                      y: Math.random() * 100 + '%',
                    }}
                    animate={{
                      y: [null, '-15px', '15px'],
                      x: [null, Math.random() * 15 - 7.5 + 'px'],
                      opacity: [0, 0.8, 0],
                    }}
                    transition={{
                      duration: 4 + i * 1.5,
                      repeat: Infinity,
                      delay: i * 0.6,
                      ease: 'easeInOut',
                    }}
                    style={{ willChange: 'transform' }}
                  />
                ))}

                {/* Badge and Icon */}
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    initial={{ rotate: -180, scale: 0, y: -20 }}
                    animate={{ rotate: 0, scale: 1, y: 0 }}
                    transition={{
                      delay: index * 0.1 + 0.2,
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
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${achievement.color} flex items-center justify-center relative z-10 shadow-lg group/icon`}
                  >
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${achievement.color} rounded-xl opacity-0 group-hover/icon:opacity-100 blur-md transition-opacity duration-300`}
                    />
                    <achievement.icon className="text-white relative z-10" size={22} />
                  </motion.div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {achievement.featured && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0, rotate: -180 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ 
                          delay: index * 0.1 + 0.25,
                          type: 'spring',
                          stiffness: 300
                        }}
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        className="px-3 py-1.5 rounded-full bg-primary/20 text-primary text-xs font-semibold border border-primary/30 relative overflow-hidden group/badge"
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-primary/30 via-transparent to-primary/30 opacity-0 group-hover/badge:opacity-100"
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
                              '0 0 0px rgba(255, 107, 53, 0)',
                              '0 0 8px rgba(255, 107, 53, 0.8)',
                              '0 0 0px rgba(255, 107, 53, 0)',
                            ],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                          className="relative z-10"
                        >
                          {t('projects.featured')}
                        </motion.span>
                      </motion.span>
                    )}
                    {achievement.isWeb && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0, rotate: -180 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ 
                          delay: index * 0.1 + 0.3,
                          type: 'spring',
                          stiffness: 300
                        }}
                        whileHover={{ scale: 1.15, rotate: -5 }}
                        className="px-3 py-1.5 rounded-full bg-green-500/20 text-green-400 text-xs font-semibold border border-green-500/30 relative overflow-hidden group/badge"
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-green-500/30 via-transparent to-green-500/30 opacity-0 group-hover/badge:opacity-100"
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
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                          className="relative z-10"
                        >
                          {t('projects.web')}
                        </motion.span>
                      </motion.span>
                    )}
                    {achievement.isLegacy && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          delay: index * 0.1 + 0.25,
                          type: 'spring',
                          stiffness: 200
                        }}
                        whileHover={{ scale: 1.1 }}
                        className="px-3 py-1.5 rounded-full bg-gray-500/20 text-gray-400 text-xs font-semibold border border-gray-500/30"
                      >
                        {t('projects.legacy')}
                      </motion.span>
                    )}
                    {achievement.isBase && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0, rotate: -180 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ 
                          delay: index * 0.1 + 0.25,
                          type: 'spring',
                          stiffness: 300
                        }}
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        className="px-3 py-1.5 rounded-full bg-orange-500/20 text-orange-400 text-xs font-semibold border border-orange-500/30 relative overflow-hidden group/badge"
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-orange-500/30 via-transparent to-orange-500/30 opacity-0 group-hover/badge:opacity-100"
                          animate={{
                            x: ['-100%', '100%'],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                        />
                        <span className="relative z-10">{t('projects.experimental')}</span>
                      </motion.span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <Link href={`/projects/${(achievement as any).slug || achievement.id}`}>
                    <motion.h3 
                      className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors cursor-pointer hover:underline"
                      initial={{ opacity: 0, x: -20, rotateX: -90 }}
                      animate={{ opacity: 1, x: 0, rotateX: 0 }}
                      transition={{ 
                        delay: index * 0.1 + 0.3,
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
                            '0 0 0px rgba(255, 107, 53, 0)',
                            '0 0 10px rgba(255, 107, 53, 0.5)',
                            '0 0 0px rgba(255, 107, 53, 0)',
                          ],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      >
                        {t(achievement.titleKey)}
                      </motion.span>
                    </motion.h3>
                  </Link>
                  <motion.p 
                    className="text-gray-400 mb-4 text-sm leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: index * 0.1 + 0.4,
                      type: 'spring',
                      stiffness: 100
                    }}
                    whileHover={{ 
                      color: '#e5e7eb',
                      transition: { duration: 0.2 }
                    }}
                  >
                    {t(achievement.descriptionKey)}
                  </motion.p>

                  {/* Highlights for projects with highlights */}
                  {achievement.highlightKeys && (
                    <motion.div 
                      className="mb-4 p-4 bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 relative overflow-hidden group/highlights brushed-metal"
                    style={{
                      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 4px 16px rgba(0, 0, 0, 0.3)',
                    }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                      whileHover={{ scale: 1.02, borderColor: 'rgba(255, 107, 53, 0.3)' }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover/highlights:opacity-100"
                        animate={{
                          x: ['-100%', '100%'],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      />
                      <div className="text-xs text-gray-400 mb-3 font-semibold uppercase tracking-wider relative z-10">
                        {t('projects.features')}
                      </div>
                      <div className="flex flex-wrap gap-2 relative z-10">
                        {achievement.highlightKeys.map((highlightKey, highlightIndex) => {
                          const isUltraOmega = achievement.titleKey === 'projects.ultraOmega.title'
                          const isBase = achievement.isBase
                          const isLegacy = achievement.isLegacy
                          
                          let colorClass = 'bg-gray-500/10 text-gray-400 border-gray-500/30'
                          if (isUltraOmega) {
                            colorClass = 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          } else if (isBase) {
                            colorClass = 'bg-orange-500/10 text-orange-400 border-orange-500/30'
                          } else if (isLegacy) {
                            colorClass = 'bg-gray-500/10 text-gray-400 border-gray-500/30'
                          }
                          
                          return (
                            <motion.span
                              key={highlightKey}
                              initial={{ opacity: 0, scale: 0, rotate: -180 }}
                              animate={{ opacity: 1, scale: 1, rotate: 0 }}
                              transition={{
                                delay: 0.5 + index * 0.1 + highlightIndex * 0.08,
                                type: 'spring',
                                stiffness: 300,
                                damping: 20,
                              }}
                              whileHover={{ 
                                scale: 1.15, 
                                y: -3,
                                rotate: 5,
                                transition: { duration: 0.2 }
                              }}
                              className={`px-3 py-1.5 text-xs rounded-full border font-medium ${colorClass} cursor-pointer relative overflow-hidden group/badge`}
                            >
                              <motion.div
                                className={`absolute inset-0 bg-gradient-to-r ${isUltraOmega ? 'from-amber-500/20' : isBase ? 'from-orange-500/20' : 'from-gray-500/20'} to-transparent opacity-0 group-hover/badge:opacity-100`}
                                animate={{
                                  x: ['-100%', '100%'],
                                }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  ease: 'linear',
                                }}
                              />
                              <span className="relative z-10 flex items-center gap-1.5">
                                <motion.span
                                  animate={{
                                    rotate: isUltraOmega ? [0, 360] : [0, 0],
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: 'linear',
                                  }}
                                >
                                  {isUltraOmega ? '→' : '•'}
                                </motion.span>
                                {t(highlightKey)}
                              </span>
                            </motion.span>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {achievement.tech.map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{
                          delay: 0.6 + index * 0.1 + techIndex * 0.06,
                          type: 'spring',
                          stiffness: 300,
                          damping: 20,
                        }}
                        whileHover={{ 
                          scale: 1.15, 
                          y: -3,
                          backgroundColor: 'rgba(255, 107, 53, 0.1)',
                          borderColor: 'rgba(255, 107, 53, 0.5)',
                          color: '#FF6B35',
                          transition: { duration: 0.2 }
                        }}
                        className="px-3 py-1.5 bg-black/60 backdrop-blur-sm text-gray-300 text-xs rounded-full border border-white/10 font-medium cursor-pointer transition-all duration-300 relative overflow-hidden group/tech"
                        style={{
                          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 2px 8px rgba(0, 0, 0, 0.3)',
                        }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 opacity-0 group-hover/tech:opacity-100"
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

                  {/* Demo Image */}
                  {(achievement as any).demoImage && (
                    <motion.div
                      className="mb-4 rounded-lg overflow-hidden border border-white/10 relative group/demo"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.45 }}
                      whileHover={{ scale: 1.02, borderColor: 'rgba(255, 107, 53, 0.5)' }}
                    >
                      <div className="relative">
                        <img
                          src={(achievement as any).demoImage}
                          alt={t(achievement.titleKey)}
                          className="w-full h-auto object-cover"
                          loading="lazy"
                          decoding="async"
                          fetchPriority="low"
                          style={{ willChange: 'auto' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/demo:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover/demo:opacity-100 transition-opacity duration-300">
                          <div className="bg-black/80 backdrop-blur-sm rounded px-2 py-1 text-xs text-white">
                            {t('projects.demoRunning')}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Links */}
                  <motion.div 
                    className="flex items-center gap-3 flex-wrap"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    {achievement.link ? (
                      <motion.a
                        href={achievement.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ 
                          x: 8,
                          scale: 1.05,
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary-dark transition-all text-sm font-medium border border-primary/30 hover:border-primary/50 group/link backdrop-blur-sm"
                        style={{
                          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 4px 12px rgba(255, 107, 53, 0.2)',
                        }}
                      >
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          {achievement.isWeb ? (
                            <ExternalLink size={16} />
                          ) : (
                            <Github size={16} />
                          )}
                        </motion.div>
                        <span>{achievement.isWeb ? t('projects.viewApp') : t('projects.viewGitHub')}</span>
                        <motion.div
                          animate={{ x: [0, 4, 0] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        >
                          <ExternalLink size={12} />
                        </motion.div>
                      </motion.a>
                    ) : (
                      <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-500/10 text-gray-400 text-sm font-medium border border-gray-500/30 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <Code2 size={16} />
                        <span>{t('projects.notOnGitHub')}</span>
                      </motion.div>
                    )}
                    {achievement.isWeb && achievement.link && achievement.link.includes('github.io') && (
                      <motion.a
                        href={`https://github.com/AndreeSalazar/${t(achievement.titleKey).toLowerCase().replace(/\s+/g, '-')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ 
                          x: 5,
                          scale: 1.05,
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-black/60 hover:bg-black/80 text-gray-400 hover:text-gray-300 transition-all text-sm border border-white/10 hover:border-primary/30 backdrop-blur-sm"
                        style={{
                          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 2px 8px rgba(0, 0, 0, 0.3)',
                        }}
                      >
                        <Github size={14} />
                        {t('projects.code')}
                      </motion.a>
                    )}
                  </motion.div>
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
              <p className="text-gray-400 text-lg mb-2">{t('projects.noResults')}</p>
              <p className="text-gray-500 text-sm">{t('projects.noResultsDesc')}</p>
            </motion.div>
          )}
        </motion.div>

      </div>
    </div>
  )
}

