-- Migration for dynamic site pages (CMS)

CREATE TABLE IF NOT EXISTS public.site_pages (
  slug text PRIMARY KEY,
  title text NOT NULL,
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- RLS
ALTER TABLE public.site_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on site_pages" 
  ON public.site_pages FOR SELECT 
  USING (true);

CREATE POLICY "Allow authenticated full access on site_pages" 
  ON public.site_pages FOR ALL 
  USING (auth.role() = 'authenticated');

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_site_pages_updated
  BEFORE UPDATE ON public.site_pages
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Seed data for Hakkimizda
INSERT INTO public.site_pages (slug, title, content) VALUES (
  'hakkimizda',
  'Hakkımızda',
  '{
    "hero": {
      "subtitle": "Hakkımızda",
      "title_normal": "Mühendislik ve Tasarımın",
      "title_bold": "Buluştuğu Yer",
      "description": "ERAYDUŞ, mimarinin zarafetini banyolarınıza taşıyan premium duşakabin sistemleri üretmektedir. Her ürünümüz, on yılı aşkın deneyimimizin ve mühendislik tutkumuzun bir eseridir."
    },
    "story": {
      "subtitle": "Hikayemiz",
      "title_normal": "Cam İşçiliğinde",
      "title_bold": "Bir Devrim",
      "p1": "2010 yılında İstanbul''da kurulan ERAYDUŞ, Türkiye''nin önde gelen lüks duşakabin üreticisi olma yolculuğuna küçük bir atölyede başladı. Bugün, modern üretim tesislerimizde yüzlerce mimari projeye imza atıyoruz.",
      "p2": "Her projeye bir sanat eseri gibi yaklaşıyor, mühendislik bilgimizi tasarım duyarlılığıyla birleştiriyoruz. Amacımız sadece duşakabin üretmek değil, yaşam alanlarınıza değer katmak.",
      "image": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
      "years_experience": "14+",
      "years_text": "Yıllık sektör deneyimi ve binlerce tamamlanan proje"
    },
    "values": {
      "subtitle": "Değerlerimiz",
      "title_normal": "Bizi Biz Yapan",
      "title_bold": "İlkeler",
      "items": [
        {
          "title": "Hassasiyet",
          "description": "Milimetrik doğrulukla üretilen her parça, mükemmelliğin bir yansımasıdır. Endüstriyel standartların ötesinde, sanat eseri titizliğiyle çalışıyoruz."
        },
        {
          "title": "Yenilikçilik",
          "description": "Geleneksel cam işçiliğini modern mühendislikle birleştirerek, sektörde yeni standartlar belirliyoruz. Ar-Ge odaklı yaklaşımımız fark yaratır."
        },
        {
          "title": "Sürdürülebilirlik",
          "description": "Doğaya saygılı üretim süreçleri ve uzun ömürlü malzeme seçimleriyle, gelecek nesillere karşı sorumluluğumuzu her ürünümüze yansıtıyoruz."
        }
      ]
    },
    "process": {
      "subtitle": "Üretim Süreci",
      "title_normal": "Fikirden",
      "title_bold": "Mükemmelliğe",
      "steps": [
        {
          "number": "01",
          "title": "Ölçü",
          "description": "Profesyonel ekibimiz metreküpük hassasiyetle banyo alanınızın ölçülerini alır."
        },
        {
          "number": "02",
          "title": "Tasarım",
          "description": "3D modelleme ile projeniz hayat bulur. Her detay sizinle birlikte planlanır."
        },
        {
          "number": "03",
          "title": "Üretim",
          "description": "CNC teknolojisi ve usta ellerde cam, profil ve aksesuarlar şekillendirilir."
        },
        {
          "number": "04",
          "title": "Temperlenme",
          "description": "Camlar 620°C''de temperlenerek EN12150 standardında güvenlik sağlanır."
        },
        {
          "number": "05",
          "title": "Montaj",
          "description": "Uzman montaj ekibimiz, milimetrik doğrulukla sisteminizi yerine konumlandırır."
        },
        {
          "number": "06",
          "title": "Kalite Kontrol",
          "description": "Çok aşamalı kalite kontrol sürecimizle kusursuz teslimat garanti edilir."
        }
      ]
    },
    "facility": {
      "subtitle": "Ekibimiz & Tesisimiz",
      "title_normal": "Tutku ile",
      "title_bold": "Şekillenen Üretim",
      "description": "50''den fazla uzman mühendis ve teknisyenimiz, 3.000 m²''lik modern üretim tesisimizde her gün sınırları zorluyor. CNC işleme merkezleri, temperleme fırınları ve kalite kontrol laboratuvarlarımızla sektörün en donanımlı tesislerinden birini işletiyoruz.",
      "image": "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop",
      "stats": [
        { "value": "3.000+", "label": "m² Üretim Alanı" },
        { "value": "50+", "label": "Uzman Personel" },
        { "value": "2.500+", "label": "Tamamlanan Proje" }
      ]
    },
    "cta": {
      "title_normal": "Projeniz İçin",
      "title_bold": "Hazırız",
      "description": "Hayalinizdeki banyo deneyimini gerçeğe dönüştürmek için ilk adımı atın. Uzman ekibimiz sizin için burada."
    }
  }'::jsonb
) ON CONFLICT (slug) DO NOTHING;

