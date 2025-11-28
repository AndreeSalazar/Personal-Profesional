'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { Globe } from 'lucide-react'

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const languages = [
    { code: 'es' as const, flag: '🇵🇪', name: 'Español', label: 'Español' },
    { code: 'en' as const, flag: '🇺🇸', name: 'English', label: 'English' },
  ]

  const currentLang = languages.find(lang => lang.code === language) || languages[0]
  const isEnglish = language === 'en'

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
        className="flex items-center gap-2 px-4 py-2 bg-black/60 hover:bg-black/80 rounded-lg border border-white/10 hover:border-primary/50 transition-all text-white text-sm relative overflow-hidden group"
        style={{
          backdropFilter: 'blur(10px)',
          boxShadow: isEnglish
            ? 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 15px rgba(59, 130, 246, 0.3)'
            : 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 15px rgba(220, 38, 38, 0.3)',
        }}
      >
        {/* Background glow effect - different colors for each language */}
        <motion.div
          className="absolute inset-0 rounded-lg"
          animate={isEnglish ? {
            background: [
              'radial-gradient(circle at center, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
              'radial-gradient(circle at center, rgba(59, 130, 246, 0.4) 0%, transparent 70%)',
              'radial-gradient(circle at center, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
            ],
          } : {
            background: [
              'radial-gradient(circle at center, rgba(220, 38, 38, 0.2) 0%, transparent 70%)',
              'radial-gradient(circle at center, rgba(220, 38, 38, 0.4) 0%, transparent 70%)',
              'radial-gradient(circle at center, rgba(220, 38, 38, 0.2) 0%, transparent 70%)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Flag with unique animations */}
        <motion.div
          key={currentLang.code}
          className="relative z-10"
          initial={{ scale: 0.8, opacity: 0, rotate: -180 }}
          animate={{ 
            scale: 1, 
            opacity: 1, 
            rotate: 0,
            // USA flag: horizontal wave animation
            ...(isEnglish ? {
              x: [0, 3, -3, 0],
              y: [0, -2, 2, 0],
            } : {
              // Peru flag: vertical wave animation
              x: [0, -2, 2, 0],
              y: [0, 3, -3, 0],
            }),
          }}
          exit={{ scale: 0.8, opacity: 0, rotate: 180 }}
          transition={{
            duration: 0.5,
            x: {
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            },
            y: {
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            },
          }}
        >
          <motion.span
            className="text-2xl block"
            animate={isEnglish ? {
              // USA: Stars twinkling effect
              filter: [
                'drop-shadow(0 0 3px rgba(59, 130, 246, 0.5))',
                'drop-shadow(0 0 8px rgba(59, 130, 246, 0.8))',
                'drop-shadow(0 0 3px rgba(59, 130, 246, 0.5))',
              ],
              scale: [1, 1.1, 1],
            } : {
              // Peru: Red-white-red stripes effect
              filter: [
                'drop-shadow(0 0 3px rgba(220, 38, 38, 0.5))',
                'drop-shadow(0 0 8px rgba(220, 38, 38, 0.8))',
                'drop-shadow(0 0 3px rgba(220, 38, 38, 0.5))',
              ],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {currentLang.flag}
          </motion.span>
          
          {/* Additional particles for USA flag */}
          {isEnglish && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`star-${i}`}
                  className="absolute w-1 h-1 bg-blue-400 rounded-full"
                  style={{
                    left: `${20 + i * 20}%`,
                    top: `${30 + i * 20}%`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </>
          )}
          
          {/* Additional particles for Peru flag */}
          {!isEnglish && (
            <>
              {[...Array(2)].map((_, i) => (
                <motion.div
                  key={`stripe-${i}`}
                  className="absolute w-2 h-0.5 bg-red-500"
                  style={{
                    left: `${10 + i * 30}%`,
                    top: `${40 + i * 20}%`,
                  }}
                  animate={{
                    width: ['0px', '8px', '0px'],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </>
          )}
        </motion.div>
        
        <motion.span
          key={`${currentLang.code}-text`}
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 5 }}
          className="relative z-10 font-medium"
        >
          {currentLang.label}
        </motion.span>
        
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="relative z-10"
        >
          <Globe 
            size={14} 
            className={isEnglish ? 'text-blue-400' : 'text-red-400'}
            style={{
              filter: isEnglish 
                ? 'drop-shadow(0 0 4px rgba(59, 130, 246, 0.6))'
                : 'drop-shadow(0 0 4px rgba(220, 38, 38, 0.6))',
            }}
          />
        </motion.div>
      </motion.button>
    </div>
  )
}

