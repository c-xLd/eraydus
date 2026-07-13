"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Search, Plus, Eye, Edit, Trash2, Building2, MapPin, Filter } from "lucide-react"

interface Project {
  id: number
  name: string
  location: string
  category: "Otel" | "Rezidans" | "Villa" | "Ticari"
  description: string
  image: string
}

// Ön-yüzdeki statik proje verisiyle aynı kaynak (hızlı statik liste).
const projects: Project[] = [
  {
    id: 1,
    name: "The Bosphorus Palace Hotel",
    location: "İstanbul, Beşiktaş",
    category: "Otel",
    description:
      "Boğaz manzaralı süitlerde çerçevesiz PURE serisi cam kabinler; tarihi dokuyla modern şeffaflığın buluştuğu bir renovasyon.",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Alaçatı Beyaz Rezidans",
    location: "İzmir, Çeşme",
    category: "Rezidans",
    description:
      "Ege mimarisine uyum sağlayan mat beyaz ve fırçalı altın profilli EDGE serisi; ferah ve sıcak bir banyo atmosferi.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Bodrum Kıyı Villa",
    location: "Muğla, Bodrum",
    category: "Villa",
    description:
      "Denize sıfır villada doğal taş ve füme cam uyumu; mat antrasit profillerle kurgulanan iç mekan spa alanı.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Zorlu Center Premium Spa",
    location: "İstanbul, Beşiktaş",
    category: "Ticari",
    description:
      "Yüksek neme dayanıklı donanım ve nano kaplamalı camlarla donatılan premium spa ve buhar odası bölmeleri.",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Cappadocia Cave Suites",
    location: "Nevşehir, Göreme",
    category: "Otel",
    description:
      "Mağara odalarının kıvrımlarına özel üretilen pivot kapılı duş sistemleri; her odaya özel şablonlu montaj.",
    image:
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Nişantaşı Terrace Rezidans",
    location: "İstanbul, Şişli",
    category: "Rezidans",
    description:
      "Fluted dikey dokulu camlar ve mat siyah profillerle kurgulanan retro-modern ve göz alıcı banyo tasarımları.",
    image:
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?q=80&w=2070&auto=format&fit=crop",
  },
]

const categories = ["Tümü", "Otel", "Rezidans", "Villa", "Ticari"] as const

export default function AdminProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState<(typeof categories)[number]>("Tümü")

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = filterCategory === "Tümü" || p.category === filterCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, filterCategory])

  const stats = [
    { title: "Toplam Proje", value: projects.length, icon: Building2, color: "text-blue-600" },
    { title: "Yayında", value: projects.length, icon: Eye, color: "text-green-600" },
    {
      title: "Kategori",
      value: new Set(projects.map((p) => p.category)).size,
      icon: Filter,
      color: "text-orange-600",
    },
    {
      title: "Şehir",
      value: new Set(projects.map((p) => p.location.split(",").pop()?.trim())).size,
      icon: MapPin,
      color: "text-red-600",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Proje Yönetimi</h1>
          <p className="text-sm text-gray-500 mt-1">
            Tüm referans projelerinizi görüntüleyin ve yönetin.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            disabled
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-sm font-medium rounded-lg text-gray-400 cursor-not-allowed shadow-sm"
            title="Statik veri —yakında aktif"
          >
            <Plus className="size-4" />
            Yeni Proje
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg ${stat.color.replace("text-", "bg-").replace("-600", "-100")}`}>
                  <Icon className={`size-5 ${stat.color}`} />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 font-medium mt-1">{stat.title}</p>
            </div>
          )
        })}
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[250px] relative">
            <Search className="absolute left-3 top-2.5 size-5 text-gray-400" />
            <input
              type="text"
              placeholder="Proje adı, konum ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value as (typeof categories)[number])}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Proje</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Kategori</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Konum</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Açıklama</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Durum</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    Arama kriterinize uygun proje bulunamadı.
                  </td>
                </tr>
              ) : (
                filtered.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-md overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                          <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                        </div>
                        <p className="font-medium text-gray-900">{project.name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{project.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{project.location}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate" title={project.description}>
                      {project.description}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        Yayında
                      </span>
                    </td>
                    <td className="px-6 py-4 flex justify-center gap-2">
                      <Link
                        href="/projeler"
                        target="_blank"
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Siteye Git"
                      >
                        <Eye className="size-4" />
                      </Link>
                      <button
                        disabled
                        className="p-2 text-amber-600/40 cursor-not-allowed rounded-lg"
                        title="Yakında"
                      >
                        <Edit className="size-4" />
                      </button>
                      <button
                        disabled
                        className="p-2 text-red-600/40 cursor-not-allowed rounded-lg"
                        title="Yakında"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
