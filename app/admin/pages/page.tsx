import Link from 'next/link'
import { getAllSitePages } from '@/features/pages/services/pages'
import { FileText, Pencil, Calendar, Settings, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Sayfa Yönetimi | Erayduş Admin',
}

export default async function PagesAdminPage() {
  const pages = await getAllSitePages()

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Sayfa Yönetimi</h1>
          <p className="text-gray-500 mt-1">Sitedeki sabit sayfaların (Hakkımızda, İletişim vb.) metinlerini ve görsellerini düzenleyin.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {pages.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">Sayfa Bulunamadı</h3>
            <p className="text-gray-500 mt-2">Henüz CMS sistemine kayıtlı sayfa yok. Lütfen veritabanı migration işlemini çalıştırın.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {pages.map((page) => (
              <div key={page.slug} className="p-6 hover:bg-gray-50/50 transition-colors flex items-center justify-between group">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-champagne/10 text-champagne flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-champagne transition-colors">
                      {page.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <Settings className="w-4 h-4" />
                        /{page.slug}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        Son Güncelleme: {new Date(page.updated_at).toLocaleDateString('tr-TR')}
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/admin/pages/${page.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-champagne"
                >
                  <Pencil className="w-4 h-4" />
                  Düzenle
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
