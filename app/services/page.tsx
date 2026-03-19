'use client'

import { useState, useEffect, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft, Check } from 'lucide-react'
import { serviceCategories } from '../shops/dogra-associates/services'
import { shopConfig } from '../shops/dogra-associates/config'
import { getWhatsAppLink } from '../lib/phone'
import { prepareReturnToHeroCard } from '../lib/homeNavigation'
import type { ServiceCategoryKey, ServiceItem } from '../shops/dogra-associates/services'

const categoryKeys: ServiceCategoryKey[] = [
  'incomeTax',
  'gstServices',
  'businessRegistration',
  'auditCompliance',
  'financialAdvisory',
]

const categoryTabLabels: Record<ServiceCategoryKey, string> = {
  incomeTax: 'Income Tax',
  gstServices: 'GST',
  businessRegistration: 'Business',
  auditCompliance: 'Audit',
  financialAdvisory: 'Advisory',
}

// Keep existing colour palette – layout only
const ACCENT = '#1E40AF'
const ACCENT_LIGHT = '#3A7BD5'
const BG_PAGE = '#EFF6FF'
const CARD_BG = '#FFFFFF'
const BORDER = '#BFDBFE'
const TEXT_PRIMARY = '#1E3A8A'
const TEXT_SECONDARY = '#475569'
const SELECTED_BG = '#DBEAFE'

/** WhatsApp message format per spec */
function buildInquiryMessage(serviceNames: string[]): string {
  if (serviceNames.length === 0) {
    return "Hi, I'd like to know more about your services. Please assist me."
  }
  const list = serviceNames.map((name) => `- ${name}`).join('\n')
  return `Hi, I'm interested in the following services:
${list}

Please assist me.`
}

// ----- Reusable: Category tab pill -----
function CategoryTab({
  label,
  isActive,
  onClick,
}: {
  label: string
  isActive: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex-shrink-0 font-semibold transition-all duration-200 rounded-full scroll-snap-start"
      style={{
        whiteSpace: 'nowrap',
        padding: '10px 18px',
        fontSize: 14,
        border: isActive ? 'none' : `2px solid ${BORDER}`,
        background: isActive
          ? `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_LIGHT} 100%)`
          : CARD_BG,
        color: isActive ? '#ffffff' : TEXT_SECONDARY,
        boxShadow: isActive ? '0 4px 12px rgba(30, 64, 175, 0.25)' : '0 1px 2px rgba(0,0,0,0.04)',
      }}
    >
      {label}
    </button>
  )
}

// ----- Reusable: Service card (selectable) -----
function ServiceCard({
  item,
  isSelected,
  onToggle,
}: {
  item: ServiceItem
  isSelected: boolean
  onToggle: () => void
}) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      layout
      initial={false}
      animate={{
        backgroundColor: isSelected ? SELECTED_BG : CARD_BG,
        borderColor: isSelected ? ACCENT : BORDER,
        boxShadow: isSelected
          ? '0 4px 14px rgba(30, 64, 175, 0.12)'
          : '0 2px 8px rgba(15, 42, 68, 0.06)',
      }}
      transition={{ duration: 0.2 }}
      className="w-full text-left rounded-2xl border-2 flex items-start gap-3 active:scale-[0.99] touch-manipulation"
      style={{ padding: 16 }}
    >
      <div
        className="w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors"
        style={{
          borderColor: isSelected ? ACCENT : '#94A3B8',
          background: isSelected ? ACCENT : 'transparent',
        }}
      >
        {isSelected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
      </div>
      <div className="flex-1 min-w-0">
        <h3
          className="font-bold leading-snug"
          style={{ fontSize: 15, color: TEXT_PRIMARY }}
        >
          {item.name}
        </h3>
        {item.description && (
          <p
            className="mt-0.5 leading-snug line-clamp-1"
            style={{ fontSize: 13, color: TEXT_SECONDARY }}
          >
            {item.description}
          </p>
        )}
      </div>
    </motion.button>
  )
}

