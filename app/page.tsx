'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import NodeEditor from '@/components/NodeEditor'
import CodeEditor from '@/components/CodeEditor'
import Terminal from '@/components/Terminal'
import ContactBar from '@/components/ContactBar'
import ProfileSection from '@/components/ProfileSection'
import AchievementsSection from '@/components/AchievementsSection'
import { ChevronUp, ChevronDown } from 'lucide-react'

export default function Home() {
  const [showProfile, setShowProfile] = useState(true)
  const [showAchievements, setShowAchievements] = useState(true)

  return (
    <main className="h-screen w-screen flex flex-col bg-dark overflow-hidden">
      {/* Top Contact Bar */}
      <ContactBar />

      {/* Profile Section */}
      <motion.div
        animate={{
          height: showProfile ? 'auto' : 0,
          opacity: showProfile ? 1 : 0,
        }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <ProfileSection />
      </motion.div>

      {/* Achievements Section */}
      <motion.div
        animate={{
          height: showAchievements ? 'auto' : 0,
          opacity: showAchievements ? 1 : 0,
        }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="overflow-hidden"
        style={{ maxHeight: showAchievements ? '400px' : '0' }}
      >
        <div className="overflow-y-auto max-h-96">
          <AchievementsSection />
        </div>
      </motion.div>

      {/* Toggle Buttons */}
      <div className="flex items-center justify-center gap-2 py-2 bg-dark-lighter border-y border-dark-lighter shrink-0">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowProfile(!showProfile)}
          className="px-4 py-2 bg-dark hover:bg-dark-lighter rounded transition-colors flex items-center gap-2 text-sm text-gray-300 hover:text-white"
        >
          {showProfile ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          {showProfile ? 'Ocultar' : 'Mostrar'} Perfil
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowAchievements(!showAchievements)}
          className="px-4 py-2 bg-dark hover:bg-dark-lighter rounded transition-colors flex items-center gap-2 text-sm text-gray-300 hover:text-white"
        >
          {showAchievements ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          {showAchievements ? 'Ocultar' : 'Mostrar'} Avances
        </motion.button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Top Section - Node Editor */}
          <div className="flex-1 flex">
            {/* Code Editor (Left) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-1/2 border-r border-dark-lighter"
            >
              <CodeEditor />
            </motion.div>

            {/* Node Graph (Right) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-1/2"
            >
              <NodeEditor />
            </motion.div>
          </div>

          {/* Bottom Section - Terminal */}
          <Terminal />
        </div>
      </div>
    </main>
  )
}

