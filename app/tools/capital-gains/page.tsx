'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ToolLayout from '../components/ToolLayout'
import { ToolInput, toolLabelClass } from '../components/ToolInput'
import ConversionCTA from '../components/ConversionCTA'
import { shopConfig } from '../../shops/honeys-fresh-n-frozen/config'
import { getWhatsAppLink } from '../../lib/phone'

type AssetType = 'property' | 'stock' | 'mutual_fund'

// Simplified: LTCG (property 20% with indexation ignored for MVP; equity LTCG 10% above 1L; STCG 15%/slab)
function calcCapitalGains(
  purchasePrice: number,
  salePrice: number,
  holdingYears: number,
  assetType: AssetType
): { gain: number; isLongTerm: boolean; estimatedTax: number } {
  const gain = Math.max(0, salePrice - purchasePrice)
  const isLongTerm = holdingYears >= (assetType === 'property' ? 2 : 1)

  let rate = 0
  if (assetType === 'property') {
    rate = isLongTerm ? 0.2 : 0.3 // 20% LTCG (indexation ignored); STCG as normal income ~30%
  } else if (assetType === 'stock' || assetType === 'mutual_fund') {
    if (isLongTerm) {
      const taxableGain = Math.max(0, gain - 1_00_000) // LTCG exemption 1L
      rate = 0.1
      return { gain, isLongTerm, estimatedTax: Math.round(taxableGain * rate) }
    }
    rate = 0.15 // STCG equity
  }

  const estimatedTax = Math.round(gain * rate)
  return { gain, isLongTerm, estimatedTax }
}

export default function CapitalGainsCalculatorPage() {
  const [purchasePrice, setPurchasePrice] = useState('')
  const [salePrice, setSalePrice] = useState('')
  const [holdingPeriod, setHoldingPeriod] = useState('')
  const [assetType, setAssetType] = useState<AssetType>('property')
  const [hasCalculated, setHasCalculated] = useState(false)

  const purchaseNum = Math.max(0, parseInt(purchasePrice, 10) || 0)
  const saleNum = Math.max(0, parseInt(salePrice, 10) || 0)
  const holdingNum = Math.max(0, parseFloat(holdingPeriod) || 0)

  const { gain, isLongTerm, estimatedTax } = calcCapitalGains(
    purchaseNum,
    saleNum,
    holdingNum,
    assetType
  )
  const showResults = hasCalculated && (purchaseNum > 0 || saleNum > 0)

  return (
    <>
      <ToolLayout
        title="Capital Gains Calculator"
        subtitle="LTCG/STCG on property & investments"
      >
        <div className="space-y-4">
          <div>
            <label className={toolLabelClass}>Purchase Price</label>
            <div className="flex items-center gap-2">
              <span className="text-[15px] text-[#6b7280]">₹</span>
              <ToolInput
                type="number"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
                placeholder="e.g. 5000000"
              />
            </div>
          </div>

          <div>
            <label className={toolLabelClass}>Sale Price</label>
            <div className="flex items-center gap-2">
              <span className="text-[15px] text-[#6b7280]">₹</span>
              <ToolInput
                type="number"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
                placeholder="e.g. 6500000"
              />
            </div>
          </div>

          <div>
            <label className={toolLabelClass}>Holding Period (years)</label>
            <ToolInput
              type="number"
              step="0.5"
              value={holdingPeriod}
              onChange={(e) => setHoldingPeriod(e.target.value)}
              placeholder="e.g. 3"
            />
          </div>

          <div>
            <label className={toolLabelClass}>Asset Type</label>
            <div className="flex flex-col gap-2 pt-1">
              {(
                [
                  { value: 'property' as const, label: 'Property' },
                  { value: 'stock' as const, label: 'Stock' },
                  { value: 'mutual_fund' as const, label: 'Mutual Fund' },
                ] as const
              ).map((opt) => (
                <label
                  key={opt.value}
                  className="flex items-center gap-2.5 cursor-pointer text-[15px] text-[#374151]"
                >
                  <input
                    type="radio"
                    name="assetType"
                    checked={assetType === opt.value}
                    onChange={() => setAssetType(opt.value)}
                    className="w-4 h-4 accent-[#3B82F6]"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setHasCalculated(true)}
          className="w-full mt-6 py-[14px] px-4 rounded-[12px] font-semibold text-[15px] text-white transition-opacity hover:opacity-95"
          style={{ background: '#334155' }}
        >
          Calculate
        </button>

        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 rounded-2xl border border-[#e5e7eb] p-5 bg-white"
            style={{ boxShadow: '0 6px 14px rgba(0,0,0,0.06)' }}
          >
            <h3 className="text-[16px] font-semibold text-[#111827] mb-4">
              Result
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-[14px]">
                <span className="text-[#6b7280]">Capital Gain</span>
                <span className="font-semibold text-[#111827]">
                  ₹{gain.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-[14px]">
                <span className="text-[#6b7280]">Type</span>
                <span className="font-medium text-[#111827]">
                  {isLongTerm ? 'Long Term' : 'Short Term'}
                </span>
              </div>
              <div className="flex justify-between text-[14px] pt-2 border-t border-[#e5e7eb]">
                <span className="text-[#6b7280]">Estimated Tax</span>
                <span className="font-semibold text-[#111827]">
                  ₹{estimatedTax.toLocaleString('en-IN')}
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
            href={getWhatsAppLink(shopConfig.contact.clientPhoneE164 || '919086038829', "Hello Sir, I used the Capital Gains Calculator. I'd like help with my return.")}
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
