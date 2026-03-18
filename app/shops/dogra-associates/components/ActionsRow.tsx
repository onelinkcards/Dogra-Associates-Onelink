'use client'

import { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Download, MapPin, Mail, X, Calendar, FileText, Share2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { shopConfig, ContactPerson } from '../config'
import { getTelLink, getWhatsAppLink, formatPhoneDisplay } from '../../../lib/phone'
import { generateVCard, downloadVCard } from '../../../lib/vcard'
import { playClickSound } from '../../../lib/playClickSound'
import { useLanguage } from '../../../contexts/LanguageContext'

interface ActionsRowProps {
  onOpenPayments?: () => void
  onOpenAppointment?: () => void
}

export interface ActionsRowRef {
  openWhatsAppSelector: () => void
}

const ActionsRow = forwardRef<ActionsRowRef, ActionsRowProps>(({ onOpenPayments, onOpenAppointment }, ref) => {
  const { t } = useLanguage()
  const [callSelectorOpen, setCallSelectorOpen] = useState(false)
  const [whatsappSelectorOpen, setWhatsappSelectorOpen] = useState(false)
  const callSelectorRef = useRef<HTMLDivElement>(null)
  const whatsappSelectorRef = useRef<HTMLDivElement>(null)

  // Expose WhatsApp selector toggle to parent via ref
  useImperativeHandle(ref, () => ({
    openWhatsAppSelector: () => {
      setWhatsappSelectorOpen(true)
      setCallSelectorOpen(false)
    },
  }))

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (callSelectorOpen || whatsappSelectorOpen) {
        const target = e.target as HTMLElement
        if (!target.closest('.popup-selector') && !target.closest('[data-call-button]') && !target.closest('[data-whatsapp-button]')) {
          setCallSelectorOpen(false)
          setWhatsappSelectorOpen(false)
        }
      }
    }

    if (callSelectorOpen || whatsappSelectorOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [callSelectorOpen, whatsappSelectorOpen])

  const handleCall = (person: ContactPerson) => {
    playClickSound()
    const telLink = getTelLink(person.phoneE164)
    window.location.href = telLink
    setCallSelectorOpen(false)
  }

  const handleWhatsApp = (person: ContactPerson) => {
    playClickSound()
    const message = shopConfig.whatsapp?.defaultMessage || 'Hello Sir, I need consultation regarding tax services.'
    const whatsappLink = getWhatsAppLink(person.whatsappE164, message)
    window.open(whatsappLink, '_blank')
    setWhatsappSelectorOpen(false)
  }

  const handleDirections = () => {
    playClickSound()
    const mapUrl = shopConfig.google?.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shopConfig.contact.mapQuery)}`
    window.open(mapUrl, '_blank')
  }

  const handleSaveContact = () => {
    playClickSound()
    const vCard = generateVCard({
      name: shopConfig.name,
      organization: shopConfig.name,
      phones: shopConfig.contactPersons.map(p => p.phoneE164.replace(/^91/, '')),
      email: shopConfig.contact.email,
      address: shopConfig.contact.address,
      website: shopConfig.url,
    })
    downloadVCard(vCard, `${shopConfig.name.replace(/\s+/g, '-')}-contact.vcf`)
  }

  const handleShare = async () => {
    playClickSound()
    if (navigator.share) {
      try {
        await navigator.share({
          title: shopConfig.name,
          text: `Check out ${shopConfig.name} - ${shopConfig.tagline}`,
          url: window.location.href,
        })
      } catch (err) {
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }


  return (
    <>
      <div className="space-y-3 w-full max-w-full min-w-0" onClick={(e) => e.stopPropagation()}>
        {/* Row 1: Call Now | Payment – equal width like Mango */}
        <div className="grid grid-cols-2 gap-2 w-full min-w-0">
          <Button
            data-call-button
            title="Call our office"
            onClick={(e) => {
              e.stopPropagation()
              playClickSound()
              setCallSelectorOpen(!callSelectorOpen)
              setWhatsappSelectorOpen(false)
            }}
            className="w-full min-w-0 h-11 text-white font-semibold rounded-full transition-all flex items-center justify-center gap-2 active:scale-[0.97] touch-manipulation relative overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 50%, #1D4ED8 100%)',
              boxShadow: '0 8px 20px rgba(37, 99, 235, 0.4), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              WebkitTapHighlightColor: 'transparent',
              transform: 'translateY(-1px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 12px 28px rgba(37, 99, 235, 0.5), 0 6px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'
              e.currentTarget.style.background = 'linear-gradient(135deg, #4A90F4 0%, #2E7CE8 50%, #2563EB 100%)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(37, 99, 235, 0.4), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              e.currentTarget.style.transform = 'translateY(-1px) scale(1)'
              e.currentTarget.style.background = 'linear-gradient(135deg, #3B82F6 0%, #2563EB 50%, #1D4ED8 100%)'
            }}
          >
            <Phone className="w-4 h-4 relative z-10" style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))' }} />
            <span className="text-sm font-bold relative z-10 truncate" style={{ fontSize: '14px', textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}>{t('callNow')}</span>
          </Button>

          {onOpenPayments && (
            <div className="min-w-0 relative">
              <Button
                title="Secure online payment"
                onClick={(e) => {
                  e.stopPropagation()
                  playClickSound()
                  onOpenPayments()
                }}
                className="w-full h-11 text-white font-semibold rounded-full transition-all flex items-center justify-center gap-2 active:scale-[0.97] touch-manipulation relative overflow-hidden group"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, rgb(21, 124, 130) 0%, rgb(15, 118, 110) 40%, rgb(17, 19, 21) 100%)',
                  boxShadow: '0 8px 20px rgba(21, 124, 130, 0.4), 0 4px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                  WebkitTapHighlightColor: 'transparent',
                  transform: 'translateY(-1px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(21, 124, 130, 0.5), 0 6px 12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'
                  e.currentTarget.style.background = 'radial-gradient(circle at 30% 30%, rgb(25, 140, 145) 0%, rgb(20, 130, 120) 40%, rgb(20, 25, 30) 100%)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(21, 124, 130, 0.4), 0 4px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                  e.currentTarget.style.transform = 'translateY(-1px) scale(1)'
                  e.currentTarget.style.background = 'radial-gradient(circle at 30% 30%, rgb(21, 124, 130) 0%, rgb(15, 118, 110) 40%, rgb(17, 19, 21) 100%)'
                }}
              >
                <Image
                  src="/icons8-bhim-48.png"
                  alt="BHIM UPI"
                  width={24}
                  height={24}
                  className="relative z-10 shrink-0"
                  style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }}
                />
                <span
                  className="text-sm font-bold relative z-10"
                  style={{ fontSize: '14px', textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)' }}
                >
                  {t('openPayment')}
                </span>
              </Button>
            </div>
          )}
        </div>

        {/* Row 2: Our Services | Book Service */}
        <div className="grid grid-cols-2 gap-2 w-full min-w-0">
          <Link
            href="/services"
            onClick={(e) => {
              e.stopPropagation()
              playClickSound()
              // Coming back to home should show main card front face.
              try {
                sessionStorage.setItem('forceHeroFront', 'true')
                sessionStorage.removeItem('openAppointment')
                sessionStorage.removeItem('openPayment')
                sessionStorage.removeItem('openFlip')
              } catch {
                // Ignore storage issues.
              }
            }}
            title="Our Services"
            className="h-11 bg-white/90 backdrop-blur-md hover:bg-white rounded-2xl transition-all flex items-center justify-center gap-1.5 active:scale-[0.97] touch-manipulation min-w-0"
            style={{
              color: '#0F172A',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
              borderRadius: '16px',
              fontSize: '14px',
              WebkitTapHighlightColor: 'transparent',
              transform: 'translateY(-1px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
          >
            <FileText className="w-5 h-5 shrink-0" style={{ color: '#1E40AF' }} />
            <span className="text-sm font-bold truncate" style={{ color: '#0F172A', fontSize: '14px' }}>Our Services</span>
          </Link>
          <Button
            title="Book a service"
            onClick={(e) => {
              e.stopPropagation()
              playClickSound()
              onOpenAppointment?.()
            }}
            className="h-11 text-white rounded-2xl transition-all flex items-center justify-center gap-1.5 active:scale-[0.97] touch-manipulation min-w-0"
            style={{
              background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
              boxShadow: '0 8px 20px rgba(37, 99, 235, 0.4), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              borderRadius: '16px',
              fontSize: '14px',
              WebkitTapHighlightColor: 'transparent',
              transform: 'translateY(-1px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 12px 28px rgba(37, 99, 235, 0.5), 0 6px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(37, 99, 235, 0.4), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
          >
            <Calendar className="w-4 h-4 text-white shrink-0" />
            <span className="text-sm font-bold text-white truncate" style={{ fontSize: '14px' }}>Book Service</span>
          </Button>
        </div>

        {/* Row 3: WhatsApp | Email Us */}
        <div className="grid grid-cols-2 gap-2 w-full min-w-0">
          <Button
            data-whatsapp-button
            title="Chat with us on WhatsApp"
            onClick={(e) => {
              e.stopPropagation()
              playClickSound()
              setWhatsappSelectorOpen(true)
              setCallSelectorOpen(false)
            }}
            className="h-11 bg-white/90 backdrop-blur-md hover:bg-white rounded-2xl transition-all flex items-center justify-center gap-1.5 active:scale-[0.97] touch-manipulation min-w-0"
            style={{
              color: '#0F172A',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
              borderRadius: '16px',
              fontSize: '14px',
              WebkitTapHighlightColor: 'transparent',
              transform: 'translateY(-1px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="#25D366" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span className="text-sm font-bold truncate" style={{ color: '#0F172A', fontSize: '14px' }}>{t('whatsapp')}</span>
          </Button>
          <Link
            href={`mailto:${shopConfig.contact.email}?subject=${encodeURIComponent('Consultation Request - Dogra Associates')}&body=${encodeURIComponent('Hello,\n\nI would like to inquire about your services.\n\nPlease reply at your convenience.\n\nThank you.')}`}
            onClick={(e) => {
              e.stopPropagation()
              playClickSound()
            }}
            title="Send us an email"
            className="h-11 bg-white/90 backdrop-blur-md hover:bg-white rounded-2xl transition-all flex items-center justify-center gap-1.5 active:scale-[0.97] touch-manipulation min-w-0"
            style={{
              color: '#0F172A',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
              borderRadius: '16px',
              fontSize: '14px',
              WebkitTapHighlightColor: 'transparent',
              transform: 'translateY(-1px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
          >
            <Mail className="w-5 h-5 shrink-0" style={{ color: '#3A7BD5' }} />
            <span className="text-sm font-bold truncate" style={{ color: '#0F172A', fontSize: '14px' }}>{t('emailUs')}</span>
          </Link>
        </div>

        {/* Row 4: Location | Share */}
        <div className="grid grid-cols-2 gap-2 w-full min-w-0">
          <Button
            title="Find our office"
            onClick={handleDirections}
            className="h-11 bg-white/90 backdrop-blur-md hover:bg-white rounded-2xl transition-all flex items-center justify-center gap-1.5 active:scale-[0.97] touch-manipulation min-w-0"
            style={{
              color: '#0F172A',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
              borderRadius: '16px',
              fontSize: '14px',
              WebkitTapHighlightColor: 'transparent',
              transform: 'translateY(-1px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
          >
            <MapPin className="w-5 h-5 shrink-0" style={{ color: '#EF4444' }} />
            <span className="text-sm font-bold truncate" style={{ color: '#0F172A', fontSize: '14px' }}>{t('officeLocation')}</span>
          </Button>
          <Button
            title="Share this contact"
            onClick={handleShare}
            className="w-full min-w-0 h-11 bg-white/90 hover:bg-white backdrop-blur-md text-slate-700 rounded-2xl border-2 border-blue-400/60 hover:border-blue-600/70 relative overflow-hidden touch-manipulation flex items-center justify-center gap-2 transition-[transform,box-shadow,background-color] duration-150 ease-out"
            style={{
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
              borderRadius: '16px',
              fontSize: '14px',
              WebkitTapHighlightColor: 'transparent',
              transform: 'translateY(-1px)',
            }}
          >
            <Share2 className="w-4 h-4 relative z-10" style={{ color: '#1E40AF' }} />
            <span className="text-sm font-bold relative z-10 truncate" style={{ fontSize: '14px' }}>Share</span>
          </Button>
        </div>

        {/* Row 5: Save Contact + Gallery */}
        <div className="grid grid-cols-2 gap-2 w-full min-w-0">
          <Button
            title="Save contact to your phone"
            onClick={handleSaveContact}
            className="w-full min-w-0 h-11 bg-white/90 hover:bg-white backdrop-blur-md text-slate-700 rounded-2xl border-2 border-blue-500/70 hover:border-blue-600/90 relative overflow-hidden transition-all touch-manipulation flex items-center justify-center gap-2"
            style={{
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
              borderRadius: '16px',
              fontSize: '14px',
              WebkitTapHighlightColor: 'transparent',
              transform: 'translateY(-1px)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-blue-400/30 to-transparent animate-[shimmer_2s_infinite] pointer-events-none" />
            <Download className="w-4 h-4 relative z-10" style={{ color: '#1E40AF' }} />
            <span className="text-sm font-bold relative z-10 truncate" style={{ fontSize: '14px' }}>
              {t('saveContact')}
            </span>
          </Button>

          <Link
            href="/gallery"
            onClick={(e) => {
              e.stopPropagation()
              playClickSound()
            }}
            title="View gallery"
            className="min-w-0 h-11 bg-white/90 backdrop-blur-md hover:bg-white rounded-2xl transition-all flex items-center justify-center gap-1.5 sm:gap-2 active:scale-[0.97] touch-manipulation"
            style={{
              color: '#0F172A',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
              borderRadius: '16px',
              WebkitTapHighlightColor: 'transparent',
              fontSize: '14px',
              transform: 'translateY(-1px)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
          >
            <div className="flex items-center -space-x-1.5 relative z-10">
              <div
                className="w-7 h-7 rounded-full bg-white flex items-center justify-center overflow-hidden relative"
                style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}
              >
                <img
                  src="/gallery/WhatsApp%20Image%202026-03-15%20at%2021.23.25.jpeg"
                  alt="Gallery"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              <div
                className="w-7 h-7 rounded-full bg-white flex items-center justify-center overflow-hidden relative"
                style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}
              >
                <img
                  src="/gallery/WhatsApp%20Image%202026-03-15%20at%2021.23.31.jpeg"
                  alt="Gallery"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
            <span className="text-sm font-bold truncate" style={{ color: '#0F172A', fontSize: '14px' }}>{t('gallery')}</span>
          </Link>
        </div>

        {/* Call Selector - Bottom Pop-out */}
        <AnimatePresence>
          {callSelectorOpen && (
            <>
              {/* Popup */}
              <motion.div
                ref={callSelectorRef}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '100%', opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="popup-selector fixed bottom-0 left-0 right-0 z-[9999] bg-white rounded-3xl shadow-2xl p-6 pb-8 m-4 mb-6"
                style={{ 
                  paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))',
                  maxHeight: '80vh'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="text-base font-semibold text-slate-800">Select Number to Call</div>
                  <button
                    onClick={() => setCallSelectorOpen(false)}
                    className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
                <div className="flex gap-4 justify-center flex-wrap">
                  {shopConfig.contactPersons.map((person) => (
                    <motion.button
                      key={person.label}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: shopConfig.contactPersons.indexOf(person) * 0.1 }}
                      onClick={() => handleCall(person)}
                      className="flex flex-col items-center gap-2 touch-manipulation"
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
                        style={{
                          background: '#E5E7EB',
                          border: '1px solid rgba(148,163,184,0.6)',
                        }}
                      >
                        <Phone className="w-7 h-7" style={{ color: '#1E40AF' }} />
                      </div>
                      <span className="text-xs font-semibold text-slate-800 text-center">{person.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* WhatsApp Selector - Bottom Pop-out */}
        <AnimatePresence>
          {whatsappSelectorOpen && (
            <>
              {/* Popup */}
              <motion.div
                ref={whatsappSelectorRef}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '100%', opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="popup-selector fixed bottom-0 left-0 right-0 z-[9999] bg-white rounded-3xl shadow-2xl p-6 pb-8 m-4 mb-6"
                style={{ 
                  paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))',
                  maxHeight: '80vh'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="text-base font-semibold text-slate-800">Select Number for WhatsApp</div>
                  <button
                    onClick={() => setWhatsappSelectorOpen(false)}
                    className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
                <div className="flex gap-4 justify-center flex-wrap">
                  {shopConfig.contactPersons.map((person) => (
                    <motion.button
                      key={person.label}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: shopConfig.contactPersons.indexOf(person) * 0.1 }}
                      onClick={() => handleWhatsApp(person)}
                      className="flex flex-col items-center gap-2 touch-manipulation"
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-[#25D366] to-[#20BA5A] rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform">
                        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="white">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                      </div>
                      <span className="text-xs font-semibold text-slate-800 text-center">{person.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  )
})

ActionsRow.displayName = 'ActionsRow'

export default ActionsRow
