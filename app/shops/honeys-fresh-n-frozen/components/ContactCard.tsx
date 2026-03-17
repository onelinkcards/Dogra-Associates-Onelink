'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { shopConfig } from '../config'
import { getTelLink } from '../../../lib/phone'

export default function ContactCard() {
  const sectionRef = useRef<HTMLElement | null>(null)

  const openMap = () => {
    window.open(`https://www.google.com/maps?q=${encodeURIComponent(shopConfig.contact.mapQuery)}`, '_blank')
  }

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="w-full max-w-md mx-auto py-6"
    >
      <div
        className="rounded-3xl p-6"
        style={{
          background: 'linear-gradient(135deg, #1E3A5F 0%, #2C5282 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 8px 20px rgba(15,42,68,0.12)',
        }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 text-center tracking-tight">
          Get in Touch
        </h2>

      <div className="space-y-3">
        {/* Phone - Three Contacts */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.05, duration: 0.3, ease: 'easeOut' }}
          className="rounded-2xl p-4 transition-all"
          style={{ willChange: 'opacity', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}
        >
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#EAF3FF' }}>
              <svg viewBox="0 0 24 24" className="w-5 h-5" style={{ color: '#3A7BD5' }} fill="currentColor">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white mb-2 text-base">Phone</h3>
              <div className="space-y-2">
                {shopConfig.contactPersons.map((person) => (
                  <div key={person.label} className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-white">{person.label}</div>
                      <div className="text-xs text-white/80">{person.phoneDisplay}</div>
                    </div>
                    <Button
                      onClick={() => window.location.href = getTelLink(person.phoneE164)}
                      className="h-8 px-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-white/30"
                    >
                      Call
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* LinkedIn */}
        {shopConfig.social?.linkedin && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1, duration: 0.3, ease: 'easeOut' }}
            className="rounded-2xl p-4 transition-all"
            style={{ willChange: 'opacity', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#EAF3FF' }}>
                <svg viewBox="0 0 24 24" className="w-5 h-5" style={{ color: '#0A66C2' }} fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white mb-1.5 text-base">LinkedIn</h3>
                <p className="text-sm text-white/90 break-all">Get in touch on LinkedIn</p>
              </div>
            </div>
            <Button
              onClick={() => window.open(shopConfig.social.linkedin, '_blank', 'noopener,noreferrer')}
              className="w-full h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/30"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 mr-2 fill-current" aria-hidden>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </Button>
          </motion.div>
        )}

        {/* Email Us */}
        {shopConfig.contact?.email && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.12, duration: 0.3, ease: 'easeOut' }}
            className="rounded-2xl p-4 transition-all"
            style={{ willChange: 'opacity', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#EAF3FF' }}>
                <svg viewBox="0 0 24 24" className="w-5 h-5" style={{ color: '#3A7BD5' }} fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white mb-1.5 text-base">Email Us</h3>
                <p className="text-sm text-white/90 break-all">{shopConfig.contact.email}</p>
              </div>
            </div>
            <Button asChild className="w-full h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/30">
              <a
                href={`mailto:${shopConfig.contact.email}?subject=${encodeURIComponent('Enquiry - Dogra Associates')}&body=${encodeURIComponent('Hello,\n\nI would like to inquire about your services.\n\nPlease reply at your convenience.\n\nThank you.')}`}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Email Us
              </a>
            </Button>
          </motion.div>
        )}

        {/* Address with Map */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.15, duration: 0.3, ease: 'easeOut' }}
          className="rounded-2xl overflow-hidden transition-all"
          style={{ willChange: 'opacity', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}
        >
          <div className="p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#EAF3FF' }}>
                <svg viewBox="0 0 24 24" className="w-5 h-5" style={{ color: '#3A7BD5' }} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white mb-1.5 text-base">Location</h3>
                <p className="text-sm text-white/90 leading-relaxed mb-3">
                  {shopConfig.contact.address}
                </p>
              </div>
            </div>
            <Button
              onClick={openMap}
              className="w-full h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/30"
            >
              <MapPin className="w-4 h-4 mr-2 text-white" />
              Open in Maps
            </Button>
          </div>

          {/* Embedded Map */}
          <div className="h-48 bg-slate-800/50 backdrop-blur-sm">
            <iframe
              src={`https://www.google.com/maps?q=${encodeURIComponent(shopConfig.contact.mapQuery)}&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* Store Hours */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.2, duration: 0.3, ease: 'easeOut' }}
          className="rounded-2xl p-4 transition-all"
          style={{ willChange: 'opacity', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#EAF3FF' }}>
              <svg viewBox="0 0 24 24" className="w-5 h-5" style={{ color: '#3A7BD5' }} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white mb-1.5 text-base">Store Hours</h3>
              <p className="text-sm text-white/90">
                {shopConfig.contact.storeHours}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      </div>
    </motion.section>
  )
}
