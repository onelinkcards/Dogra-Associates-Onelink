'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  FileText,
  Building2,
  CheckCircle,
  BarChart3,
  Calendar,
  type LucideIcon,
} from 'lucide-react'
import Image from 'next/image'
import { servicesPreviewCards } from '../services'

const cardIconMap: Record<(typeof servicesPreviewCards)[number]['key'], LucideIcon> = {
  taxGst: FileText,
  businessCompliance: Building2,
  auditFinancial: CheckCircle,
  advisoryPlanning: BarChart3,
}

export default function MenuPreview() {
  return (
    <section id="services" className="w-full max-w-md mx-auto py-8">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="mb-6"
      >
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 text-white">
          Our Services
        </h2>
        <p className="text-sm sm:text-base font-medium text-white/90">
          Tax • GST • Business Compliance • Financial Advisory
        </p>
      </motion.div>

      {/* 4 card grid – same layout & sizing as Mango Our Menu */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {servicesPreviewCards.map((card, index) => {
          const IconComponent = cardIconMap[card.key]
          return (
            <Link key={card.key} href={card.href} className="block">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: index * 0.05, duration: 0.35, ease: 'easeOut' }}
                className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group shadow-lg transition-all duration-300 border border-white/10"
              >
                <Image
                  src={card.image}
                  alt={card.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 448px) 50vw, 224px"
                />
                <div
                  className="absolute inset-0 z-[1]"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.88) 25%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.25) 75%, rgba(0,0,0,0.05) 100%)',
                  }}
                />
                {/* Icon: top-right corner – same as Mango */}
                <div className="absolute top-3 right-3 w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center z-10 bg-white/20 border border-white/40 shadow-lg">
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-white" strokeWidth={2} />
                </div>
                {/* Text: title bold white, subtitle lighter – gallery card style like Mango */}
                <div className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-4 z-10">
                  <h3 className="text-white font-bold text-base sm:text-lg mb-0.5 leading-tight line-clamp-2" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.85)' }}>
                    {card.name}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm font-medium leading-snug mb-2 line-clamp-2" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.7)' }}>
                    {card.shortDescription}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-slate-200 font-semibold text-xs sm:text-sm bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full transition-colors border border-white/30">
                    View Services
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </span>
                </div>
              </motion.div>
            </Link>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15, duration: 0.3 }}
        className="flex gap-3"
        style={{ marginTop: 18 }}
      >
        <Link
          href="/services"
          className="flex-1 flex items-center justify-center gap-2 rounded-[14px] font-semibold text-[15px] transition-opacity hover:opacity-95"
          style={{
            background: 'linear-gradient(135deg, #1E40AF 0%, #3A7BD5 100%)',
            color: '#FFFFFF',
            padding: 14,
            fontWeight: 600,
            boxShadow: '0 10px 25px rgba(59, 130, 246, 0.35)',
          }}
        >
          View All Services
          <ArrowRight className="w-5 h-5 flex-shrink-0" />
        </Link>
        <Link
          href="/services"
          className="flex-1 flex items-center justify-center gap-2 rounded-[14px] font-semibold text-[15px] transition-all duration-300 hover:opacity-95 active:scale-[0.98]"
          style={{
            background: '#FFFFFF',
            color: '#0F2A44',
            border: '1px solid rgba(59, 130, 246, 0.35)',
            boxShadow: '0 10px 25px rgba(59, 130, 246, 0.12)',
            padding: 14,
            fontWeight: 600,
          }}
        >
          <Calendar className="w-5 h-5 flex-shrink-0" style={{ color: '#1E40AF' }} />
          Book Services
        </Link>
      </motion.div>
    </section>
  )
}
