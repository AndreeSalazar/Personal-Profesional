'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Github, ExternalLink, Star, Code2, Rocket, Award } from 'lucide-react'
import { useRef } from 'react'

const achievements = [
  {
    id: 1,
    title: 'Vulkan Render Engine',
    description: 'Motor de renderizado minimalista 3D construido con C++ y Vulkan API. Implementación completa del pipeline gráfico con renderizado en tiempo real.',
    tech: ['C++', 'Vulkan API', 'GLSL', 'CMake'],
    link: 'https://github.com/AndreeSalazar/Motor-de-Render-Minimalista',
    icon: Rocket,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 2,
    title: 'Omega Visual Editor',
    description: 'Editor de código visual basado en nodos con comprensión semántica. Enfoque alternativo a las interfaces de codificación tradicionales.',
    tech: ['Python', 'Qt', 'Node System'],
    link: 'https://github.com/AndreeSalazar/Omega-Visual-Semantic-Node-Based-Code-Editor',
    icon: Code2,
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 3,
    title: 'Angular Portfolio',
    description: 'SPA profesional con arquitectura avanzada de componentes, enrutamiento dinámico y patrones modernos de diseño UI/UX.',
    tech: ['Angular', 'TypeScript', 'RxJS', 'CSS3'],
    link: 'https://github.com/AndreeSalazar/Angular-1-Portfolio',
    icon: Star,
    color: 'from-red-500 to-orange-500',
  },
  {
    id: 4,
    title: 'Professional Portfolio',
    description: 'Sitio web de portafolio responsivo con animaciones CSS avanzadas, formulario de contacto funcional y rendimiento optimizado.',
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
      staggerChildren: 0.15,
    },
  },
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
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

export default function AchievementsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50])

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className="w-full bg-dark border-b border-dark-lighter py-16"
    >
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Mis <span className="text-primary">Avances</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Proyectos destacados y logros en desarrollo
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              variants={cardVariants}
              whileHover={{
                y: -10,
                scale: 1.02,
                transition: {
                  duration: 0.3,
                },
              }}
              className="group relative bg-dark-lighter rounded-lg p-6 border border-dark-lighter hover:border-primary/50 transition-all duration-300 overflow-hidden"
            >
              {/* Gradient Background Effect */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                initial={false}
              />

              {/* Animated Border Glow */}
              <motion.div
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none"
                style={{
                  background: `linear-gradient(90deg, transparent, rgba(255, 107, 53, 0.4), transparent)`,
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
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none"
                style={{
                  background: `linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)`,
                  backgroundSize: '200% 200%',
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />

              {/* Icon */}
              <motion.div
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{
                  delay: index * 0.1,
                  type: 'spring',
                  stiffness: 200,
                }}
                whileHover={{ rotate: 360 }}
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${achievement.color} flex items-center justify-center mb-4 relative z-10`}
              >
                <achievement.icon className="text-white" size={24} />
              </motion.div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  {achievement.title}
                </h3>
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                  {achievement.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {achievement.tech.map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.6 + index * 0.1 + techIndex * 0.05,
                        type: 'spring',
                        stiffness: 200,
                      }}
                      className="px-3 py-1 bg-dark text-gray-300 text-xs rounded-full border border-dark-lighter"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {/* Link */}
                <motion.a
                  href={achievement.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors text-sm font-medium"
                >
                  <Github size={16} />
                  Ver en GitHub
                  <ExternalLink size={14} />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

