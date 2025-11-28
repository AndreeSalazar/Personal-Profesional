'use client'

import { motion } from 'framer-motion'
import { Github, ExternalLink, Star, Code2, Rocket, Award, ArrowLeft, Filter, Search } from 'lucide-react'
import { useState } from 'react'
import ContactBar from '@/components/ContactBar'
import Breadcrumbs from '@/components/Breadcrumbs'

const achievements = [
  {
    id: 1,
    title: 'Vulkan Render Engine',
    description: 'Motor de renderizado minimalista 3D construido con C++ y Vulkan API. Implementación completa del pipeline gráfico con renderizado en tiempo real. Proyecto desarrollado en el último año que demuestra dominio práctico de programación de sistemas de bajo nivel y APIs gráficas avanzadas.',
    tech: ['C++', 'Vulkan API', 'GLSL', 'CMake'],
    link: 'https://github.com/AndreeSalazar/Motor-de-Render-Minimalista',
    icon: Rocket,
    color: 'from-blue-500 to-cyan-500',
    featured: true,
  },
  {
    id: 2,
    title: 'Omega Visual Editor - Web',
    description: 'Aplicación web completa desarrollada en Angular que implementa un editor de código visual basado en nodos. Sistema diseñado para facilitar visualmente el desarrollo de código, permitiendo construir compiladores, kernels y software optimizado a través de nodos visuales. Desde Assembly hasta ejecución, en tiempo real. Desplegado y funcional.',
    tech: ['Angular', 'TypeScript', 'RxJS', 'CSS3'],
    link: 'https://andreesalazar.github.io/Omega-Visual-Web/',
    icon: Code2,
    color: 'from-purple-500 to-pink-500',
    featured: true,
    isWeb: true,
  },
  {
    id: 3,
    title: 'Codermind-Visual',
    description: 'El inicio de todo. Versión muy experimental construida con Python y PyQt. Fue el punto de partida para probar el concepto y lograr que funcionara. Aunque inestable, esta base experimental sirvió como inspiración fundamental para el desarrollo de Omega-Visual y Ultra-Omega, demostrando el proceso iterativo de mejora continua y la evolución desde una idea hasta proyectos funcionales.',
    tech: ['Python', 'PyQt', 'Node System'],
    link: 'https://github.com/AndreeSalazar/Omega-Visual-Semantic-Node-Based-Code-Editor',
    icon: Code2,
    color: 'from-orange-500 to-red-500',
    isBase: true,
    highlights: [
      'Muy experimental',
      'El inicio de todo',
      'Inspiración fundamental',
    ],
  },
  {
    id: 4,
    title: 'Ultra-Omega',
    description: 'Versión avanzada del editor visual construida con Rust + EGUI + wgpu. Diseñada para ser rápida, segura, moderna y multiplataforma. Ideal para manejar 100–1000 nodos con alto rendimiento. Evolución final que mejora significativamente la estabilidad y rendimiento de la versión base.',
    tech: ['Rust', 'EGUI', 'wgpu', 'Multiplataforma'],
    link: 'https://github.com/AndreeSalazar/Omega-Visual-Semantic-Node-Based-Code-Editor',
    icon: Star,
    color: 'from-amber-500 to-yellow-500',
    featured: true,
    highlights: [
      'Rápido',
      'Seguro',
      'Moderno',
      'Multiplataforma',
      'Ideal para 100–1000 nodos',
    ],
  },
  {
    id: 5,
    title: 'Omega Visual Editor - Desktop (C++/Vulkan+Qt)',
    description: 'Intento inicial desarrollado principalmente con Python, pero fue un intento de otra idea que no logré hacer funcionar completamente. Aunque no alcanzó el objetivo esperado, esta experiencia sirvió como inspiración para crear otras versiones (Omega-Visual Web y Ultra-Omega) que demostraron avances significativos y funcionamiento real.',
    tech: ['Python', 'C++', 'Vulkan', 'Qt'],
    link: 'https://github.com/AndreeSalazar/Omega-Visual-Semantic-Node-Based-Code-Editor',
    icon: Code2,
    color: 'from-gray-500 to-slate-500',
    isLegacy: true,
    highlights: [
      'Intento inicial',
      'Inspiración para otras versiones',
      'Demostró avances posteriores',
    ],
  },
  {
    id: 6,
    title: 'Professional Portfolio',
    description: 'Sitio web de portafolio responsivo con animaciones CSS avanzadas, formulario de contacto funcional y rendimiento optimizado. Demuestra habilidades en desarrollo web puro y optimización.',
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
  const [searchQuery, setSearchQuery] = useState('')
  const [filterTech, setFilterTech] = useState<string | null>(null)

  const allTechs = Array.from(new Set(achievements.flatMap((a) => a.tech)))

  const filteredProjects = achievements.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTech = !filterTech || project.tech.includes(filterTech)
    return matchesSearch && matchesTech
  })

  return (
    <div className="h-screen w-screen flex flex-col bg-black overflow-auto metallic-overlay relative">
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
      
      <div className="flex-1 max-w-7xl mx-auto w-full px-8 py-12 relative z-10">
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
                    className="text-5xl font-bold text-white mb-1 tracking-tight"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Mis <motion.span 
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
                      Proyectos
                    </motion.span>
                  </motion.h1>
                  <motion.p 
                    className="text-gray-400 text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Construcciones reales, código funcional, resultados tangibles
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
                className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-6 relative overflow-hidden group brushed-metal"
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
                        Un año, múltiples tecnologías, resultados reales
                      </h3>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        Todos estos proyectos fueron desarrollados en <span className="text-primary font-semibold">un solo año</span>, 
                        demostrando mi capacidad para <span className="text-white font-medium">experimentar y aplicar</span> conocimientos 
                        en múltiples lenguajes y tecnologías. No son conceptos teóricos—cada proyecto es <span className="text-primary font-medium">funcional y está disponible</span> para demostrar competencia práctica 
                        en desarrollo real. Desde motores de renderizado en C++ hasta aplicaciones web en Angular, pasando por experimentos en Python y versiones avanzadas en Rust.
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-4 border-t border-primary/20">
                    {[
                      { label: 'Proyectos', value: '6+', icon: Rocket, color: 'from-blue-500 to-cyan-500' },
                      { label: 'Lenguajes', value: '8+', icon: Code2, color: 'from-purple-500 to-pink-500' },
                      { label: 'Tecnologías', value: '15+', icon: Star, color: 'from-yellow-500 to-orange-500' },
                      { label: 'Año', value: '2024', icon: Award, color: 'from-green-500 to-emerald-500' },
                    ].map((stat, idx) => {
                      const Icon = stat.icon
                      return (
                        <motion.div
                          key={stat.label}
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
                              {stat.label}
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
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar proyectos..."
                  className="w-full pl-10 pr-4 py-2.5 bg-dark-lighter border border-dark-lighter rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Filter size={18} className="text-gray-400" />
                <button
                  onClick={() => setFilterTech(null)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    filterTech === null
                      ? 'bg-primary text-white'
                      : 'bg-dark-lighter text-gray-300 hover:bg-dark-lighter/80'
                  }`}
                >
                  Todos
                </button>
                {allTechs.map((tech) => (
                  <button
                    key={tech}
                    onClick={() => setFilterTech(filterTech === tech ? null : tech)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
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
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
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
                className="group relative bg-black/60 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-primary/50 transition-all duration-500 overflow-hidden perspective-1000 brushed-metal"
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
                          Destacado
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
                          En línea
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
                        Versión inicial
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
                        <span className="relative z-10">Base experimental</span>
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
                      {achievement.title}
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
                    {achievement.description}
                  </motion.p>

                  {/* Highlights for projects with highlights */}
                  {achievement.highlights && (
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
                        Características
                      </div>
                      <div className="flex flex-wrap gap-2 relative z-10">
                        {achievement.highlights.map((highlight, highlightIndex) => {
                          const isUltraOmega = achievement.title === 'Ultra-Omega'
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
                              key={highlight}
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
                                {highlight}
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
                      <span>{achievement.isWeb ? 'Ver aplicación' : 'Ver en GitHub'}</span>
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
                        href={`https://github.com/AndreeSalazar/${achievement.title.toLowerCase().replace(/\s+/g, '-')}`}
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
                        Código
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
              <p className="text-gray-400 text-lg mb-2">No se encontraron proyectos</p>
              <p className="text-gray-500 text-sm">Intenta con otros filtros o términos de búsqueda</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