-- Seed data for Jakuzi ve Tekneler
INSERT INTO public.site_pages (slug, title, content) VALUES (
  'jakuzi-tekneler',
  'Jakuzi ve Tekneler',
  '{
    "hero": {
      "jakuzi_title_normal": "Banyonuzda",
      "jakuzi_title_bold": "Spa Konforu",
      "jakuzi_desc": "Profesyonel hidromasaj sistemleri ile evinizde lüks spa deneyimi yaşayın.",
      "jakuzi_bg": "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80",
      "tekne_title_normal": "Güvenli ve",
      "tekne_title_bold": "Hijyenik Zemin",
      "tekne_desc": "Akrilik duş tekneleri ile su sızıntısına son verin, konforlu bir banyo deneyimi yaşayın.",
      "tekne_bg": "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80"
    },
    "jakuzi": {
      "info_title_normal": "Evinizde",
      "info_title_bold": "Profesyonel Spa",
      "info_p1": "Jakuziler, suyun masaj etkisini (hidromasaj) kullanarak vücudun kaslarını rahatlatır ve kan dolaşımını düzenler. Güçlü su ve hava jetleri sayesinde profesyonel spa terapisine benzer bir deneyimi evinizin banyosunda yaşarsınız.",
      "info_p2": "Tüm modellerimiz %100 dökme akrilikten üretilir. Zamanla sararma yapmaz, esnemez ve kolay temizlenir. Standart ölçülerin yanı sıra banyonuzun mimarisine uygun özel ölçü çözümler sunuyoruz.",
      "info_p3": "Dijital kontrol panelleri, LED kromoterapi ve su ısıtma gibi ekstra donanımlar da isteğe bağlı olarak eklenebilir.",
      "info_image": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80",
      "info_badge_value": "10 Yıl",
      "info_badge_label": "Garanti Süresi",
      "stats": [
        { "value": "500+", "label": "Mutlu Müşteri" },
        { "value": "12", "label": "Farklı Model" },
        { "value": "10 Yıl", "label": "Garanti" },
        { "value": "%100", "label": "Dökme Akrilik" }
      ],
      "features": [
        { "title": "Hidromasaj Sistemi", "desc": "Su ve hava jetleriyle vücudun kaslarını rahatlatarak spa konforu sunan terapi sistemi." },
        { "title": "Sessiz Motor", "desc": "Maksimum performans, minimum ses. Yeni nesil motor teknolojisi ile huzurlu bir deneyim." },
        { "title": "Kromoterapi LED", "desc": "Farklı renk tonlarında LED aydınlatma ile görsel terapi ve ambiyans etkisi." },
        { "title": "Antibakteriyel Akrilik", "desc": "%100 dökme akrilik gövde. Sararma yapmaz, kir tutmaz, kolay temizlenir." }
      ],
      "models_desc": "Banyonuzun ölçülerine ve tarzına uygun farklı formlardaki jakuzi tasarımlarımız.",
      "models": [
        { "name": "Oval Jakuzi", "image": "https://images.unsplash.com/photo-1558211583-d26f610c1eb1?auto=format&fit=crop&q=80", "dims": "130×130 / 140×140 / 150×150 cm", "specs": ["6 Yönlü Hidromasaj", "Pnömatik Kontrol", "Baş Yastığı", "Ön Panel Dahil"] },
        { "name": "Dikdörtgen Lüks Jakuzi", "image": "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&q=80", "dims": "170×75 / 180×80 cm", "specs": ["Çift Motor Sistemi", "LED Kromoterapi", "Dijital Kontrol Paneli", "Su Isıtıcı Seçeneği"] },
        { "name": "Asimetrik Köşe Jakuzi", "image": "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80", "dims": "150×100 / 160×105 cm", "specs": ["Oturma Alanlı Gövde", "8 Masaj Jeti", "Ergonomik Kol Dayama", "Paslanmaz Tutamak"] }
      ]
    },
    "tekne": {
      "info_title_normal": "Güvenli ve",
      "info_title_bold": "Hijyenik Zemin",
      "info_p1": "Duş tekneleri, duşakabin altına yerleştirilen ve suyun doğrudan fayans altına sızmasını engelleyen akrilik zemin ürünleridir. Özellikle apartman dairelerinde alt kat sızıntı sorunlarını tamamen ortadan kaldırır.",
      "info_p2": "Akrilik yapısı sayesinde ayağınıza soğuk hissettirmez. Fayansa kıyasla çok daha hijyenik ve temizlemesi kolaydır. Kaymaz yüzey dokusu ile banyo güvenliğinizi en üst seviyeye taşır.",
      "info_p3": "Dikdörtgen, kare ve köşe formlarında standart ölçü seçenekleri sunuyoruz. Banyonuz standart dışı bir ölçüdeyse özel üretim imkânımız da mevcuttur.",
      "info_image": "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80",
      "info_badge_value": "%0",
      "info_badge_label": "Su Sızıntısı",
      "stats": [
        { "value": "1000+", "label": "Kurulum" },
        { "value": "8", "label": "Farklı Ölçü" },
        { "value": "0", "label": "Sızıntı" },
        { "value": "Özel", "label": "Ölçü İmkânı" }
      ],
      "features": [
        { "title": "Su Yalıtımı", "desc": "Fayans altına su sızmasını engelleyen yekpare yapısıyla banyonuzu nemden korur." },
        { "title": "Özel Ölçü Üretim", "desc": "Banyonuzun mimarisine tam oturan, santimetre hassasiyetinde özel ölçü üretim." },
        { "title": "Isı Yalıtımı", "desc": "Akrilik yapısı sayesinde ayak altında soğuk hissetmezsiniz, ısıyı tutar." },
        { "title": "Kaymaz Taban", "desc": "Güvenlik öncelikli tasarım. Kaymaz yüzey dokusuyla güvenli banyo deneyimi." }
      ],
      "models_desc": "Duşakabin altına uygulanabilen farklı form ve ölçü seçenekleri.",
      "models": [
        { "name": "Dikdörtgen Düz Tekne", "image": "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80", "dims": "70×90 / 80×100 / 80×120 / 80×140 cm", "specs": ["Düz Zemin", "Kaymaz Yüzey", "Sifon Dahil", "Kolay Montaj"] },
        { "name": "Kare Slim Tekne", "image": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80", "dims": "80×80 / 90×90 / 100×100 cm", "specs": ["5 cm İnce Profil", "Minimal Tasarım", "Güçlendirilmiş Taban", "Paslanmaz Izgaralı Sifon"] },
        { "name": "Köşe Oturmalı Tekne", "image": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80", "dims": "90×90 / 100×100 cm", "specs": ["Entegre Oturma Alanı", "Kaymaz Zemin", "Yüksek Kenarlık", "Sifon Dahil"] }
      ]
    },
    "cta": {
      "title_normal": "Banyonuzu",
      "title_bold": "Yenileme Zamanı",
      "description": "Mekanınıza en uygun jakuzi veya duş teknesini seçmek için uzman ekibimize danışın."
    }
  }'::jsonb
) ON CONFLICT (slug) DO NOTHING;
