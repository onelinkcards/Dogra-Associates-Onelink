'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'

// Gallery images from public/gallery folder
const galleryImages = [
  '/gallery/WhatsApp%20Image%202026-03-15%20at%2021.23.25.jpeg',
  '/gallery/WhatsApp%20Image%202026-03-15%20at%2021.23.31.jpeg',
  '/gallery/Green%20and%20Yellow%20Modern%20Income%20Tax%20Filing%20Instagram%20Post.png',
  '/gallery/Blue%20and%20Yellow%20Modern%20Income%20Tax%20Filing%20Instagram%20Post.png',
]

const visibleImages = galleryImages.slice(0, 4)

export default function Gallery() {
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      visibleImages.forEach((src) => {
        const img = document.createElement('img')
        img.src = src
      })
    }
  }, [])

  const handleImageClick = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('fromGallery', 'true')
    }
    router.push('/gallery')
  }

  return (
    <section id="gallery" className="w-full max-w-md mx-auto pt-8 pb-6">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="mb-6"
      >
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1.5 text-white">
          Gallery
        </h2>
        <p className="text-sm font-normal text-white/90">
          Office moments & client interactions
        </p>
      </motion.div>

      {/* 4 image grid – premium card style */}
      <div className="grid grid-cols-2 gap-3">
        {visibleImages.map((imageSrc, index) => (
          <motion.div
            key={`gallery-${index}-${imageSrc}`}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ delay: index * 0.06, duration: 0.3 }}
            className="relative aspect-square overflow-hidden cursor-pointer group rounded-[14px]"
            style={{
              background: '#FFFFFF',
              border: '1px solid #E5ECF6',
              borderRadius: 14,
              boxShadow: '0 8px 20px rgba(15,42,68,0.06)',
            }}
            onClick={handleImageClick}
          >
            <Image
              src={imageSrc}
              alt={`Gallery image ${index + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 448px) 50vw, 224px"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </motion.div>
        ))}
      </div>

      {/* View Gallery button */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15, duration: 0.3 }}
        className="mt-4"
      >
        <Link
          href="/gallery"
          onClick={() => {
            if (typeof window !== 'undefined') {
              sessionStorage.setItem('fromGallery', 'true')
            }
          }}
          className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-[14px] font-semibold transition-all"
          style={{
            background: 'linear-gradient(135deg, rgba(37,99,235,1) 0%, rgba(30,64,175,1) 100%)',
            border: '1px solid rgba(59,130,246,0.55)',
            color: '#FFFFFF',
            boxShadow: '0 12px 26px rgba(37,99,235,0.25), inset 0 1px 0 rgba(255,255,255,0.15)',
          }}
        >
          <span className="font-semibold text-sm" style={{ color: '#FFFFFF' }}>View Gallery</span>
          <ArrowRight className="w-4 h-4" style={{ color: '#E0F2FE' }} />
        </Link>
      </motion.div>
    </section>
  )
}
