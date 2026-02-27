// Contact Person Type
export type ContactPersonLabel = "Honey" | "Money" | "Office"

export interface ContactPerson {
  label: ContactPersonLabel
  phoneE164: string // Full number with country code: 919419141495
  phoneDisplay: string // Formatted for display: 94191 41495
  whatsappE164: string // Same as phoneE164 for WhatsApp
}

export const siteConfig = {
  name: "Mango",
  tagline: "Pure Vegetarian • Bahu Plaza, Jammu",
  url: "https://honeymoneyfish.co",
  
  contact: {
    phones: ["9419141495", "9419110195"],
    email: "honeyfish.jmu@gmail.com",
    address: "Shop No 32, B2 South Block, Bahu Plaza, Gandhi Nagar, Jammu, Jammu & Kashmir – 180004",
    mapQuery: "Mango Bahu Plaza Jammu Gandhi Nagar",
    storeHours: "Monday – Saturday: 10:30 AM – 9:30 PM. Sunday: 11:00 AM – 9:30 PM.",
    officePhone: "9419108405",
  },
  
  // Contact persons for multi-contact flow
  contactPersons: [
    {
      label: "Honey" as ContactPersonLabel,
      phoneE164: "919419141495",
      phoneDisplay: "94191 41495",
      whatsappE164: "919419141495",
    },
    {
      label: "Money" as ContactPersonLabel,
      phoneE164: "919419110195",
      phoneDisplay: "94191 10195",
      whatsappE164: "919419110195",
    },
    {
      label: "Office" as ContactPersonLabel,
      phoneE164: "919419108405",
      phoneDisplay: "94191 08405",
      whatsappE164: "919419108405",
    },
  ] as ContactPerson[],
  
  whatsapp: {
    defaultPhone: "9419141495",
    defaultMessage: "Hi Mango, I would like to place an order. Please share today's availability and rates.",
  },
  
  trustBadges: [
    "Pure Vegetarian",
    "4.1★ Google Rating",
    "Dine-In & Takeaway"
  ] as string[],
  
  brands: [
    {
      name: "Fresh & Frozen",
      tagline: "Premium Quality",
      logo: "",
    },
    {
      name: "Hygienic Processing",
      tagline: "Top Standards",
      logo: "",
    },
    {
      name: "Doorstep Delivery",
      tagline: "Jammu Wide",
      logo: "",
    },
    {
      name: "Family Legacy",
      tagline: "Since 1968",
      logo: "",
    },
  ],
  
  about: {
    title: "Welcome to Mango",
    shortDescription: "Located in the heart of Bahu Plaza, Mango is a pure vegetarian restaurant serving authentic North Indian and Chinese flavours. We focus on clean preparation, quality ingredients, and a welcoming dining experience for families and friends.",
    fullDescription: "Located in the heart of Bahu Plaza, Mango is a pure vegetarian restaurant serving authentic North Indian and Chinese flavours. We focus on clean preparation, quality ingredients, and a welcoming dining experience for families and friends.",
  },
  
  catalog: [
    {
      id: "service-1",
      title: "Service/Product 1",
      description: "Brief description of your first service or product.",
      logo: "",
      details: "This is a demo description for your first service or product. Replace this with detailed information about what you offer. Explain the benefits, features, and why customers should choose you. Add specific details that make your service unique and valuable.",
      images: [], // Add your product/service images here
    },
    {
      id: "service-2",
      title: "Service/Product 2",
      description: "Brief description of your second service or product.",
      logo: "",
      details: "This is a demo description for your second service or product. Replace this with detailed information about what you offer. Explain the benefits, features, and why customers should choose you. Add specific details that make your service unique and valuable.",
      images: [], // Add your product/service images here
    },
    {
      id: "service-3",
      title: "Service/Product 3",
      description: "Brief description of your third service or product.",
      logo: "",
      details: "This is a demo description for your third service or product. Replace this with detailed information about what you offer. Explain the benefits, features, and why customers should choose you. Add specific details that make your service unique and valuable.",
      images: [], // Add your product/service images here
    },
    {
      id: "service-4",
      title: "Service/Product 4",
      description: "Brief description of your fourth service or product.",
      logo: "",
      details: "This is a demo description for your fourth service or product. Replace this with detailed information about what you offer. Explain the benefits, features, and why customers should choose you. Add specific details that make your service unique and valuable.",
      images: [], // Add your product/service images here
    },
  ],
  
  brochures: [] as Array<{ href: string; title: string }>,
  
  social: {
    facebook: "https://www.facebook.com/share/198avg1doq/",
    instagram: "https://www.instagram.com/mangojammu/?hl=en",
    twitter: "https://twitter.com/yourbusiness",
    linkedin: "https://www.linkedin.com/company/yourbusiness",
  },
  
  seo: {
    title: "Mango - Pure Vegetarian Restaurant | Bahu Plaza Jammu",
    description: "Mango Bahu Plaza Jammu - Pure vegetarian restaurant. North Indian & Chinese cuisine, dine-in & takeaway. Authentic taste, quality ingredients.",
    keywords: "Mango Jammu, vegetarian restaurant Bahu Plaza, North Indian Jammu, Chinese food Jammu, pure veg restaurant Jammu",
  },
  
  credits: {
    designer: "RepixelX Studio",
    designerUrl: "https://repixelx.com",
  },
  
  google: {
    placeId: "ChIJa7Yhg4-EHjkRrZWiBBo2YRo",
    mapsUrl: "https://www.google.com/maps/search/Mango+Bahu+Plaza+Jammu+Gandhi+Nagar",
    reviewsUrl: "https://www.google.com/maps/search/Mango+Bahu+Plaza+Jammu+Gandhi+Nagar",
  },
}

export type SiteConfig = typeof siteConfig
