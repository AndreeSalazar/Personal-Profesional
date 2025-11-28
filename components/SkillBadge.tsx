'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface SkillBadgeProps {
  icon: LucideIcon
  label: string
  level: 'high' | 'medium' | 'low'
  color?: string
}

const levelConfig = {
  high: {
    percentage: 90,
    color: 'from-emerald-400 via-green-500 to-teal-500',
    borderColor: 'border-emerald-500/30',
    bgColor: 'bg-emerald-500/10',
    textColor: 'text-emerald-400',
    label: 'Avanzado',
    glow: 'shadow-emerald-500/20',
  },
  medium: {
    percentage: 65,
    color: 'from-amber-400 via-orange-500 to-yellow-500',
    borderColor: 'border-amber-500/30',
    bgColor: 'bg-amber-500/10',
    textColor: 'text-amber-400',
    label: 'Intermedio',
    glow: 'shadow-amber-500/20',
  },
  low: {
    percentage: 40,
    color: 'from-blue-400 via-cyan-500 to-indigo-500',
    borderColor: 'border-blue-500/30',
    bgColor: 'bg-blue-500/10',
    textColor: 'text-blue-400',
    label: 'Básico',
    glow: 'shadow-blue-500/20',
  },
}

export default function SkillBadge({ icon: Icon, label, level }: SkillBadgeProps) {
  const config = levelConfig[level]

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, scale: 1.01 }}
      className={`group relative bg-dark-lighter/50 backdrop-blur-sm rounded-xl p-4 border ${config.borderColor} hover:${config.borderColor.replace('/30', '/50')} transition-all duration-300 overflow-hidden`}
    >
      {/* Subtle gradient overlay on hover */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${config.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
      />

      {/* Animated border glow */}
      <motion.div
        className={`absolute inset-0 rounded-xl ${config.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        style={{
          boxShadow: `0 0 20px ${config.glow.replace('shadow-', '').replace('/20', '')}`,
        }}
      />

      <div className="relative z-10">
        {/* Header with icon and label */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${config.bgColor} ${config.textColor} group-hover:scale-110 transition-transform duration-300`}>
              <Icon size={18} className="relative z-10" />
            </div>
            <div>
              <div className="text-white font-semibold text-sm leading-tight">{label}</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className={`text-xs ${config.textColor} font-medium`}>
                  {config.label}
                </span>
                <motion.div
                  className={`w-1.5 h-1.5 rounded-full ${config.bgColor} border ${config.borderColor}`}
                  animate={{
                    opacity: [1, 0.5, 1],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative h-1.5 bg-dark/50 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${config.percentage}%` }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className={`h-full bg-gradient-to-r ${config.color} rounded-full relative`}
          >
            {/* Shimmer effect */}
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
      </div>
    </motion.div>
  )
}
