"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useDragControls,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Filter,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Star,
  Trash2,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  List,
  Box,
} from "lucide-react";
import { Product } from "@/lib/data/products";
import { Category } from "@/features/products/services/categories";

interface CollectionsClientProps {
  products: Product[];
  categories?: Category[];
  activeCategorySlug?: string;
  title?: string;
  playfairDisplayClassName?: string;
  interClassName?: string;
}

// Custom Grid Icons
const IconList = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <rect width="14" height="2" rx="0.5" />
    <rect y="4" width="14" height="2" rx="0.5" />
    <rect y="8" width="14" height="2" rx="0.5" />
    <rect y="12" width="14" height="2" rx="0.5" />
  </svg>
);
const IconGrid2 = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <rect width="6" height="6" rx="0.5" />
    <rect x="8" width="6" height="6" rx="0.5" />
    <rect y="8" width="6" height="6" rx="0.5" />
    <rect x="8" y="8" width="6" height="6" rx="0.5" />
  </svg>
);
const IconGrid3 = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <rect width="3.5" height="3.5" rx="0.5" />
    <rect x="5.25" width="3.5" height="3.5" rx="0.5" />
    <rect x="10.5" width="3.5" height="3.5" rx="0.5" />
    
    <rect y="5.25" width="3.5" height="3.5" rx="0.5" />
    <rect x="5.25" y="5.25" width="3.5" height="3.5" rx="0.5" />
    <rect x="10.5" y="5.25" width="3.5" height="3.5" rx="0.5" />
    
    <rect y="10.5" width="3.5" height="3.5" rx="0.5" />
    <rect x="5.25" y="10.5" width="3.5" height="3.5" rx="0.5" />
    <rect x="10.5" y="10.5" width="3.5" height="3.5" rx="0.5" />
  </svg>
);

