-- Update jakuzi-tekneler site page models with exact shower tray and bathtub models
UPDATE public.site_pages
SET content = jsonb_set(
  jsonb_set(
    content,
    '{tekne,models}',
    '[
      {
        "name": "Oval Duş Teknesi",
        "dims": "80×80 / 90×90 / 100×100 cm",
        "image": "https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/uploads/1785597482175-oval-dus-teknesi.webp",
        "specs": ["1. Sınıf Dökme Akrilik", "Kaymaz Yüzey Dokusu", "Metal Ayak Karkaslı", "Sifon Hediyeli"]
      },
      {
        "name": "Oval Oturmalı Duş Teknesi",
        "dims": "90×90 / 100×100 cm",
        "image": "https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/uploads/1785597482452-oval-oturmali-dus-teknesi.webp",
        "specs": ["Ergonomik Oturma Alanı", "1. Sınıf Dökme Akrilik", "Güçlendirilmiş Taban", "Sifon Hediyeli"]
      },
      {
        "name": "Asimetrik Oval Duş Teknesi",
        "dims": "90×110 / 90×120 / 100×120 cm",
        "image": "https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/uploads/1785597480708-asimetrik-oval-dus-teknesi.webp",
        "specs": ["Sol / Sağ Yön Seçeneği", "1. Sınıf Akrilik", "Ayarlanabilir Ayak Sistemi", "Sifon Hediyeli"]
      },
      {
        "name": "Asimetrik Oval Oturmalı Duş Teknesi",
        "dims": "90×110 / 90×120 cm",
        "image": "https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/uploads/1785597481092-asimetrik-oval-oturmali-dus-teknesi.webp",
        "specs": ["Entegre Oturma Basamağı", "Sol / Sağ Uyumlu", "Dökme Akrilik Gövde", "Sifon Hediyeli"]
      },
      {
        "name": "Dikdörtgen Duş Teknesi",
        "dims": "70×90 / 80×100 / 80×120 / 90×140 cm",
        "image": "https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/uploads/1785597481667-dikdortgen-dus-teknesi.webp",
        "specs": ["Geniş Kullanım Alanı", "Leke Ve Sararma Karşıtı", "Metal Destek Profil", "Sifon Hediyeli"]
      }
    ]'::jsonb
  ),
  '{kuvet,models}',
  '[
    {
      "name": "Oval Küvet",
      "dims": "140×140 / 150×150 cm",
      "image": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80",
      "specs": ["Ergonomik Oval Form", "1. Sınıf Dökme Akrilik", "Isı Muhafazalı Gövde", "Taşmalı Sifon Sistemi"]
    },
    {
      "name": "Dikdörtgen Küvet",
      "dims": "150×70 / 160×70 / 170×70 / 180×80 cm",
      "image": "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80",
      "specs": ["Klasik Dikdörtgen Tasarım", "Ekstra Derinlik", "Fiberglas Takviyeli", "Kolay Temizlik"]
    },
    {
      "name": "Asimetrik Oval Küvet",
      "dims": "150×100 / 160×105 cm",
      "image": "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80",
      "specs": ["Asimetrik Köşe Yerleşimi", "Geniş İç Hacim", "Antibakteriyel Akrilik", "Sağ / Sol Açılı"]
    },
    {
      "name": "Dikdörtgen Oturmalı Küvet",
      "dims": "120×70 / 130×70 / 140×70 cm",
      "image": "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&q=80",
      "specs": ["Entegre Oturma Basamağı", "Kompakt Banyo Çözümü", "Esnemez Gövde", "1. Sınıf Akrilik"]
    }
  ]'::jsonb
)
WHERE slug = 'jakuzi-tekneler';
