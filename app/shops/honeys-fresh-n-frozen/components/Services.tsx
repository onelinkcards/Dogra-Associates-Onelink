'use client'

import { motion } from 'framer-motion'
import { Award, MessageSquare, ShieldCheck, Lock } from 'lucide-react'

const whyChooseUs = [
  {
    id: 'why-1',
    icon: Award,
    title: 'Experienced CA',
    description:
      'Led by Ramit Khurana, Chartered Accountant with 20+ years experience.',
  },
  {
    id: 'why-2',
    icon: MessageSquare,
    title: 'Personalized Consultation',
    description:
      'Tailored tax and compliance strategies for individuals and businesses.',
  },
  {
    id: 'why-3',
    icon: ShieldCheck,
    title: 'End-to-End Compliance',
    description:
      'GST, Income Tax, registration and audit handled under one roof.',
  },
  {
    id: 'why-4',
    icon: Lock,
    title: 'Secure Document Handling',
    description:
      'Documents shared securely via WhatsApp or email.',
  },
]

export default function Services() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="w-full max-w-md mx-auto py-6"
    >
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1.5 text-white">
          Why Choose Us
        </h2>
        <p className="text-sm font-normal text-white/90">
          Trusted financial guidance with years of expertise
        </p>
      </div>

      {/* Why Choose Us cards - Mango-style gradient, CA colour sense (indigo/slate, no yellow) */}
      <div className="grid grid-cols-1 gap-3">
        {whyChooseUs.map((item, index) => {
          const IconComponent = item.icon
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.05, duration: 0.3, ease: 'easeOut' }}
              className="relative rounded-2xl p-5 flex items-center gap-4 overflow-hidden group hover:shadow-2xl transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #E0E7FF 0%, #EEF2FF 35%, #ffffff 70%, #F8FAFC 100%)',
                border: '1px solid rgba(99, 102, 241, 0.35)',
                boxShadow: '0 8px 32px rgba(99, 102, 241, 0.18), 0 2px 12px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
              }}
            >
              {/* Shiny top-edge highlight */}
              <div
                className="absolute inset-x-0 top-0 h-1/2 rounded-t-2xl opacity-60 pointer-events-none"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 100%)',
                }}
              />
              {/* Subtle indigo glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              {/* Icon container - indigo tint */}
              <div
                className="relative w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 border border-indigo-200/80"
                style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.98) 0%, #C7D2FE 100%)',
                  boxShadow: '0 4px 14px rgba(99, 102, 241, 0.25), inset 0 1px 0 rgba(255,255,255,0.9)',
                }}
              >
                <IconComponent
                  className="w-7 h-7 relative z-10"
                  style={{ color: '#4338CA' }}
                  strokeWidth={2}
                />
              </div>
              <div className="flex-1 relative z-10">
                <h3 className="font-bold text-base mb-1 leading-tight" style={{ color: '#1e293b' }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
                  {item.description}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.section>
  )
}
