'use client'

import { motion } from 'framer-motion'
import Sidebar from '@/components/Sidebar'
import NodeEditor from '@/components/NodeEditor'
import CodeEditor from '@/components/CodeEditor'
import Terminal from '@/components/Terminal'

export default function Home() {
  return (
    <main className="h-screen w-screen flex overflow-hidden bg-dark">
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
    </main>
  )
}

