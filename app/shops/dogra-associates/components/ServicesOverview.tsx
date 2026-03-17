'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FileText, Receipt, Building2, ClipboardCheck, ArrowRight, MessageCircle } from 'lucide-react'
import { shopConfig } from '../config'

const serviceCards = [
  {
    id: 'income-tax',
    title: 'Income Tax Services',
    description: 'Income tax return filing, tax planning, and advisory for individuals and businesses.',
    icon: FileText,
    primaryCta: { label: 'Book Consultation', href: '/services#income-tax', type: 'link' as const },
    secondaryCta: { label: 'Learn More', href: '/services#income-tax', type: 'link' as const },
  },
  {
    id: 'gst',
    title: 'GST Services',
    description: 'GST registration, return filing, and compliance advisory.',
    icon: Receipt,
    primaryCta: { label: 'Book Consultation', href: `https://wa.me/${shopConfig.contact.clientPhoneE164 || '919086038829'}?text=${encodeURIComponent('Hello Sir, I need GST consultation.')}`, type: 'external' as const },
    secondaryCta: { label: 'Learn More', href: '/services#gst', type: 'link' as const },
  },
  {
    id: 'business-reg',
    title: 'Business Registration',
    description: 'Company, LLP, and proprietorship registration services.',
    icon: Building2,
    primaryCta: { label: 'Book Consultation', href: '/services#business-registration', type: 'link' as const },
    secondaryCta: { label: 'Learn More', href: '/services#business-registration', type: 'link' as const },
  },
  {
    id: 'audit',
    title: 'Audit & Compliance',
    description: 'Internal audit, statutory audit, and financial compliance services.',
    icon: ClipboardCheck,
    primaryCta: { label: 'Book Consultation', href: '/services#audit', type: 'link' as const },
    secondaryCta: { label: 'Learn More', href: '/services#audit', type: 'link' as const },
  },
]

export default function ServicesOverview() {
  return (
    <motion.section
      id="services-overview"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="w-full"
      style={{ background: '#ffffff' }}
    >
      <div className="mx-auto px-5" style={{ maxWidth: 1100, padding: '60px 20px' }}>
        <div className="mb-8">
          <h2 className="tracking-tight" style={{ fontSize: 34, fontWeight: 700, color: '#111827' }}>
            Services Offered
          </h2>
          <p className="mt-2" style={{ fontSize: 18, color: '#6b7280', maxWidth: 620 }}>
            Professional financial and compliance services for individuals and businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[22px]">
          {serviceCards.map((card, index) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: index * 0.06, duration: 0.35, ease: 'easeOut' }}
                className="rounded-[14px] p-[26px] transition-all duration-200 ease-out"
                style={{ background: '#ffffff', border: '1px solid #e5e7eb' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 24px rgba(0,0,0,0.06)'
                  e.currentTarget.style.transform = 'translateY(-3px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = ''
                  e.currentTarget.style.transform = ''
                }}
              >
                <div
                  className="flex items-center justify-center rounded-[10px] mb-[14px]"
                  style={{ width: 46, height: 46, background: '#ecfdf5', color: '#059669' }}
                >
                  <Icon className="w-5 h-5" strokeWidth={2} />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2 leading-tight">{card.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{card.description}</p>
                <div className="flex flex-wrap items-center gap-2">
                  {card.primaryCta.type === 'external' ? (
                    <a
                      href={card.primaryCta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg py-2.5 px-4 text-white font-semibold text-sm transition-colors hover:opacity-90"
                      style={{ background: '#059669' }}
                    >
                      <MessageCircle className="w-4 h-4" />
                      {card.primaryCta.label}
                    </a>
                  ) : (
                    <Link
                      href={card.primaryCta.href}
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg py-2.5 px-4 text-white font-semibold text-sm transition-colors hover:opacity-90"
                      style={{ background: '#059669' }}
                    >
                      {card.primaryCta.label}
                    </Link>
                  )}
                  <Link
                    href={card.secondaryCta.href}
                    className="inline-flex items-center gap-1 py-2 px-0 bg-transparent border-0 font-medium text-sm transition-colors hover:opacity-80"
                    style={{ color: '#374151' }}
                  >
                    {card.secondaryCta.label}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.3 }}
          className="inline-flex items-center gap-2 font-semibold transition-colors hover:opacity-80"
          style={{ marginTop: 40, color: '#059669' }}
        >
          <Link href="/services" className="inline-flex items-center gap-2">
            View All Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  )
}
