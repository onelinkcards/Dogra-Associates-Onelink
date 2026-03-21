// Site config for Footer and shared refs (per ONELINK_DESIGN_GUIDE Section 9)

import { PUBLIC_SITE_URL } from '../lib/public-site-url'

export type ContactPersonLabel = "Ramit Khurana" | "Office"

export interface ContactPerson {
  label: ContactPersonLabel
  phoneE164: string
  phoneDisplay: string
  whatsappE164: string
}

export const siteConfig = {
  name: "Dogra Associates",
  tagline: "Ramit Khurana – Chartered Accountant",
  url: PUBLIC_SITE_URL,

  contact: {
    phones: ["9086038829", "9419238829"],
    email: "ramitkhurana@gmail.com",
    address: "Dogra Associates, Jammu",
    mapQuery: "32.746583,74.847111",
    storeHours: "By appointment",
    officePhone: "9419238829",
  },

  contactPersons: [
    { label: "Ramit Khurana" as ContactPersonLabel, phoneE164: "919086038829", phoneDisplay: "90860 38829", whatsappE164: "919086038829" },
    { label: "Office" as ContactPersonLabel, phoneE164: "919419238829", phoneDisplay: "94192 38829", whatsappE164: "919419238829" },
  ] as ContactPerson[],

  whatsapp: {
    defaultPhone: "9086038829",
    defaultMessage: "Hello Sir, I need consultation regarding tax services.",
  },

  trustBadges: ["ICAI Registered", "20+ Years Experience", "Tax & GST Expert"] as string[],

  brands: [
    { name: "Tax Advisory", tagline: "", logo: "" },
    { name: "GST & Compliance", tagline: "", logo: "" },
    { name: "Financial Services", tagline: "", logo: "" },
    { name: "Audit & Assurance", tagline: "", logo: "" },
  ],

  about: {
    title: "Welcome to Dogra Associates",
    shortDescription: "Dogra Associates is a professional Chartered Accountancy firm led by Ramit Khurana, Managing Partner with over 20 years of experience. We offer tax advisory, GST compliance, audit, and financial consulting services for individuals and businesses.",
    fullDescription: "Dogra Associates is a professional Chartered Accountancy firm led by Ramit Khurana, Managing Partner with over 20 years of experience. We offer tax advisory, GST compliance, audit, and financial consulting services for individuals and businesses.",
  },

  catalog: [] as Array<{ id: string; title: string; description: string; logo: string; details: string; images: string[] }>,
  brochures: [] as Array<{ href: string; title: string }>,

  social: {
    facebook: "https://www.facebook.com/share/198avg1doq/",
    instagram: "https://www.instagram.com/mangojammu/?hl=en",
    twitter: "",
    linkedin: "",
  },

  seo: {
    title: 'Dogra Associates | Ramit Khurana CA in Jammu | Tax & GST Expert',
    description:
      'Need a CA in Jammu or a Chartered Accountant Jammu for income tax, GST filing Jammu, audit and compliance? Led by Ramit Khurana CA, Dogra Associates helps individuals and businesses with GST filing Jammu and Income tax consultant Jammu support - stress-free, on time, and fully compliant.',
    keywords:
      'Dogra Associates, Ramit Khurana CA, Chartered Accountant Jammu, CA in Jammu, GST filing Jammu, Income tax consultant Jammu, GST and Tax Consultant Jammu',
  },

  credits: {
    designer: "RepixelX Studio",
    designerUrl: "https://repixelx.com",
  },

  google: {
    placeId: "",
    mapsUrl: "https://maps.app.goo.gl/iSyNMxFKeDX6Tgi1A",
    reviewsUrl: "https://www.google.com/search?q=Dogra+Associates+Ramit+Khurana+reviews",
  },
}

export type SiteConfig = typeof siteConfig
