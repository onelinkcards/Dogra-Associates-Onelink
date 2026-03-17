'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ToolLayout from '../components/ToolLayout'
import { ToolInput, toolLabelClass } from '../components/ToolInput'
import { shopConfig } from '../../shops/honeys-fresh-n-frozen/config'
import { getWhatsAppLink } from '../../lib/phone'
import ConversionCTA from '../components/ConversionCTA'

const NEW_REGIME_SLABS = [
  { limit: 3_00_000, rate: 0 },
  { limit: 7_00_000, rate: 0.05 },
  { limit: 10_00_000, rate: 0.10 },
  { limit: 12_00_000, rate: 0.15 },
  { limit: 15_00_000, rate: 0.20 },
  { limit: Infinity, rate: 0.30 },
]
const NEW_REGIME_REBATE_87A = 25_000

const OLD_REGIME_SLABS_NORMAL = [
  { limit: 2_50_000, rate: 0 },
  { limit: 5_00_000, rate: 0.05 },
  { limit: 10_00_000, rate: 0.20 },
  { limit: Infinity, rate: 0.30 },
]
const OLD_REGIME_SLABS_SENIOR = [
  { limit: 3_00_000, rate: 0 },
  { limit: 5_00_000, rate: 0.05 },
  { limit: 10_00_000, rate: 0.20 },
  { limit: Infinity, rate: 0.30 },
]
const OLD_REGIME_SLABS_SUPER_SENIOR = [
  { limit: 5_00_000, rate: 0 },
  { limit: 10_00_000, rate: 0.20 },
  { limit: Infinity, rate: 0.30 },
]

function calcTax(income: number, slabs: { limit: number; rate: number }[]): number {
  let tax = 0
  let prev = 0
  for (const s of slabs) {
    if (income <= prev) break
    const slice = Math.min(income, s.limit) - prev
    tax += slice * s.rate
    prev = s.limit
  }
  return Math.round(tax)
}

function calcNewRegime(income: number): number {
  const tax = calcTax(income, NEW_REGIME_SLABS)
  if (income <= 7_00_000) return Math.max(0, tax - NEW_REGIME_REBATE_87A)
  return tax
}

type AgeGroup = 'below60' | '60-80' | 'above80'

function getOldRegimeSlabs(age: AgeGroup) {
  if (age === 'below60') return OLD_REGIME_SLABS_NORMAL
  if (age === '60-80') return OLD_REGIME_SLABS_SENIOR
  return OLD_REGIME_SLABS_SUPER_SENIOR
}

function calcOldRegime(
  income: number,
  deduction80C: number,
  deduction80D: number,
  ageGroup: AgeGroup
): number {
  const taxable = Math.max(
    0,
    income - deduction80C - deduction80D - 50_000
  )
  const slabs = getOldRegimeSlabs(ageGroup)
  return calcTax(taxable, slabs)
}

