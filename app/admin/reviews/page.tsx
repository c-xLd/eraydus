import { Metadata } from 'next'
import { ReviewsClient } from './components/ReviewsClient'
import { getAllReviews } from '@/features/products/actions/reviews'

export const metadata: Metadata = {
  title: 'Yorumlar ve Kurulumlar | Erayduş Admin',
  description: 'Müşteri yorumları ve banyo kurulumları yönetimi',
}

export default async function AdminReviewsPage() {
  const { data: reviews } = await getAllReviews()

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Yorumlar ve Kurulumlar</h1>
        <p className="text-muted-foreground mt-2">Müşterilerden gelen ürün değerlendirmelerini ve kurulum fotoğraflarını yönetin, onaylayın veya reddedin.</p>
      </div>

      <ReviewsClient initialReviews={reviews || []} />
    </div>
  )
}
