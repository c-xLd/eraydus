export const NEW_CONFIGURATOR_DATA = {
  layouts: [
    { id: 'wall-to-wall', name: 'Wall to Wall', nameTr: 'Duvardan Duvara', image: 'https://images.unsplash.com/photo-1620626011761-9ea0184404d5?q=80&w=600' },
    { id: 'corner', name: 'Corner', nameTr: 'Köşe', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=600' },
    { id: 'walk-in', name: 'Walk-in', nameTr: 'Açık Sistem', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600' },
    { id: 'custom', name: 'Custom', nameTr: 'Özel Ölçü', image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=600' }
  ],
  collections: [
    { id: 'premium', name: 'Premium Collection', nameTr: 'Premium Koleksiyon', basePrice: 12500, desc: 'Luxury frameless.', descTr: 'Lüks çerçevesiz.' },
    { id: 'minimal', name: 'Minimal Collection', nameTr: 'Minimal Koleksiyon', basePrice: 9500, desc: 'Clean lines.', descTr: 'Temiz çizgiler.' },
    { id: 'black', name: 'Black Edition', nameTr: 'Black Edition', basePrice: 14000, desc: 'Matte black finish.', descTr: 'Mat siyah bitiş.' }
  ],
  models: [
    { id: 'aura', name: 'Aura Frameless', nameTr: 'Aura Çerçevesiz', collectionId: 'premium', image: 'https://images.unsplash.com/photo-1620626011761-9ea0184404d5?q=80&w=800' },
    { id: 'nexus', name: 'Nexus Sliding', nameTr: 'Nexus Kayar Kapı', collectionId: 'black', image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=800' },
    { id: 'lumina', name: 'Lumina Pivot', nameTr: 'Lumina Pivot', collectionId: 'minimal', image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=800' }
  ],
  glassTypes: [
    { id: 'transparent', name: 'Transparent', nameTr: 'Şeffaf', price: 0 },
    { id: 'smoke', name: 'Smoke', nameTr: 'Füme', price: 1500 },
    { id: 'bronze', name: 'Bronze', nameTr: 'Bronz', price: 1500 },
    { id: 'fluted', name: 'Fluted', nameTr: 'Oluklu', price: 3500 },
    { id: 'matte', name: 'Matte', nameTr: 'Kumlama', price: 2000 }
  ],
  glassThickness: [
    { id: '6mm', name: '6 mm', price: 0 },
    { id: '8mm', name: '8 mm', price: 1200 },
    { id: '10mm', name: '10 mm', price: 2500 }
  ],
  profileColors: [
    { id: 'chrome', name: 'Chrome', nameTr: 'Krom', hex: '#e8e9eb', price: 0 },
    { id: 'black', name: 'Matte Black', nameTr: 'Mat Siyah', hex: '#1a1a1a', price: 1500 },
    { id: 'gold', name: 'Brushed Gold', nameTr: 'Fırçalı Altın', hex: '#d4af37', price: 3000 },
    { id: 'gunmetal', name: 'Gunmetal', nameTr: 'Gunmetal', hex: '#2c3539', price: 2500 }
  ],
  doorSystems: [
    { id: 'sliding', name: 'Sliding', nameTr: 'Kayar', price: 0 },
    { id: 'pivot', name: 'Pivot', nameTr: 'Pivot', price: 500 },
    { id: 'hinged', name: 'Hinged', nameTr: 'Menteşeli', price: 1200 }
  ],
  openingDirections: [
    { id: 'left', name: 'Left', nameTr: 'Sol' },
    { id: 'right', name: 'Right', nameTr: 'Sağ' },
    { id: 'double', name: 'Double', nameTr: 'Çift' }
  ],
  handles: [
    { id: 'minimal', name: 'Minimal', nameTr: 'Minimal', price: 0 },
    { id: 'square', name: 'Square', nameTr: 'Kare', price: 250 },
    { id: 'round', name: 'Round', nameTr: 'Yuvarlak', price: 250 },
    { id: 'hidden', name: 'Hidden', nameTr: 'Gizli', price: 800 }
  ],
  accessories: [
    { id: 'nano', name: 'Nano Protection', nameTr: 'Nano Koruma', price: 600 },
    { id: 'shelf', name: 'Glass Shelf', nameTr: 'Cam Raf', price: 850 },
    { id: 'towel', name: 'Towel Bar', nameTr: 'Havluluk', price: 1200 }
  ],
  installations: [
    { id: 'delivery', name: 'Delivery Only', nameTr: 'Sadece Teslimat', price: 0 },
    { id: 'professional', name: 'Professional Installation', nameTr: 'Profesyonel Kurulum', price: 2500 }
  ],
  warranties: [
    { id: '2years', name: '2 Years', nameTr: '2 Yıl', price: 0 },
    { id: '5years', name: '5 Years', nameTr: '5 Yıl', price: 1500 },
    { id: '10years', name: '10 Years', nameTr: '10 Yıl', price: 3500 }
  ]
};
