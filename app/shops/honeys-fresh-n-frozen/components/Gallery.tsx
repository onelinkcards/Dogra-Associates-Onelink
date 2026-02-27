'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'

// Gallery images from public/gallery folder (Mango)
const galleryImages = [
  '/gallery/unnamed.webp',
  '/gallery/unnamed (1).webp',
  '/gallery/unnamed (2).webp',
  '/gallery/unnamed (3).webp',
  '/gallery/unnamed (4).webp',
  '/gallery/unnamed (5).webp',
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
    <section id="gallery" className="w-full max-w-md mx-auto px-2 pt-8 pb-6">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="mb-6 px-1"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-1.5">
          Gallery
        </h2>
        <p className="text-sm text-slate-300/80 font-normal">
          Moments at Mango
        </p>
      </motion.div>

      {/* 4 image grid – click any image → open gallery page */}
      <div className="grid grid-cols-2 gap-3">
        {visibleImages.map((imageSrc, index) => (
          <motion.div
            key={`gallery-${index}-${imageSrc}`}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ delay: index * 0.06, duration: 0.3 }}
            className="relative aspect-square rounded-2xl overflow-hidden shadow-lg cursor-pointer group"
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

      {/* View Gallery button – same: opens gallery page */}
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
          className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold transition-all"
        >
          <span className="text-white font-semibold text-sm">View Gallery</span>
          <ArrowRight className="w-4 h-4 text-white" />
        </Link>
      </motion.div>
    </section>
  )
}
