'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
// Shop-specific components
import Hero from './shops/dogra-associates/components/Hero'
import About from './shops/dogra-associates/components/About'
import MenuPreview from './shops/dogra-associates/components/MenuPreview'
import Services from './shops/dogra-associates/components/Services'
import ContactCard from './shops/dogra-associates/components/ContactCard'
// Shop-specific components (Gallery and Reviews)
import Gallery from './shops/dogra-associates/components/Gallery'
import GoogleReviews from './shops/dogra-associates/components/GoogleReviews'
import UrgencyCTA from './shops/dogra-associates/components/UrgencyCTA'
// Shared components
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import LoadingScreen from './components/LoadingScreen'

export default function Home() {
  const [showLoading, setShowLoading] = useState(true)

  useEffect(() => {
    // Back from gallery / services / reviews: show hero card at top, skip long loading
    if (typeof window !== 'undefined') {
      try {
        if (sessionStorage.getItem('homeBackSkipLoad') === 'true') {
          sessionStorage.removeItem('homeBackSkipLoad')
          setShowLoading(false)
          window.scrollTo(0, 0)
          return
        }
      } catch {
        // sessionStorage may be unavailable
      }
    }

    // Show loading screen on every page load/refresh briefly (avoid "stuck" look)
    const timer = setTimeout(() => {
      setShowLoading(false)
    }, 1600)

    // Fallback: ensure loading screen always disappears after 5 seconds max
    const fallbackTimer = setTimeout(() => {
      setShowLoading(false)
    }, 2500)

    return () => {
      clearTimeout(timer)
      clearTimeout(fallbackTimer)
    }
  }, [])

  // Handle hash navigation after loading
  useEffect(() => {
    if (!showLoading && typeof window !== 'undefined') {
      // If there's a #gallery hash on refresh, remove it and scroll to top
      if (window.location.hash === '#gallery') {
        window.history.replaceState(null, '', window.location.pathname)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }, [showLoading])

  return (
    <>
      <AnimatePresence mode="wait">
        {showLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>
      {!showLoading && (
        <main 
          className="min-h-screen pb-12 relative z-10 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))]"
          style={{ backgroundColor: '#1a1a1a' }}
        >
          <Hero />
          <About />
          <MenuPreview />
          <Services />
          <GoogleReviews />
          <UrgencyCTA />
          <Gallery />
          <ContactCard />
          <Footer />
          <BackToTop />
        </main>
      )}
    </>
  )
}
