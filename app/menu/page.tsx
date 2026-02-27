'use client'

import { useState, useEffect, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft, FileText } from 'lucide-react'
import { menuCategories } from '../shops/honeys-fresh-n-frozen/menu'
import { shopConfig } from '../shops/honeys-fresh-n-frozen/config'
import { getWhatsAppLink } from '../lib/phone'

type MenuCategoryKey = keyof typeof menuCategories

const categoryKeys: MenuCategoryKey[] = [
  'burgerPizza',
  'sandwichSalad',
  'momos',
  'pastaMaggiFries',
  'healthyDrinks',
  'wraps',
  'mojitosSmoothies',
  'shakesIceCream',
  'starters',
  'hotBeverages',
  'riceNoodlesSoups',
  'combos',
  'mainCourse',
  'thali',
]

// PDF menu in public – opens in phone preview / browser
const MENU_PDF_URL = '/mango%20menu%2017-01-2025.pdf'

const defaultOrderMessage = "Hi Mango, I'd like to order from the menu. Please share today's availability and rates."

function MenuPageInner() {
  const searchParams = useSearchParams()
  const catParam = searchParams.get('cat') as MenuCategoryKey | null
  const initialCat = (catParam && categoryKeys.includes(catParam)) ? catParam : 'burgerPizza'
  const [activeCategory, setActiveCategory] = useState<MenuCategoryKey>(initialCat)

  useEffect(() => {
    if (catParam && categoryKeys.includes(catParam)) {
      setActiveCategory(catParam)
    }
  }, [catParam])

  const currentCategory = menuCategories[activeCategory]

  const openWhatsApp = () => {
    const phone = shopConfig.contact.phones[0]?.replace(/\D/g, '') || '9419141495'
    const e164 = phone.length === 10 ? `91${phone}` : phone
    window.open(getWhatsAppLink(e164, defaultOrderMessage), '_blank')
  }

  return (
    <>
      <main
        className="min-h-screen pb-24"
        style={{ backgroundColor: '#1a1a1a' }}
      >
        {/* Header */}
        <div
          className="border-b border-white/[0.06] sticky top-0 z-20 backdrop-blur-md"
          style={{ backgroundColor: 'rgba(26, 26, 26, 0.98)' }}
        >
          <div className="max-w-md mx-auto px-4 pt-3 pb-2 flex items-center justify-between">
            <Link
              href="/#menu"
              className="p-2 hover:bg-white/5 rounded-full transition-colors active:scale-95"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  sessionStorage.setItem('fromMenu', 'true')
                }
              }}
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </Link>
            <h1 className="text-lg font-bold text-white tracking-tight">
              Our Menu
            </h1>
            <div className="w-9" />
          </div>

          {/* View PDF Menu */}
          <div className="max-w-md mx-auto px-4 pb-3">
            <a
              href={MENU_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.1] text-white font-medium text-sm"
            >
              <FileText className="w-4 h-4 shrink-0" />
              View PDF Menu
            </a>
          </div>

          {/* Category tabs */}
          <div className="max-w-md mx-auto px-4 pb-3">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-0.5 -mx-1 px-1">
              {categoryKeys.map((key) => {
                const cat = menuCategories[key]
                const isActive = activeCategory === key
                return (
                  <motion.button
                    key={key}
                    onClick={() => setActiveCategory(key)}
                    whileTap={{ scale: 0.97 }}
                    className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-semibold whitespace-nowrap flex-shrink-0 text-sm ${
                      isActive
                        ? 'bg-mango-green text-white'
                        : 'bg-white/[0.06] text-white/90 hover:bg-white/[0.1] border border-white/[0.08]'
                    }`}
                  >
                    <span className="text-base">{cat.icon}</span>
                    <span>{cat.name}</span>
                  </motion.button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Category hero */}
        <div className="max-w-md mx-auto px-4 pt-4 pb-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="relative h-32 rounded-xl overflow-hidden border border-white/[0.06]"
            >
              <Image
                src={currentCategory.image}
                alt={currentCategory.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 448px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h2 className="text-base font-bold text-white drop-shadow-lg">
                  {currentCategory.name}
                </h2>
                <p className="text-white/80 text-[11px] mt-0.5 line-clamp-1">
                  {currentCategory.shortDescription}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Items grid */}
        <div className="max-w-md mx-auto px-4 pt-2 pb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-2 gap-3"
            >
              {currentCategory.items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: Math.min(index * 0.015, 0.2) }}
                  className="rounded-xl overflow-hidden flex flex-col h-[112px] border border-amber-950/20 shadow-sm"
                  style={{ backgroundColor: 'rgba(255, 252, 242, 0.07)' }}
                >
                  <div className="p-3 flex flex-col h-full min-h-0 gap-0">
                    <div className="flex items-center justify-between gap-2 shrink-0">
                      <span className="rounded-full px-2 py-0.5 bg-emerald-500/20 text-emerald-400/95 text-[10px] font-medium">
                        Veg
                      </span>
                      <span className="rounded-md px-2 py-1 bg-amber-950/25 text-amber-100/95 text-[11px] font-bold tabular-nums">
                        {item.price}
                      </span>
                    </div>
                    <h3 className="text-[13px] font-semibold text-white/95 leading-snug line-clamp-2 flex-1 min-h-0 mt-2.5">
                      {item.name}
                    </h3>
                    {item.quantity && item.quantity !== '1 portion' && (
                      <p className="text-white/45 text-[10px] mt-1 truncate shrink-0">{item.quantity}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          <p className="mt-8 text-center text-[11px] text-white/40">
            All items are vegetarian. Prices may vary. Confirm at the counter.
          </p>

          <div className="mt-10">
            <button
              onClick={openWhatsApp}
              className="w-full py-3.5 px-4 rounded-xl font-semibold text-sm bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2 active:scale-[0.99] transition-transform"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Order via WhatsApp
            </button>
          </div>
        </div>
      </main>
    </>
  )
}

export default function MenuPage() {
  return (
    <Suspense
      fallback={
        <main
          className="min-h-screen pb-24 flex items-center justify-center"
          style={{ backgroundColor: '#1a1a1a' }}
        >
          <p className="text-white/70 text-sm">Loading menu…</p>
        </main>
      }
    >
      <MenuPageInner />
    </Suspense>
  )
}
