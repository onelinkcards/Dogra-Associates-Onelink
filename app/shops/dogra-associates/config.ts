// Shop Configuration for Dogra Associates – Chartered Accountant
// All shop-specific data lives here (per ONELINK_DESIGN_GUIDE Section 8 & 9)

export type ContactPersonLabel = "Ramit Khurana" | "Office"

export interface ContactPerson {
  label: ContactPersonLabel
  phoneE164: string
  phoneDisplay: string
  whatsappE164: string
}

export const shopConfig = {
  name: "Dogra Associates",
  tagline: "Ramit Khurana — Chartered Accountant",
  taglineShort: "Managing Partner",
  serviceTagline: "Tax Advisory • Compliance • Financial Services",
  // Business Snapshot (back of card) copy
  snapshotLocationLine: "Dogra Associates, Jammu",
  snapshotServicesLine: "Income Tax • GST • Company Registration",
  snapshotHours: "Mon–Sat 10:30 AM – 7:00 PM",
  url: "https://honeymoneyfish.co",
  cardType: "B2C" as const,
  keywordBadges: ["ICAI Registered", "20+ Years Experience", "Tax & GST Expert"] as string[],

  contact: {
    phones: ["9086038829", "9419238829"],
    email: "ramitkhurana@gmail.com",
    address: "Dogra Associates, Jammu",
    locationLine: "Dogra Associates – Chartered Accountant",
    mapQuery: "32.746583,74.847111",
  storeHours: "Mon–Sat 10:30 AM – 7:00 PM",
  storeHoursStatus: "Open Hours",
    officePhone: "9419238829",
    clientPhone: "9086038829",
    clientPhoneE164: "919086038829",
    officePhoneE164: "919419238829",
  },

  contactPersons: [
    { label: "Ramit Khurana" as ContactPersonLabel, phoneE164: "919086038829", phoneDisplay: "90860 38829", whatsappE164: "919086038829" },
    { label: "Office" as ContactPersonLabel, phoneE164: "919419238829", phoneDisplay: "94192 38829", whatsappE164: "919419238829" },
  ] as ContactPerson[],

  whatsapp: {
    defaultPhone: "9086038829",
    defaultMessage: "Hello Sir, I need consultation regarding tax services.",
    showSelector: true,
    selectorPersons: ["Ramit Khurana", "Office"] as ContactPersonLabel[],
  },

  social: {
    facebook: "https://www.facebook.com/share/198avg1doq/",
    instagram: "https://www.instagram.com/mangojammu/?hl=en",
    instagramJammu: "https://www.instagram.com/mangojammu/?hl=en",
    twitter: "",
    linkedin: "https://www.linkedin.com/in/ramit-khurana-56530756/",
    zomato: "",
  },

  trustBadges: ["ICAI Registered", "20+ Years Experience", "Tax & GST Expert"] as string[],

  brands: [
    { name: "Tax Advisory", tagline: "", logo: "" },
    { name: "GST & Compliance", tagline: "", logo: "" },
    { name: "Financial Services", tagline: "", logo: "" },
    { name: "Audit & Assurance", tagline: "", logo: "" },
    { name: "Business Consulting", tagline: "", logo: "" },
  ],

  about: {
    title: "Welcome to Dogra Associates",
    shortDescription: "Dogra Associates is a professional Chartered Accountancy firm led by Ramit Khurana, Managing Partner with over 20 years of experience. We offer tax advisory, GST compliance, audit, and financial consulting services for individuals and businesses.",
  },
  menuUrl: "/services",

  payment: {
    upiId: "ramitkhuranaca@okhdfcbank",
    upiId2: "TM007270664@jkb",
    upiName: "Dogra Associates",
    upiQrImageUrl: "",
    scannerImage: "/gallery/WhatsApp Image 2026-03-14 at 13.19.21 (1) 1.png",
    bank: {
      bankName: "Jammu and Kashmir Bank",
      accountNumberMasked: "0051010100002573",
      ifsc: "JAKA0LINKRO",
      accountHolder: "Dogra Associates",
    },
    showScanner: true,
    showDownloadQR: true,
  },

  google: {
    placeId: "",
    mapsUrl: "https://maps.app.goo.gl/iSyNMxFKeDX6Tgi1A",
    reviewsUrl: "https://www.google.com/search?q=Dogra+Associates+Ramit+Khurana+reviews",
  },

  seo: {
    title: "Dogra Associates | Ramit Khurana – Chartered Accountant",
    description: "Dogra Associates – Ramit Khurana, Chartered Accountant & Managing Partner. Tax advisory, GST compliance, audit and financial services. 20+ years experience.",
    keywords: "Dogra Associates, Chartered Accountant Jammu, CA Ramit Khurana, Tax Advisory, GST Compliance, ICAI Registered",
  },

  credits: {
    designer: "RepixelX Studio",
    designerUrl: "https://repixelx.com",
  },

  sections: {
    showAbout: true,
    showMenu: false,
    showServices: true,
    showGallery: true,
    showReviews: true,
    showSocialConnect: true,
    showContactCard: true,
    showFooter: true,
  },

  assets: {
    logo: "/1eb5f5883a760d9c9fe0132343447f06.jpg",
    gallery: "/shops/dogra-associates/assets/gallery/",
    qr: "/shops/dogra-associates/assets/qr/scan.png",
  },

  catalog: [] as Array<{ id: string; title: string; description: string; logo: string; details: string; images: string[] }>,
  brochures: [] as Array<{ href: string; title: string }>,
}

export type ShopConfig = typeof shopConfig
