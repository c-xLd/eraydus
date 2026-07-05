import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  features: string[];
  category: string;
}

export interface Project {
  id: number;
  title: string;
  location: string;
  category: string;
  image: string;
  description: string;
}

export interface BlogPost {
  id: number;
  title: string;
  titleTr: string;
  category: string;
  categoryTr: string;
  date: string;
  slug: string;
  image: string;
  excerpt: string;
  content?: string;
  contentTr?: string;
}

export interface QuoteRequest {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  projectType: string;
  model: string;
  dimensions: string;
  glass: string;
  profile: string;
  installation: string;
  price: number;
  status: 'New' | 'Contacted' | 'Waiting' | 'Quoted' | 'Approved' | 'Rejected' | 'Completed';
  time: string;
  notes: string;
  created_at: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  notes: string;
  created_at: string;
}

export interface ConfiguratorOption {
  id: string;
  name: string;
  nameTr: string;
  price?: number;
  hex?: string;
  basePrice?: number;
  desc?: string;
  descTr?: string;
  image?: string;
  collectionId?: string;
}

export interface ConfiguratorData {
  layouts: ConfiguratorOption[];
  collections: ConfiguratorOption[];
  models: ConfiguratorOption[];
  glassTypes: ConfiguratorOption[];
  glassThickness: { id: string; name: string; price: number }[];
  profileColors: ConfiguratorOption[];
  doorSystems: ConfiguratorOption[];
  openingDirections: ConfiguratorOption[];
  handles: ConfiguratorOption[];
  accessories: ConfiguratorOption[];
  installations: ConfiguratorOption[];
  warranties: ConfiguratorOption[];
}

export interface CompanySettings {
  companyName: string;
  whatsappNumber: string;
  address: string;
  email: string;
  taxRate: number;
  currency: string;
}

interface AppState {
  language: 'tr' | 'en';
  setLanguage: (lang: 'tr' | 'en') => void;
  
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: number, updates: Partial<Project>) => void;
  deleteProject: (id: number) => void;

  blogPosts: BlogPost[];
  addBlogPost: (post: Omit<BlogPost, 'id' | 'date'>) => void;
  updateBlogPost: (id: number, updates: Partial<BlogPost>) => void;
  deleteBlogPost: (id: number) => void;

  quoteRequests: QuoteRequest[];
  addQuoteRequest: (quote: Omit<QuoteRequest, 'id' | 'time' | 'created_at'>) => string;
  updateQuoteRequestStatus: (id: string, status: QuoteRequest['status'], notes?: string) => void;
  deleteQuoteRequest: (id: string) => void;

  customers: Customer[];
  addCustomer: (customer: Omit<Customer, 'id' | 'created_at'>) => void;
  updateCustomer: (id: string, updates: Partial<Customer>) => void;

  configuratorData: ConfiguratorData;
  updateConfiguratorPrice: (category: keyof ConfiguratorData, optionId: string, price: number) => void;

  settings: CompanySettings;
  updateSettings: (updates: Partial<CompanySettings>) => void;
}

const INITIAL_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Lumina Pivot",
    slug: "lumina-pivot",
    description: "Architectural stance with elegant pivot hinges and ultra-clear tempered glass.",
    price: 14500,
    image: "https://images.unsplash.com/photo-1620626011761-9ea0184404d5?q=80&w=1000&auto=format&fit=crop",
    features: ["8mm Tempered Glass", "Chrome Finish", "Magnetic Seal", "Pivot Mechanism"],
    category: "Framed",
  },
  {
    id: "p2",
    name: "Nexus Sliding",
    slug: "nexus-sliding",
    description: "Premium sliding door system with hidden rollers and matte black profiles.",
    price: 18000,
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1000&auto=format&fit=crop",
    features: ["10mm Tempered Glass", "Soft Close", "Black Matte Finish", "Hidden Rollers"],
    category: "Sliding",
  },
  {
    id: "p3",
    name: "Zenith Walk-In",
    slug: "zenith-walk-in",
    description: "Seamless walk-in shower experience with single fixed panel.",
    price: 9500,
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop",
    features: ["12mm Ultra Clear Glass", "Floor to Ceiling", "Nano Coating", "Minimalist Bracket"],
    category: "Walk-In",
  },
  {
    id: "p4",
    name: "Aura Frameless",
    slug: "aura-frameless",
    description: "Space-saving frameless cabin with dual sliding doors and maximum spaciousness.",
    price: 16200,
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1000&auto=format&fit=crop",
    features: ["6mm Tempered Glass", "Space Saving", "Magnetic Closure", "Frameless Design"],
    category: "Corner",
  }
];

