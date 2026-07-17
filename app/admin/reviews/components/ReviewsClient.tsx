'use client'

import { useState } from 'react'
import { Check, X, Trash2, Star, Eye } from 'lucide-react'
import { updateReviewStatus, deleteReview } from '@/features/products/actions/reviews'
import { toast } from 'sonner'
import Image from 'next/image'

interface ReviewsClientProps {
  initialReviews: any[]
}

export function ReviewsClient({ initialReviews }: ReviewsClientProps) {
  const [reviews, setReviews] = useState(initialReviews)
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const handleApprove = async (id: string, currentStatus: boolean) => {
    setLoadingId(id)
    const res = await updateReviewStatus(id, !currentStatus)
    if (res.success) {
      toast.success(currentStatus ? 'Yorum yayından kaldırıldı.' : 'Yorum onaylandı ve yayına alındı.')
      setReviews(reviews.map(r => r.id === id ? { ...r, is_approved: !currentStatus } : r))
    } else {
      toast.error(res.error || 'İşlem başarısız.')
    }
    setLoadingId(null)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bu yorumu kalıcı olarak silmek istediğinize emin misiniz?')) return

    setLoadingId(id)
    const res = await deleteReview(id)
    if (res.success) {
      toast.success('Yorum başarıyla silindi.')
      setReviews(reviews.filter(r => r.id !== id))
    } else {
      toast.error(res.error || 'Silme işlemi başarısız.')
    }
    setLoadingId(null)
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="px-6 py-4 text-sm font-semibold text-gray-900">Müşteri / Tarih</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-900">Ürün</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-900">Değerlendirme</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-900">Durum</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {reviews.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  Sistemde henüz hiç yorum bulunmuyor.
                </td>
              </tr>
            ) : reviews.map((review) => {
              const isUpdating = loadingId === review.id

              return (
                <tr key={review.id} className={`hover:bg-gray-50 transition-colors ${isUpdating ? 'opacity-50' : ''}`}>
                  <td className="px-6 py-5 align-top">
                    <p className="font-medium text-gray-900">{review.author_name}</p>
                    <p className="text-xs text-gray-500 mt-1">{new Date(review.created_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute:'2-digit' })}</p>
                    {review.author_email && <p className="text-xs text-gray-400 mt-0.5">{review.author_email}</p>}
                  </td>
                  
                  <td className="px-6 py-5 align-top">
                    <span className="inline-flex bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                      {review.product?.name || 'Bilinmeyen Ürün'}
                    </span>
                  </td>

                  <td className="px-6 py-5 max-w-md">
                    <div className="flex gap-0.5 mb-2">
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} className={`size-3.5 ${s <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
                      ))}
                    </div>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{review.content}</p>
                    {review.images && review.images.length > 0 && (
                      <div className="mt-3 flex gap-2">
                        {review.images.map((img: string, idx: number) => (
                          <div key={idx} className="relative size-16 rounded-md overflow-hidden border border-gray-200">
                            <Image src={img} alt="Kurulum fotoğrafı" fill className="object-cover" />
                          </div>
                        ))}
                      </div>
                    )}
                  </td>

                  <td className="px-6 py-5 align-top">
                    {review.is_approved ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <Check className="size-3.5" /> Yayında
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                        <Eye className="size-3.5" /> Onay Bekliyor
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-5 align-top text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleApprove(review.id, review.is_approved)}
                        disabled={isUpdating}
                        className={`p-2 rounded-lg transition-colors ${
                          review.is_approved 
                            ? 'bg-amber-50 text-amber-600 hover:bg-amber-100' 
                            : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                        }`}
                        title={review.is_approved ? "Yayından Kaldır" : "Onayla ve Yayınla"}
                      >
                        {review.is_approved ? <X className="size-4" /> : <Check className="size-4" />}
                      </button>
                      <button
                        onClick={() => handleDelete(review.id)}
                        disabled={isUpdating}
                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                        title="Yorumu Sil"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
