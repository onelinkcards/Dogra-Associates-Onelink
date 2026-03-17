'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ToolLayout from '../components/ToolLayout'
import { ToolInput, toolLabelClass } from '../components/ToolInput'
import ConversionCTA from '../components/ConversionCTA'
import { shopConfig } from '../../shops/honeys-fresh-n-frozen/config'
import { getWhatsAppLink } from '../../lib/phone'

const GST_RATES = [5, 12, 18, 28] as const

export default function GSTCalculatorPage() {
  const [amount, setAmount] = useState('')
  const [rate, setRate] = useState<number>(18)
  const [mode, setMode] = useState<'add' | 'remove'>('add')
  const [hasCalculated, setHasCalculated] = useState(false)

  const amountNum = Math.max(0, parseFloat(amount) || 0)
  const gstAmount =
    mode === 'add'
      ? Math.round((amountNum * rate) / 100)
      : Math.round((amountNum * rate) / (100 + rate))
  const totalAmount = mode === 'add' ? amountNum + gstAmount : amountNum

  const showResults = hasCalculated && amountNum > 0

  return (
    <>
      <ToolLayout
        title="GST Calculator"
        subtitle="Add or remove GST from amounts"
      >
        <div className="space-y-4">
          <div>
            <label className={toolLabelClass}>Amount</label>
            <div className="flex items-center gap-2">
              <span className="text-[15px] text-[#6b7280]">₹</span>
              <ToolInput
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 10000"
              />
            </div>
          </div>

          <div>
            <label className={toolLabelClass}>GST Rate</label>
            <div className="flex flex-wrap gap-2">
              {GST_RATES.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRate(r)}
                  className="py-2.5 px-4 rounded-[12px] text-[15px] font-medium transition-all"
                  style={{
                    background: rate === r ? '#3B82F6' : '#f9fafb',
                    color: rate === r ? 'white' : '#374151',
                    border: `1px solid ${rate === r ? '#3B82F6' : '#e5e7eb'}`,
                  }}
                >
                  {r}%
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={toolLabelClass}>Mode</label>
            <div className="flex flex-col gap-2 pt-1">
              <label className="flex items-center gap-2.5 cursor-pointer text-[15px] text-[#374151]">
                <input
                  type="radio"
                  name="gstMode"
                  checked={mode === 'add'}
                  onChange={() => setMode('add')}
                  className="w-4 h-4 accent-[#3B82F6]"
                />
                Add GST
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer text-[15px] text-[#374151]">
                <input
                  type="radio"
                  name="gstMode"
                  checked={mode === 'remove'}
                  onChange={() => setMode('remove')}
                  className="w-4 h-4 accent-[#3B82F6]"
                />
                Remove GST
              </label>
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
                <span className="text-[#6b7280]">GST Amount</span>
                <span className="font-semibold text-[#111827]">
                  ₹{gstAmount.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-[14px] pt-2 border-t border-[#e5e7eb]">
                <span className="text-[#6b7280]">Total Amount</span>
                <span className="font-semibold text-[#111827]">
                  ₹{totalAmount.toLocaleString('en-IN')}
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
            href={getWhatsAppLink(shopConfig.contact.clientPhoneE164 || '919086038829', "Hello Sir, I used the GST Calculator. I'd like to discuss my GST compliance.")}
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