const INITIAL_PROJECTS: Project[] = [
  {
    id: 1,
    title: 'The Bosphorus Villa',
    location: 'Istanbul, Turkey',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2000&auto=format&fit=crop',
    description: 'A complete architectural integration of frameless glass systems in a historic Bosphorus villa. We designed custom ceiling-height enclosures to maximize natural light while maintaining strict minimalist aesthetics.'
  },
  {
    id: 2,
    title: 'Mandarin Oriental Residences',
    location: 'Bodrum, Turkey',
    category: 'Hospitality',
    image: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?q=80&w=2000&auto=format&fit=crop',
    description: 'Supplied and installed 120 premium sliding enclosures featuring nano-treated smoked glass and matte black architectural profiles to match the resort\'s luxury aesthetic.'
  },
  {
    id: 3,
    title: 'Swissôtel The Bosphorus',
    location: 'Istanbul, Turkey',
    category: 'Hospitality',
    image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=2000&auto=format&fit=crop',
    description: 'Custom engineering for presidential suites, featuring smart-glass technology that transitions from clear to opaque for on-demand privacy.'
  },
  {
    id: 4,
    title: 'Izmir Modern Loft',
    location: 'Izmir, Turkey',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2000&auto=format&fit=crop',
    description: 'Industrial-inspired grid enclosures using custom-milled aluminum profiles and fluted glass to complement the raw concrete interior architecture.'
  }
];

const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'How to Measure a Shower Cabin Perfectly',
    titleTr: 'Duşakabin Ölçüsü Nasıl Kusursuz Alınır?',
    category: 'Guides',
    categoryTr: 'Rehberler',
    date: 'Oct 15, 2026',
    slug: 'how-to-measure',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2000&auto=format&fit=crop',
    excerpt: 'A comprehensive guide on taking accurate measurements for your new frameless shower cabin to ensure a perfect fit.'
  },
  {
    id: 2,
    title: 'Frameless vs Semi-Frameless: Which is Right for You?',
    titleTr: 'Çerçevesiz mi Yarı Çerçeveli mi: Hangisi Size Uygun?',
    category: 'Comparison',
    categoryTr: 'Karşılaştırma',
    date: 'Sep 28, 2026',
    slug: 'frameless-vs-semi-frameless',
    image: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?q=80&w=2000&auto=format&fit=crop',
    excerpt: 'Explore the structural and aesthetic differences between frameless and semi-frameless shower enclosures.'
  },
  {
    id: 3,
    title: 'Bathroom Trends 2026: The Minimalist Approach',
    titleTr: 'Banyo Trendleri 2026: Minimalist Yaklaşım',
    category: 'Design',
    categoryTr: 'Tasarım',
    date: 'Sep 12, 2026',
    slug: 'bathroom-trends-2026',
    image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=2000&auto=format&fit=crop',
    excerpt: 'Discover the latest trends in luxury bathroom architecture, focusing on space, light, and premium materials.'
  },
  {
    id: 4,
    title: 'How to Clean and Maintain Nano Glass',
    titleTr: 'Nano Cam Nasıl Temizlenir ve Korunur?',
    category: 'Maintenance',
    categoryTr: 'Bakım',
    date: 'Aug 30, 2026',
    slug: 'clean-nano-glass',
    image: 'https://images.unsplash.com/photo-1585058177051-64d50bb54ec1?q=80&w=2000&auto=format&fit=crop',
    excerpt: 'Simple steps to keep your treated shower glass spotless and clear for years.'
  }
];

