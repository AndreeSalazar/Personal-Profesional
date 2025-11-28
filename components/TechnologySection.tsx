'use client'

import { motion } from 'framer-motion'
import { Cpu, Code, Rocket, Database, Globe, Settings } from 'lucide-react'
import SkillBadge from './SkillBadge'

interface Technology {
  icon: any
  label: string
  level: 'high' | 'medium' | 'low'
}

interface Category {
  name: string
  icon: any
  technologies: Technology[]
}

const categories: Category[] = [
  {
    name: 'Systems',
    icon: Cpu,
    technologies: [
      { icon: Cpu, label: 'C++', level: 'high' as const },
      { icon: Rocket, label: 'Rust', level: 'high' as const },
      { icon: Settings, label: 'Assembly', level: 'medium' as const },
      { icon: Rocket, label: 'Vulkan API', level: 'high' as const },
      { icon: Settings, label: 'Qt', level: 'medium' as const },
    ],
  },
  {
    name: 'Full Stack',
    icon: Code,
    technologies: [
      { icon: Code, label: 'TypeScript', level: 'high' as const },
      { icon: Code, label: 'Python', level: 'high' as const },
      { icon: Code, label: 'JavaScript', level: 'high' as const },
      { icon: Code, label: 'Node.js', level: 'high' as const },
    ],
  },
  {
    name: 'Frontend',
    icon: Globe,
    technologies: [
      { icon: Globe, label: 'Angular', level: 'high' as const },
      { icon: Globe, label: 'React', level: 'high' as const },
      { icon: Globe, label: 'Vue', level: 'medium' as const },
      { icon: Globe, label: 'HTML5', level: 'high' as const },
      { icon: Globe, label: 'CSS3', level: 'high' as const },
    ],
  },
  {
    name: 'Backend',
    icon: Database,
    technologies: [
      { icon: Database, label: 'PostgreSQL', level: 'medium' as const },
      { icon: Database, label: 'Node.js', level: 'high' as const },
      { icon: Database, label: 'Python', level: 'high' as const },
    ],
  },
]

export default function TechnologySection() {
  return (
    <div className="bg-gradient-to-br from-dark-lighter/80 to-dark-lighter/40 backdrop-blur-sm rounded-2xl p-8 border border-dark-lighter/50 hover:border-primary/30 transition-all duration-500 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <motion.div
            className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <Cpu className="text-primary" size={24} />
          </motion.div>
          <div>
            <h3 className="text-2xl font-bold text-white tracking-tight">Tecnologías</h3>
            <p className="text-sm text-gray-400 mt-0.5">Stack tecnológico y nivel de dominio</p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="space-y-8">
          {categories.map((category, categoryIndex) => {
            const CategoryIcon = category.icon
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
                className="space-y-4"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                    <CategoryIcon size={18} className="text-primary" />
                  </div>
                  <h4 className="text-primary font-bold text-sm uppercase tracking-widest">
                    {category.name}
                  </h4>
                  <div className="flex-1 h-px bg-gradient-to-r from-primary/30 via-primary/10 to-transparent" />
                  <span className="text-xs text-gray-500 font-medium">
                    {category.technologies.length} tecnologías
                  </span>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {category.technologies.map((tech, techIndex) => (
                    <motion.div
                      key={tech.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: categoryIndex * 0.1 + techIndex * 0.05 }}
                    >
                      <SkillBadge
                        icon={tech.icon}
                        label={tech.label}
                        level={tech.level}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
