'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Calculator, Receipt, Home, TrendingUp } from 'lucide-react'
import { shopConfig } from '../shops/honeys-fresh-n-frozen/config'
import { getWhatsAppLink } from '../lib/phone'

const TOOLS = [
  {
    slug: 'income-tax',
    title: 'Income Tax Calculator',
    description: 'Estimate tax under old & new regimes',
    icon: Calculator,
    href: '/tools/income-tax',
  },
  {
    slug: 'gst',
    title: 'GST Calculator',
    description: 'Add or remove GST from amounts',
    icon: Receipt,
    href: '/tools/gst',
  },
  {
    slug: 'hra',
    title: 'HRA Calculator',
    description: 'Exemption under House Rent Allowance',
    icon: Home,
    href: '/tools/hra',
  },
  {
    slug: 'capital-gains',
    title: 'Capital Gains Calculator',
    description: 'LTCG/STCG on property & investments',
    icon: TrendingUp,
    href: '/tools/capital-gains',
  },
] as const

export default function ToolsHubPage() {
  const openWhatsApp = () => {
    const e164 = shopConfig.contact.clientPhoneE164 || '919086038829'
    const msg = "Hello Sir, I used your tax tools. I'd like to book a consultation."
    window.open(getWhatsAppLink(e164, msg), '_blank')
  }
  const openBookAppointment = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('openAppointment', 'true')
      window.location.href = '/'
    }
  }

  return (
    <>
      <main
        className="min-h-screen"
        style={{
          background: 'linear-gradient(180deg, #0B1220 0%, #0F172A 100%)',
          paddingBottom: 100,
        }}
      >
        <div style={{ maxWidth: 420, margin: '0 auto', padding: '28px 20px' }}>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[14px] font-medium text-slate-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>

          <h1 className="text-2xl font-bold text-white tracking-tight">
            Tax Tools
          </h1>
          <p className="text-[14px] text-slate-400 mt-1.5 mb-8">
            Quick calculators to estimate taxes before consulting a CA
          </p>

          <div className="grid grid-cols-2 gap-[14px]">
            {TOOLS.map((tool, i) => {
              const Icon = tool.icon
              return (
                <Link key={tool.slug} href={tool.href}>
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.25 }}
                    whileHover={{
                      y: -2,
                      backgroundColor: '#15253D',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.5), 0 0 0 1px rgba(59,130,246,0.08)',
                    }}
                    className="group rounded-[14px] cursor-pointer overflow-hidden p-4 transition-all duration-200"
                    style={{
                      background: '#111C2E',
                      border: '1px solid rgba(255,255,255,0.06)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                    }}
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
                      style={{ background: 'rgba(59,130,246,0.12)' }}
                    >
                      <Icon className="w-5 h-5" style={{ color: '#60A5FA' }} strokeWidth={2} />
                    </div>
                    <h3 className="text-[15px] font-semibold text-white leading-tight">
                      {tool.title}
                    </h3>
                    <p className="text-[13px] text-slate-400 mt-1 leading-snug">
                      {tool.description}
                    </p>
                    <span
                      className="inline-flex items-center gap-1.5 text-[13px] font-semibold mt-3 text-[#60A5FA] group-hover:gap-2 transition-all"
                    >
                      Use Calculator
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </motion.div>
                </Link>
              )
            })}
          </div>
        </div>
      </main>

      <div
        className="fixed bottom-0 left-0 right-0 z-30 py-4 px-4 safe-area-pb flex gap-3"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, #0B1220 12px), #111C2E',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          maxWidth: 420,
          margin: '0 auto',
          boxShadow: '0 -8px 32px rgba(0,0,0,0.4)',
        }}
      >
        <button
          type="button"
          onClick={openBookAppointment}
          className="flex-1 py-3.5 px-4 rounded-xl font-semibold text-[15px] text-white transition-all hover:opacity-95 active:scale-[0.98]"
          style={{ background: '#334155' }}
        >
          Book Consultation
        </button>
        <button
          type="button"
          onClick={openWhatsApp}
          className="flex-1 py-3.5 px-4 rounded-xl font-semibold text-[15px] transition-opacity hover:opacity-90 border"
          style={{
            borderColor: 'rgba(255,255,255,0.25)',
            color: '#94a3b8',
            background: 'transparent',
          }}
        >
          Ask on WhatsApp
        </button>
      </div>
    </>
  )
}
