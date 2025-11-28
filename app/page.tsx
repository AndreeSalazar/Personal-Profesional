'use client'

import { motion } from 'framer-motion'
import Sidebar from '@/components/Sidebar'
import NodeEditor from '@/components/NodeEditor'
import CodeEditor from '@/components/CodeEditor'
import Terminal from '@/components/Terminal'
import ContactBar from '@/components/ContactBar'

export default function Home() {
  return (
    <main className="h-screen w-full flex flex-col bg-black overflow-hidden metallic-overlay relative">
      {/* Animated background effects */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        animate={{
          background: [
            'radial-gradient(circle at 0% 0%, rgba(255, 107, 53, 0.03) 0%, transparent 50%)',
            'radial-gradient(circle at 100% 100%, rgba(255, 107, 53, 0.03) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(255, 107, 53, 0.05) 0%, transparent 50%)',
            'radial-gradient(circle at 0% 0%, rgba(255, 107, 53, 0.03) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Top Contact Bar */}
      <div className="relative z-10">
        <ContactBar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden min-h-0 relative z-10">
        {/* Left Sidebar - Hidden on mobile, show on larger screens */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Section - Node Editor */}
          <div className="flex-1 flex flex-col lg:flex-row min-h-0">
            {/* Code Editor - Full width on mobile, half on desktop */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col min-h-0 relative"
              style={{
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), inset 1px 0 0 rgba(255, 255, 255, 0.05)',
              }}
            >
              <CodeEditor />
            </motion.div>

            {/* Node Graph - Full width on mobile, half on desktop */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-full lg:w-1/2 flex flex-col min-h-0 relative"
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

