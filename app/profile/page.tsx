'use client'

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { Code, Rocket, Cpu, Zap, Calendar, MapPin, Briefcase, Award, BookOpen, Target, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { useRef, useMemo } from 'react'
import ContactBar from '@/components/ContactBar'
import Breadcrumbs from '@/components/Breadcrumbs'
import TechnologySection from '@/components/TechnologySection'
import { useLanguage } from '@/contexts/LanguageContext'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 15,
      mass: 0.8,
    },
  },
}

const floatingVariants = {
  animate: {
    y: [0, -20, 0],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export default function ProfilePage() {
  const { t } = useLanguage()
  const shouldReduceMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95])
  
  // Optimize particle count based on motion preference
  const particleCount = shouldReduceMotion ? 4 : 8
  const sparkleCount = shouldReduceMotion ? 3 : 6
  
  return (
    <div ref={containerRef} className="min-h-screen w-full flex flex-col bg-black overflow-x-hidden metallic-overlay relative">
      {/* Enhanced Animated background effects */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 30%, rgba(255, 107, 53, 0.05) 0%, transparent 60%)',
            'radial-gradient(circle at 80% 70%, rgba(255, 107, 53, 0.05) 0%, transparent 60%)',
            'radial-gradient(circle at 50% 50%, rgba(255, 107, 53, 0.08) 0%, transparent 60%)',
            'radial-gradient(circle at 30% 80%, rgba(255, 107, 53, 0.05) 0%, transparent 60%)',
            'radial-gradient(circle at 20% 30%, rgba(255, 107, 53, 0.05) 0%, transparent 60%)',
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ willChange: 'background' }}
      />
      
      {/* Optimized floating particles */}
      {useMemo(() => 
        [...Array(particleCount)].map((_, i) => {
          const size = 2 + (i % 3)
          const shadowSize = 5 + (i % 3) * 2
          const startX = (i * 15) % 100
          const startY = (i * 20) % 100
          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: size + 'px',
                height: size + 'px',
                background: `radial-gradient(circle, rgba(255, 107, 53, 0.4), transparent)`,
                boxShadow: `0 0 ${shadowSize}px rgba(255, 107, 53, 0.4)`,
                willChange: shouldReduceMotion ? 'auto' : 'transform',
              }}
              initial={{
                x: startX + '%',
                y: startY + '%',
                opacity: 0,
              }}
              animate={shouldReduceMotion ? {} : {
                y: [null, `-${80 + i * 10}px`, `${80 + i * 10}px`],
                x: [null, `${(i % 2) * 20 - 10}px`, `${(i % 2) * 20 - 10}px`],
                opacity: [0, 0.6, 0],
                scale: [0, 1.2, 0],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                delay: i * 0.5,
                ease: 'easeInOut',
              }}
            />
          )
        }), [particleCount, shouldReduceMotion])
      }
      
      {/* Optimized animated grid pattern */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute inset-0 opacity-[0.02] pointer-events-none z-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 107, 53, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 107, 53, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            willChange: 'background-position',
          }}
          animate={{
            backgroundPosition: ['0 0', '60px 60px'],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}
      
      <div className="relative z-10">
        <ContactBar />
      </div>
      
      <motion.div
        style={{ opacity, scale }}
        className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 md:px-8 py-6 md:py-12 relative z-10"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Breadcrumbs */}
          <motion.div 
            variants={itemVariants} 
            className="mb-6"
          >
            <Breadcrumbs />
          </motion.div>

          {/* Profile Content - Enhanced */}
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 md:gap-8 mb-8 md:mb-12">
            {/* Avatar - Ultra Enhanced */}
            <motion.div
              variants={itemVariants}
              className="relative shrink-0 self-center sm:self-start"
            >
              <motion.div
                variants={floatingVariants}
                animate="animate"
                className="relative"
              >
                <motion.div
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-primary via-primary-dark to-primary flex items-center justify-center relative overflow-hidden shadow-2xl"
                animate={shouldReduceMotion ? {} : {
                  boxShadow: [
                    '0 0 40px rgba(255, 107, 53, 0.5), 0 0 80px rgba(255, 107, 53, 0.3)',
                    '0 0 60px rgba(255, 107, 53, 0.7), 0 0 120px rgba(255, 107, 53, 0.4)',
                    '0 0 40px rgba(255, 107, 53, 0.5), 0 0 80px rgba(255, 107, 53, 0.3)',
                  ],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{ willChange: shouldReduceMotion ? 'auto' : 'box-shadow' }}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: [0, 5, -5, 0],
                    transition: { duration: 0.5 }
                  }}
                >
                  {/* Optimized rotating gradients */}
                  {!shouldReduceMotion && (
                    <>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-primary/60 via-transparent to-primary/30"
                        animate={{ rotate: [0, 360] }}
                        transition={{
                          duration: 25,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                        style={{ willChange: 'transform' }}
                      />
                      <motion.div
                        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_70%)]"
                        animate={{
                          scale: [1, 1.15, 1],
                          opacity: [0.4, 0.7, 0.4],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        style={{ willChange: 'transform, opacity' }}
                      />
                    </>
                  )}
                  {/* Optimized sparkle effects */}
                  {!shouldReduceMotion && useMemo(() => 
                    [...Array(sparkleCount)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute"
                        style={{
                          width: '3px',
                          height: '3px',
                          background: 'white',
                          borderRadius: '50%',
                          left: `${15 + i * 20}%`,
                          top: `${20 + (i % 2) * 60}%`,
                          willChange: 'transform, opacity',
                        }}
                        animate={{
                          opacity: [0, 0.8, 0],
                          scale: [0, 1.2, 0],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          delay: i * 0.4,
                          ease: 'easeInOut',
                        }}
                      />
                    )), [sparkleCount])
                  }
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Code size={40} className="text-white relative z-10 drop-shadow-2xl" />
                  </motion.div>
                </motion.div>
                {/* Enhanced status indicator */}
                <motion.div
                  className="absolute -top-2 -right-2 w-7 h-7 bg-green-500 rounded-full border-3 border-black shadow-xl flex items-center justify-center"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [1, 0.8, 1],
                    boxShadow: [
                      '0 0 0 0 rgba(34, 197, 94, 0.7)',
                      '0 0 0 10px rgba(34, 197, 94, 0)',
                      '0 0 0 0 rgba(34, 197, 94, 0.7)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <motion.div
                    className="w-3 h-3 bg-white rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Info - Ultra Enhanced */}
            <div className="flex-1 w-full text-center sm:text-left">
              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight"
              >
                <motion.span
                  className="inline-block bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{
                    backgroundSize: '200% 100%',
                  }}
                >
                  Eddi Andreé Salazar Matos
                </motion.span>
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-xl sm:text-2xl md:text-3xl text-primary mb-5 md:mb-6 font-bold"
              >
                <motion.span
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
                  {t('profile.fullstackDeveloper')}
                </motion.span>
              </motion.p>
              <motion.p
                variants={itemVariants}
                className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-3xl"
              >
                {t('profile.description')}
              </motion.p>
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-primary/15 via-primary/8 to-transparent border-2 border-primary/30 rounded-2xl p-6 md:p-8 mb-8 shadow-2xl relative overflow-hidden group"
                whileHover={{ 
                  scale: 1.02,
                  borderColor: 'rgba(255, 107, 53, 0.5)',
                  transition: { duration: 0.3 }
                }}
              >
                {/* Animated border glow */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255, 107, 53, 0.4), transparent)',
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
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  style={{
                    background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
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
                <p className="text-base md:text-lg text-gray-200 leading-relaxed relative z-10">
                  {t('profile.approach')}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Technologies Section - Full Width */}
          <motion.div 
            variants={itemVariants} 
            className="mb-8"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <TechnologySection />
          </motion.div>

          {/* Additional Info Sections - Enhanced */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-1 gap-6 md:gap-8 mb-6 md:mb-8"
          >
            {/* Focus Section - Ultra Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              whileHover={{ 
                y: -8,
                scale: 1.01,
                transition: { duration: 0.3 }
              }}
              className="bg-gradient-to-br from-black/80 via-black/60 to-black/80 backdrop-blur-md rounded-3xl p-6 md:p-8 lg:p-10 border-2 border-white/10 hover:border-primary/50 transition-all duration-500 relative overflow-hidden group brushed-metal"
              style={{
                boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.05), 0 12px 48px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 107, 53, 0.1)',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Optimized animated background */}
              {!shouldReduceMotion && (
                <motion.div
                  className="absolute inset-0 opacity-8 pointer-events-none"
                  animate={{
                    background: [
                      'radial-gradient(circle at 0% 0%, rgba(255, 107, 53, 0.12) 0%, transparent 50%)',
                      'radial-gradient(circle at 100% 100%, rgba(255, 107, 53, 0.12) 0%, transparent 50%)',
                      'radial-gradient(circle at 50% 50%, rgba(255, 107, 53, 0.15) 0%, transparent 50%)',
                      'radial-gradient(circle at 0% 0%, rgba(255, 107, 53, 0.12) 0%, transparent 50%)',
                    ],
                  }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{ willChange: 'background' }}
                />
              )}
              
              {/* Optimized animated grid pattern */}
              {!shouldReduceMotion && (
                <motion.div
                  className="absolute inset-0 opacity-[0.02]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M25 25.5V23H0v-2h25v-2H0v-2h25v-2H0V10h25V8H0V6h25V4H0V0h27v25H0v-2h25v2.5zM0 25h2v25H0V25zm5 0h2v25H5V25zm5 0h2v25h-2V25zm5 0h2v25h-2V25zm5 0h2v25h-2V25z'/%3E%3C/g%3E%3C/svg%3E")`,
                    willChange: 'transform',
                  }}
                  animate={{
                    x: [0, 50, 0],
                    y: [0, 50, 0],
                  }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              )}
              
              {/* Enhanced shimmer effect */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                style={{
                  background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.15) 50%, transparent 70%)',
                  backgroundSize: '200% 200%',
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              
              {/* Animated border glow */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255, 107, 53, 0.5), transparent)',
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
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <motion.div
                    className="p-4 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 border-2 border-primary/40 relative overflow-hidden"
                    whileHover={{ rotate: 360, scale: 1.15 }}
                    transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
                  >
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
                    <Target className="text-primary relative z-10" size={28} />
                  </motion.div>
                  <div>
                    <motion.h3
                      className="text-3xl font-bold text-white tracking-tight"
                      animate={{
                        textShadow: [
                          '0 0 10px rgba(255, 107, 53, 0.3)',
                          '0 0 20px rgba(255, 107, 53, 0.5)',
                          '0 0 10px rgba(255, 107, 53, 0.3)',
                        ],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      {t('profile.focusTitle')}
                    </motion.h3>
                    <p className="text-sm md:text-base text-gray-400 mt-1">{t('profile.focusSubtitle')}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { nameKey: 'profile.focusWebApps', icon: '🌐', color: 'from-blue-500/20 to-cyan-500/20', borderColor: 'border-blue-500/30' },
                    { nameKey: 'profile.focusSystems', icon: '⚙️', color: 'from-gray-500/20 to-slate-500/20', borderColor: 'border-gray-500/30' },
                    { nameKey: 'profile.focusGraphics', icon: '🎮', color: 'from-purple-500/20 to-pink-500/20', borderColor: 'border-purple-500/30' },
                    { nameKey: 'profile.focusOptimization', icon: '⚡', color: 'from-yellow-500/20 to-orange-500/20', borderColor: 'border-yellow-500/30' },
                    { nameKey: 'profile.focusArchitecture', icon: '🏗️', color: 'from-emerald-500/20 to-teal-500/20', borderColor: 'border-emerald-500/30' },
                    { nameKey: 'profile.focusLowLevel', icon: '🔧', color: 'from-indigo-500/20 to-blue-500/20', borderColor: 'border-indigo-500/30' },
                  ].map((item, index) => (
                    <motion.div
                      key={item.nameKey}
                      initial={{ opacity: 0, y: 20, scale: 0.9, rotateX: -15 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                      viewport={{ once: true, margin: '-20px' }}
                      transition={{ 
                        delay: 0.1 * index,
                        type: 'spring',
                        stiffness: 200,
                        damping: 15,
                      }}
                      whileHover={{ 
                        x: 8, 
                        y: -4,
                        scale: 1.05,
                        rotateY: 5,
                        transition: { duration: 0.3 }
                      }}
                      className={`relative p-5 rounded-2xl bg-gradient-to-br ${item.color} border-2 ${item.borderColor} hover:border-primary/60 transition-all duration-500 group/item overflow-hidden`}
                      style={{
                        transformStyle: 'preserve-3d',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                      }}
                    >
                      {/* Hover gradient overlay */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${item.color.replace('/20', '/40')} opacity-0 group-hover/item:opacity-100 transition-opacity duration-500`}
                      />
                      {/* Animated border on hover */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover/item:opacity-100"
                        style={{
                          background: 'linear-gradient(90deg, transparent, rgba(255, 107, 53, 0.4), transparent)',
                          backgroundSize: '200% 100%',
                        }}
                        animate={{
                          backgroundPosition: ['200% 0', '-200% 0'],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      />
                      <div className="flex items-center gap-4 relative z-10">
                        <motion.div
                          className="text-3xl md:text-4xl"
                          whileHover={{ 
                            scale: 1.3, 
                            rotate: [0, 15, -15, 0],
                            transition: { duration: 0.5 }
                          }}
                        >
                          {item.icon}
                        </motion.div>
                        <div className="flex-1">
                          <motion.div
                            className="w-2 h-2 rounded-full bg-primary mb-3 group-hover/item:scale-200 transition-transform"
                            animate={{
                              scale: [1, 1.3, 1],
                              opacity: [0.7, 1, 0.7],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: index * 0.2,
                              ease: 'easeInOut',
                            }}
                          />
                          <span className="text-base md:text-lg text-gray-100 group-hover/item:text-white transition-colors font-semibold block">
                            {t(item.nameKey)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Available Section - Ultra Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              whileHover={{ 
                scale: 1.02, 
                y: -6,
                transition: { duration: 0.3 }
              }}
              className="bg-gradient-to-br from-black/80 via-black/60 to-black/80 backdrop-blur-md rounded-3xl p-6 md:p-8 border-2 border-white/10 hover:border-green-500/60 transition-all duration-500 relative overflow-hidden group brushed-metal"
              style={{
                boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.05), 0 12px 48px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(34, 197, 94, 0.1)',
              }}
            >
              {/* Optimized animated background gradient */}
              {!shouldReduceMotion && (
                <motion.div
                  className="absolute inset-0 opacity-12 pointer-events-none"
                  animate={{
                    background: [
                      'radial-gradient(circle at 0% 0%, rgba(34, 197, 94, 0.12) 0%, transparent 50%)',
                      'radial-gradient(circle at 100% 100%, rgba(34, 197, 94, 0.12) 0%, transparent 50%)',
                      'radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.15) 0%, transparent 50%)',
                      'radial-gradient(circle at 0% 0%, rgba(34, 197, 94, 0.12) 0%, transparent 50%)',
                    ],
                  }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{ willChange: 'background' }}
                />
              )}
              
              {/* Optimized Animated Background Pattern */}
              {!shouldReduceMotion && (
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-8"
                  style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(34, 197, 94, 0.3) 1px, transparent 0)',
                    backgroundSize: '30px 30px',
                    willChange: 'transform',
                  }}
                  animate={{
                    x: [0, 30, 0],
                    y: [0, 30, 0],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              )}
              
              {/* Enhanced shimmer */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                style={{
                  background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.15) 50%, transparent 70%)',
                  backgroundSize: '200% 200%',
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <motion.div
                    className="p-4 rounded-2xl bg-gradient-to-br from-green-500/30 to-green-500/10 border-2 border-green-500/40 relative overflow-hidden"
                    whileHover={{ rotate: 360, scale: 1.15 }}
                    transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-green-500/50 via-transparent to-green-500/50"
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                    <Briefcase className="text-green-400 relative z-10" size={28} />
                  </motion.div>
                  <div>
                    <motion.h3
                      className="text-3xl font-bold text-white"
                      animate={{
                        textShadow: [
                          '0 0 10px rgba(34, 197, 94, 0.3)',
                          '0 0 20px rgba(34, 197, 94, 0.5)',
                          '0 0 10px rgba(34, 197, 94, 0.3)',
                        ],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      {t('profile.availableTitle')}
                    </motion.h3>
                  </div>
                </div>
                <div className="space-y-5">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.03, 
                      x: 8,
                      transition: { duration: 0.3 }
                    }}
                    className="flex items-center gap-4 p-5 bg-gradient-to-br from-dark/80 to-dark/60 rounded-2xl border-2 border-dark-lighter hover:border-green-500/50 transition-all duration-300 group/item relative overflow-hidden"
                  >
                    {/* Animated background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-transparent to-green-500/10 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"
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
                      whileHover={{ scale: 1.3, rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 0.5, type: 'spring' }}
                      className="p-3 rounded-xl bg-gradient-to-br from-green-500/30 to-green-500/10 border border-green-500/30 relative z-10"
                    >
                      <MapPin size={24} className="text-green-400" />
                    </motion.div>
                    <div className="flex-1 relative z-10">
                      <div className="text-xs md:text-sm text-gray-400 uppercase mb-2 font-bold tracking-wider">{t('profile.location')}</div>
                      <motion.div
                        className="text-base md:text-lg text-white font-bold group-hover/item:text-green-400 transition-colors"
                        whileHover={{ x: 4 }}
                      >
                        {t('profile.locationValue')}
                      </motion.div>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    whileHover={{ 
                      scale: 1.03, 
                      x: 8,
                      transition: { duration: 0.3 }
                    }}
                    className="flex items-center gap-4 p-5 bg-gradient-to-br from-dark/80 to-dark/60 rounded-2xl border-2 border-dark-lighter hover:border-green-500/50 transition-all duration-300 group/item relative overflow-hidden"
                  >
                    {/* Animated background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-transparent to-green-500/10 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"
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
                      whileHover={{ scale: 1.3, rotate: [0, -15, 15, 0] }}
                      transition={{ duration: 0.5, type: 'spring' }}
                      className="p-3 rounded-xl bg-gradient-to-br from-green-500/30 to-green-500/10 border border-green-500/30 relative z-10"
                    >
                      <Calendar size={24} className="text-green-400" />
                    </motion.div>
                    <div className="flex-1 relative z-10">
                      <div className="text-xs md:text-sm text-gray-400 uppercase mb-2 font-bold tracking-wider">{t('profile.status')}</div>
                      <motion.div
                        className="text-base md:text-lg text-white font-bold group-hover/item:text-green-400 transition-colors"
                        whileHover={{ x: 4 }}
                      >
                        {t('profile.statusValue')}
                      </motion.div>
                    </div>
                  </motion.div>
                  <div className="mt-6 pt-6 border-t-2 border-dark-lighter/50">
                    <div className="flex items-center gap-3 mb-6">
                      <motion.div
                        whileHover={{ rotate: 15, scale: 1.2 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        className="p-2 rounded-xl bg-gradient-to-br from-green-500/30 to-green-500/10 border border-green-500/30"
                      >
                        <TrendingUp size={20} className="text-green-400" />
                      </motion.div>
                      <p className="text-sm md:text-base text-gray-400 uppercase font-bold tracking-wider">{t('profile.lookingFor')}</p>
                    </div>
                    <div className="space-y-3">
                      {[
                        { nameKey: 'profile.lookingFullStack', icon: '💻' },
                        { nameKey: 'profile.lookingSystems', icon: '⚙️' },
                        { nameKey: 'profile.lookingGraphics', icon: '🎨' },
                      ].map((item, index) => (
                        <motion.div
                          key={item.nameKey}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.15 * index }}
                          whileHover={{ 
                            x: 8, 
                            scale: 1.02,
                            transition: { duration: 0.2 }
                          }}
                          className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-dark/60 to-dark/40 hover:from-dark/80 hover:to-dark/60 border border-dark-lighter/30 hover:border-green-500/40 transition-all duration-300 group/item relative overflow-hidden"
                        >
                          {/* Animated dot */}
                          <motion.div
                            className="w-3 h-3 rounded-full bg-green-400 group-hover/item:scale-200 transition-transform relative z-10"
                            animate={{
                              scale: [1, 1.4, 1],
                              opacity: [0.6, 1, 0.6],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: index * 0.3,
                              ease: 'easeInOut',
                            }}
                          />
                          <motion.span
                            className="text-xl md:text-2xl relative z-10"
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            transition={{ type: 'spring', stiffness: 400 }}
                          >
                            {item.icon}
                          </motion.span>
                          <span className="text-sm md:text-base text-gray-200 group-hover/item:text-white transition-colors font-semibold flex-1 relative z-10">
                            {t(item.nameKey)}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Stats Section - Ultra Enhanced */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {[
              { 
                labelKey: 'profile.statsProjects', 
                value: '8', 
                icon: Rocket, 
                color: 'from-blue-500 to-cyan-500', 
                bgColor: 'bg-blue-500/20', 
                glowColor: 'rgba(59, 130, 246, 0.5)',
                logo: (
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                    <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" fill="url(#rocketGrad)" stroke="url(#rocketGrad2)" strokeWidth="0.5" />
                    <path d="M12 6l-6 3v6l6 3 6-3V9l-6-3z" fill="url(#rocketGrad2)" opacity="0.6" />
                    <path d="M12 8l-2 1v2l2 1 2-1V9l-2-1z" fill="white" opacity="0.9" />
                    <circle cx="12" cy="12" r="1.5" fill="white" opacity="0.7" />
                    <defs>
                      <linearGradient id="rocketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                      <linearGradient id="rocketGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#60a5fa" />
                        <stop offset="100%" stopColor="#22d3ee" />
                      </linearGradient>
                    </defs>
                  </svg>
                )
              },
              { 
                labelKey: 'profile.statsTechnologies', 
                value: '16+', 
                icon: Cpu, 
                color: 'from-purple-500 to-pink-500', 
                bgColor: 'bg-purple-500/20', 
                glowColor: 'rgba(168, 85, 247, 0.5)',
                logo: (
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                    <rect x="4" y="4" width="16" height="16" rx="2" fill="url(#cpuGrad)" stroke="url(#cpuGrad2)" strokeWidth="0.5" />
                    <rect x="6" y="6" width="12" height="12" rx="1" fill="url(#cpuGrad2)" opacity="0.4" />
                    <rect x="8" y="8" width="8" height="8" fill="white" opacity="0.2" />
                    <circle cx="10" cy="10" r="1.2" fill="white" opacity="0.9" />
                    <circle cx="14" cy="10" r="1.2" fill="white" opacity="0.9" />
                    <circle cx="10" cy="14" r="1.2" fill="white" opacity="0.9" />
                    <circle cx="14" cy="14" r="1.2" fill="white" opacity="0.9" />
                    <defs>
                      <linearGradient id="cpuGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                      <linearGradient id="cpuGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#c084fc" />
                        <stop offset="100%" stopColor="#f472b6" />
                      </linearGradient>
                    </defs>
                  </svg>
                )
              },
              { 
                labelKey: 'profile.statsYears', 
                value: '1', 
                icon: Award, 
                color: 'from-yellow-500 to-orange-500', 
                bgColor: 'bg-yellow-500/20', 
                glowColor: 'rgba(234, 179, 8, 0.5)',
                logo: (
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="url(#awardGrad)" stroke="url(#awardGrad2)" strokeWidth="0.3" />
                    <path d="M12 5l2.06 4.17L18 9.8l-3.5 3.41.82 4.79L12 15.85l-3.32 1.75.82-4.79L6 9.8l3.94-.63L12 5z" fill="url(#awardGrad2)" opacity="0.7" />
                    <circle cx="12" cy="12" r="2.5" fill="white" opacity="0.95" />
                    <circle cx="12" cy="12" r="1.5" fill="url(#awardGrad)" />
                    <defs>
                      <linearGradient id="awardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#eab308" />
                        <stop offset="100%" stopColor="#f97316" />
                      </linearGradient>
                      <linearGradient id="awardGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fde047" />
                        <stop offset="100%" stopColor="#fb923c" />
                      </linearGradient>
                    </defs>
                  </svg>
                )
              },
              { 
                labelKey: 'profile.statsRepos', 
                value: '8+', 
                icon: Code, 
                color: 'from-green-500 to-emerald-500', 
                bgColor: 'bg-green-500/20', 
                glowColor: 'rgba(34, 197, 94, 0.5)',
                logo: (
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.88 1.52 2.31 1.08 2.87.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.58 9.58 0 0112 6.04c.85.004 1.7.114 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48C19.14 20.17 22 16.42 22 12c0-5.52-4.48-10-10-10z" fill="url(#repoGrad)" stroke="url(#repoGrad2)" strokeWidth="0.3" />
                    <path d="M9 11c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm6 0c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z" fill="white" opacity="0.9" />
                    <circle cx="12" cy="12" r="1.5" fill="white" opacity="0.6" />
                    <defs>
                      <linearGradient id="repoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#22c55e" />
                        <stop offset="100%" stopColor="#10b981" />
                      </linearGradient>
                      <linearGradient id="repoGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4ade80" />
                        <stop offset="100%" stopColor="#34d399" />
                      </linearGradient>
                    </defs>
                  </svg>
                )
              },
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.labelKey}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ 
                    delay: 0.5 + index * 0.1, 
                    type: 'spring', 
                    stiffness: 180,
                    damping: 18,
                  }}
                  whileHover={shouldReduceMotion ? {} : { 
                    scale: 1.08, 
                    y: -8, 
                    transition: { duration: 0.3 }
                  }}
                  className="bg-gradient-to-br from-black/80 via-black/60 to-black/80 backdrop-blur-md rounded-2xl p-5 md:p-7 border-2 border-white/10 hover:border-primary/60 transition-all text-center relative overflow-hidden group brushed-metal"
                  style={{
                    boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.05), 0 12px 48px rgba(0, 0, 0, 0.6)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Multi-layer animated shimmer */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    style={{
                      background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.15) 50%, transparent 70%)',
                      backgroundSize: '200% 200%',
                    }}
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                  
                  {/* Enhanced gradient background on hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-15 transition-opacity duration-500`}
                  />
                  
                  {/* Animated border glow */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${stat.glowColor}, transparent)`,
                      backgroundSize: '200% 100%',
                    }}
                    animate={{
                      backgroundPosition: ['200% 0', '-200% 0'],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                  
                  {/* Optimized floating particles inside card */}
                  {!shouldReduceMotion && useMemo(() => 
                    [...Array(2)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute rounded-full opacity-0 group-hover:opacity-100"
                        style={{
                          width: '2px',
                          height: '2px',
                          background: stat.glowColor,
                          left: `${25 + i * 50}%`,
                          top: `${30 + (i % 2) * 40}%`,
                          willChange: 'transform, opacity',
                        }}
                        animate={{
                          y: [0, -15, 0],
                          opacity: [0, 0.6, 0],
                          scale: [0, 1.2, 0],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          delay: i * 0.4,
                          ease: 'easeInOut',
                        }}
                      />
                    )), [stat.glowColor, shouldReduceMotion])
                  }
                  
                  <div className="relative z-10">
                    <motion.div
                      className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${stat.bgColor} flex items-center justify-center border-2 border-white/10 group-hover:border-primary/50 transition-all duration-300 relative overflow-hidden`}
                      whileHover={{ 
                        rotate: 360,
                        scale: 1.15,
                        transition: { duration: 0.6 }
                      }}
                    >
                      {/* Animated background glow */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                      />
                      <motion.div
                        animate={{
                          scale: [1, 1.08, 1],
                          rotate: [0, 3, -3, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: index * 0.2,
                        }}
                        className="relative z-10 w-10 h-10"
                      >
                        {stat.logo || (
                          <Icon className={`bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} size={28} style={{ WebkitTextFillColor: 'transparent' }} />
                        )}
                      </motion.div>
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        delay: 0.7 + index * 0.15, 
                        type: 'spring', 
                        stiffness: 300,
                        damping: 15,
                      }}
                      whileHover={{
                        scale: 1.15,
                        transition: { duration: 0.2 }
                      }}
                      className="text-4xl md:text-5xl font-bold text-white mb-2"
                      style={{
                        textShadow: `0 0 20px ${stat.glowColor}`,
                      }}
                    >
                      {stat.value}
                    </motion.div>
                    <motion.div
                      className="text-xs md:text-sm text-gray-300 uppercase tracking-wider font-bold"
                      animate={{
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2,
                        ease: 'easeInOut',
                      }}
                    >
                      {t(stat.labelKey)}
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
