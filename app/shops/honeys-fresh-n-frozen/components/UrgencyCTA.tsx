'use client'

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ShieldCheck, Lock, MessageSquare, ArrowRight } from 'lucide-react'

import { playClickSound } from '../../../lib/playClickSound'

export default function UrgencyCTA() {
  const router = useRouter()

  const slides = useMemo(
    () => [
      {
        id: 'slide-1',
        icon: ShieldCheck,
        title: 'Take Control of Your Tax & Compliance',
        badge: 'Tax & Compliance',
        bgImage: '/gallery/Green%20and%20Yellow%20Modern%20Income%20Tax%20Filing%20Instagram%20Post.png',
        subtitle: 'From ITR filing to audits — we handle everything, stress-free.',
        ctaLabel: 'Start Now',
        action: 'scroll-services' as const,
      },
      {
        id: 'slide-2',
        icon: Lock,
        title: 'Avoid Penalties & Late Fees',
        badge: 'Deadline Protection',
        bgImage: '/gallery/Blue%20and%20Yellow%20Modern%20Income%20Tax%20Filing%20Instagram%20Post.png',
        subtitle: 'Stay compliant and never miss important deadlines.',
        ctaLabel: 'Book Consultation',
        action: 'to-services' as const,
      },
      {
        id: 'slide-3',
        icon: MessageSquare,
        title: 'Expert CA Support, Anytime',
        badge: 'Expert Guidance',
        bgImage: '/gallery/Green%20and%20Yellow%20Modern%20Income%20Tax%20Filing%20Instagram%20Post.png',
        subtitle: 'Get personalized guidance for all your financial needs.',
        ctaLabel: 'Talk to Expert',
        action: 'to-services' as const,
      },
    ],
    [],
  )

  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const t = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length)
    }, 4500)
    return () => window.clearInterval(t)
  }, [paused, slides.length])

  const active = slides[activeIndex]
  const Icon = active.icon

  const handleCTA = () => {
    playClickSound()
    if (active.action === 'scroll-services') {
      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
    // Ensure when user comes back to home, card lands on the main (front) face.
    try {
      sessionStorage.setItem('forceHeroFront', 'true')
      sessionStorage.removeItem('openAppointment')
      sessionStorage.removeItem('openPayment')
      sessionStorage.removeItem('openFlip')
    } catch {
      // Ignore storage issues.
    }
    router.push('/services')
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="w-full max-w-md mx-auto py-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        className="relative rounded-2xl overflow-hidden px-5 py-5 border group"
        style={{
          borderColor: 'rgba(99,102,241,0.35)',
          boxShadow:
            '0 8px 32px rgba(99, 102, 241, 0.18), 0 2px 12px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
          background:
            'linear-gradient(135deg, #E0E7FF 0%, #EEF2FF 35%, #ffffff 70%, #F8FAFC 100%)',
          color: '#1e293b',
        }}
      >
        {/* Blurred bokeh image layer (service-card vibe) */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            transform: 'translateZ(0)',
            zIndex: 0,
          }}
        >
          <Image
            src={active.bgImage}
            alt=""
            fill
            unoptimized
            priority={activeIndex === 0}
            className="object-cover opacity-35 blur-3xl scale-[1.18]"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, rgba(15,23,42,0.42) 0%, rgba(30,64,175,0.18) 55%, rgba(255,255,255,0.06) 100%)',
            }}
          />
        </div>

        {/* Shiny top edge */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-1/2 opacity-60 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 100%)',
          }}
        />

        {/* Subtle indigo glow on hover */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-indigo-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background:
              'linear-gradient(135deg, rgba(99,102,241,0.18) 0%, rgba(59,130,246,0.06) 55%, rgba(255,255,255,0) 100%)',
          }}
        />

        <div className="relative z-10 flex items-start gap-4">
          {/* Left icon */}
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center border flex-shrink-0"
            style={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.98) 0%, #C7D2FE 100%)',
              borderColor: 'rgba(99,102,241,0.35)',
              boxShadow:
                '0 4px 14px rgba(99, 102, 241, 0.25), inset 0 1px 0 rgba(255,255,255,0.9)',
            }}
          >
            <Icon className="w-7 h-7 relative z-10" style={{ color: '#4338CA' }} strokeWidth={2} />
          </div>

          {/* Slide content */}
          <div className="flex-1 min-w-0 flex flex-col min-h-[140px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -3, scale: 0.985 }}
                transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3
                  className="text-xl sm:text-2xl font-bold tracking-tight leading-snug"
                  style={{ color: '#1e293b' }}
                >
                  {active.title}
                </h3>
                <p className="mt-1 text-sm sm:text-base leading-relaxed" style={{ color: '#475569' }}>
                  {active.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* CTA button bottom/right */}
            <div className="mt-auto pt-2 flex justify-end">
              <button
                type="button"
                onClick={handleCTA}
                className="inline-flex items-center justify-center gap-2 rounded-xl font-semibold touch-manipulation w-full sm:w-auto"
                style={{
                  padding: '12px 18px',
                  background: 'linear-gradient(135deg, #1E40AF 0%, #2B6CB0 45%, #3A7BD5 100%)',
                  color: '#fff',
                  border: '1px solid rgba(59,130,246,0.55)',
                  boxShadow:
                    '0 12px 30px rgba(59,130,246,0.35), inset 0 1px 0 rgba(255,255,255,0.18)',
                  transition: 'transform 160ms ease, box-shadow 160ms ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget
                  el.style.transform = 'translateY(-1px)'
                  el.style.boxShadow =
                    '0 16px 36px rgba(59,130,246,0.45), inset 0 1px 0 rgba(255,255,255,0.22)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget
                  el.style.transform = 'translateY(0px)'
                  el.style.boxShadow =
                    '0 12px 30px rgba(59,130,246,0.35), inset 0 1px 0 rgba(255,255,255,0.18)'
                }}
              >
                <span>{active.ctaLabel}</span>
                <ArrowRight className="w-5 h-5 shrink-0" />
              </button>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="relative z-10 mt-4 flex items-center justify-center gap-2">
          {slides.map((s, i) => {
            const isActive = i === activeIndex
            return (
              <button
                key={s.id}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={isActive ? 'true' : 'false'}
                onClick={() => {
                  playClickSound()
                  setActiveIndex(i)
                }}
                className="w-2.5 h-2.5 rounded-full transition-all"
                style={{
                  background: isActive ? '#3A7BD5' : 'rgba(71,85,105,0.22)',
                  boxShadow: isActive ? '0 0 0 4px rgba(59,130,246,0.15)' : 'none',
                  transform: isActive ? 'scale(1.15)' : 'scale(1)',
                }}
              />
            )
          })}
        </div>
      </motion.div>
    </motion.section>
  )
}

