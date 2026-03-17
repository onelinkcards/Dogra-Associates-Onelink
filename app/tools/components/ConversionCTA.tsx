'use client'

import { shopConfig } from '../../shops/honeys-fresh-n-frozen/config'
import { getWhatsAppLink } from '../../lib/phone'

export default function ConversionCTA() {
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
    <div className="mt-6 p-4 rounded-2xl bg-white border border-[#e5e7eb] shadow-sm">
      <p className="text-[15px] text-[#374151] font-medium mb-3">
        Need help filing your return?
      </p>
      <div className="flex gap-2.5">
        <button
          type="button"
          onClick={openBookAppointment}
          className="flex-1 py-3 px-4 rounded-xl font-semibold text-[15px] text-white transition-opacity hover:opacity-95"
          style={{ background: '#334155' }}
        >
          Book Consultation
        </button>
        <button
          type="button"
          onClick={openWhatsApp}
          className="flex-1 py-3 px-4 rounded-xl font-semibold text-[15px] border transition-opacity hover:opacity-90"
          style={{ borderColor: '#334155', color: '#334155', background: 'white' }}
        >
          Ask on WhatsApp
        </button>
      </div>
    </div>
  )
}
