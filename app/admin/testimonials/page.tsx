import { Metadata } from 'next'
import { getTestimonialsList } from '@/features/homepage/actions/testimonials'
import { TestimonialsClient } from './components/TestimonialsClient'

export const metadata: Metadata = {
  title: 'Google Yorumları | Erayduş Admin',
  description: 'Ana sayfada gösterilen müşteri (Google) yorumlarının yönetimi',
}

export default async function AdminTestimonialsPage() {
  const { data: testimonials } = await getTestimonialsList()

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Google Yorumları</h1>
        <p className="text-muted-foreground mt-2">
          Ana sayfada yer alan müşteri yorumlarını buradan ekleyebilir, düzenleyebilir ve sıralayabilirsiniz. 
          Gerçek Google yorumlarınızı kopyalayıp buraya eklemeniz yeterlidir.
        </p>
      </div>

      <TestimonialsClient initialTestimonials={testimonials || []} />
    </div>
  )
}
