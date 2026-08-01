'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { submitProductReview } from '@/features/products/actions/reviews'
import { cn } from '@/lib/utils'

interface Review {
  id: string
  author_name: string
  rating: number
  content: string
  created_at: string
  is_approved: boolean
}

interface ProductReviewsProps {
  productId: string
  productName: string
  reviews: Review[]
}

export function ProductReviews({ productId, productName, reviews }: ProductReviewsProps) {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [rating, setRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length
    : 0

  const distribution = [5, 4, 3, 2, 1].map(stars => ({
    stars,
    count: reviews.filter(r => r.rating === stars).length,
    percentage: reviews.length > 0 ? (reviews.filter(r => r.rating === stars).length / reviews.length) * 100 : 0
  }))

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMsg('')

    const formData = new FormData(e.currentTarget)
    formData.append('rating', rating.toString())
    formData.append('productId', productId)

    // Simple math captcha validation
    const mathAnswer = formData.get('math_answer')?.toString()
    if (mathAnswer !== '8') {
      setErrorMsg('Lütfen matematik işlemini doğru yanıtlayın.')
      setIsSubmitting(false)
      return
    }

    try {
      const result = await submitProductReview(formData)
      if (result.success) {
        setSubmitSuccess(true)
        setIsFormOpen(false)
      } else {
        setErrorMsg(result.error || 'Yorum gönderilirken bir hata oluştu.')
      }
    } catch (err) {
      setErrorMsg('Bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-medium tracking-tight">Müşteri Değerlendirmeleri</h2>
          <p className="text-muted-foreground">{productName} hakkında düşünceler</p>
        </div>
        <Button onClick={() => setIsFormOpen(!isFormOpen)} variant="outline" className="rounded-xl">
          {isFormOpen ? 'Vazgeç' : 'Yorum Yaz'}
        </Button>
      </div>

      {isFormOpen && (
        <div className="bg-muted/10 p-6 md:p-8 rounded-2xl border border-border animate-in fade-in slide-in-from-top-4">
          {submitSuccess ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 fill-current" />
              </div>
              <h3 className="text-xl font-medium">Değerlendirmeniz Alındı</h3>
              <p className="text-muted-foreground">Yorumunuz onaylandıktan sonra burada yayınlanacaktır. Teşekkür ederiz!</p>
              <Button onClick={() => setSubmitSuccess(false)} variant="outline" className="mt-4">Yeni Yorum Yaz</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
              {errorMsg && (
                <div className="p-4 bg-red-500/10 text-red-500 rounded-lg text-sm">{errorMsg}</div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">Puanınız</label>
                <div className="flex gap-1" onMouseLeave={() => setHoverRating(0)}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      className="p-1"
                    >
                      <Star
                        className={cn(
                          "w-8 h-8 transition-colors",
                          (hoverRating || rating) >= star
                            ? "fill-champagne text-champagne"
                            : "text-muted-foreground/30"
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="author_name" className="text-sm font-medium">İsim Soyisim</label>
                  <input
                    id="author_name"
                    name="author_name"
                    required
                    className="flex h-12 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Adınız"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="author_email" className="text-sm font-medium">E-posta (İsteğe bağlı)</label>
                  <input
                    id="author_email"
                    name="author_email"
                    type="email"
                    className="flex h-12 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="ornek@email.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="content" className="text-sm font-medium">Yorumunuz</label>
                <textarea
                  id="content"
                  name="content"
                  required
                  rows={4}
                  className="flex w-full rounded-xl border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                  placeholder="Ürün hakkındaki düşüncelerinizi paylaşın..."
                />
              </div>

              {/* Honeypot */}
              <input type="text" name="website_url" className="hidden" tabIndex={-1} autoComplete="off" />

              <div className="space-y-2">
                <label htmlFor="math_answer" className="text-sm font-medium">Doğrulama: 3 + 5 = ?</label>
                <input
                  id="math_answer"
                  name="math_answer"
                  required
                  className="flex h-12 w-full md:w-1/3 rounded-xl border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="Sonucu yazın"
                />
              </div>

              <Button type="submit" disabled={isSubmitting} className="h-12 px-8 rounded-xl">
                {isSubmitting ? 'Gönderiliyor...' : 'Yorumu Gönder'}
              </Button>
            </form>
          )}
        </div>
      )}

      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Summary */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-4">
              <div className="text-5xl font-medium">{averageRating.toFixed(1)}</div>
              <div className="space-y-1">
                <div className="flex text-champagne">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${star <= Math.round(averageRating) ? 'fill-current' : 'fill-transparent'}`}
                    />
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">{reviews.length} değerlendirme</div>
              </div>
            </div>

            <div className="space-y-3">
              {distribution.map(({ stars, count, percentage }) => (
                <div key={stars} className="flex items-center gap-3 text-sm">
                  <div className="w-12 flex items-center justify-end gap-1 text-muted-foreground">
                    {stars} <Star className="w-3 h-3 fill-current" />
                  </div>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-champagne rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="w-8 text-right text-muted-foreground">{count}</div>
                </div>
              ))}
            </div>
          </div>

          {/* List */}
          <div className="lg:col-span-8 space-y-8">
            {reviews.map((review) => (
              <div key={review.id} className="space-y-4 pb-8 border-b border-border last:border-0">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{review.author_name}</div>
                    <div className="text-sm text-muted-foreground">
                      {new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(review.created_at))}
                    </div>
                  </div>
                  <div className="flex text-champagne">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${star <= review.rating ? 'fill-current' : 'text-muted-foreground/30'}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">{review.content}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-muted/5 rounded-2xl border border-border/50">
          <Star className="w-12 h-12 text-muted-foreground/20 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Henüz değerlendirme yapılmamış</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">Bu ürün için ilk değerlendirmeyi siz yapın ve diğer müşterilerimize yardımcı olun.</p>
          <Button onClick={() => setIsFormOpen(true)} variant="outline" className="rounded-xl">İlk Yorumu Yaz</Button>
        </div>
      )}
    </div>
  )
}
