-- Migration: Homepage Content (FAQs and Testimonials)

-- 1. Create FAQs Table
CREATE TABLE IF NOT EXISTS public.homepage_faqs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  question text NOT NULL,
  answer text NOT NULL,
  sort_order integer DEFAULT 0,
  is_published boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- 2. Create Testimonials Table
CREATE TABLE IF NOT EXISTS public.testimonials (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  role text,
  quote text NOT NULL,
  rating integer DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  image_url text,
  is_published boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- 3. RLS Policies
ALTER TABLE public.homepage_faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to homepage_faqs" ON public.homepage_faqs FOR SELECT USING (is_published = true);
CREATE POLICY "Allow public read access to testimonials" ON public.testimonials FOR SELECT USING (is_published = true);

-- 4. Seed Data: FAQs
INSERT INTO public.homepage_faqs (question, answer, sort_order) VALUES
('Ölçü alma işlemi nasıl gerçekleştiriliyor?', 'Profesyonel ölçüm ekibimiz, randevu oluşturmanızın ardından banyonuza gelerek lazer ölçüm cihazıyla milimetrik hassasiyette ölçüm yapar.', 10),
('Üretim süresi ne kadar?', 'Sipariş onayı ve ölçüm tamamlandıktan sonra standart üretim süremiz 7-10 iş günüdür. Özel tasarım ve kaplamalar için bu süre 12-15 iş gününe uzayabilir.', 20),
('Garanti kapsamı neleri içeriyor?', 'Tüm ürünlerimiz 10 yıl üretici garantisi kapsamındadır. Bu garanti; cam bütünlüğü, profil korozyonu, menteşe ve rulman mekanizmaları ile su sızdırmazlık contalarını kapsar.', 30),
('Kurulum sırasında banyom zarar görür mü?', 'Montaj ekibimiz zemin ve duvar koruyucu örtüler kullanarak çalışır. Eski kabininiz varsa söküm işlemi büyük bir hassasiyetle yapılarak yeni kurulum gerçekleştirilir.', 40);

-- 5. Seed Data: Testimonials
INSERT INTO public.testimonials (name, role, quote, rating, image_url) VALUES
('Elif Karaca', 'İç Mimar, İstanbul', 'Projelerimde yıllardır Erayduş ile çalışıyorum. Özel ölçü üretim kapasiteleri ve malzeme kalitesi, müşterilerime her zaman en iyisini sunmamı sağlıyor. Detaylara gösterdikleri özen gerçekten takdire şayan.', 5, 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop'),
('Caner Yılmaz', 'Villa Sahibi, Bodrum', 'Pure serisinin çerçevesiz tasarımı banyomuza inanılmaz bir ferahlık kattı. Özellikle 10mm cam kalınlığının verdiği güven hissi ve sessiz kapanan kapı mekanizması mükemmel.', 5, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop'),
('Aylin Sönmez', 'Butik Otel İşletmecisi', 'Otelimizin 12 odası için farklı ölçülerde kabinler yaptırdık. Süreç yönetimi, montaj ekibinin profesyonelliği ve ürünlerin premium hissiyatı tam anlamıyla kusursuzdu.', 5, 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=256&auto=format&fit=crop');
