'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Clock, Store, Hand, Award, Calendar, FileText } from 'lucide-react'
import { shopConfig, ContactPerson } from '../config'
import ActionsRow, { ActionsRowRef } from './ActionsRow'
import Card3D, { Face } from '../../../components/Card3D'
import PaymentFace from './PaymentFace'
import AppointmentFace from './AppointmentFace'
import { useLanguage } from '../../../contexts/LanguageContext'
import { playClickSound } from '../../../lib/playClickSound'

export default function Hero() {
  const { t } = useLanguage()
  const [currentFace, setCurrentFace] = useState<Face>('front')
  const [isFlipping, setIsFlipping] = useState(false)
  const [openStatus, setOpenStatus] = useState<{ isOpen: boolean; openTimeLabel: string; closeTimeLabel: string }>({
    isOpen: true,
    openTimeLabel: '10:30 AM',
    closeTimeLabel: '7:00 PM',
  })
  /** Flip duration in ms – set per transition so 180°/360°/540° all feel same speed */
  const [flipDurationMs, setFlipDurationMs] = useState(650)
  const actionsRowRef = useRef<ActionsRowRef>(null)

  // 180° = 0.65s, 360° = 1.3s, 540° = 2s (same angular speed)
  const DURATION_180_MS = 650
  const DURATION_360_MS = 1300
  const DURATION_540_MS = 2000

  const dayAbbrToIndex: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  }

  const computeOpenStatus = useCallback(() => {
    const hours = shopConfig?.contact?.storeHours || ''
    const normalized = hours
      .replace(/[–—]/g, '-')
      .replace(/\s+/g, ' ')
      .trim()

    // Example: "Mon-Sat 10:30 AM - 7:00 PM"
    const re = /(Sun|Mon|Tue|Wed|Thu|Fri|Sat)(?:\s*-\s*(Sun|Mon|Tue|Wed|Thu|Fri|Sat))?\s+(\d{1,2}:\d{2}\s*[AP]M)\s*-\s*(\d{1,2}:\d{2}\s*[AP]M)/i
    const match = normalized.match(re)
    if (!match) {
      return {
        isOpen: true,
        openTimeLabel: '10:30 AM',
        closeTimeLabel: '7:00 PM',
      }
    }

    const startDayStr = (match[1] || '').slice(0, 3)
    const endDayStr = (match[2] || startDayStr).slice(0, 3)
    const openTimeStr = match[3]
    const closeTimeStr = match[4]

    const startDay = dayAbbrToIndex[startDayStr]
    const endDay = dayAbbrToIndex[endDayStr]
    if (startDay === undefined || endDay === undefined) {
      return {
        isOpen: true,
        openTimeLabel: openTimeStr?.trim() || '10:30 AM',
        closeTimeLabel: closeTimeStr?.trim() || '7:00 PM',
      }
    }

    const parseTimeMinutes = (timeStr: string) => {
      const m = timeStr.match(/(\d{1,2}):(\d{2})\s*([AP]M)/i)
      if (!m) return 0
      let hh = Number(m[1])
      const mm = Number(m[2])
      const ap = m[3].toUpperCase()
      if (ap === 'PM' && hh < 12) hh += 12
      if (ap === 'AM' && hh === 12) hh = 0
      return hh * 60 + mm
    }

    const openMinutes = parseTimeMinutes(openTimeStr)
    const closeMinutes = parseTimeMinutes(closeTimeStr)
    const now = new Date()
    const nowDay = now.getDay()
    const nowMinutes = now.getHours() * 60 + now.getMinutes()

    // Inclusive day range (supports wrap-around like Fri-Mon)
    const daysInRange: number[] = []
    let i = startDay
    while (true) {
      daysInRange.push(i)
      if (i === endDay) break
      i = (i + 1) % 7
    }
    const dayOk = daysInRange.includes(nowDay)
    if (!dayOk) {
      return {
        isOpen: false,
        openTimeLabel: openTimeStr.trim(),
        closeTimeLabel: closeTimeStr.trim(),
      }
    }

    if (openMinutes <= closeMinutes) {
      const isOpen = nowMinutes >= openMinutes && nowMinutes < closeMinutes
      return {
        isOpen,
        openTimeLabel: openTimeStr.trim(),
        closeTimeLabel: closeTimeStr.trim(),
      }
    }
    // If close time is past midnight (rare for your current hours), handle wrap.
    const isOpen = nowMinutes >= openMinutes || nowMinutes < closeMinutes
    return {
      isOpen,
      openTimeLabel: openTimeStr.trim(),
      closeTimeLabel: closeTimeStr.trim(),
    }
  }, [])

  const getKeywordBadgeIcon = (badge: string) => {
    const b = badge.toLowerCase()
    if (b.includes('icai')) return Award
    if (b.includes('years') || b.includes('20+')) return Calendar
    if (b.includes('tax') || b.includes('gst')) return FileText
    return Hand
  }

  useEffect(() => {
    setOpenStatus(computeOpenStatus())
    const id = window.setInterval(() => {
      setOpenStatus(computeOpenStatus())
    }, 60 * 1000)
    return () => window.clearInterval(id)
  }, [computeOpenStatus])

  const handleFlip = (e?: React.MouseEvent, forceFlip = false) => {
    if (isFlipping) return
    if (!forceFlip && e && (e.target as HTMLElement).closest('button, a, [role="button"]')) {
      return
    }
    setFlipDurationMs(DURATION_180_MS)
    setIsFlipping(true)
    if (currentFace === 'front') {
      setCurrentFace('info')
    } else if (currentFace === 'info') {
      setCurrentFace('front')
    } else {
      setCurrentFace('info')
    }
    setTimeout(() => setIsFlipping(false), DURATION_180_MS)
  }

  const handleOpenPayments = useCallback(() => {
    setFlipDurationMs(DURATION_360_MS)
    setIsFlipping(true)
    setCurrentFace('payment')
    setTimeout(() => setIsFlipping(false), DURATION_360_MS)
  }, [])

  const handleBackFromPayment = () => {
    if (isFlipping) return
    setFlipDurationMs(DURATION_360_MS)
    setIsFlipping(true)
    setCurrentFace('front')
    setTimeout(() => setIsFlipping(false), DURATION_360_MS)
  }

  const handleOpenAppointment = useCallback(() => {
    // One clean flip (180° feel) instead of long 540° spin.
    setFlipDurationMs(DURATION_180_MS)
    setIsFlipping(true)
    setCurrentFace('appointment')
    setTimeout(() => setIsFlipping(false), DURATION_180_MS)
  }, [])

  const handleBackFromAppointment = () => {
    if (isFlipping) return
    setFlipDurationMs(DURATION_180_MS)
    setIsFlipping(true)
    setCurrentFace('front')
    setTimeout(() => setIsFlipping(false), DURATION_180_MS)
  }

  // Open payment face when returning from menu page (Proceed to Payment)
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem('openPayment')) {
      sessionStorage.removeItem('openPayment')
      const t = setTimeout(handleOpenPayments, 150)
      return () => clearTimeout(t)
    }
  }, [handleOpenPayments])

  // Open appointment face when coming from services page (Book Appointment)
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem('openAppointment') === 'true') {
      sessionStorage.removeItem('openAppointment')
      if (window.history.replaceState) {
        window.history.replaceState(null, '', window.location.pathname + (window.location.hash || ''))
      }
      const t = setTimeout(handleOpenAppointment, 200)
      return () => clearTimeout(t)
    }
  }, [handleOpenAppointment])

  // Flip card to back (Business Snapshot) when coming from "Flip Card" button
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem('openFlip') === 'true') {
      sessionStorage.removeItem('openFlip')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      const t = setTimeout(() => {
        setFlipDurationMs(650)
        setIsFlipping(true)
        setCurrentFace('info')
        setTimeout(() => setIsFlipping(false), 650)
      }, 450)
      return () => clearTimeout(t)
    }
  }, [])

  // If user navigates back from services/tools, force the main card front face.
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      if (sessionStorage.getItem('forceHeroFront') === 'true') {
        sessionStorage.removeItem('forceHeroFront')
        setCurrentFace('front')
      }
    } catch {
      // Ignore storage issues.
    }
  }, [])

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full max-w-md mx-auto pt-4 pb-6 min-w-0"
      style={{ width: '100%', maxWidth: 'min(100%, 28rem)' }}
    >
      <Card3D
        currentFace={currentFace}
        isFlipping={isFlipping}
        transitionDuration={flipDurationMs / 1000}
        faceFront={
          <div 
          className="backdrop-blur-md rounded-[24px] relative cursor-pointer"
          style={{
            background: '#ffffff',
            border: '1px solid rgba(226,232,240,0.9)',
            boxShadow: '0 18px 40px rgba(15,23,42,0.18), 0 0 0 1px rgba(148,163,184,0.25), inset 0 1px 0 rgba(255,255,255,0.95)',
            overflow: 'hidden',
            minHeight: '580px',
            boxSizing: 'border-box'
          }}
            onClick={(e) => {
              const target = e.target as HTMLElement
              const isButton = target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button, a')
              const isInActionsRow = target.closest('[data-actions-row]')
              const isInSocialIcons = target.closest('[data-social-icons]')
              const isSVG = target.tagName === 'svg' || target.closest('svg')
              const isInSVG = isSVG && target.closest('[data-social-icons]')
              if (!isButton && !isInActionsRow && !isInSocialIcons && !isInSVG) {
                handleFlip(e)
              }
            }}
          >
            {/* Tap to flip – Top Right */}
            {currentFace === 'front' && (
              <motion.button
                onClick={(e) => {
                  e.stopPropagation()
                  playClickSound()
                  handleFlip(e, true)
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute top-4 right-4 z-10 text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg cursor-pointer transition-all flex items-center gap-1.5 touch-manipulation border border-slate-200/80"
                style={{ WebkitTapHighlightColor: 'transparent', color: '#0f172a', background: 'rgba(255,255,255,0.95)' }}
              >
                <Hand className="w-3.5 h-3.5" style={{ color: '#1e40af' }} />
                {t('tapToFlip')}
              </motion.button>
            )}

            {/* Header – single image only */}
            <div className="relative h-40 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
              <Image
                src="/two-confident-business-man-shaking-hands-meeting-office-success-dealing-greeting-partner-concept.jpg"
                alt={shopConfig.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
            </div>

            {/* Social Media Icons - At header border line (same line as logo, right side) */}
            <motion.div 
              data-social-icons
              className="absolute right-2 z-20 flex items-center gap-3 social-icons-top"
              style={{ top: '8.5rem' }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ 
                opacity: 1, 
                y: 0,
              }}
              transition={{ duration: 0.4, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
              }}
              onMouseDown={(e) => {
                e.stopPropagation()
                e.preventDefault()
              }}
              onTouchStart={(e) => {
                e.stopPropagation()
                e.preventDefault()
              }}
            >
              {/* LinkedIn */}
              {shopConfig.social?.linkedin && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    playClickSound()
                    window.open(shopConfig.social!.linkedin!, '_blank', 'noopener,noreferrer')
                  }}
                  className="h-11 w-11 rounded-full shadow-2xl flex items-center justify-center transition-all cursor-pointer touch-manipulation"
                  style={{
                    background: 'rgba(255,255,255,0.95)',
                    border: '1px solid rgba(10,102,194,0.35)',
                    WebkitTapHighlightColor: 'transparent',
                    boxShadow: '0 8px 16px rgba(10, 102, 194, 0.18), 0 4px 8px rgba(0, 0, 0, 0.15)'
                  }}
                  title="LinkedIn"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                    fill="currentColor"
                    aria-hidden
                    style={{ color: '#0A66C2' }}
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </motion.button>
              )}
              {/* Email Us */}
              {shopConfig.contact?.email && (
                <motion.a
                  href={`mailto:${shopConfig.contact.email}?subject=${encodeURIComponent('Enquiry - Dogra Associates')}&body=${encodeURIComponent('Hello,\n\nI would like to inquire about your services.\n\nPlease reply at your convenience.\n\nThank you.')}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    playClickSound()
                  }}
                  onMouseDown={(e) => {
                    // Capture early on touch devices.
                    e.stopPropagation()
                    playClickSound()
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="h-11 w-11 rounded-full shadow-2xl flex items-center justify-center transition-all cursor-pointer touch-manipulation"
                  style={{
                    background: 'rgba(255,255,255,0.95)',
                    border: '1px solid rgba(59,130,246,0.35)',
                    WebkitTapHighlightColor: 'transparent',
                    boxShadow: '0 8px 16px rgba(59, 130, 246, 0.18), 0 4px 8px rgba(0, 0, 0, 0.15)'
                  }}
                  title="Email Us"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                    style={{ color: '#1E40AF' }}
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </motion.a>
              )}
              {/* WhatsApp - Opens Selector in Card */}
              <motion.button
                data-whatsapp-button
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  // Trigger WhatsApp selector in ActionsRow
                  actionsRowRef.current?.openWhatsAppSelector()
                }}
                onMouseDown={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                }}
                onTouchStart={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="h-11 w-11 p-0 rounded-full shadow-2xl border-2 border-[#25D366] flex items-center justify-center overflow-hidden transition-all cursor-pointer bg-white touch-manipulation"
                style={{ 
                  WebkitTapHighlightColor: 'transparent',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3), 0 4px 8px rgba(0, 0, 0, 0.2)'
                }}
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </motion.button>
            </motion.div>

            {/* Content – same padding as Mango on phone/desktop */}
            <div className="relative px-4 sm:px-5 pb-6 pt-3 max-w-full">
              {/* Logo Circle */}
              <motion.div 
                className="absolute -top-14 left-6"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                }}
                transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="w-32 h-32 rounded-full flex items-center justify-center overflow-hidden bg-white p-1.5"
                  style={{ border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 8px 30px rgba(0,0,0,0.4), 0 0 0 1px rgba(59,130,246,0.08)' }}
                >
                  <Image
                    src={shopConfig.assets.logo}
                    alt="Chartered Accountant Jammu - Dogra Associates Logo"
                    width={128}
                    height={128}
                    className="w-full h-full object-contain"
                    style={{ transform: 'scale(1.25)' }}
                  />
                </div>
              </motion.div>

              {/* Brand info - title + subtitle + tagline + badges */}
              <motion.div 
                className="pt-20 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <h1 className="text-2xl font-black mb-1 leading-tight tracking-tight" style={{ color: '#0f172a' }}>
                  {shopConfig.name}
                </h1>
                <p className="font-semibold text-[15px] mb-0.5" style={{ color: '#1e40af' }}>
                  {shopConfig.tagline}
                </p>
                {'serviceTagline' in shopConfig && (shopConfig as { serviceTagline?: string }).serviceTagline && (
                  <p className="text-sm font-medium mb-3" style={{ color: '#475569' }}>
                    {(shopConfig as { serviceTagline: string }).serviceTagline}
                  </p>
                )}
                {'keywordBadges' in shopConfig && Array.isArray(shopConfig.keywordBadges) && (
                  <div className="flex flex-wrap gap-1.5 gap-y-1.5 mb-4">
                    {shopConfig.keywordBadges.map((badge: string) => {
                      const Icon = getKeywordBadgeIcon(badge)
                      return (
                        <span
                          key={badge}
                          className="inline-flex items-center gap-1.5 px-2 py-[4px] rounded-full text-[11.5px] font-medium whitespace-nowrap"
                          style={{
                            background: 'rgba(30,64,175,0.1)',
                            color: '#1e40af',
                            border: '1px solid rgba(30,64,175,0.25)',
                          }}
                        >
                          <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#1e40af' }} strokeWidth={2} />
                          <span className="leading-none">{badge}</span>
                        </span>
                      )
                    })}
                    <span
                      className="inline-flex items-center gap-2 px-2.5 py-[4px] rounded-full text-[12px] font-bold whitespace-nowrap"
                      style={{
                        background: openStatus.isOpen ? 'rgba(34,197,94,0.14)' : 'rgba(239,68,68,0.14)',
                        color: openStatus.isOpen ? '#16a34a' : '#ef4444',
                        border: openStatus.isOpen ? '1px solid rgba(34,197,94,0.45)' : '1px solid rgba(239,68,68,0.45)',
                        boxShadow: openStatus.isOpen ? '0 10px 24px rgba(34,197,94,0.15)' : '0 10px 24px rgba(239,68,68,0.15)',
                        letterSpacing: '0.05px',
                        lineHeight: 1.1,
                      }}
                      title={shopConfig?.contact?.storeHours || 'Office hours'}
                    >
                      <Clock
                        className="w-4 h-4 flex-shrink-0"
                        style={{ color: openStatus.isOpen ? '#16a34a' : '#ef4444' }}
                        strokeWidth={2.2}
                      />
                      <span style={{ whiteSpace: 'nowrap' }}>{openStatus.isOpen ? 'Open now' : 'Closed now'}</span>
                      <span
                        style={{
                          display: 'inline-block',
                          marginLeft: 8,
                          fontSize: '10px',
                          fontWeight: 700,
                          opacity: 0.95,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {openStatus.isOpen ? `Closes ${openStatus.closeTimeLabel}` : `Opens ${openStatus.openTimeLabel}`}
                      </span>
                    </span>
                  </div>
                )}
              </motion.div>

              {/* Actions */}
              <motion.div
                data-actions-row
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
              >
                <ActionsRow 
                  ref={actionsRowRef}
                  onOpenPayments={handleOpenPayments}
                  onOpenAppointment={handleOpenAppointment}
                />
              </motion.div>

            </div>
          </div>
        }
        faceInfo={
          <div
            className="backdrop-blur-md rounded-[24px] shadow-2xl border-2 cursor-pointer relative h-full overflow-hidden flex flex-col"
            style={{
              minHeight: 'min(580px, 85dvh)',
              boxSizing: 'border-box',
              background: 'linear-gradient(135deg, #1E3A5F 0%, #2C5282 100%)',
              borderColor: 'rgba(59, 130, 246, 0.5)',
              boxShadow: '0 18px 40px rgba(15,42,68,0.25), 0 0 0 1px rgba(59,130,246,0.15)',
            }}
            onClick={(e) => {
              if ((e.target as HTMLElement).closest('button, a, [role="button"]')) return
              handleFlip(e, true)
            }}
          >
            {/* Tap to Return – same as Mango, bluish accent */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={currentFace === 'info' ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => { e.stopPropagation(); handleFlip(e, true); }}
              className="absolute top-4 right-4 z-10 text-xs text-white font-semibold bg-white/20 hover:bg-white/30 px-3 py-2 rounded-full backdrop-blur-md shadow-lg cursor-pointer transition-all flex items-center gap-1.5 touch-manipulation"
              style={{ WebkitTapHighlightColor: 'transparent' }}
              aria-label={t('tapToReturn')}
            >
              <Hand className="w-3.5 h-3.5 text-white" />
              <span style={{ fontSize: '12px' }}>{t('tapToReturn')}</span>
            </motion.button>

            {/* Animated background pattern – like Mango */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.08) 0%, transparent 50%)',
              }}
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Content – white text, glass blocks like Mango */}
            <div
              className="relative flex-1 flex flex-col items-center justify-center min-h-0 text-white overflow-hidden overflow-x-hidden"
              style={{
                paddingLeft: 'max(1rem, env(safe-area-inset-left) + 4px)',
                paddingRight: 'max(1rem, env(safe-area-inset-right) + 4px)',
                // Use clamped padding + vertical centering to avoid "empty space" feel
                // while keeping room for the top-right "Tap to Return" control.
                paddingTop: 'clamp(2.6rem, 5.5vh, 4rem)',
                paddingBottom: 'max(1rem, env(safe-area-inset-bottom) + 0.75rem)',
              }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={currentFace === 'info' ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
                className="w-full flex flex-col items-center max-w-[calc(100%-0.25rem)] flex-shrink-0 gap-0"
              >
                <h2 className="text-xl sm:text-2xl font-black mb-4 pt-1 pb-1 tracking-wide text-white text-center w-full [text-shadow:0_1px_3px_rgba(0,0,0,0.25)]">
                  Business Overview
                </h2>

                {/* Block 1: Location – glass block, icon in square */}
                <div className="flex items-start gap-3 w-full mb-3 rounded-2xl p-3 sm:p-4 bg-white/15 backdrop-blur-md border border-white/25 shadow-[0_4px_14px_rgba(0,0,0,0.12)]">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-white/20 border border-white/30 shadow-md">
                    <MapPin className="w-5 h-5 text-white drop-shadow-md" />
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <p className="text-sm font-bold leading-snug text-white/95">Location</p>
                    <p className="text-xs sm:text-sm leading-relaxed text-white/90">
                      {('snapshotLocationLine' in shopConfig && (shopConfig as { snapshotLocationLine?: string }).snapshotLocationLine) || (shopConfig as { contact: { address: string } }).contact.address}
                    </p>
                  </div>
                </div>

                {/* Block 2: Services – icon in square */}
                <div className="flex items-start gap-3 w-full mb-3 rounded-2xl p-3 sm:p-4 bg-white/15 backdrop-blur-md border border-white/25 shadow-[0_4px_14px_rgba(0,0,0,0.12)]">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-white/20 border border-white/30 shadow-md">
                    <Store className="w-5 h-5 text-white drop-shadow-md" />
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <p className="text-sm font-bold leading-snug text-white/95">Services Offered</p>
                    <p className="text-xs sm:text-sm leading-relaxed text-white/90">
                      {('snapshotServicesLine' in shopConfig && (shopConfig as { snapshotServicesLine?: string }).snapshotServicesLine) || (shopConfig as { serviceTagline?: string }).serviceTagline}
                    </p>
                  </div>
                </div>

                {/* Block 3: Office Hours – icon in square */}
                <div className="flex items-start gap-3 w-full mb-3 rounded-2xl p-3 sm:p-4 bg-white/15 backdrop-blur-md border border-white/25 shadow-[0_4px_14px_rgba(0,0,0,0.12)]">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-white/20 border border-white/30 shadow-md">
                    <Clock className="w-5 h-5 text-white drop-shadow-md" />
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <p className="text-sm font-bold leading-snug text-white/95">Office Hours</p>
                    <p className="text-xs sm:text-sm leading-relaxed text-white/90">
                      {('snapshotHours' in shopConfig && (shopConfig as { snapshotHours?: string }).snapshotHours) || (shopConfig as { contact: { storeHours: string } }).contact.storeHours}
                    </p>
                  </div>
                </div>

                {/* Google Map – glass style */}
                <div className="w-full h-28 sm:h-32 rounded-2xl overflow-hidden mb-4 pointer-events-none flex-shrink-0 bg-white/10 backdrop-blur-sm border border-white/25 shadow-[0_4px_14px_rgba(0,0,0,0.12)]">
                  <iframe
                    src={`https://www.google.com/maps?q=${encodeURIComponent(shopConfig.contact.mapQuery)}&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0, pointerEvents: 'none' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                {/* Open in Maps – same style as Mango (white pill on gradient) */}
                <div className="w-full flex flex-col items-center mt-2 pt-2" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
                  <motion.a
                    href={`https://www.google.com/maps?q=${encodeURIComponent(shopConfig.contact.mapQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center gap-2 bg-white/25 hover:bg-white/35 active:bg-white/40 text-white font-semibold px-6 py-3.5 rounded-full border border-white/30 backdrop-blur-sm touch-manipulation pointer-events-auto shadow-[0_10px_25px_rgba(0,0,0,0.3)] min-h-[48px] min-w-[180px]"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleFlip(e, true)
                      setTimeout(() => {
                        window.open(`https://www.google.com/maps?q=${encodeURIComponent(shopConfig.contact.mapQuery)}`, '_blank', 'noopener,noreferrer')
                      }, 700)
                    }}
                    style={{ fontSize: 'clamp(13px, 3.5vw, 15px)', WebkitTapHighlightColor: 'transparent' }}
                  >
                    <MapPin className="w-5 h-5 flex-shrink-0 text-white" />
                    Get Directions
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>
        }
        facePayment={
          <PaymentFace
            upiId={shopConfig.payment.upiId}
            upiId2={'upiId2' in shopConfig.payment ? shopConfig.payment.upiId2 : undefined}
            upiName={shopConfig.payment.upiName}
            upiQrImageUrl={shopConfig.payment.upiQrImageUrl}
            scannerImage={shopConfig.payment.scannerImage}
            bank={shopConfig.payment.bank}
            onBack={handleBackFromPayment}
          />
        }
        faceAppointment={
          <AppointmentFace onBack={handleBackFromAppointment} />
        }
      />

    </motion.section>
  )
}
