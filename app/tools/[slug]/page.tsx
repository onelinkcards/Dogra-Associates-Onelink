'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { shopConfig } from '../../shops/honeys-fresh-n-frozen/config'
import { getWhatsAppLink } from '../../lib/phone'

const TOOL_NAMES: Record<string, string> = {
  'advance-tax': 'Advance Tax Calculator',
  'tax-saving': 'Tax Saving Planner',
}

export default function ToolPlaceholderPage() {
  const params = useParams()
  const slug = (params?.slug as string) || ''
  const title = TOOL_NAMES[slug] || 'Tax Tool'

  const openWhatsApp = () => {
    const e164 = shopConfig.contact.clientPhoneE164 || '919086038829'
    window.open(getWhatsAppLink(e164, `Hello Sir, I'd like to use the ${title}. When will it be available?`), '_blank')
  }

  return (
    <>
      <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingBottom: 120 }}>
        <div style={{ maxWidth: 420, margin: '0 auto', padding: 20 }}>
          <Link
            href="/tools"
            className="inline-flex items-center gap-1 text-[14px] text-[#6b7280] hover:text-[#111827] mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <h1 className="text-[22px] font-bold text-[#111827] tracking-tight">
            {title}
          </h1>
          <p className="text-[14px] text-[#6b7280] mt-4">
            This tool is coming soon. Use the calculators below or contact us for personalised estimates.
          </p>
          <Link
            href="/tools"
            className="inline-block mt-4 text-[14px] font-semibold text-[#3B82F6] hover:underline"
          >
            ← Back to Tax Tools
          </Link>
        </div>
      </main>
      <div
        className="fixed bottom-0 left-0 right-0 z-30 py-3 px-4 safe-area-pb"
        style={{
          background: 'white',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.08)',
          maxWidth: 420,
          margin: '0 auto',
        }}
      >
        <button
          type="button"
          onClick={openWhatsApp}
          className="w-full py-3 px-4 rounded-[12px] font-semibold text-[15px] text-white transition-opacity hover:opacity-95"
          style={{ background: '#334155' }}
        >
          Ask CA on WhatsApp
        </button>
      </div>
    </>
  )
}
