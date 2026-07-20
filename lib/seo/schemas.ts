import { globalSeoData } from '@/lib/data/seo';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eraydus.net';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface HowToStep {
  name: string;
  text: string;
  image?: string;
  url?: string;
}

export interface ProductSchemaInput {
  name: string;
  description: string;
  image: string[];
  sku?: string;
  price?: number;
  currency?: string;
  inStock?: boolean;
  ratingValue?: number;
  reviewCount?: number;
  category?: string;
  url: string;
}

export interface ArticleSchemaInput {
  title: string;
  description: string;
  image: string;
  publishedAt: string;
  modifiedAt?: string;
  authorName?: string;
  url: string;
}

// 1. Organization Schema (EEAT & Backlink Citation Engine)
export function getOrganizationSchema(siteName?: string, description?: string, geoData?: any) {
  return {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    'name': siteName || globalSeoData.siteName,
    'url': SITE_URL,
    'logo': {
      '@type': 'ImageObject',
      'url': `${SITE_URL}/images/logo.png`,
      'caption': 'ERAYDUŞ Lüks Duşakabin Sistemleri Logo',
    },
    'description': description || globalSeoData.defaultDescription,
    'telephone': geoData?.phone || globalSeoData.contact.phone,
    'email': geoData?.email || globalSeoData.contact.email,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': geoData?.address?.streetAddress || globalSeoData.contact.address.streetAddress,
      'addressLocality': geoData?.address?.addressLocality || globalSeoData.contact.address.addressLocality,
      'addressRegion': geoData?.address?.addressRegion || globalSeoData.contact.address.addressRegion,
      'postalCode': geoData?.address?.postalCode || globalSeoData.contact.address.postalCode,
      'addressCountry': geoData?.address?.addressCountry || globalSeoData.contact.address.addressCountry,
    },
    'sameAs': [
      geoData?.socialLinks?.instagram || 'https://www.instagram.com/eraydus',
      geoData?.socialLinks?.facebook || 'https://www.facebook.com/eraydus',
      geoData?.socialLinks?.youtube || 'https://www.youtube.com/@eraydus',
      geoData?.socialLinks?.linkedin || 'https://www.linkedin.com/company/eraydus',
    ].filter(Boolean),
    'knowsAbout': [
      'Duşakabin Üretimi',
      'Temperli Cam Teknolojisi',
      'Nano Cam Kaplama',
      'PVD Kararmaz Profil',
      'Özel Ölçü Banyo Kabinleri',
      'Mimari Banyo Çözümleri',
    ],
  };
}

// 2. LocalBusiness Schema
export function getLocalBusinessSchema(geoData?: any) {
  const latitude = geoData?.geo?.position?.split(';')[0] || '';
  const longitude = geoData?.geo?.position?.split(';')[1] || '';
  return {
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#localbusiness`,
    'name': 'ERAYDUŞ Ankara Lüks Duşakabin Fabrikası',
    'image': `${SITE_URL}/images/og-default.jpg`,
    'url': SITE_URL,
    'telephone': geoData?.phone || '',
    'priceRange': geoData?.localBusiness?.priceRange || '₺₺',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': geoData?.address?.streetAddress || '',
      'addressLocality': geoData?.address?.addressLocality || '',
      'addressRegion': geoData?.address?.addressRegion || '',
      'postalCode': geoData?.address?.postalCode || '',
      'addressCountry': geoData?.address?.addressCountry || 'TR',
    },
    'geo': latitude && longitude ? {
      '@type': 'GeoCoordinates',
      'latitude': latitude,
      'longitude': longitude,
    } : undefined,
    'openingHours': geoData?.localBusiness?.openingHours || 'Mo,Tu,We,Th,Fr,Sa 09:00-19:00',
    'areaServed': [
      { '@type': 'City', 'name': 'Ankara' }
    ],
  };
}

// 3. Breadcrumb Schema
export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

// 4. FAQ Schema
export function getFAQSchema(faqs: FAQItem[]) {
  if (!faqs || faqs.length === 0) return null;

  return {
    '@type': 'FAQPage',
    'mainEntity': faqs.map((faq) => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
      },
    })),
  };
}

// 5. HowTo Schema
export function getHowToSchema(name: string, description: string, steps: HowToStep[], totalTime?: string) {
  return {
    '@type': 'HowTo',
    'name': name,
    'description': description,
    'totalTime': totalTime || 'PT15M',
    'step': steps.map((step, idx) => ({
      '@type': 'HowToStep',
      'position': idx + 1,
      'name': step.name,
      'text': step.text,
      'image': step.image ? (step.image.startsWith('http') ? step.image : `${SITE_URL}${step.image}`) : undefined,
      'url': step.url ? (step.url.startsWith('http') ? step.url : `${SITE_URL}${step.url}`) : undefined,
    })),
  };
}

// 6. Product Schema
export function getProductSchema(input: ProductSchemaInput) {
  return {
    '@type': 'Product',
    '@id': input.url.startsWith('http') ? input.url : `${SITE_URL}${input.url}`,
    'name': input.name,
    'description': input.description,
    'image': input.image.map((img) => (img.startsWith('http') ? img : `${SITE_URL}${img}`)),
    'sku': input.sku || `ERAY-${input.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
    'brand': {
      '@type': 'Brand',
      'name': 'ERAYDUŞ',
    },
    'category': input.category || 'Duşakabin',
    'offers': {
      '@type': 'Offer',
      'url': input.url.startsWith('http') ? input.url : `${SITE_URL}${input.url}`,
      'priceCurrency': input.currency || 'TRY',
      'price': input.price ? input.price.toString() : '0',
      'availability': input.inStock !== false ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      'seller': {
        '@type': 'Organization',
        'name': 'ERAYDUŞ',
      },
    },
    'aggregateRating': input.ratingValue ? {
      '@type': 'AggregateRating',
      'ratingValue': input.ratingValue,
      'reviewCount': input.reviewCount || 12,
      'bestRating': '5',
      'worstRating': '1',
    } : undefined,
  };
}

// 7. Article / BlogPosting Schema
export function getArticleSchema(input: ArticleSchemaInput) {
  return {
    '@type': 'Article',
    '@id': input.url.startsWith('http') ? input.url : `${SITE_URL}${input.url}`,
    'headline': input.title,
    'description': input.description,
    'image': input.image.startsWith('http') ? input.image : `${SITE_URL}${input.image}`,
    'datePublished': input.publishedAt,
    'dateModified': input.modifiedAt || input.publishedAt,
    'author': {
      '@type': 'Person',
      'name': input.authorName || 'Erayduş Uzman Ekibi',
      'jobTitle': 'Senior Bathroom Systems Specialist',
    },
    'publisher': getOrganizationSchema(),
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': input.url.startsWith('http') ? input.url : `${SITE_URL}${input.url}`,
    },
  };
}

// 8. ImageObject Schema
export function getImageObjectSchema(url: string, caption?: string, title?: string) {
  return {
    '@type': 'ImageObject',
    'contentUrl': url.startsWith('http') ? url : `${SITE_URL}${url}`,
    'caption': caption || 'ERAYDUŞ Lüks Duşakabin',
    'name': title || caption || 'ERAYDUŞ Duşakabin Görseli',
  };
}

// 9. Unified AI Graph Schema Generator (ChatGPT, Gemini, Claude, Perplexity ready)
export function getGraphSchema(schemas: any[]) {
  const validSchemas = schemas.filter(Boolean);
  return {
    '@context': 'https://schema.org',
    '@graph': validSchemas,
  };
}
