'use client'

import { motion } from 'framer-motion'
import { Code, Rocket, Cpu, Zap, Calendar, MapPin, Briefcase, Award, BookOpen, Target, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import ContactBar from '@/components/ContactBar'
import Breadcrumbs from '@/components/Breadcrumbs'
import TechnologySection from '@/components/TechnologySection'
import { useLanguage } from '@/contexts/LanguageContext'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
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

export default function ProfilePage() {
  const { t } = useLanguage()
  
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
      {[...Array(8)].map((_, i) => (
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
      
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 md:px-8 py-6 md:py-12 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Breadcrumbs */}
          <motion.div variants={itemVariants} className="mb-6">
            <Breadcrumbs />
          </motion.div>

          {/* Profile Content */}
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 md:gap-8 mb-8 md:mb-12">
            {/* Avatar */}
            <motion.div
              variants={itemVariants}
              className="relative shrink-0 self-center sm:self-start"
            >
              <motion.div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center glow-orange relative overflow-hidden"
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
                  animate={{ rotate: [0, 360] }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                <Code size={24} className="text-white relative z-10 sm:w-8 sm:h-8" />
              </motion.div>
              <motion.div
                className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-dark"
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
            </motion.div>

            {/* Info */}
            <div className="flex-1 w-full text-center sm:text-left">
              <motion.h1
                variants={itemVariants}
                className="text-2xl sm:text-3xl font-bold text-white mb-2"
              >
                Eddi Andreé Salazar Matos
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-base sm:text-lg text-primary mb-3 md:mb-4 font-semibold"
              >
                {t('profile.fullstackDeveloper')}
              </motion.p>
              <motion.p
                variants={itemVariants}
                className="text-sm sm:text-base text-gray-300 mb-4 leading-relaxed"
              >
                {t('profile.description')}
              </motion.p>
              <motion.div
                variants={itemVariants}
                className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6"
              >
                <p className="text-sm text-gray-300 leading-relaxed">
                  {t('profile.approach')}
                </p>
              </motion.div>

              {/* Skills */}
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
                      delay: 0.3 + index * 0.1,
                      type: 'spring',
                      stiffness: 200,
                    }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className={`px-3 py-1.5 rounded-full ${skill.color} border border-current/20 flex items-center gap-2 cursor-pointer`}
                  >
                    <skill.icon size={14} />
                    <span className="text-sm font-medium">{skill.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Technologies Section - Full Width */}
          <motion.div variants={itemVariants} className="mb-6">
            <TechnologySection />
          </motion.div>

          {/* Additional Info Sections */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6"
          >

            <motion.div
              whileHover={{ y: -4 }}
              className="bg-black/60 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 border border-white/10 hover:border-primary/30 transition-all duration-500 relative overflow-hidden group brushed-metal"
              style={{
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 8px 32px rgba(0, 0, 0, 0.4)',
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
              
              {/* Subtle background pattern */}
              <motion.div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20H0v-2h20v2.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20z'/%3E%3C/g%3E%3C/svg%3E")`,
                }}
                animate={{
                  x: [0, 40, 0],
                  y: [0, 40, 0],
                }}
                transition={{
                  duration: 20,
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
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <motion.div
                    className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Target className="text-primary" size={24} />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-white tracking-tight">{t('profile.focusTitle')}</h3>
                    <p className="text-sm text-gray-400 mt-0.5">{t('profile.focusSubtitle')}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { nameKey: 'profile.focusWebApps', icon: '🌐', color: 'from-blue-500/10 to-cyan-500/10' },
                    { nameKey: 'profile.focusSystems', icon: '⚙️', color: 'from-gray-500/10 to-slate-500/10' },
                    { nameKey: 'profile.focusGraphics', icon: '🎮', color: 'from-purple-500/10 to-pink-500/10' },
                    { nameKey: 'profile.focusOptimization', icon: '⚡', color: 'from-yellow-500/10 to-orange-500/10' },
                    { nameKey: 'profile.focusArchitecture', icon: '🏗️', color: 'from-emerald-500/10 to-teal-500/10' },
                    { nameKey: 'profile.focusLowLevel', icon: '🔧', color: 'from-indigo-500/10 to-blue-500/10' },
                  ].map((item, index) => (
                    <motion.div
                      key={item.nameKey}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ x: 4, scale: 1.02 }}
                      className={`relative p-4 rounded-xl bg-gradient-to-br ${item.color} border border-dark-lighter/30 hover:border-primary/30 transition-all duration-300 group/item overflow-hidden`}
                    >
                      <div className="flex items-center gap-3 relative z-10">
                        <motion.div
                          className="text-2xl"
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          transition={{ type: 'spring', stiffness: 400 }}
                        >
                          {item.icon}
                        </motion.div>
                        <div className="flex-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mb-2 group-hover/item:scale-150 transition-transform" />
                          <span className="text-sm text-gray-200 group-hover/item:text-white transition-colors font-medium block">
                            {t(item.nameKey)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="bg-black/60 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-500/30 transition-all duration-500 relative overflow-hidden group brushed-metal"
              style={{
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 8px 32px rgba(0, 0, 0, 0.4)',
              }}
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 opacity-10 pointer-events-none"
                animate={{
                  background: [
                    'radial-gradient(circle at 0% 0%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
                    'radial-gradient(circle at 100% 100%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
                    'radial-gradient(circle at 0% 0%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
                  ],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              
              {/* Subtle background pattern */}
              <motion.div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20H0v-2h20v2.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20z'/%3E%3C/g%3E%3C/svg%3E")`,
                }}
                animate={{
                  x: [0, 40, 0],
                  y: [0, 40, 0],
                }}
                transition={{
                  duration: 20,
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
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <motion.div
                    className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/10 border border-purple-500/20"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <BookOpen className="text-purple-400" size={24} />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-white tracking-tight">{t('profile.learningTitle')}</h3>
                    <p className="text-sm text-gray-400 mt-0.5">{t('profile.learningSubtitle')}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { nameKey: 'profile.learningWasm', level: 'high' },
                    { nameKey: 'profile.learningVulkan', level: 'medium' },
                    { nameKey: 'profile.learningRust', level: 'high' },
                    { nameKey: 'profile.learningArchitecture', level: 'medium' },
                    { nameKey: 'profile.learningOptimization', level: 'medium' },
                  ].map((item, index) => {
                    const levelConfig = {
                      high: { width: '85%', color: 'from-purple-500 via-pink-500 to-rose-500', labelKey: 'profile.active', bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400' },
                      medium: { width: '65%', color: 'from-blue-500 via-indigo-500 to-purple-500', labelKey: 'profile.inProgress', bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' },
                      low: { width: '40%', color: 'from-cyan-500 via-blue-500 to-indigo-500', labelKey: 'profile.starting', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400' },
                    }
                    const config = levelConfig[item.level as keyof typeof levelConfig]
                    
                    return (
                      <motion.div
                        key={item.nameKey}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        whileHover={{ x: 4, scale: 1.01 }}
                        className={`group relative p-4 rounded-xl bg-gradient-to-br ${config.bg} border ${config.border} hover:${config.border.replace('/30', '/50')} transition-all duration-300`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-gray-200 group-hover:text-white transition-colors font-medium">
                            {t(item.nameKey)}
                          </span>
                          <span className={`text-xs px-2.5 py-1 rounded-full ${config.bg} ${config.text} border ${config.border} font-medium`}>
                            {t(config.labelKey)}
                          </span>
                        </div>
                        <div className="h-1.5 bg-dark/50 rounded-full overflow-hidden relative">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: config.width }}
                            transition={{ delay: 0.2 + index * 0.1, duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                            className={`h-full bg-gradient-to-r ${config.color} rounded-full relative`}
                          >
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                              animate={{
                                x: ['-100%', '200%'],
                              }}
                              transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                repeatDelay: 1.5,
                                ease: 'linear',
                              }}
                            />
                          </motion.div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-black/60 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-green-500/50 transition-all duration-300 relative overflow-hidden group brushed-metal"
              style={{
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 8px 32px rgba(0, 0, 0, 0.4)',
              }}
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 opacity-10 pointer-events-none"
                animate={{
                  background: [
                    'radial-gradient(circle at 0% 0%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)',
                    'radial-gradient(circle at 100% 100%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)',
                    'radial-gradient(circle at 0% 0%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)',
                  ],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              {/* Gradient Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              
              {/* Animated Background Pattern */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-5"
                style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(34, 197, 94, 0.3) 1px, transparent 0)',
                  backgroundSize: '20px 20px',
                }}
              />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    className="p-2.5 rounded-lg bg-green-500/20"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Briefcase className="text-green-400" size={22} />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white">{t('profile.availableTitle')}</h3>
                </div>
                <div className="space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.02, x: 4 }}
                    className="flex items-center gap-3 p-4 bg-dark rounded-lg border border-dark-lighter hover:border-green-500/30 transition-all group/item"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 15 }}
                      className="p-2 rounded-lg bg-green-500/20"
                    >
                      <MapPin size={20} className="text-green-400" />
                    </motion.div>
                    <div className="flex-1">
                      <div className="text-xs text-gray-400 uppercase mb-1 font-semibold">{t('profile.location')}</div>
                      <div className="text-sm text-white font-medium group-hover/item:text-green-400 transition-colors">
                        {t('profile.locationValue')}
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02, x: 4 }}
                    className="flex items-center gap-3 p-4 bg-dark rounded-lg border border-dark-lighter hover:border-green-500/30 transition-all group/item"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: -15 }}
                      className="p-2 rounded-lg bg-green-500/20"
                    >
                      <Calendar size={20} className="text-green-400" />
                    </motion.div>
                    <div className="flex-1">
                      <div className="text-xs text-gray-400 uppercase mb-1 font-semibold">{t('profile.status')}</div>
                      <div className="text-sm text-white font-medium group-hover/item:text-green-400 transition-colors">
                        {t('profile.statusValue')}
                      </div>
                    </div>
                  </motion.div>
                  <div className="mt-4 pt-4 border-t border-dark-lighter">
                    <div className="flex items-center gap-2 mb-4">
                      <motion.div
                        whileHover={{ rotate: 15 }}
                        className="p-1.5 rounded-lg bg-green-500/20"
                      >
                        <TrendingUp size={16} className="text-green-400" />
                      </motion.div>
                      <p className="text-xs text-gray-400 uppercase font-semibold">{t('profile.lookingFor')}</p>
                    </div>
                    <div className="space-y-2.5">
                      {[
                        { nameKey: 'profile.lookingFullStack', icon: '💻' },
                        { nameKey: 'profile.lookingSystems', icon: '⚙️' },
                        { nameKey: 'profile.lookingGraphics', icon: '🎨' },
                      ].map((item, index) => (
                        <motion.div
                          key={item.nameKey}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index }}
                          whileHover={{ x: 4, scale: 1.02 }}
                          className="flex items-center gap-3 p-2.5 rounded-lg bg-dark/50 hover:bg-dark transition-colors group/item"
                        >
                          <span className="text-base">{item.icon}</span>
                          <div className="w-2 h-2 rounded-full bg-green-400 group-hover/item:scale-150 transition-transform" />
                          <span className="text-sm text-gray-300 group-hover/item:text-white transition-colors font-medium flex-1">
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

          {/* Stats Section */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
          >
            {[
              { labelKey: 'profile.statsProjects', value: '10+', icon: Rocket, color: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-500/20' },
              { labelKey: 'profile.statsTechnologies', value: '15+', icon: Cpu, color: 'from-purple-500 to-pink-500', bgColor: 'bg-purple-500/20' },
              { labelKey: 'profile.statsYears', value: '3+', icon: Award, color: 'from-yellow-500 to-orange-500', bgColor: 'bg-yellow-500/20' },
              { labelKey: 'profile.statsRepos', value: '10+', icon: Code, color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-500/20' },
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.labelKey}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.08, y: -8, rotate: 2 }}
                  className="bg-black/60 backdrop-blur-sm rounded-lg p-4 md:p-6 border border-white/10 hover:border-primary/50 transition-all text-center relative overflow-hidden group brushed-metal"
                  style={{
                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 8px 32px rgba(0, 0, 0, 0.4)',
                  }}
                >
                  {/* Animated shimmer */}
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
                  {/* Gradient Background on Hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />
                  
                  {/* Animated Border */}
                  <motion.div
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(90deg, transparent, rgba(255, 107, 53, 0.3), transparent)`,
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
                    <motion.div
                      className={`w-12 h-12 mx-auto mb-3 rounded-lg ${stat.bgColor} flex items-center justify-center`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className={`bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} size={24} />
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1, type: 'spring', stiffness: 300 }}
                      className="text-3xl font-bold text-white mb-1"
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                      {t(stat.labelKey)}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

