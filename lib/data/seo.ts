export interface PageSEO {
  id: string;
  path: string;
  title: string;
  description: string;
  keywords: string;
  ogImage?: string;
  isIndexable: boolean;
  lastModified: string;
}

export interface GlobalSEO {
  siteName: string;
  titleSeparator: string;
  defaultDescription: string;
  defaultOgImage: string;
  twitterHandle: string;
}

export const globalSeoData = {
  siteName: 'Erayduş - Ankara Lüks Duşakabin Sistemleri',
  titleSeparator: '|',
  defaultDescription: 'Ankara merkezli Erayduş, Çankaya, Yenimahalle, Çayyolu ve İncek bölgelerine özel ölçü, modern, lüks duşakabin ve banyo dolabı çözümleri sunar.',
  defaultOgImage: '/images/og-default.jpg',
  twitterHandle: '@eraydus',
  // GEO & Local Business Data
  contact: {
    phone: '+90 555 123 4567',
    email: 'info@eraydus.net',
    address: {
      streetAddress: 'Ostim OSB, 100. Yıl Bulvarı',
      addressLocality: 'Yenimahalle',
      addressRegion: 'Ankara',
      postalCode: '06374',
      addressCountry: 'TR'
    }
  },
  geo: {
    region: 'TR-06', // Ankara
    placename: 'Ankara',
    position: '39.9334;32.8597'
  },
  localBusiness: {
    openingHours: 'Mo,Tu,We,Th,Fr,Sa 09:00-19:00',
    priceRange: '₺₺',
    areaServed: [
      'Ankara',
      'Çankaya',
      'Yenimahalle',
      'Çayyolu',
      'İncek',
      'Ümitköy',
      'Keçiören',
      'Etimesgut'
    ]
  }
};

export const pagesSeoData: PageSEO[] = [
  {
    id: 'home',
    path: '/',
    title: 'Ana Sayfa',
    description: 'Erayduş ile lüks ve modern duşakabin deneyimini keşfedin. Özel ölçü üretim mimari cam kabinler.',
    keywords: 'duşakabin, cam kabin, mimari tasarım, lüks banyo, özel üretim',
    isIndexable: true,
    lastModified: '2023-10-24T10:00:00Z',
  },
  {
    id: 'koleksiyonlar',
    path: '/koleksiyonlar',
    title: 'Koleksiyonlar',
    description: 'Edge, Pure ve Neo serilerimizle banyonuza değer katacak modern duşakabin modellerini inceleyin.',
    keywords: 'sürgülü duşakabin, pivot kapı, walk-in kabin, siyah profil',
    isIndexable: true,
    lastModified: '2023-10-25T11:30:00Z',
  },
  {
    id: 'tasarla',
    path: '/tasarla',
    title: 'Kabin Tasarla',
    description: 'Kendi ölçülerinize ve zevkinize göre duşakabininizi tasarlayın, anında fiyat alın.',
    keywords: 'duşakabin fiyat hesaplama, özel ölçü duşakabin, konfigüratör',
    isIndexable: true,
    lastModified: '2023-10-26T09:15:00Z',
  },
  {
    id: 'projeler',
    path: '/projeler',
    title: 'Mimari Projeler',
    description: 'Otel, rezidans ve özel villalar için gerçekleştirdiğimiz referans duşakabin projelerimiz.',
    keywords: 'otel duşakabin projeleri, villa banyo, mimari duşakabin',
    isIndexable: true,
    lastModified: '2023-10-20T14:20:00Z',
  },
  {
    id: 'hakkimizda',
    path: '/hakkimizda',
    title: 'Hakkımızda | Erayduş',
    description: 'Yılların tecrübesiyle Ankara’da duşakabin sektörüne yön veren Erayduş’un vizyonunu, misyonunu ve kalite anlayışını daha yakından tanıyın.',
    keywords: 'erayduş hakkında, vizyon, misyon, kalite politikası, ankara duşakabin firmaları',
    isIndexable: true,
    lastModified: '2023-10-20T14:20:00Z',
  },
  {
    id: 'iletisim',
    path: '/iletisim',
    title: 'İletişim | Erayduş',
    description: 'Projeniz veya sorularınız için bizimle iletişime geçin. Ankara showroom adresimiz, telefon numaramız ve e-posta bilgilerimiz burada.',
    keywords: 'erayduş iletişim, ankara showroom, duşakabin telefon, adres',
    isIndexable: true,
    lastModified: '2023-10-20T14:20:00Z',
  },
];
