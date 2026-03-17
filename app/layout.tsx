import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { siteConfig } from './data/site'
import { LanguageProvider } from './contexts/LanguageContext'
import { CartProvider } from './contexts/CartContext'
import { shopConfig } from './shops/dogra-associates/config'

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  keywords: siteConfig.seo.keywords,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.credits.designer,
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteConfig.url,
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/Frame 2147226119.png`,
        width: 1200,
        height: 630,
        alt: 'Dogra Associates | Ramit Khurana CA in Jammu',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [`${siteConfig.url}/Frame 2147226119.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // JSON-LD structured data for LocalBusiness
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AccountingService',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.seo.description,
    provider: {
      '@type': 'Person',
      name: shopConfig.contactPersons?.[0]?.label || 'Ramit Khurana',
    },
    areaServed: {
      '@type': 'City',
      name: 'Jammu',
    },
    location: {
      '@type': 'Place',
      name: 'Jammu, India',
    },
    telephone: `+91${siteConfig.contact.phones[0]}`,
    email: siteConfig.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.address,
      addressLocality: 'Jammu',
      addressRegion: 'Jammu & Kashmir',
      addressCountry: 'IN',
    },
    serviceType: 'Tax advisory, GST filing, audit and compliance',
    sameAs: [
      siteConfig.social?.facebook,
      siteConfig.social?.instagram,
      siteConfig.social?.twitter,
      siteConfig.social?.linkedin,
    ].filter(Boolean),
  }

  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <style dangerouslySetInnerHTML={{ __html: `
          html, body { 
            background: #F7FAFF;
            min-height: 100%;
          }
        ` }} />
      </head>
      <body className={`${poppins.className} antialiased min-h-screen`} style={{ 
        background: '#F7FAFF'
      }}>
        <LanguageProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}

