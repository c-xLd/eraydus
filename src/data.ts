export const PRODUCTS = [
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

export const CONFIGURATOR_DATA = {
  models: [
    { id: "zenith", name: "Walk-in Panel", basePrice: 5000, image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop" },
    { id: "aura", name: "Corner Cabin", basePrice: 8000, image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1000&auto=format&fit=crop" },
    { id: "nexus", name: "Wall-to-Wall", basePrice: 7500, image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1000&auto=format&fit=crop" },
  ],
  glassTypes: [
    { id: "clear", name: "Clear Glass", price: 0 },
    { id: "extra", name: "Extra Clear", price: 1500 },
    { id: "fluted", name: "Fluted (Çizgili)", price: 2000 },
    { id: "smoke", name: "Smoked (Black)", price: 2500 },
    { id: "matte", name: "Matte (Frosted)", price: 2500 },
    { id: "bronze", name: "Bronze", price: 3000 },
  ],
  glassThickness: [
    { id: "t1", name: "6mm", price: 0 },
    { id: "t2", name: "8mm", price: 1200 },
    { id: "t3", name: "10mm", price: 2800 },
  ],
  profiles: [
    { id: "chrome", name: "Polished Chrome", price: 0, hex: "#e8e9eb" },
    { id: "black", name: "Matte Black", price: 800, hex: "#1a1a1a" },
    { id: "gold", name: "Brushed Gold", price: 1500, hex: "#d4af37" },
  ],
  accessories: [
    { id: "standard", name: "Standard Handle", price: 0 },
    { id: "towel", name: "Premium Towel Bar", price: 600 },
    { id: "minimalist", name: "Minimalist Knob", price: 400 },
  ],
  installation: [
    { id: "delivery", name: "Without Installation (Delivery Only)", price: 0 },
    { id: "install", name: "Professional Installation", price: 2500 },
  ]
};

export const BLOG_POSTS = [
  {
    id: "b1",
    title: "Levent Loft V: Seamless Integration of Architectural Glass",
    slug: "levent-loft-architectural-glass",
    excerpt: "Discover how we integrated the Zenith Walk-In series into a brutalist loft space, balancing raw concrete with ultra-clear glass.",
    date: "May 12, 2026",
    category: "Case Study",
    image: "https://images.unsplash.com/photo-1620626011761-9ea0184404d5?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "b2",
    title: "The Return of Fluted Glass in Modern Bathroom Design",
    slug: "fluted-glass-modern-bathroom",
    excerpt: "A deep dive into the resurgence of textured glass and how it provides privacy without compromising on natural light.",
    date: "June 05, 2026",
    category: "Design Trends",
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1000&auto=format&fit=crop"
  }
];
