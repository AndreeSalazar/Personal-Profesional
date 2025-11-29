'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, ArrowLeft, Code2, Rocket, Star, Award, Lightbulb, Target, Trophy, AlertCircle, BookOpen, Zap, ChevronDown, ChevronUp } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import ContactBar from '@/components/ContactBar'
import { useLanguage } from '@/contexts/LanguageContext'
import { getAllAchievements } from '../projectsData'

interface ExpandableSectionProps {
  title: string
  icon: React.ElementType
  content: string
  delay: number
  color: string
  isOpen: boolean
  onToggle: () => void
}

const ExpandableSection = ({ title, icon: Icon, content, delay, color, isOpen, onToggle }: ExpandableSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="mb-6"
    >
      <motion.button
        onClick={onToggle}
        className="w-full p-6 bg-gradient-to-br from-black/60 via-black/40 to-black/60 backdrop-blur-md rounded-2xl border-2 border-white/10 hover:border-primary/50 transition-all duration-300 text-left group"
        whileHover={{ scale: 1.02, y: -4 }}
        style={{
          boxShadow: isOpen 
            ? 'inset 0 2px 4px rgba(255, 255, 255, 0.05), 0 12px 40px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 107, 53, 0.3)'
            : 'inset 0 1px 2px rgba(255, 255, 255, 0.05), 0 8px 24px rgba(0, 0, 0, 0.5)',
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              className={`p-3 rounded-xl bg-gradient-to-br ${color} shadow-lg`}
              animate={isOpen ? { rotate: [0, 360] } : { rotate: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Icon className="text-white" size={24} />
            </motion.div>
            <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
              {title}
            </h3>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? <ChevronUp size={24} className="text-primary" /> : <ChevronDown size={24} className="text-gray-400" />}
          </motion.div>
        </div>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <motion.p
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-6 text-lg text-gray-300 leading-relaxed"
              >
                {content}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  )
}

export default function ProjectDetailClient() {
  const params = useParams()
  const { t } = useLanguage()
  const slug = params?.slug as string
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    motivation: false,
    learned: false,
    challenges: false,
    results: false,
  })

  const achievements = useMemo(() => getAllAchievements(t), [t])
  const project = useMemo(() => 
    achievements.find((p) => (p as any).slug === slug || p.id.toString() === slug),
    [achievements, slug]
  )

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  if (!project) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-black">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">{t('projects.notFound')}</h1>
          <Link href="/projects" className="text-primary hover:underline">
            {t('projects.backToProjects')}
          </Link>
        </div>
      </div>
    )
  }

  const Icon = project.icon
  const hasDetails = (project as any).motivationKey || (project as any).learnedKey || (project as any).challengesKey || (project as any).resultsKey

  return (
    <div className="min-h-screen w-full flex flex-col bg-black overflow-x-hidden metallic-overlay relative">
      {/* Enhanced Animated background */}
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
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ willChange: 'background' }}
      />

      {/* Floating particles with project color */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-3 h-3 rounded-full bg-gradient-to-r ${project.color} opacity-20`}
          initial={{
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%',
          }}
          animate={{
            y: [null, '-150px', '150px'],
            x: [null, Math.random() * 100 - 50 + 'px'],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: i * 0.5,
            ease: 'easeInOut',
          }}
          style={{ willChange: 'transform, opacity' }}
        />
      ))}

      <div className="relative z-10">
        <ContactBar />
      </div>

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 py-6 md:py-12 relative z-10">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>{t('projects.backToProjects')}</span>
          </Link>
        </motion.div>

        {/* Enhanced Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
            <motion.div
              className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br ${project.color} flex items-center justify-center shadow-2xl relative overflow-hidden`}
              whileHover={{ scale: 1.15, rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-100`}
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              <Icon className="text-white relative z-10" size={36} />
            </motion.div>
            <div className="flex-1">
              <motion.h1
                className="text-5xl md:text-6xl font-bold text-white mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.span
                  className="inline-block"
                  animate={{
                    textShadow: [
                      `0 0 0px ${project.color.includes('indigo') ? 'rgba(99, 102, 241, 0)' : project.color.includes('cyan') ? 'rgba(6, 182, 212, 0)' : 'rgba(255, 107, 53, 0)'}`,
                      `0 0 20px ${project.color.includes('indigo') ? 'rgba(99, 102, 241, 0.8)' : project.color.includes('cyan') ? 'rgba(6, 182, 212, 0.8)' : 'rgba(255, 107, 53, 0.8)'}`,
                      `0 0 0px ${project.color.includes('indigo') ? 'rgba(99, 102, 241, 0)' : project.color.includes('cyan') ? 'rgba(6, 182, 212, 0)' : 'rgba(255, 107, 53, 0)'}`,
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
              </motion.h1>
              {project.featured && (
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                  className="inline-block px-5 py-2 rounded-full bg-primary/20 text-primary text-sm font-semibold border-2 border-primary/40 shadow-lg"
                >
                  {t('projects.featured')}
                </motion.span>
              )}
            </div>
          </div>

          {/* Enhanced Demo Image */}
          {(project as any).demoImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
              className="mb-10 rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl relative group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
              />
              <img
                src={(project as any).demoImage}
                alt={t(project.titleKey)}
                className="w-full h-auto object-cover"
                loading="eager"
              />
              <motion.div
                className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
                initial={{ y: 10 }}
                whileHover={{ y: 0 }}
              >
                <div className="bg-black/90 backdrop-blur-md rounded-lg px-4 py-2 border border-primary/30">
                  <p className="text-sm text-primary font-semibold">{t('projects.demoRunning')}</p>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Enhanced Description */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-10 p-8 bg-gradient-to-br from-black/60 via-black/40 to-black/60 backdrop-blur-md rounded-2xl border-2 border-white/10 shadow-xl"
          >
            <p className="text-xl text-gray-200 leading-relaxed">
              {t(project.descriptionKey)}
            </p>
          </motion.div>

          {/* Enhanced Highlights */}
          {project.highlightKeys && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-10 p-8 bg-gradient-to-br from-black/60 via-black/40 to-black/60 backdrop-blur-md rounded-2xl border-2 border-white/10 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <Zap className={`text-transparent bg-gradient-to-r ${project.color} bg-clip-text`} size={28} />
                <h3 className="text-2xl font-bold text-white">{t('projects.features')}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.highlightKeys.map((key, idx) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -30, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ delay: 0.6 + idx * 0.1, type: 'spring', stiffness: 200 }}
                    whileHover={{ scale: 1.05, x: 5 }}
                    className="flex items-center gap-4 p-4 bg-black/60 rounded-xl border border-white/5 hover:border-primary/30 transition-all group"
                  >
                    <motion.div
                      className={`w-3 h-3 rounded-full bg-gradient-to-r ${project.color} shadow-lg`}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: idx * 0.2,
                      }}
                    />
                    <span className="text-gray-200 font-medium group-hover:text-white transition-colors">{t(key)}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Enhanced Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-6">
              <Code2 className={`text-transparent bg-gradient-to-r ${project.color} bg-clip-text`} size={28} />
              <h3 className="text-2xl font-bold text-white">{t('projects.technologies')}</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {project.tech.map((tech, idx) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 0.7 + idx * 0.08, type: 'spring', stiffness: 300 }}
                  whileHover={{ scale: 1.15, y: -5, rotate: 5 }}
                  className={`px-5 py-3 bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-sm text-gray-200 rounded-xl border-2 border-white/10 hover:border-primary/50 font-semibold shadow-lg cursor-pointer transition-all relative overflow-hidden group`}
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                  />
                  <span className="relative z-10">{tech}</span>
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Detailed Sections - Expandable */}
          {hasDetails && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mb-10"
            >
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                {t('projects.detailedInfo')}
              </h2>
              
              {(project as any).motivationKey && (
                <ExpandableSection
                  title={t('projects.motivation')}
                  icon={Lightbulb}
                  content={t((project as any).motivationKey)}
                  delay={0.9}
                  color={project.color}
                  isOpen={expandedSections.motivation}
                  onToggle={() => toggleSection('motivation')}
                />
              )}

              {(project as any).learnedKey && (
                <ExpandableSection
                  title={t('projects.whatILearned')}
                  icon={BookOpen}
                  content={t((project as any).learnedKey)}
                  delay={0.95}
                  color={project.color}
                  isOpen={expandedSections.learned}
                  onToggle={() => toggleSection('learned')}
                />
              )}

              {(project as any).challengesKey && (
                <ExpandableSection
                  title={t('projects.challenges')}
                  icon={AlertCircle}
                  content={t((project as any).challengesKey)}
                  delay={1.0}
                  color={project.color}
                  isOpen={expandedSections.challenges}
                  onToggle={() => toggleSection('challenges')}
                />
              )}

              {(project as any).resultsKey && (
                <ExpandableSection
                  title={t('projects.results')}
                  icon={Trophy}
                  content={t((project as any).resultsKey)}
                  delay={1.05}
                  color={project.color}
                  isOpen={expandedSections.results}
                  onToggle={() => toggleSection('results')}
                />
              )}
            </motion.div>
          )}

          {/* Enhanced Links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex items-center gap-4 flex-wrap"
          >
            {project.link ? (
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, x: 8, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r ${project.color} text-white text-lg font-bold border-2 border-transparent hover:border-white/30 shadow-2xl transition-all relative overflow-hidden group`}
              >
                <motion.div
                  className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                {project.isWeb ? <ExternalLink size={24} className="relative z-10" /> : <Github size={24} className="relative z-10" />}
                <span className="relative z-10">{project.isWeb ? t('projects.viewApp') : t('projects.viewGitHub')}</span>
                <ExternalLink size={18} className="relative z-10" />
              </motion.a>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gray-500/20 text-gray-400 text-lg font-medium border-2 border-gray-500/30 backdrop-blur-sm"
              >
                <Code2 size={24} />
                <span>{t('projects.notOnGitHub')}</span>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
