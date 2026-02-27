'use client'

import { motion } from 'framer-motion'
import { Sparkles, Leaf, ChefHat, Heart } from 'lucide-react'

const services = [
  {
    id: 'service-1',
    icon: Sparkles,
    title: 'Clean & Hygienic Kitchen',
    description: 'Freshly prepared food in a well-maintained environment.',
  },
  {
    id: 'service-2',
    icon: Leaf,
    title: 'Pure Vegetarian',
    description: '100% vegetarian menu crafted with quality ingredients.',
  },
  {
    id: 'service-3',
    icon: ChefHat,
    title: 'Freshly Prepared Daily',
    description: 'Every dish is prepared fresh in our kitchen.',
  },
  {
    id: 'service-4',
    icon: Heart,
    title: 'Healthy & Balanced Meals',
    description: 'Tasteful food made with care and proper preparation standards.',
  },
]

export default function Services() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="w-full max-w-md mx-auto px-2 py-6"
    >
      <div className="mb-6 px-1">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-1.5">
          Why Mango?
        </h2>
        <p className="text-sm text-slate-300/80 font-normal">
          Clean • Pure Veg • Fresh • Made with Care
        </p>
      </div>

      {/* Services Grid - Premium White/Cream Cards */}
      <div className="grid grid-cols-1 gap-3">
        {services.map((service, index) => {
          const IconComponent = service.icon
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.05, duration: 0.3, ease: 'easeOut' }}
              className="relative rounded-2xl p-5 flex items-center gap-4 overflow-hidden group hover:shadow-xl transition-all"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 251, 245, 0.98) 0%, rgba(250, 247, 240, 0.98) 50%, rgba(245, 243, 238, 0.98) 100%)',
                border: '1px solid rgba(191, 219, 254, 0.4)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)'
              }}
            >
              {/* Subtle Bluish Gradient Overlay */}
              <div className="absolute inset-0 bg-mango-lightGreen/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Icon Container - Premium Blue with Cream Background */}
              <div 
                className="relative w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 bg-mango-lightGreen border border-mango-green/30"
                style={{
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.15)'
                }}
              >
                <IconComponent 
                  className="w-7 h-7 relative z-10" 
                  style={{ color: '#2563eb' }}
                  strokeWidth={2}
                />
                {/* Subtle green tint */}
                <div className="absolute inset-0 bg-mango-lightGreen/50 rounded-xl"></div>
              </div>

              {/* Content */}
              <div className="flex-1 relative z-10">
                <h3 
                  className="font-bold text-base mb-1 leading-tight"
                  style={{ color: '#1e293b' }}
                >
                  {service.title}
                </h3>
                <p 
                  className="text-sm leading-relaxed"
                  style={{ color: '#475569' }}
                >
                  {service.description}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>

    </motion.section>
  )
}