export default function IncomeTaxToolPage() {
  const [income, setIncome] = useState('')
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('below60')
  const [deduction80C, setDeduction80C] = useState('')
  const [deduction80D, setDeduction80D] = useState('')
  const [hasCalculated, setHasCalculated] = useState(false)

  const incomeNum = Math.max(0, parseInt(income, 10) || 0)
  const ded80C = Math.max(0, Math.min(1_50_000, parseInt(deduction80C, 10) || 0))
  const ded80D = Math.max(0, parseInt(deduction80D, 10) || 0)

  const oldTax = calcOldRegime(incomeNum, ded80C, ded80D, ageGroup)
  const newTax = calcNewRegime(incomeNum)
  const recommended = newTax <= oldTax ? 'New Regime' : 'Old Regime'
  const showResults = hasCalculated && incomeNum > 0

  return (
    <>
      <ToolLayout
        title="Income Tax Calculator"
        subtitle="Estimate tax under old & new regimes"
      >
        <div className="space-y-4">
          <div>
            <label className={toolLabelClass}>Annual Income</label>
            <div className="flex items-center gap-2">
              <span className="text-[15px] text-[#6b7280]">₹</span>
              <ToolInput
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                placeholder="e.g. 12,00,000"
              />
            </div>
          </div>

          <div>
            <label className={toolLabelClass}>Age Group</label>
            <div className="flex flex-col gap-2 pt-1">
              {(
                [
                  { value: 'below60' as const, label: 'Below 60' },
                  { value: '60-80' as const, label: '60-80' },
                  { value: 'above80' as const, label: 'Above 80' },
                ] as const
              ).map((opt) => (
                <label
                  key={opt.value}
                  className="flex items-center gap-2.5 cursor-pointer text-[15px] text-[#374151]"
                >
                  <input
                    type="radio"
                    name="ageGroup"
                    checked={ageGroup === opt.value}
                    onChange={() => setAgeGroup(opt.value)}
                    className="w-4 h-4 accent-[#3B82F6]"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className={toolLabelClass}>Deductions (Optional)</label>
            <div className="space-y-3 mt-2">
              <div>
                <span className="text-[12px] text-[#6b7280] block mb-1">80C Investments (max ₹1,50,000)</span>
                <div className="flex items-center gap-2">
                  <span className="text-[15px] text-[#6b7280]">₹</span>
                  <ToolInput
                    type="number"
                    value={deduction80C}
                    onChange={(e) => setDeduction80C(e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>
              <div>
                <span className="text-[12px] text-[#6b7280] block mb-1">Health Insurance (80D)</span>
                <div className="flex items-center gap-2">
                  <span className="text-[15px] text-[#6b7280]">₹</span>
                  <ToolInput
                    type="number"
                    value={deduction80D}
                    onChange={(e) => setDeduction80D(e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setHasCalculated(true)}
          className="w-full mt-6 py-[14px] px-4 rounded-[12px] font-semibold text-[15px] text-white transition-opacity hover:opacity-95"
          style={{ background: '#334155' }}
        >
          Calculate Tax
        </button>

        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 rounded-2xl border border-[#e5e7eb] p-5 bg-white"
            style={{ boxShadow: '0 6px 14px rgba(0,0,0,0.06)' }}
          >
            <h3 className="text-[16px] font-semibold text-[#111827] mb-4">
              Your Estimated Tax
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-[14px]">
                <span className="text-[#6b7280]">Old Regime</span>
                <span className="font-semibold text-[#111827]">
                  ₹{oldTax.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-[14px]">
                <span className="text-[#6b7280]">New Regime</span>
                <span className="font-semibold text-[#111827]">
                  ₹{newTax.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="mt-4 pt-4 border-t border-[#e5e7eb] flex justify-between items-center">
                <span className="text-[13px] text-[#6b7280]">Recommended</span>
                <span
                  className="text-[14px] font-semibold px-2.5 py-1 rounded-lg"
                  style={{ color: '#3B82F6', backgroundColor: 'rgba(59,130,246,0.12)' }}
                >
                  {recommended}
                </span>
              </div>
            </div>
            <ConversionCTA />
          </motion.div>
        )}
      </ToolLayout>

      {showResults && (
        <div
          className="fixed bottom-0 left-0 right-0 z-30 py-3 px-4 safe-area-pb flex gap-2.5"
          style={{
            background: 'white',
            boxShadow: '0 -4px 20px rgba(0,0,0,0.08)',
            maxWidth: 420,
            margin: '0 auto',
          }}
        >
          <button
            type="button"
            onClick={() => {
              sessionStorage.setItem('openAppointment', 'true')
              window.location.href = '/'
            }}
            className="flex-1 py-3 px-4 rounded-[12px] font-semibold text-[15px] text-white transition-opacity hover:opacity-95"
            style={{ background: '#334155' }}
          >
            Book Consultation
          </button>
          <a
            href={getWhatsAppLink(shopConfig.contact.clientPhoneE164 || '919086038829', "Hello Sir, I used the Income Tax Calculator. I'd like help filing my return.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 px-4 rounded-[12px] font-semibold text-[15px] text-center border transition-opacity hover:opacity-90"
            style={{ borderColor: '#334155', color: '#334155', background: 'white' }}
          >
            Ask on WhatsApp
          </a>
        </div>
      )}
    </>
  )
}
