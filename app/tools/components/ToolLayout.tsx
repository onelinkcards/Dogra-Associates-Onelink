'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface ToolLayoutProps {
  title: string
  subtitle: string
  children: React.ReactNode
}

export default function ToolLayout({ title, subtitle, children }: ToolLayoutProps) {
  return (
    <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingBottom: 140 }}>
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
        <p className="text-[14px] text-[#6b7280] mt-1 mb-6">
          {subtitle}
        </p>
        {children}
      </div>
    </main>
  )
}
