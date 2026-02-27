'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { menuCategories } from '../menu'

const categoryOrder: (keyof typeof menuCategories)[] = [
  'burgerPizza',
  'sandwichSalad',
  'momos',
  'pastaMaggiFries',
  'healthyDrinks',
  'wraps',
  'mojitosSmoothies',
  'shakesIceCream',
  'starters',
  'hotBeverages',
  'riceNoodlesSoups',
  'combos',
  'mainCourse',
  'thali',
]

// Show only 4 categories on home section
const previewCategories = categoryOrder.slice(0, 4)

export default function MenuPreview() {
  return (
    <section id="menu" className="w-full max-w-md mx-auto px-2 py-6">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="mb-6 px-1"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
          Our Menu
        </h2>
        <p className="text-sm sm:text-base text-slate-300 font-medium">
          Fresh • Pure Veg • Made with Care
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {previewCategories.map((key, index) => {
          const category = menuCategories[key]
          return (
            <Link key={key} href={`/menu?cat=${key}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.06, duration: 0.4, ease: 'easeOut' }}
                className="relative h-48 rounded-2xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-xl transition-all"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
                <div
                  className="absolute top-3 right-3 w-12 h-12 rounded-full flex items-center justify-center z-10"
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.35)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  <span className="text-2xl">{category.icon}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                  <h3 className="text-white font-bold text-lg mb-1 leading-tight drop-shadow-lg">
                    {category.name}
                  </h3>
                  <p className="text-white/95 text-sm font-medium leading-relaxed drop-shadow-md mb-3">
                    {category.shortDescription}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-white font-semibold text-sm bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    View Items
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.div>
            </Link>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15, duration: 0.3 }}
      >
        <Link
          href="/menu"
          className="block w-full bg-mango-green hover:bg-mango-greenSoft text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
        >
          View Full Menu
          <ArrowRight className="w-5 h-5" />
        </Link>
      </motion.div>
    </section>
  )
}
