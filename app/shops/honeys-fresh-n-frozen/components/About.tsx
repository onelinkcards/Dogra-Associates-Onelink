'use client'

import { motion } from 'framer-motion'
import { shopConfig } from '../config'

export default function About() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="w-full max-w-md mx-auto py-6"
    >
      <div
        className="rounded-3xl p-7 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1E3A5F 0%, #2C5282 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 8px 20px rgba(15,42,68,0.12)',
        }}
      >
        <div className="relative">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight">
            {shopConfig.about.title}
          </h2>
          <p className="text-white/90 leading-[1.7] text-[15px]">
            {shopConfig.about.shortDescription}
          </p>
        </div>
      </div>
    </motion.section>
  )
}
