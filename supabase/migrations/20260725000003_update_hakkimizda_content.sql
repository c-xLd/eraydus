-- Update hakkimizda page content with real company info
UPDATE public.site_pages
SET content = '{
  "hero": {
    "subtitle": "Hakkımızda",
    "title_normal": "Modern Tasarım ve",
    "title_bold": "Kaliteli Üretim",
    "description": "Erayduş, modern tasarım ve kaliteli üretim anlayışıyla her banyoya estetik ve fonksiyonel çözümler sunan Ankara merkezli bir duşakabin firmasıdır. Alanında uzman ekibimiz, her projede titizlikle çalışarak uzun ömürlü ve şık çözümler üretir."
  },
  "story": {
    "subtitle": "Hikayemiz",
    "title_normal": "Banyolara",
    "title_bold": "Değer Katıyoruz",
    "p1": "Ankara Siteler''de faaliyet gösteren Erayduş, pivot, livorno, katlanır, kare, mika ve askılı sistem gibi geniş bir ürün yelpazesiyle her banyoya uygun çözümler sunmaktadır.",
    "p2": "Kaliteli malzeme, profesyonel montaj ve müşteri odaklı hizmet anlayışını ilke edinen ekibimiz; ücretsiz keşif ve montaj hizmetiyle projenizin başından sonuna kadar yanınızdadır.",
    "image": "/images/eray_gold.jpg",
    "years_experience": "10+",
    "years_text": "Yıllık sektor deneyimi ve yüzlerce tamamlanan proje"
  },
  "values": {
    "subtitle": "Değerlerimiz",
    "title_normal": "Bizi Biz Yapan",
    "title_bold": "İlkeler",
    "items": [
      {
        "title": "Hassasiyet",
        "description": "Her ölçü, her profil, her cam; milimetrik doğrulukla üretilir. Alanında uzman ekibimiz hiçbir detaydan ödün vermez."
      },
      {
        "title": "Yenilikçilik",
        "description": "Pivot''tan livorno''ya, kumlama camdan askılı sisteme kadar sektördeki en güncel çözümleri müşterilerimize sunuyoruz."
      },
      {
        "title": "Sürdürülebilirlik",
        "description": "Uzun ömürlü malzeme seçimi ve dayanıklı üretim anlayışıyla hem müşterilerimize hem de çevreye karşı sorumluluğumuzu yerine getiriyoruz."
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
        "title": "Ücretsiz Keşif",
        "description": "Uzman ekibimiz banyo alanınıza gelerek ücretsiz ölçü ve keşif hizmeti sunar."
      },
      {
        "number": "02",
        "title": "Tasarım",
        "description": "Ölçülerinize ve zevkinize göre en uygun model ve renk seçenekleri belirlenir."
      },
      {
        "number": "03",
        "title": "Üretim",
        "description": "Kaliteli cam ve profil malzemeleri kullanılarak ürününüz özenle üretilir."
      },
      {
        "number": "04",
        "title": "Temperlenme",
        "description": "Camlar yüksek sıcaklıkta temperlenerek güvenlik standartları sağlanır."
      },
      {
        "number": "05",
        "title": "Montaj",
        "description": "Profesyonel montaj ekibimiz sisteminizi milimetrik hassasiyetle yerine konumlandırır."
      },
      {
        "number": "06",
        "title": "Teslimat",
        "description": "Kalite kontrol sürecimizden geçen ürününüz garanti belgesiyle teslim edilir."
      }
    ]
  },
  "facility": {
    "subtitle": "Ekibimiz & Showroom",
    "title_normal": "Siteler''de",
    "title_bold": "Yerinde İnceleyin",
    "description": "Malazgirt Caddesi No:121/1B Siteler/Ankara adresindeki showroom''umuzda tüm duşakabin modellerimizi yerinde inceleyebilirsiniz. Pazartesi''den Cumartesi''ye 09:00–18:00 saatleri arasında alanında uzman ekibimiz sizlere hizmet vermektedir.",
    "image": "/images/eray_exploded.jpg",
    "stats": [
      { "value": "7+", "label": "Ürün Kategorisi" },
      { "value": "Ücretsiz", "label": "Keşif & Montaj" },
      { "value": "2 Yıl", "label": "Ürün Garantisi" }
    ]
  },
  "cta": {
    "title_normal": "Projeniz İçin",
    "title_bold": "Hazırız",
    "description": "Hayalinizdeki banyoyu gerçeğe dönüştürmek için ilk adımı atın. Ücretsiz keşif randevusu alın, uzman ekibimiz sizin için burada."
  }
}'::jsonb
WHERE slug = 'hakkimizda';
