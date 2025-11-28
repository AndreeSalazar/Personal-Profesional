'use client'

import { motion } from 'framer-motion'
import { Github, ExternalLink, Star, Code2, Rocket, Award, ArrowLeft, Filter, Search } from 'lucide-react'
import { useState } from 'react'
import ContactBar from '@/components/ContactBar'
import Breadcrumbs from '@/components/Breadcrumbs'
import { useLanguage } from '@/contexts/LanguageContext'

const getAchievements = (t: (key: string) => string) => [
  {
    id: 1,
    titleKey: 'projects.vulkan.title',
    descriptionKey: 'projects.vulkan.description',
    tech: ['C++', 'Vulkan API', 'GLSL', 'CMake'],
    link: 'https://github.com/AndreeSalazar/Motor-de-Render-Minimalista',
    icon: Rocket,
    color: 'from-blue-500 to-cyan-500',
    featured: true,
  },
  {
    id: 2,
    titleKey: 'projects.omegaWeb.title',
    descriptionKey: 'projects.omegaWeb.description',
    tech: ['Angular', 'TypeScript', 'RxJS', 'CSS3'],
    link: 'https://andreesalazar.github.io/Omega-Visual-Web/',
    icon: Code2,
    color: 'from-purple-500 to-pink-500',
    featured: true,
    isWeb: true,
  },
  {
    id: 3,
    titleKey: 'projects.codermind.title',
    descriptionKey: 'projects.codermind.description',
    tech: ['Python', 'PyQt', 'Node System'],
    link: 'https://github.com/AndreeSalazar/Omega-Visual-Semantic-Node-Based-Code-Editor',
    icon: Code2,
    color: 'from-orange-500 to-red-500',
    isBase: true,
    highlightKeys: [
      'projects.codermind.highlight1',
      'projects.codermind.highlight2',
      'projects.codermind.highlight3',
    ],
  },
  {
    id: 4,
    titleKey: 'projects.ultraOmega.title',
    descriptionKey: 'projects.ultraOmega.description',
    tech: ['Rust', 'EGUI', 'wgpu', t('projects.tech.multiplataforma')],
    link: 'https://github.com/AndreeSalazar/Omega-Visual-Semantic-Node-Based-Code-Editor',
    icon: Star,
    color: 'from-amber-500 to-yellow-500',
    featured: true,
    highlightKeys: [
      'projects.ultraOmega.highlight1',
      'projects.ultraOmega.highlight2',
      'projects.ultraOmega.highlight3',
      'projects.ultraOmega.highlight4',
      'projects.ultraOmega.highlight5',
    ],
  },
  {
    id: 5,
    titleKey: 'projects.omegaDesktop.title',
    descriptionKey: 'projects.omegaDesktop.description',
    tech: ['Python', 'C++', 'Vulkan', 'Qt'],
    link: 'https://github.com/AndreeSalazar/Omega-Visual-Semantic-Node-Based-Code-Editor',
    icon: Code2,
    color: 'from-gray-500 to-slate-500',
    isLegacy: true,
    highlightKeys: [
      'projects.omegaDesktop.highlight1',
      'projects.omegaDesktop.highlight2',
      'projects.omegaDesktop.highlight3',
    ],
  },
  {
    id: 6,
    titleKey: 'projects.portfolio.title',
    descriptionKey: 'projects.portfolio.description',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    link: 'https://github.com/AndreeSalazar/Web-Portfolio-Personal-1',
    icon: Award,
    color: 'from-green-500 to-emerald-500',
  },
]

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

export default function ProjectsPage() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterTech, setFilterTech] = useState<string | null>(null)

  const achievements = getAchievements(t)

  // Get all techs (already includes translated "Multiplataforma")
  const allTechs = Array.from(new Set(achievements.flatMap((a) => a.tech)))

  const filteredProjects = achievements.filter((project) => {
    const title = t(project.titleKey)
    const description = t(project.descriptionKey)
    const matchesSearch =
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTech = !filterTech || project.tech.includes(filterTech)
    return matchesSearch && matchesTech
  })

  return (
    <div className="min-h-screen w-full flex flex-col bg-black overflow-x-hidden metallic-overlay relative">
      {/* Animated background effects */}
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
      />
      
      {/* Floating particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary/20 rounded-full"
          initial={{
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%',
            opacity: 0,
          }}
          animate={{
            y: [null, '-100px', '100px'],
            x: [null, Math.random() * 50 - 25 + 'px'],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: 'easeInOut',
          }}
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
                      { labelKey: 'projects.statsProjects', value: '6+', icon: Rocket, color: 'from-blue-500 to-cyan-500' },
                      { labelKey: 'projects.statsLanguages', value: '8+', icon: Code2, color: 'from-purple-500 to-pink-500' },
                      { labelKey: 'projects.statsTechnologies', value: '15+', icon: Star, color: 'from-yellow-500 to-orange-500' },
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
            <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('projects.search')}
                  className="w-full pl-9 md:pl-10 pr-4 py-2 md:py-2.5 bg-dark-lighter border border-dark-lighter rounded-lg text-sm md:text-base text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Filter size={16} className="text-gray-400 hidden sm:block" />
                <button
                  onClick={() => setFilterTech(null)}
                  className={`px-2.5 md:px-3 py-1.5 rounded-lg text-xs md:text-sm transition-colors ${
                    filterTech === null
                      ? 'bg-primary text-white'
                      : 'bg-dark-lighter text-gray-300 hover:bg-dark-lighter/80'
                  }`}
                >
                  {t('projects.all')}
                </button>
                {allTechs.map((tech) => (
                  <button
                    key={tech}
                    onClick={() => setFilterTech(filterTech === tech ? null : tech)}
                    className={`px-2.5 md:px-3 py-1.5 rounded-lg text-xs md:text-sm transition-colors ${
                      filterTech === tech
                        ? 'bg-primary text-white'
                        : 'bg-dark-lighter text-gray-300 hover:bg-dark-lighter/80'
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
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
                  delay: index * 0.15,
                  type: 'spring',
                  stiffness: 100,
                  damping: 15
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
                className="group relative bg-black/60 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/10 hover:border-primary/50 transition-all duration-500 overflow-hidden perspective-1000 brushed-metal"
                style={{
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 8px 32px rgba(0, 0, 0, 0.4)',
                  transformStyle: 'preserve-3d',
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

                {/* Floating particles effect */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-primary/30 rounded-full opacity-0 group-hover:opacity-100"
                    initial={{
                      x: Math.random() * 100 + '%',
                      y: Math.random() * 100 + '%',
                    }}
                    animate={{
                      y: [null, '-20px', '20px'],
                      x: [null, Math.random() * 20 - 10 + 'px'],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: 'easeInOut',
                    }}
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
                  <motion.h3 
                    className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors"
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

                  {/* Links */}
                  <motion.div 
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
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
                    {achievement.isWeb && achievement.link.includes('github.io') && (
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

