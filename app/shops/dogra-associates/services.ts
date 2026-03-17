// CA firm services – categories and service items (same structure as menu for UI reuse)

export interface ServiceItem {
  id: string
  name: string
  description?: string
  price?: string
  note?: string
  category: ServiceCategoryKey
}

export type ServiceCategoryKey =
  | 'incomeTax'
  | 'gstServices'
  | 'businessRegistration'
  | 'auditCompliance'
  | 'financialAdvisory'

function serviceItem(
  id: string,
  name: string,
  category: ServiceCategoryKey,
  description?: string,
  price?: string,
  note?: string
): ServiceItem {
  return { id, name, category, description, price, note }
}

export interface ServiceCategoryConfig {
  name: string
  shortDescription: string
  icon: string
  image: string
  items: ServiceItem[]
}

// Category images (professional/finance themed)
const categoryImages: Record<ServiceCategoryKey, string> = {
  incomeTax:
    'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=300&fit=crop',
  gstServices:
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop',
  businessRegistration:
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
  auditCompliance:
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
  financialAdvisory:
    'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=300&fit=crop',
}

export const serviceCategories: Record<ServiceCategoryKey, ServiceCategoryConfig> = {
  incomeTax: {
    name: 'Income Tax',
    shortDescription: 'ITR filing, tax planning and capital gains advisory.',
    icon: '📋',
    image: categoryImages.incomeTax,
    items: [
      serviceItem(
        'it-1',
        'Income Tax Return Filing',
        'incomeTax',
        'ITR filing for salaried & business clients',
        'Starting from ₹999'
      ),
      serviceItem(
        'it-2',
        'Tax Planning Consultation',
        'incomeTax',
        'Professional tax strategy guidance'
      ),
      serviceItem(
        'it-3',
        'Capital Gains Advisory',
        'incomeTax',
        'Property & investment tax support'
      ),
    ],
  },
  gstServices: {
    name: 'GST Services',
    shortDescription: 'Registration, returns and notice handling.',
    icon: '📑',
    image: categoryImages.gstServices,
    items: [
      serviceItem(
        'gst-1',
        'GST Registration',
        'gstServices',
        'Complete registration assistance'
      ),
      serviceItem(
        'gst-2',
        'GST Return Filing',
        'gstServices',
        'Monthly/quarterly compliance'
      ),
      serviceItem(
        'gst-3',
        'GST Notice Handling',
        'gstServices',
        'Professional representation'
      ),
    ],
  },
  businessRegistration: {
    name: 'Business Registration',
    shortDescription: 'Company, LLP and proprietorship setup.',
    icon: '🏢',
    image: categoryImages.businessRegistration,
    items: [
      serviceItem(
        'br-1',
        'Private Limited Company',
        'businessRegistration',
        'Company incorporation service'
      ),
      serviceItem(
        'br-2',
        'LLP Registration',
        'businessRegistration',
        'Limited Liability Partnership setup'
      ),
      serviceItem(
        'br-3',
        'Proprietorship Registration',
        'businessRegistration',
        'Business setup support'
      ),
    ],
  },
  auditCompliance: {
    name: 'Audit & Compliance',
    shortDescription: 'Internal audit, statutory audit and compliance.',
    icon: '✅',
    image: categoryImages.auditCompliance,
    items: [
      serviceItem(
        'ac-1',
        'Internal Audit',
        'auditCompliance',
        'Operational and compliance review'
      ),
      serviceItem(
        'ac-2',
        'Statutory Audit',
        'auditCompliance',
        'Financial audit services'
      ),
      serviceItem(
        'ac-3',
        'Compliance Advisory',
        'auditCompliance',
        'Corporate compliance guidance'
      ),
    ],
  },
  financialAdvisory: {
    name: 'Financial Advisory',
    shortDescription: 'Planning, valuation and investment advisory.',
    icon: '📊',
    image: categoryImages.financialAdvisory,
    items: [
      serviceItem(
        'fa-1',
        'Financial Planning',
        'financialAdvisory',
        'Personal and business financial strategy'
      ),
      serviceItem(
        'fa-2',
        'Investment Advisory',
        'financialAdvisory',
        'Portfolio and tax-efficient investment guidance'
      ),
      serviceItem(
        'fa-3',
        'Business Valuation',
        'financialAdvisory',
        'Valuation support for transactions'
      ),
    ],
  },
}

// Homepage "Our Services" preview – 4 cards (same layout as menu preview)
export const servicesPreviewCards = [
  {
    key: 'taxGst' as const,
    name: 'Tax & GST Services',
    shortDescription: 'Income Tax, GST registration and returns.',
    icon: '📋',
    image: categoryImages.incomeTax,
    href: '/services?cat=incomeTax',
  },
  {
    key: 'businessCompliance' as const,
    name: 'Business & Compliance',
    shortDescription: 'Company registration and compliance.',
    icon: '🏢',
    image: categoryImages.businessRegistration,
    href: '/services?cat=businessRegistration',
  },
  {
    key: 'auditFinancial' as const,
    name: 'Audit & Financial',
    shortDescription: 'Audit and financial advisory.',
    icon: '✅',
    image: categoryImages.auditCompliance,
    href: '/services?cat=auditCompliance',
  },
  {
    key: 'advisoryPlanning' as const,
    name: 'Advisory & Planning',
    shortDescription: 'Tax and financial planning.',
    icon: '📊',
    image: categoryImages.financialAdvisory,
    href: '/services?cat=financialAdvisory',
  },
] as const