const INITIAL_CONFIGURATOR_DATA: ConfiguratorData = {
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

const INITIAL_QUOTE_REQUESTS: QuoteRequest[] = [
  { id: 'Q-2026-0841', name: 'Ahmet Yılmaz', phone: '0532 555 1234', email: 'ahmet@gmail.com', city: 'Istanbul', projectType: 'Residential', model: 'Aura Frameless', dimensions: '120x200', glass: 'Transparent', profile: 'Chrome', installation: 'Professional Installation', price: 42500, status: 'New', time: '10 min ago', notes: 'Müşteri fırçalı altın aksesuarlar da sordu.', created_at: new Date(Date.now() - 10 * 60000).toISOString() },
  { id: 'Q-2026-0840', name: 'Zeynep Kaya', phone: '0541 444 5678', email: 'zeynep@hotmail.com', city: 'Bodrum', projectType: 'Hospitality', model: 'Lumina Pivot', dimensions: '90x190', glass: 'Smoke', profile: 'Matte Black', installation: 'Delivery Only', price: 38000, status: 'Contacted', time: '45 min ago', notes: 'Bodrum şantiyesi için acil teslimat talep ediliyor.', created_at: new Date(Date.now() - 45 * 60000).toISOString() },
  { id: 'Q-2026-0839', name: 'Can Özkan', phone: '0505 333 9988', email: 'can@canozkan.com', city: 'Ankara', projectType: 'Residential', model: 'Aura Frameless', dimensions: '140x220', glass: 'Fluted', profile: 'Brushed Gold', installation: 'Professional Installation', price: 51200, status: 'Quoted', time: '2 hours ago', notes: 'Teklif e-posta ile gönderildi. Yanıt bekleniyor.', created_at: new Date(Date.now() - 120 * 60000).toISOString() },
  { id: 'Q-2026-0838', name: 'Elif Demir', phone: '0533 222 1100', email: 'elif@demirmimarlik.com', city: 'Izmir', projectType: 'Architectural Project', model: 'Nexus Sliding', dimensions: '160x200', glass: 'Transparent', profile: 'Gunmetal', installation: 'Professional Installation', price: 29800, status: 'Approved', time: '4 hours ago', notes: 'Ölçü keşfi için randevu onaylandı.', created_at: new Date(Date.now() - 240 * 60000).toISOString() },
  { id: 'Q-2026-0837', name: 'Burak Şahin', phone: '0544 111 2233', email: 'burak@sahininsaat.com', city: 'Bursa', projectType: 'Residential', model: 'Aura Frameless', dimensions: '100x200', glass: 'Matte', profile: 'Matte Black', installation: 'Delivery Only', price: 45000, status: 'New', time: '5 hours ago', notes: 'WhatsApp üzerinden katalog talep etti.', created_at: new Date(Date.now() - 300 * 60000).toISOString() }
];

const INITIAL_CUSTOMERS: Customer[] = [
  { id: 'C-001', name: 'Ahmet Yılmaz', email: 'ahmet@gmail.com', phone: '0532 555 1234', city: 'Istanbul', notes: 'Banyo tadilat projesi.', created_at: new Date().toISOString() },
  { id: 'C-002', name: 'Zeynep Kaya', email: 'zeynep@hotmail.com', phone: '0541 444 5678', city: 'Bodrum', notes: 'Villa projesi.', created_at: new Date().toISOString() },
  { id: 'C-003', name: 'Can Özkan', email: 'can@canozkan.com', phone: '0505 333 9988', city: 'Ankara', notes: 'Minimalist çatı katı dairesi.', created_at: new Date().toISOString() },
  { id: 'C-004', name: 'Elif Demir', email: 'elif@demirmimarlik.com', phone: '0533 222 1100', city: 'Izmir', notes: 'Mimar iş ortağı.', created_at: new Date().toISOString() }
];

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      language: 'tr',
      setLanguage: (lang) => set({ language: lang }),

      products: INITIAL_PRODUCTS,
      addProduct: (p) => set((state) => {
        const id = 'p' + (state.products.length + 1);
        const slug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return { products: [...state.products, { ...p, id, slug }] };
      }),
      updateProduct: (id, updates) => set((state) => ({
        products: state.products.map((p) => p.id === id ? { ...p, ...updates } : p)
      })),
      deleteProduct: (id) => set((state) => ({
        products: state.products.filter((p) => p.id !== id)
      })),

      projects: INITIAL_PROJECTS,
      addProject: (p) => set((state) => {
        const id = state.projects.reduce((max, pr) => pr.id > max ? pr.id : max, 0) + 1;
        return { projects: [...state.projects, { ...p, id }] };
      }),
      updateProject: (id, updates) => set((state) => ({
        projects: state.projects.map((p) => p.id === id ? { ...p, ...updates } : p)
      })),
      deleteProject: (id) => set((state) => ({
        projects: state.projects.filter((p) => p.id !== id)
      })),

      blogPosts: INITIAL_BLOG_POSTS,
      addBlogPost: (post) => set((state) => {
        const id = state.blogPosts.reduce((max, b) => b.id > max ? b.id : max, 0) + 1;
        const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const slug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return { blogPosts: [...state.blogPosts, { ...post, id, date, slug }] };
      }),
      updateBlogPost: (id, updates) => set((state) => ({
        blogPosts: state.blogPosts.map((b) => b.id === id ? { ...b, ...updates } : b)
      })),
      deleteBlogPost: (id) => set((state) => ({
        blogPosts: state.blogPosts.filter((b) => b.id !== id)
      })),

      quoteRequests: INITIAL_QUOTE_REQUESTS,
      addQuoteRequest: (quote) => {
        let generatedId = '';
        set((state) => {
          const count = state.quoteRequests.length + 842;
          generatedId = `Q-2026-0${count}`;
          const newQuote: QuoteRequest = {
            ...quote,
            id: generatedId,
            time: 'Just now',
            created_at: new Date().toISOString()
          };
          
          // Also automatically add as customer if not exists
          const customerExists = state.customers.some((c) => c.phone === quote.phone);
          let updatedCustomers = state.customers;
          if (!customerExists) {
            const newCustomer: Customer = {
              id: `C-0${state.customers.length + 1}`,
              name: quote.name,
              email: quote.email,
              phone: quote.phone,
              city: quote.city,
              notes: `Registered from quote: ${generatedId}`,
              created_at: new Date().toISOString()
            };
            updatedCustomers = [...state.customers, newCustomer];
          }

          return { 
            quoteRequests: [newQuote, ...state.quoteRequests],
            customers: updatedCustomers
          };
        });
        return generatedId;
      },
      updateQuoteRequestStatus: (id, status, notes) => set((state) => ({
        quoteRequests: state.quoteRequests.map((q) => {
          if (q.id === id) {
            return {
              ...q,
              status,
              notes: notes ? notes : q.notes
            };
          }
          return q;
        })
      })),
      deleteQuoteRequest: (id) => set((state) => ({
        quoteRequests: state.quoteRequests.filter((q) => q.id !== id)
      })),

      customers: INITIAL_CUSTOMERS,
      addCustomer: (c) => set((state) => {
        const id = `C-0${state.customers.length + 1}`;
        return { customers: [...state.customers, { ...c, id, created_at: new Date().toISOString() }] };
      }),
      updateCustomer: (id, updates) => set((state) => ({
        customers: state.customers.map((c) => c.id === id ? { ...c, ...updates } : c)
      })),

      configuratorData: INITIAL_CONFIGURATOR_DATA,
      updateConfiguratorPrice: (category, optionId, price) => set((state) => {
        const categoryData = state.configuratorData[category];
        if (!Array.isArray(categoryData)) return {};
        
        const updatedCategory = categoryData.map((opt: any) => {
          if (opt.id === optionId) {
            return { ...opt, price: price };
          }
          return opt;
        });

        return {
          configuratorData: {
            ...state.configuratorData,
            [category]: updatedCategory
          }
        };
      }),

      settings: {
        companyName: 'ERAYDUŞ',
        whatsappNumber: '905555555555',
        address: 'Büyükdere Cad. No:120, Esentepe, Şişli, İstanbul, Türkiye',
        email: 'info@eraydus.com',
        taxRate: 20,
        currency: 'TRY'
      },
      updateSettings: (updates) => set((state) => ({
        settings: { ...state.settings, ...updates }
      }))
    }),
    {
      name: 'eraydus-storage-v1',
    }
  )
);