function ServicesPageInner() {
  const searchParams = useSearchParams()
  const catParam = searchParams.get('cat') as ServiceCategoryKey | null
  const initialCat =
    catParam && categoryKeys.includes(catParam) ? catParam : 'incomeTax'
  const [activeCategory, setActiveCategory] = useState<ServiceCategoryKey>(initialCat)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (catParam && categoryKeys.includes(catParam)) {
      setActiveCategory(catParam)
    }
  }, [catParam])

  const currentCategory = serviceCategories[activeCategory]
  const selectedCount = selectedIds.size

  const toggleService = (item: ServiceItem) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(item.id)) next.delete(item.id)
      else next.add(item.id)
      return next
    })
  }

  const getSelectedServiceNames = (): string[] => {
    const names: string[] = []
    categoryKeys.forEach((key) => {
      serviceCategories[key].items.forEach((item) => {
        if (selectedIds.has(item.id)) names.push(item.name)
      })
    })
    return names
  }

  const handleSendInquiry = () => {
    if (selectedCount === 0) return
    const names = getSelectedServiceNames()
    const message = buildInquiryMessage(names)
    const e164 = shopConfig.contact.clientPhoneE164 || '919086038829'
    window.open(getWhatsAppLink(e164, message), '_blank')
  }

  return (
    <>
      <main
        className="min-h-screen pb-48"
        style={{
          backgroundColor: BG_PAGE,
          paddingTop: 'max(1rem, env(safe-area-inset-top))',
        }}
      >
        <div className="w-full max-w-md mx-auto px-4">
          {/* 1. Header */}
          <header className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 min-h-[44px] py-2 -ml-1 pr-2 text-[15px] font-semibold transition-colors rounded-lg touch-manipulation"
              style={{ color: ACCENT }}
              onClick={() => prepareReturnToHeroCard()}
            >
              <ArrowLeft className="w-5 h-5 shrink-0" strokeWidth={2.5} />
              Back
            </Link>
            <h1
              className="text-2xl font-bold tracking-tight mt-1"
              style={{ color: TEXT_PRIMARY }}
            >
              Our Services
            </h1>
            <p
              className="mt-1 text-sm leading-snug"
              style={{ color: TEXT_SECONDARY }}
            >
              Select services and send an inquiry instantly
            </p>
          </header>

          {/* 2. Category tabs – horizontal scroll, pills */}
          <div className="relative -mx-4 px-4 mb-6">
            <div
              className="flex gap-2 overflow-x-auto scrollbar-hide pb-1"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {categoryKeys.map((key) => (
                <CategoryTab
                  key={key}
                  label={categoryTabLabels[key]}
                  isActive={activeCategory === key}
                  onClick={() => setActiveCategory(key)}
                />
              ))}
            </div>
            <div
              className="pointer-events-none absolute left-0 top-0 bottom-1 w-6 z-10"
              style={{ background: `linear-gradient(to right, ${BG_PAGE}, transparent)` }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute right-0 top-0 bottom-1 w-6 z-10"
              style={{ background: `linear-gradient(to left, ${BG_PAGE}, transparent)` }}
              aria-hidden
            />
          </div>

          {/* 2.5. More info (Mango-style clarity) */}
          <motion.section
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.25 }}
            className="mb-6 rounded-2xl border-2 px-4 py-4"
            style={{
              background: 'rgba(30,64,175,0.06)',
              borderColor: 'rgba(30,64,175,0.22)',
            }}
          >
            <h2 className="text-[15px] font-bold" style={{ color: TEXT_PRIMARY }}>
              What happens next
            </h2>
            <p className="mt-1 text-sm leading-snug" style={{ color: TEXT_SECONDARY }}>
              Pick your service(s). We will draft the WhatsApp message for you instantly.
            </p>

            <div className="mt-3 space-y-2">
              {[
                { n: '1', t: 'Select services' },
                { n: '2', t: 'Tap “Send on WhatsApp”' },
                { n: '3', t: 'Share details, we guide you' },
              ].map((row) => (
                <div key={row.n} className="flex items-start gap-3">
                  <div
                    className="flex items-center justify-center rounded-full font-extrabold shrink-0"
                    style={{
                      width: 26,
                      height: 26,
                      background: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_LIGHT} 100%)`,
                      color: '#fff',
                      boxShadow: '0 6px 18px rgba(30,64,175,0.25)',
                    }}
                  >
                    {row.n}
                  </div>
                  <div className="text-sm leading-snug" style={{ color: TEXT_SECONDARY }}>
                    <span className="font-semibold" style={{ color: TEXT_PRIMARY }}>
                      {row.t}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* 3. Service cards – smooth tab transition */}
          <div className="space-y-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                {currentCategory.items.map((item) => (
                  <ServiceCard
                    key={item.id}
                    item={item}
                    isSelected={selectedIds.has(item.id)}
                    onToggle={() => toggleService(item)}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* 5 & 6. Bottom sticky CTA – full width, pill, count + "Send on WhatsApp" */}
      <div
        className="fixed bottom-0 left-0 right-0 z-30 px-4"
        style={{
          paddingBottom: 'max(20px, env(safe-area-inset-bottom))',
          maxWidth: 448,
          margin: '0 auto',
          backgroundColor: BG_PAGE,
          paddingTop: 12,
        }}
      >
        {selectedCount > 0 && (
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={handleSendInquiry}
              className="w-full flex items-center justify-center gap-3 rounded-full font-semibold text-[15px] text-white py-3.5 px-5 shadow-lg transition-all duration-200 touch-manipulation active:scale-[0.98]"
              style={{
                background: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_LIGHT} 100%)`,
                boxShadow:
                  '0 8px 24px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
              }}
            >
              <span
                className="flex items-center justify-center min-w-[28px] h-7 rounded-full text-[13px] font-bold"
                style={{ background: 'rgba(255,255,255,0.25)' }}
              >
                {selectedCount}
              </span>
              <span>Send on WhatsApp</span>
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 fill-white shrink-0"
                aria-hidden
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </button>

            {/* 8. Micro text */}
            <p
              className="text-center mt-2 text-xs"
              style={{ color: TEXT_SECONDARY }}
            >
              No payment required. We will assist you directly.
            </p>
          </div>
        )}
      </div>
    </>
  )
}

export default function ServicesPage() {
  return (
    <Suspense
      fallback={
        <main
          className="min-h-screen flex items-center justify-center"
          style={{ backgroundColor: BG_PAGE }}
        >
          <p className="text-sm" style={{ color: TEXT_SECONDARY }}>
            Loading services…
          </p>
        </main>
      }
    >
      <ServicesPageInner />
    </Suspense>
  )
}