export function CollectionsClient({
  products,
  categories = [],
  activeCategorySlug,
  title = "ÜRÜNLER",
  playfairDisplayClassName,
  interClassName,
}: CollectionsClientProps) {
  const categorySliderRef = useRef<HTMLDivElement>(null);

  const scrollCategoryLeft = () => {
    if (categorySliderRef.current) {
      categorySliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollCategoryRight = () => {
    if (categorySliderRef.current) {
      categorySliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(
    () => searchParams.get("q") || "",
  );
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>(() => {
    const param = searchParams.get("profil");
    return param ? param.split(",") : [];
  });
  const [priceRange, setPriceRange] = useState<number>(100000);
  const [minPriceInput, setMinPriceInput] = useState<string>("0");
  const [maxPriceInput, setMaxPriceInput] = useState<string>("100000");

  const [sortOrder, setSortOrder] = useState<
    "newest" | "price-asc" | "price-desc"
  >("newest");
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});
  const [selectedLayouts, setSelectedLayouts] = useState<string[]>(() => {
    const param = searchParams.get("yerlesim");
    return param ? param.split(",") : [];
  });
  const [selectedGlass, setSelectedGlass] = useState<string[]>(() => {
    const param = searchParams.get("cam");
    return param ? param.split(",") : [];
  });
  const [onlyNew, setOnlyNew] = useState<boolean>(
    () => searchParams.get("yeni") === "true",
  );
  const [selectedThicknesses, setSelectedThicknesses] = useState<string[]>(
    () => {
      const param = searchParams.get("kalinlik");
      return param ? param.split(",") : [];
    },
  );
  const [viewMode, setViewMode] = useState<"list" | "grid-2" | "grid-3">("grid-3");

  // Pagination State
  const [visibleCount, setVisibleCount] = useState(12);

  // Sync state to URL search parameters without triggering hard refresh
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (selectedProfiles.length > 0)
      params.set("profil", selectedProfiles.join(","));
    if (selectedGlass.length > 0) params.set("cam", selectedGlass.join(","));
    if (selectedThicknesses.length > 0)
      params.set("kalinlik", selectedThicknesses.join(","));
    if (selectedLayouts.length > 0)
      params.set("yerlesim", selectedLayouts.join(","));
    if (onlyNew) params.set("yeni", "true");

    const newQuery = params.toString();
    const currentQuery = searchParams.toString();
    if (newQuery !== currentQuery) {
      const url = newQuery ? `?${newQuery}` : window.location.pathname;
      router.replace(url, { scroll: false });
    }
  }, [
    searchQuery,
    selectedProfiles,
    selectedGlass,
    selectedThicknesses,
    selectedLayouts,
    onlyNew,
    router,
    searchParams,
  ]);

  // Reset pagination when any filter changes
  useEffect(() => {
    setVisibleCount(12);
  }, [
    searchQuery,
    selectedProfiles,
    selectedGlass,
    selectedThicknesses,
    selectedLayouts,
    onlyNew,
    priceRange,
    sortOrder,
    activeCategorySlug,
  ]);

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const dragControls = useDragControls();
  const bottomSheetRef = useRef<HTMLDivElement>(null);

  // Prevent background scrolling when bottom sheet is open
  useEffect(() => {
    if (isMobileFiltersOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.overscrollBehavior = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.overscrollBehavior = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.overscrollBehavior = "";
    };
  }, [isMobileFiltersOpen]);

  const toggleProfile = (id: string) => {
    setSelectedProfiles((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const toggleLayout = (layout: string) => {
    setSelectedLayouts((prev) =>
      prev.includes(layout)
        ? prev.filter((x) => x !== layout)
        : [...prev, layout],
    );
  };

  const toggleGlass = (id: string) => {
    setSelectedGlass((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const toggleThickness = (thickness: string) => {
    setSelectedThicknesses((prev) =>
      prev.includes(thickness)
        ? prev.filter((x) => x !== thickness)
        : [...prev, thickness],
    );
  };

  // Generate dynamic filters from products
  const availableProfiles = useMemo(() => {
    const profiles = new Map<
      string,
      { id: string; name: string; hex: string }
    >();
    products.forEach((p) => {
      if (Array.isArray(p.compatibleProfiles)) {
        p.compatibleProfiles.forEach((profile) => {
          if (profile && typeof profile === "object" && profile.id) {
            if (!profiles.has(profile.id))
              profiles.set(profile.id, profile as any);
          }
        });
      }
    });
    return Array.from(profiles.values());
  }, [products]);

  const availableGlass = useMemo(() => {
    const glasses = new Map<string, { id: string; name: string }>();
    products.forEach((p) => {
      if (Array.isArray(p.compatibleGlass)) {
        p.compatibleGlass.forEach((glass) => {
          if (glass && typeof glass === "object" && glass.id) {
            if (!glasses.has(glass.id)) glasses.set(glass.id, glass as any);
          }
        });
      }
    });
    return Array.from(glasses.values());
  }, [products]);

  const availableLayouts = useMemo(() => {
    const layouts = new Map<string, number>();
    products.forEach((p) => {
      if (p.layoutType && typeof p.layoutType === "string") {
        layouts.set(p.layoutType, (layouts.get(p.layoutType) || 0) + 1);
      }
    });
    return Array.from(layouts.entries());
  }, [products]);

  const availableThicknesses = useMemo(() => {
    const thicknesses = new Set<string>();
    products.forEach((p) => {
      if (p.technicalSpecs && Array.isArray(p.technicalSpecs.glassThickness)) {
        p.technicalSpecs.glassThickness.forEach((t) => {
          if (t && typeof t === "string") thicknesses.add(t);
        });
      }
    });
    return Array.from(thicknesses).sort();
  }, [products]);

  const maxProductPrice = useMemo(() => {
    const max = Math.max(...products.map((p) => p.price), 50000);
    return Math.ceil(max / 5000) * 5000;
  }, [products]);

  useEffect(() => {
    setPriceRange(maxProductPrice);
    setMaxPriceInput(maxProductPrice.toString());
  }, [maxProductPrice]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setPriceRange(val);
    setMaxPriceInput(val.toString());
  };

  const handleMaxPriceBlur = () => {
    let val = Number(maxPriceInput);
    if (isNaN(val)) val = maxProductPrice;
    if (val < 0) val = 0;
    if (val > maxProductPrice) val = maxProductPrice;
    setPriceRange(val);
    setMaxPriceInput(val.toString());
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (selectedProfiles.length > 0) {
      result = result.filter((p) =>
        p.compatibleProfiles?.some((profile) =>
          selectedProfiles.includes(profile.id),
        ),
      );
    }

    if (selectedLayouts.length > 0) {
      result = result.filter((p) => selectedLayouts.includes(p.layoutType));
    }

    if (selectedGlass.length > 0) {
      result = result.filter((p) =>
        p.compatibleGlass?.some((glass) => selectedGlass.includes(glass.id)),
      );
    }

    if (onlyNew) {
      result = result.filter((p) => p.isNew);
    }

    if (selectedThicknesses.length > 0) {
      result = result.filter((p) =>
        p.technicalSpecs?.glassThickness?.some((t) =>
          selectedThicknesses.includes(t),
        ),
      );
    }

    result = result.filter((p) => p.price <= priceRange);

    switch (sortOrder) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
      default:
        result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
        break;
    }

    return result;
  }, [products, searchQuery, selectedProfiles, priceRange, sortOrder]);

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedProfiles([]);
    setSelectedLayouts([]);
    setSelectedGlass([]);
    setSelectedThicknesses([]);
    setOnlyNew(false);
    setPriceRange(maxProductPrice);
    setMaxPriceInput(maxProductPrice.toString());
  };

  // Show all categories in the list if filtering by parent_category is causing them to hide.
  const topCategories = categories;

  // Reusable Filter Section (Accordion style)
  const FilterSection = ({ title, children, defaultOpen = true }: { title: string, children: React.ReactNode, defaultOpen?: boolean }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
      <div className="border-b border-[#ececec] py-5">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between text-left group"
        >
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-black">
            {title}
          </h3>
          <div className="flex items-center gap-2">
             <span className="text-[9px] text-[#999] uppercase">Seç</span>
             {isOpen ? <ChevronUp className="size-4 text-[#666]" /> : <ChevronDown className="size-4 text-[#666]" />}
          </div>
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pt-4">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const CategoriesContent = () => (
    <div className="mb-10">
       <div className="flex items-center gap-2 mb-4">
          <List className="size-5 text-black" />
          <h2 className="text-sm font-bold tracking-widest uppercase text-black">KATEGORİLER</h2>
       </div>
       <div className="flex flex-col gap-1">
          {topCategories.map(cat => {
            const isActive = activeCategorySlug === cat.slug;
            return (
              <Link 
                key={cat.id} 
                href={`/koleksiyonlar/${cat.slug}`}
                className={`px-4 py-2.5 text-[13px] transition-colors ${isActive ? "bg-[#f5f5f5] text-black font-semibold" : "bg-[#f9f9f9] text-[#666] hover:bg-[#f5f5f5] hover:text-black"}`}
              >
                 {cat.name}
              </Link>
            )
          })}
          <Link href="/koleksiyonlar" className="px-4 py-2.5 text-[13px] text-[#666] bg-[#f9f9f9] hover:bg-[#f5f5f5] hover:text-black transition-colors">
             Tümünü Gör +
          </Link>
       </div>
    </div>
  );

  const FilterContent = () => (
    <div className="w-full">
      {/* FILTER BY Header */}
      <div className="flex items-center gap-2 mb-4">
        <SlidersHorizontal className="size-5 text-black" />
        <h2 className="text-sm font-bold tracking-widest uppercase text-black">FİLTRELE</h2>
      </div>

      <button 
        onClick={clearAllFilters}
        className="w-full bg-[#C9A86A] hover:bg-[#A88B52] transition-colors text-black font-bold text-xs uppercase tracking-wider py-3 flex items-center justify-center gap-2 mb-6"
      >
        <Trash2 className="size-4" />
        TÜMÜNÜ TEMİZLE
      </button>

      {/* AVAILABILITY (Using onlyNew as placeholder) */}
      <FilterSection title="DURUM">
        <div className="space-y-3">
          <label className="flex items-center justify-between cursor-pointer group">
             <div className="flex items-center gap-3">
                <div className={`size-4 rounded-sm border flex items-center justify-center transition-colors ${onlyNew ? "bg-[#C9A86A] border-[#C9A86A] text-black" : "border-[#ddd] bg-white"}`}>
                  {onlyNew && <Check className="size-3" />}
                </div>
                <input type="checkbox" className="hidden" checked={onlyNew} onChange={(e) => setOnlyNew(e.target.checked)} />
                <span className="text-[13px] text-[#666] group-hover:text-black">Yeni Ürünler</span>
             </div>
             <span className="text-[12px] text-[#999]">({products.filter(p => p.isNew).length})</span>
          </label>
        </div>
      </FilterSection>

      {/* PRICE */}
      <FilterSection title="FİYAT">
        <div className="space-y-6 pt-2">
          <div className="relative w-full h-1 bg-[#ececec] rounded-full">
             <div className="absolute top-0 left-0 h-full bg-[#C9A86A] rounded-full" style={{ width: `${(priceRange / maxProductPrice) * 100}%` }} />
             <input
              type="range"
              min="0"
              max={maxProductPrice}
              step="500"
              value={priceRange}
              onChange={handleSliderChange}
              className="absolute top-0 left-0 w-full h-1 opacity-0 cursor-pointer"
            />
             <div className="absolute top-1/2 -mt-2 size-4 bg-[#C9A86A] border-2 border-white rounded-full shadow-sm" style={{ left: `calc(${(priceRange / maxProductPrice) * 100}% - 8px)` }} />
          </div>
          
          <div className="flex items-center justify-between gap-4">
             <div className="flex-1 border border-[#e5e5e5] rounded p-2 text-center text-sm text-[#333]">
                <input type="text" value={minPriceInput} readOnly className="w-full text-center outline-none bg-transparent" />
             </div>
             <span className="text-[#999]">-</span>
             <div className="flex-1 border border-[#e5e5e5] rounded p-2 text-center text-sm text-[#333]">
                <input type="text" value={maxPriceInput} onChange={e => setMaxPriceInput(e.target.value)} onBlur={handleMaxPriceBlur} className="w-full text-center outline-none bg-transparent" />
             </div>
          </div>
        </div>
      </FilterSection>

      {/* COLOR */}
      {availableProfiles.length > 0 && (
        <FilterSection title="PROFİL RENGİ">
          <div className="flex flex-wrap gap-2.5">
            {availableProfiles.map((profile) => {
              const isSelected = selectedProfiles.includes(profile.id);
              return (
                <button
                  key={profile.id}
                  onClick={() => toggleProfile(profile.id)}
                  className={`relative flex items-center justify-center size-7 rounded-full transition-all ${isSelected ? "ring-1 ring-black ring-offset-2 ring-offset-white" : "border border-[#ddd] hover:border-black"}`}
                  title={profile.name}
                >
                  <span
                    className="size-full rounded-full border border-black/10"
                    style={{ backgroundColor: profile.hex || "#000" }}
                  />
                </button>
              );
            })}
          </div>
        </FilterSection>
      )}

      {/* MORE FILTERS (Layout) */}
      {availableLayouts.length > 0 && (
        <FilterSection title="YERLEŞİM TİPİ">
          <div className="space-y-3">
            {availableLayouts.map(([layout, count]) => {
              const isSelected = selectedLayouts.includes(layout);
              return (
                <label key={layout} className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className={`size-4 rounded-sm border flex items-center justify-center transition-colors ${isSelected ? "bg-[#C9A86A] border-[#C9A86A] text-black" : "border-[#ddd] bg-white"}`}>
                      {isSelected && <Check className="size-3" />}
                    </div>
                    <input type="checkbox" className="hidden" checked={isSelected} onChange={() => toggleLayout(layout)} />
                    <span className="text-[13px] text-[#666] group-hover:text-black">{layout}</span>
                  </div>
                  <span className="text-[12px] text-[#999]">({count})</span>
                </label>
              );
            })}
          </div>
        </FilterSection>
      )}

      {/* PRODUCT TYPE (Glass) */}
      {availableGlass.length > 0 && (
        <FilterSection title="CAM TİPİ">
          <div className="space-y-3">
            {availableGlass.map((glass) => {
              const isSelected = selectedGlass.includes(glass.id);
              return (
                <label key={glass.id} className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className={`size-4 rounded-sm border flex items-center justify-center transition-colors ${isSelected ? "bg-[#C9A86A] border-[#C9A86A] text-black" : "border-[#ddd] bg-white"}`}>
                      {isSelected && <Check className="size-3" />}
                    </div>
                    <input type="checkbox" className="hidden" checked={isSelected} onChange={() => toggleGlass(glass.id)} />
                    <span className="text-[13px] text-[#666] group-hover:text-black">{glass.name}</span>
                  </div>
                </label>
              );
            })}
          </div>
        </FilterSection>
      )}

      {/* SIZE (Thickness) */}
      {availableThicknesses.length > 0 && (
        <FilterSection title="CAM KALINLIĞI">
          <div className="flex flex-wrap gap-2">
            {availableThicknesses.map((thickness) => {
              const isSelected = selectedThicknesses.includes(thickness);
              return (
                <button
                  key={thickness}
                  onClick={() => toggleThickness(thickness)}
                  className={`px-4 py-2 border text-[12px] font-medium transition-colors ${isSelected ? "border-black text-black" : "border-[#e5e5e5] text-[#666] hover:border-black"}`}
                >
                  {thickness}
                </button>
              );
            })}
          </div>
        </FilterSection>
      )}
    </div>
  );

  return (
    <div className={`${interClassName} pt-24 pb-32 lg:pb-24 min-h-screen bg-white text-[#333]`}>
      
      {/* Title & Breadcrumb */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-10 pt-8"
      >
         <h1 className="text-3xl md:text-[32px] font-bold text-black uppercase tracking-wider mb-2">
           {title}
         </h1>
         <p className="text-[12px] text-[#666] flex items-center justify-center gap-2">
           <Link href="/" className="hover:text-black">Ana Sayfa</Link>
           <span className="text-[#ccc]">•</span>
           <span className="text-black">{title}</span>
         </p>
      </motion.div>

      {/* Top Categories Row */}
      {topCategories.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="container mx-auto px-4 max-w-[1600px] mb-12 relative group/slider"
        >
          
          {/* Scroll Buttons (Desktop Hover) */}
          <button 
            onClick={scrollCategoryLeft} 
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-30 size-10 items-center justify-center bg-white shadow-md border border-[#eee] rounded-full text-black hover:bg-black hover:text-[#C9A86A] transition-colors opacity-0 group-hover/slider:opacity-100 -translate-x-4"
          >
            <ChevronLeft className="size-5" />
          </button>
          
          <button 
            onClick={scrollCategoryRight} 
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-30 size-10 items-center justify-center bg-white shadow-md border border-[#eee] rounded-full text-black hover:bg-black hover:text-[#C9A86A] transition-colors opacity-0 group-hover/slider:opacity-100 translate-x-4"
          >
            <ChevronRight className="size-5" />
          </button>

          <div 
            ref={categorySliderRef}
            className="flex items-center gap-3 md:gap-4 overflow-x-auto pb-6 pt-2 px-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory"
          >
             {topCategories.map((cat) => {
                const categoryProduct = products.find(p => p.collectionSlug === cat.slug || p.collectionId === cat.id);
                const bgImage = categoryProduct?.image || 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80';
                
                return (
                  <Link 
                    href={`/koleksiyonlar/${cat.slug}`} 
                    key={cat.id} 
                    className="group snap-start shrink-0 w-[110px] md:w-[130px] bg-white rounded-2xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] border border-black/[0.03] p-4 flex flex-col items-center justify-center gap-4 transition-all duration-500 hover:shadow-[0_8px_24px_-6px_rgba(0,0,0,0.12)] hover:-translate-y-1 hover:border-[#C9A86A]/20"
                  >
                     {/* Luxury Story Ring Effect */}
                     <div className="size-[64px] md:size-[72px] relative rounded-full p-[2px] bg-gradient-to-tr from-black/5 to-black/10 group-hover:from-[#C9A86A] group-hover:to-[#E5D3B3] transition-all duration-500">
                        <div className="w-full h-full relative rounded-full overflow-hidden border-2 border-white bg-[#f9f9f9]">
                            <img 
                              src={bgImage} 
                              alt={cat.name} 
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
                            />
                        </div>
                     </div>
                     <div className="text-center w-full">
                        <h4 className="text-[12px] md:text-[13px] font-semibold text-[#444] leading-tight line-clamp-2 group-hover:text-[#C9A86A] transition-colors">
                          {cat.name}
                        </h4>
                     </div>
                  </Link>
                );
             })}
          </div>
        </motion.div>
      )}

      {/* Main Layout */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="container mx-auto px-4 max-w-[1600px]"
      >
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-[260px] flex-shrink-0 sticky top-28 h-fit">
            <CategoriesContent />

            <FilterContent />
          </aside>

          {/* Main Content Grid */}
          <main className="flex-1 w-full">
            
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-2">
                 <span className="text-[12px] text-[#666]">Sırala:</span>
                 <div className="relative group">
                    <select
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value as any)}
                      className="appearance-none bg-transparent border-none text-[12px] font-bold text-black pr-4 py-1 outline-none cursor-pointer"
                    >
                      <option value="newest">Öne Çıkanlar</option>
                      <option value="price-asc">Fiyata Göre Artan</option>
                      <option value="price-desc">Fiyata Göre Azalan</option>
                    </select>
                    <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 size-3 pointer-events-none text-black" />
                 </div>
              </div>
              
              <div className="flex items-center gap-2 ml-auto">
                 <button 
                   onClick={() => setViewMode('list')}
                   className={`size-8 flex items-center justify-center rounded transition-colors ${viewMode === 'list' ? 'bg-black text-white' : 'bg-[#f5f5f5] text-[#999] hover:bg-[#ebebeb] hover:text-black'}`}
                 >
                    <IconList />
                 </button>
                 <button 
                   onClick={() => setViewMode('grid-2')}
                   className={`size-8 flex items-center justify-center rounded transition-colors ${viewMode === 'grid-2' ? 'bg-black text-white' : 'bg-[#f5f5f5] text-[#999] hover:bg-[#ebebeb] hover:text-black'}`}
                 >
                    <IconGrid2 />
                 </button>
                 <button 
                   onClick={() => setViewMode('grid-3')}
                   className={`size-8 flex items-center justify-center rounded transition-colors ${viewMode === 'grid-3' ? 'bg-black text-white' : 'bg-[#f5f5f5] text-[#999] hover:bg-[#ebebeb] hover:text-black'}`}
                 >
                    <IconGrid3 />
                 </button>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-lg text-black font-medium mb-4">Ürün bulunamadı</p>
                <button onClick={clearAllFilters} className="px-6 py-3 bg-[#C9A86A] text-black font-bold text-xs uppercase hover:bg-[#A88B52] transition-colors">
                  Filtreleri Temizle
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'list' ? "flex flex-col gap-6" :
                  viewMode === 'grid-2' ? "grid grid-cols-2 gap-x-6 gap-y-12" :
                  "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12"
                }
              >
                <AnimatePresence mode="popLayout">
                  {filteredProducts.slice(0, visibleCount).map((product, index) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 40, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                      key={product.id}
                      className={`group flex ${viewMode === 'list' ? 'flex-row gap-8 items-start' : 'flex-col'} cursor-pointer`}
                    >
                      {/* Product Card Image */}
                      <div className={`relative ${viewMode === 'list' ? 'w-1/3 shrink-0' : 'w-full mb-4'} aspect-[4/5] overflow-hidden bg-[#f8f8f8] rounded-xl transition-all duration-700`}>
                        {/* Overlay Gradient on Hover */}
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                        {/* Top Left Badge */}
                        <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
                           {index % 3 === 0 && (
                             <span className="bg-[#C9A86A] text-black text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm shadow-sm">Yeni</span>
                           )}
                           {index % 4 === 1 && (
                             <span className="bg-black text-white text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm shadow-sm">Çok Satan</span>
                           )}
                        </div>

                        {/* Top Right Wishlist Button */}
                        <button 
                          className="absolute top-3 right-3 z-30 size-8 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-black/50 hover:text-red-500 hover:bg-white transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                          onClick={(e) => { e.preventDefault(); }}
                        >
                           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        </button>

                        <Link
                          href={`/koleksiyonlar/${product.collectionSlug || "genel"}/${product.slug}`}
                          className="absolute inset-0 z-10"
                        />
                        
                        {product.image && !imageError[product.id] ? (
                          <div className="relative w-full h-full">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              sizes="(max-width: 768px) 50vw, 33vw"
                              className="object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                              onError={() => setImageError((prev) => ({ ...prev, [product.id]: true }))}
                            />
                          </div>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                             <Box className="size-8 text-[#ccc]" />
                          </div>
                        )}

                        {/* Quick View Button (Bottom Slide Up) */}
                        <div className="absolute bottom-4 inset-x-4 z-30 translate-y-[120%] group-hover:translate-y-0 transition-transform duration-500 ease-out hidden md:block">
                           <Link href={`/koleksiyonlar/${product.collectionSlug || "genel"}/${product.slug}`} className="w-full bg-white/95 backdrop-blur-sm text-black py-2.5 text-[11px] font-bold uppercase tracking-wider text-center rounded shadow-sm hover:bg-black hover:text-[#C9A86A] transition-colors block">
                             Hızlı İncele
                           </Link>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className={`flex flex-col text-left ${viewMode === 'list' ? 'flex-1 pt-4' : 'px-1'}`}>
                        <div className="flex items-center justify-between mb-2">
                           <div className="flex items-center gap-1">
                              <Star className="size-[10px] fill-[#C9A86A] text-[#C9A86A]" />
                              <Star className="size-[10px] fill-[#C9A86A] text-[#C9A86A]" />
                              <Star className="size-[10px] fill-[#C9A86A] text-[#C9A86A]" />
                              <Star className="size-[10px] fill-[#C9A86A] text-[#C9A86A]" />
                              <Star className="size-[10px] fill-[#C9A86A] text-[#C9A86A]" />
                              <span className="text-[10px] text-[#999] ml-1 font-medium">(12)</span>
                           </div>
                           
                           {/* Color Swatches */}
                           {viewMode !== 'list' && (
                             <div className="flex items-center gap-1">
                                <div className="size-2.5 rounded-full bg-black ring-1 ring-offset-1 ring-black/20 cursor-pointer"></div>
                                <div className="size-2.5 rounded-full bg-[#E0E0E0] ring-1 ring-offset-1 ring-transparent cursor-pointer hover:ring-black/20"></div>
                                <div className="size-2.5 rounded-full bg-[#B8935D] ring-1 ring-offset-1 ring-transparent cursor-pointer hover:ring-black/20"></div>
                             </div>
                           )}
                        </div>

                        <Link href={`/koleksiyonlar/${product.collectionSlug || "genel"}/${product.slug}`} className="inline-block w-fit">
                          <h3 className="text-[13px] md:text-[14px] text-[#333] font-semibold transition-colors line-clamp-2 leading-snug mb-1 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-black group-hover:after:w-full after:transition-all after:duration-300">
                            {product.name}
                          </h3>
                        </Link>

                        <div className="text-[15px] font-bold text-black mt-1 group-hover:text-[#C9A86A] transition-colors">
                          {product.price > 0 ? (
                            `₺${product.price.toLocaleString("tr-TR")}`
                          ) : (
                            "Fiyat Sorunuz"
                          )}
                        </div>
                        
                        {viewMode === 'list' && (
                           <div className="mt-5">
                              <p className="text-[13px] text-[#666] line-clamp-3 mb-6">
                                 Şık ve fonksiyonel tasarımıyla banyolarınıza değer katar. Uzun ömürlü kullanım için birinci sınıf temperli cam ve alüminyum profillerden üretilmiştir.
                              </p>
                              
                              <div className="flex items-center gap-3">
                                <Link href={`/koleksiyonlar/${product.collectionSlug || "genel"}/${product.slug}`} className="bg-black text-white px-6 py-3 text-xs font-bold uppercase hover:bg-[#C9A86A] hover:text-black transition-colors inline-block">
                                   İncele
                                </Link>
                                <button className="size-10 bg-[#f9f9f9] border border-[#eee] rounded flex items-center justify-center text-black hover:text-[#C9A86A] hover:border-[#C9A86A] transition-colors">
                                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                </button>
                              </div>
                           </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {/* Pagination / Load More */}
            {filteredProducts.length > 0 && (
              <div className="mt-16 flex flex-col items-center justify-center border-t border-[#f5f5f5] pt-12">
                 <p className="text-[12px] text-[#666] mb-3">
                   {filteredProducts.length} üründen {Math.min(visibleCount, filteredProducts.length)} tanesi gösteriliyor
                 </p>
                 
                 <div className="w-[200px] h-1 bg-[#f5f5f5] rounded-full mb-8 overflow-hidden">
                    <div 
                      className="h-full bg-[#C9A86A] transition-all duration-500"
                      style={{ width: `${(Math.min(visibleCount, filteredProducts.length) / filteredProducts.length) * 100}%` }}
                    />
                 </div>

                 {visibleCount < filteredProducts.length && (
                   <button
                     onClick={() => setVisibleCount(prev => prev + 12)}
                     className="bg-[#C9A86A] hover:bg-[#A88B52] transition-colors text-black font-bold text-[11px] uppercase tracking-wider px-10 py-3.5"
                   >
                     DAHA FAZLA YÜKLE
                   </button>
                 )}
              </div>
            )}
          </main>
        </div>
      </motion.div>

      {/* Mobile Fixed Bottom Action Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-[#eee] p-3 flex gap-3 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <button
          onClick={() => setIsMobileFiltersOpen(true)}
          className="bg-black text-white flex-1 py-3 flex items-center justify-center gap-2 text-xs font-bold tracking-wider uppercase active:scale-95 transition-transform"
        >
          <SlidersHorizontal className="size-4" />
          FİLTRELE
        </button>
      </div>

      {/* Mobile Bottom Sheet (Framer Motion) */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFiltersOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 lg:hidden"
            />
            <motion.div
              ref={bottomSheetRef}
              drag="y"
              dragControls={dragControls}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                if (info.offset.y > 100 || info.velocity.y > 500) {
                  setIsMobileFiltersOpen(false);
                }
              }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-x-0 bottom-0 z-50 bg-white lg:hidden flex flex-col max-h-[90vh] rounded-t-xl"
            >
              <div className="w-full flex justify-center p-3 cursor-grab active:cursor-grabbing shrink-0">
                <div className="w-10 h-1 bg-[#ddd] rounded-full" />
              </div>

              <div className="px-5 pb-4 flex items-center justify-between shrink-0 border-b border-[#eee]">
                <h2 className="text-sm font-bold uppercase tracking-wider text-black">
                  FİLTRELE
                </h2>
                <button onClick={() => setIsMobileFiltersOpen(false)} className="p-1">
                  <X className="size-5 text-black" />
                </button>
              </div>

              <div className="p-5 overflow-y-auto flex-1 overscroll-none pb-24">
                <CategoriesContent />
                <FilterContent />
              </div>
              
              {/* Sticky bottom actions in mobile filter */}
              <div className="p-4 border-t border-[#eee] bg-white shrink-0 pb-[calc(1rem+env(safe-area-inset-bottom))] flex gap-3">
                 <button onClick={() => setIsMobileFiltersOpen(false)} className="bg-black text-white w-full py-4 text-xs font-bold tracking-wider uppercase hover:bg-[#C9A86A] hover:text-black transition-colors">
                    {filteredProducts.length} ÜRÜNÜ GÖSTER
                 </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
