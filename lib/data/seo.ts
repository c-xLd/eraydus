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

export const globalSeoData: GlobalSEO = {
  siteName: 'Erayduş - Ankara Duşakabin',
  titleSeparator: '|',
  defaultDescription: 'ankara duşakabin, duşakabin, duşakabin fiyatları, duşakabin modeller, duşakabin ankara, duşakabinler, banyo dolabı, erayduş',
  defaultOgImage: '/images/og-default.jpg',
  twitterHandle: '@eraydus',
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
    id: 'magaza',
    path: '/magaza',
    title: 'Mağaza',
    description: 'ankara duşakabin, duşakabin, duşakabin fiyatları, duşakabin modeller, duşakabin ankara, duşakabinler, banyo dolabı, erayduş',
    keywords: 'ankara duşakabin, duşakabin fiyatları, duşakabin ankara, banyo dolabı',
    isIndexable: true,
    lastModified: new Date().toISOString(),
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
];
