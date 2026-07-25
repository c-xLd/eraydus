'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { Star, Camera, User, Quote } from 'lucide-react'
import { getApprovedReviews, submitProductReview } from '@/features/products/actions/reviews'
import { toast } from 'sonner'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

/* ─── Types & Validation ─── */

export interface ProductReview {
  id: string
  author_name: string
  content: string
  rating: number
  created_at: string
  images?: string[]
}

const reviewSchema = z.object({
  name: z.string().min(2, 'Adınız en az 2 karakter olmalıdır.'),
  comment: z.string().min(10, 'Yorumunuz en az 10 karakter olmalıdır.'),
  rating: z.number().min(1).max(5),
  website_url: z.string().optional(), // Honeypot
  math_answer: z.string().refine((val) => val.trim() === '8', {
    message: 'Lütfen doğru matematiksel sonucu giriniz.',
  }),
})

type ReviewFormValues = z.infer<typeof reviewSchema>

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: Number(i) * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }
  })
}

interface ProductReviewsProps {
  productIdOrSlug: string
  averageRating: string
}

export default function ProductReviews({ productIdOrSlug, averageRating }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<ProductReview[]>([])
  const [isLoadingReviews, setIsLoadingReviews] = useState(true)
  const [showReviewForm, setShowReviewForm] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      name: '',
      comment: '',
      rating: 5,
      website_url: '',
      math_answer: ''
    }
  })

  useEffect(() => {
    const fetchReviews = async () => {
      if (!productIdOrSlug) {
        setIsLoadingReviews(false)
        return
      }
      const res = await getApprovedReviews(productIdOrSlug)
      if (res.success && res.data) {
        setReviews(res.data as ProductReview[])
      }
      setIsLoadingReviews(false)
    }
    fetchReviews()
  }, [productIdOrSlug])

  const onSubmit = async (data: ReviewFormValues) => {
    const formData = new FormData()
    formData.append('product_id', productIdOrSlug)
    formData.append('author_name', data.name)
    formData.append('content', data.comment)
    formData.append('rating', data.rating.toString())
    formData.append('website_url', data.website_url || '')
    formData.append('math_answer', data.math_answer)

    const result = await submitProductReview(formData)

    if (result.success) {
      toast.success(result.message || 'Yorumunuz başarıyla gönderildi.')
      reset()
      setShowReviewForm(false)
    } else {
      toast.error(result.error || 'Gönderim başarısız.')
    }
  }

  return (
    <div className="container mx-auto px-6 max-w-[1440px]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-14">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-champagne" />
            <span className="text-[11px] font-bold tracking-[0.25em] text-champagne uppercase">Müşteri Deneyimleri</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-2">Gerçek Banyo Kurulumları</h2>
          <p className="text-muted-foreground text-[15px]">Müşterilerimizin fotoğraflı paylaşımları ve değerlendirmeleri.</p>
        </div>

        <div className="flex items-center gap-5">
          {/* Aggregate Score */}
          <div className="flex items-center gap-2 bg-surface px-5 py-3 rounded-2xl border border-border/50">
            <Star className="size-5 fill-champagne text-champagne" />
            <span className="text-xl font-semibold">{averageRating}</span>
            <span className="text-sm text-muted-foreground">/ 5</span>
          </div>
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="px-6 py-3.5 bg-foreground text-background rounded-xl font-medium text-sm hover:bg-foreground/90 transition-colors cursor-pointer"
          >
            Deneyimini Paylaş
          </button>
        </div>
      </div>

      {/* Review Form */}
      <AnimatePresence>
        {showReviewForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden mb-14">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-surface border border-border/50 p-8 lg:p-10 rounded-3xl max-w-2xl">
              <h3 className="text-xl font-semibold mb-2">Değerlendirme Yazın</h3>
              <p className="text-sm text-muted-foreground mb-8">Hesap oluşturmanıza gerek yok — sadece adınızı girin ve deneyiminizi paylaşın.</p>

              <div className="space-y-6">
                {/* Star Rating */}
                <div>
                  <label className="block text-[13px] font-medium mb-3">Puan verin</label>
                  <Controller
                    name="rating"
                    control={control}
                    render={({ field }) => (
                      <div className="flex gap-1.5">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => field.onChange(star)}
                            className="p-1 transition-transform hover:scale-110 cursor-pointer"
                          >
                            <Star className={`size-7 transition-colors ${star <= field.value ? 'fill-champagne text-champagne' : 'text-border hover:text-champagne/40'}`} />
                          </button>
                        ))}
                      </div>
                    )}
                  />
                  {errors.rating && <p className="text-red-500 text-xs mt-1">{errors.rating.message}</p>}
                </div>

                {/* Name */}
                <div>
                  <label className="block text-[13px] font-medium mb-2">Ad Soyad</label>
                  <input
                    {...register('name')}
                    type="text"
                    className="w-full bg-background border border-border rounded-xl px-4 py-3.5 outline-none focus:border-champagne focus:ring-1 focus:ring-champagne/20 transition-all text-[15px]"
                    placeholder="Örn: Merve K."
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-[13px] font-medium mb-2">Yorumunuz</label>
                  <textarea
                    {...register('comment')}
                    rows={4}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3.5 outline-none focus:border-champagne focus:ring-1 focus:ring-champagne/20 transition-all resize-none text-[15px]"
                    placeholder="Kurulum deneyiminizi ve ürün hakkındaki düşüncelerinizi paylaşın..."
                  />
                  {errors.comment && <p className="text-red-500 text-xs mt-1">{errors.comment.message}</p>}
                </div>

                {/* Honeypot (Hidden) */}
                <div style={{ position: 'absolute', left: '-9999px', opacity: 0 }} aria-hidden="true">
                  <label>Eğer insansanız bu alanı boş bırakın</label>
                  <input
                    {...register('website_url')}
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Math Captcha */}
                <div>
                  <label className="block text-[13px] font-medium mb-2 text-foreground">Bot Koruması: 5 + 3 kaçtır?</label>
                  <input
                    {...register('math_answer')}
                    type="text"
                    className="w-full bg-background border border-border rounded-xl px-4 py-3.5 outline-none focus:border-champagne focus:ring-1 focus:ring-champagne/20 transition-all text-[15px]"
                    placeholder="Sonucu rakamla yazın"
                  />
                  {errors.math_answer && <p className="text-red-500 text-xs mt-1">{errors.math_answer.message}</p>}
                </div>

                {/* Photo Upload Placeholder */}
                <button type="button" className="flex items-center gap-2.5 text-sm text-champagne hover:text-champagne/80 transition-colors font-medium cursor-pointer">
                  <Camera className="size-4" /> Fotoğraf Ekle <span className="text-muted-foreground font-normal">(opsiyonel)</span>
                </button>

                <button disabled={isSubmitting} type="submit" className="bg-champagne text-black font-semibold px-8 py-3.5 rounded-xl hover:bg-champagne/90 transition-all hover:shadow-[0_4px_20px_rgba(201,168,106,0.3)] disabled:opacity-70 flex items-center justify-center min-w-[160px] cursor-pointer">
                  {isSubmitting ? 'Gönderiliyor...' : 'Yorumu Gönder'}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reviews Grid */}
      {isLoadingReviews ? (
        <div className="flex justify-center items-center py-10 opacity-50">
          Yorumlar yükleniyor...
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-10 opacity-60">
          <p>Henüz değerlendirme yapılmamış. İlk yorum yapan siz olun!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="group bg-surface border border-border/50 rounded-2xl overflow-hidden flex flex-col hover:border-champagne/20 transition-colors duration-300"
            >
              {/* Review Photo */}
              {review.images && review.images.length > 0 && (
                <div className="relative h-52 w-full overflow-hidden">
                  <Image src={review.images[0]} alt="Banyo kurulumu" fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              )}

              {/* Review Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-gradient-to-br from-champagne/30 to-champagne/10 flex items-center justify-center">
                      <User className="size-4 text-champagne" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{review.author_name}</p>
                      <p className="text-[11px] text-muted-foreground">{review.created_at ? new Date(review.created_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} className={`size-3 ${s <= review.rating ? 'fill-champagne text-champagne' : 'text-border'}`} />
                    ))}
                  </div>
                </div>

                <div className="relative flex-1">
                  <Quote className="size-5 text-champagne/20 absolute -top-1 -left-1" />
                  <p className="text-[13px] text-muted-foreground leading-relaxed pl-5">{review.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
