-- Seed 35 High Quality Human SEO Blog Posts into content_calendar table

INSERT INTO public.content_calendar (
  title, slug, description, body, featured_image, published_at, content_type, status, seo_title, seo_description, tags
) VALUES (
  '6 mm mi 8 mm mi? Duşakabin Cam Kalınlığı Seçim Rehberi',
  '6-mm-mi-8-mm-dusakabin',
  'Duşakabin satın alırken en çok kararsız kalınan 6 mm ve 8 mm temperli camlar arasındaki dayanıklılık, ağırlık ve estetik farkları inceleyin.',
  'Duşakabin satın alma sürecinde en kritik teknik kararlardan biri cam kalınlığı seçimidir. Piyasada en yaygın tercih edilen 6 mm ve 8 mm temperli emniyet camları, banyonuzun boyutuna ve kullanım sıklığına göre farklı avantajlar sunar.

### 1. 6 mm Temperli Cam Özellikleri
6 mm kalınlığındaki emniyet camları, standart sürgülü ve rulmanlı duşakabin modellerinde sıklıkla kullanılır. 
- **Ağırlık:** 8 mm cama kıyasla %25 daha hafiftir, bu sayede rulman tekerleklerine binen yük azalır.
- **Maliyet:** Fiyat-performans açısından daha ekonomiktir.
- **Kullanım Alanı:** 90x90 cm veya 80x80 cm gibi standart ölçülerdeki ev banyoları için idealdir.

### 2. 8 mm Temperli Cam Özellikleri
8 mm kalınlığındaki camlar, lüks ve profilsiz menteşeli duşakabin modellerinin vazgeçilmezidir.
- **Dayanıklılık:** Darbelere, ısı değişimlerine ve esnemeye karşı üstün direnç gösterir.
- **Mimari Görünüm:** Profilsiz menteşeli sistemlerde rijit bir duruş sağlar, sallanma ve esneme yapmaz.
- **Kullanım Alanı:** Geniş tek cam paneller, tavan boyu cam kabinler ve rezidans/villa projeleri için önerilir.

### Sonuç: Hangisini Seçmelisiniz?
Eğer banyonuzda menteşeli profilsiz bir model veya 120 cm üzeri geniş tek parça cam tercih edecekseniz **8 mm temperli cam** şarttır. Standart kayar kapılı sürgülü bir kabin düşünüyorsanız **6 mm temperli cam** tam performans sağlayacaktır. Banyonuzun mimarisine özel cam kalınlığını belirlemek için [Özel Ölçü Tasarlama Robotumuzu](/tasarla) kullanabilir ya da [tüm duşakabin modellerimizi](/dusakabin-modelleri) inceleyebilirsiniz.',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1600&auto=format&fit=crop',
  '2026-07-25T10:00:00+03:00'::timestamptz,
  'blog',
  'published',
  '6 mm mi 8 mm Duşakabin Camı mı? | ERAYDUŞ Uzman Rehberi',
  '6 mm ve 8 mm temperli duşakabin camı arasındaki farklar. Hangisi daha dayanıklı ve kullanışlı? Teknik karşılaştırma rehberi.',
  ARRAY['Cam Kalınlığı', 'Rehber', 'Temperli Cam']::text[]
) ON CONFLICT (slug) WHERE content_type = 'blog' AND slug IS NOT NULL
DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  status = 'published',
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags;

INSERT INTO public.content_calendar (
  title, slug, description, body, featured_image, published_at, content_type, status, seo_title, seo_description, tags
) VALUES (
  'Nano Kaplama Nedir? Kireç Tutmaz Banyo Cam Teknolojisi',
  'nano-kaplama-nedir',
  'Duşakabin camlarında kireç ve su lekesi oluşumunu %90 oranında engelleyen Nano-Shield sıvı cam kaplama teknolojisi nasıl çalışır?',
  'Banyo temizliğinde en çok vakit alan konu duşakabin camlarındaki kireç ve sabun kalıntılarıdır. ERAYDUŞ ürünlerinde uygulanan **Nano-Shield Hidrofobik Kaplama**, cam yüzeyindeki mikroskobik gözenekleri kapatarak suyun tutunmasını engeller.

### Nano Kaplama Nasıl Çalışır?
Cam yüzeyi çıplak gözle pürüzsüz görünse de mikroskop altında girintili çıkıntılı bir yapıya sahiptir. Su damlaları bu girintilere yerleşerek kuruduğunda kireç lekesi oluşturur.
Nano kaplama, bu pürüzleri moleküler düzeyde doldurarak **Lotus (Nilüfer Çiçeği) Etkisi** yaratır. Su damlaları cam yüzeyinden bilye gibi kayarak akar.

### Nano Kaplamanın 4 Büyük Avantajı
1. **Zahmetsiz Temizlik:** Deterjan ve ovma gerektirmeden sadece bir mikrofiber bezle kurulama yeterlidir.
2. **Kireç ve Mantar Engelleyici:** Küf, bakteri ve kireç birikimini önler.
3. **İlk Günkü Parlaklık:** Camın matlaşmasını ve sararmasını engeller.
4. **Çevre Dostu:** Kimyasal temizleyici kullanımını %80 azaltır.

Nano kaplamalı cam seçeneklerimizi keşfetmek için [Koleksiyonlarımızı](/koleksiyonlar) ziyaret edebilir veya [Banyo Temizlik Rehberimize](/blog/siyah-dusakabin-temizligi) göz atabilirsiniz.',
  'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=1600&auto=format&fit=crop',
  '2026-07-24T10:00:00+03:00'::timestamptz,
  'blog',
  'published',
  'Nano Kaplama Cam Nedir? Kireç Tutmaz Banyo Camı | ERAYDUŞ',
  'Nano kaplamalı duşakabin camı özellikleri. Kireç ve su lekesine son veren hidrofobik cam teknolojisi hakkında her şey.',
  ARRAY['Nano Kaplama', 'Temizlik', 'Teknoloji', 'Cam Bakımı']::text[]
) ON CONFLICT (slug) WHERE content_type = 'blog' AND slug IS NOT NULL
DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  status = 'published',
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags;

INSERT INTO public.content_calendar (
  title, slug, description, body, featured_image, published_at, content_type, status, seo_title, seo_description, tags
) VALUES (
  'Altın Profil Kararır mı? PVD Kaplama Dayanıklılık Analizi',
  'altin-profil-kararir-mi',
  'Gold ve altın renkli duşakabin profillerinde kararma, soyulma ve renk değişimi riski var mıdır? PVD titanyum teknolojisini keşfedin.',
  'Gold (Altın) renkli armatür ve duşakabin profilleri son yılların en popüler banyo trendlerinden biridir. Ancak kullanıcıların zihnindeki en büyük soru şudur: *''Altın profil zamanla kararır mı?''*

### PVD Kaplama ile Yaş Boya Arasındaki Fark
Sıradan ucuza imal edilen altın profillerde püskürtme yaş boya veya lak kaplama kullanılır. Bu boyalar nemli banyo ortamında ve deterjan temasında 6 ay içinde soyulmaya ve kararmaya başlar.

ERAYDUŞ Gold serisinde ise **PVD (Physical Vapor Deposition)** titanyum buharlaştırma teknolojisi kullanılır:
- Vakumlu yüksek sıcaklık odalarında titanyum atomları alüminyum profile işlenir.
- Kaplama yüzeyin bir parçası haline gelir, üst üste binmiş katman oluşturmaz.
- Çizilmeye, deterjana ve yüksek su sıcaklığına karşı %100 dayanıklıdır.

### Altın Profil Temizliği Nasıl Yapılmalı?
PVD kaplama altın profillerinizi temizlerken çamaşır suyu veya tuz ruhu gibi aşırı asidik kimyasallar yerine nötr sabunlu su kullanılması tavsiye edilir. Şık gold tasarımlarımızı yerinde görmek için [Showroom ve İletişim](/iletisim) sayfamızı ziyaret edin.',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1600&auto=format&fit=crop',
  '2026-07-23T10:00:00+03:00'::timestamptz,
  'blog',
  'published',
  'Altın Profil Duşakabin Kararır mı? PVD Kalite Analizi | ERAYDUŞ',
  'Gold altın profil duşakabin modellerinde kararma olur mu? PVD titanyum kaplama kalitesi ve renk dayanıklılığı detayları.',
  ARRAY['Gold Profil', 'PVD Kaplama', 'Kalite', 'Lüks Banyo']::text[]
) ON CONFLICT (slug) WHERE content_type = 'blog' AND slug IS NOT NULL
DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  status = 'published',
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags;

INSERT INTO public.content_calendar (
  title, slug, description, body, featured_image, published_at, content_type, status, seo_title, seo_description, tags
) VALUES (
  'Siyah Duşakabin Temizliği ve Bakımı: Lekesiz Görünüm Rehberi',
  'siyah-dusakabin-temizligi',
  'Mat siyah profilli ve siyah çerçeveli duşakabinlerin beyaz kireç lekelerinden korunması ve ilk günkü estetiğini koruması için pratik öneriler.',
  'Mat siyah duşakabinler banyolara büyüleyici ve modern bir atmosfer katar. Ancak suyun içerisindeki kireç, mat siyah yüzeylerde beyaz lekeler halinde kendini belli edebilir.

### Siyah Duşakabin Bakımında 3 Altın Kural
1. **Asitli Temizleyicilerden Kaçının:** Sirke veya sert kireç çözücüler mat siyah elektrostatik boyanın dokusuna zarar verebilir. Bunun yerine elma sirkesi damlatılmış ılık su veya nötr banyo spreyi tercih edin.
2. **Duş Sonrası Çekçek Kullanımı:** Duş bittikten sonra 30 saniyenizi ayırarak cam ve profillerdeki suyu çekçek ile sıyırmak leke oluşumunu kökten çözer.
3. **Mikrofiber Bez Tercihi:** Çizilmeyi önlemek için sert süngerlerin yeşil kısmını kesinlikle siyah profillere sürmeyin.

ERAYDUŞ elektrostatik fırın boyalı siyah profilleri boya dökülmelerine karşı 10 yıl garantilidir. Trend siyah modellerimizi incelemek için [Siyah Duşakabin Serisi](/dusakabin-modelleri) kategorimizi keşfedin.',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&auto=format&fit=crop',
  '2026-07-22T10:00:00+03:00'::timestamptz,
  'blog',
  'published',
  'Siyah Duşakabin Temizliği Nasıl Yapılır? | ERAYDUŞ Rehberi',
  'Mat siyah duşakabin profili ve camı nasıl temizlenir? Beyaz kireç lekesini önleyen lekesiz siyah kabin bakım rehberi.',
  ARRAY['Mat Siyah', 'Temizlik', 'Bakım', 'Kireç Önleme']::text[]
) ON CONFLICT (slug) WHERE content_type = 'blog' AND slug IS NOT NULL
DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  status = 'published',
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags;

INSERT INTO public.content_calendar (
  title, slug, description, body, featured_image, published_at, content_type, status, seo_title, seo_description, tags
) VALUES (
  'Adım Adım Duşakabin Ölçüsü Nasıl Alınır? Teknik Rehber',
  'dusakabin-olculeri-nasil-alinir',
  'Hatasız duşakabin siparişi için duvar eğiminden seramik payına kadar doğru ölçü alma tekniklerini fotoğraflarla öğrenin.',
  'Yanlış alınan duşakabin ölçüsü montaj sırasında su sızıntılarına ve uyumsuzluklara yol açabilir. Kendi ölçünüzü alırken dikkat etmeniz gereken adım adım rehberimiz:

### 1. Duvardan Duvara Net Ölçü (Genişlik)
Metrenizi seramik kaplanmış bitmiş duvardan karşı duvara uzatın. Ölçümü tabandan, ortadan ve tavana yakın yüksekten olmak üzere 3 farklı noktadan alın. En küçük çıkan ölçüyü esas alın (duvarlarda şakül kaçıklığı olabilir).

### 2. Yükseklik Ölçüsü
Duş teknesi veya seramik zeminden yukarıya doğru tavan mesafesini veya istediğiniz kabin yüksekliğini (standart 190 cm - 200 cm) belirleyin.

### 3. Duvar Eğimi (Şakül Kontrolü)
Bir su terazisi yardımıyla duvarlarınızın dikliğini kontrol edin. Duvarınızda içeriye veya dışarıya doğru eğim varsa ayarlı dikme profili tercih edilmelidir.

*Ankara merkez ilçelerinde ERAYDUŞ teknik ekibi adresinize gelerek yerinde ücretsiz keşif ve ölçüm yapmaktadır.* Detaylı adım adım anlatım için [Montaj ve Ölçü Rehberimizi](/montaj-kilavuzu) inceleyebilirsiniz.',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1600&auto=format&fit=crop',
  '2026-07-21T10:00:00+03:00'::timestamptz,
  'blog',
  'published',
  'Duşakabin Ölçüsü Nasıl Alınır? (Teknik Rehber) | ERAYDUŞ',
  'Özel ölçü duşakabin alırken net ölçü alma teknikleri. Duvar eğimi ve seramik payı nasıl hesaplanır?',
  ARRAY['Ölçü Alma', 'Montaj', 'Teknik Rehber', 'Banyo Yenileme']::text[]
) ON CONFLICT (slug) WHERE content_type = 'blog' AND slug IS NOT NULL
DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  status = 'published',
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags;

INSERT INTO public.content_calendar (
  title, slug, description, body, featured_image, published_at, content_type, status, seo_title, seo_description, tags
) VALUES (
  'Küçük Banyolar İçin Duşakabin Modelleri ve Yer Tasarruf Rehberi',
  'kucuk-banyolar-icin-dusakabin-modelleri',
  'Dar ve küçük banyoları daha geniş göstermek, hareket alanını maksimuma çıkarmak için en ideal duşakabin modelleri ve yerleşim tavsiyeleri.',
  'Küçük banyolar için doğru duşakabin seçimi yapmak hem estetik hem de fonksiyonellik açısından hayati önem taşır. Yanlış seçilen dışa açılır kapılı bir duşakabin, lavabo veya klozet kullanımını engelleyerek banyonuzu daha da daraltabilir.

### 1. Köşe L-Tipi ve Katlanır Duşakabinler
Küçük banyolarda ölü alan olarak adlandırılan köşeleri değerlendirmek en akıllıca çözümdür. Köşe duşakabin modelleri, kare veya oval hatlarıyla duş alanını köşeye hapseder ve banyonun merkezindeki dolaşım alanını tamamen serbest bırakır.
- **İçeri Katlanır Akordeon Kapılar:** Kapı açıldığında banyonun içine taşmaz, kendi üzerine katlanarak %100 alan tasarrufu sağlar.
- **Kayar Sürgülü Sistemler:** Ray üzerinde çalışan kapılar ekstra açılım mesafesi gerektirmez.

### 2. Şeffaf ve Oluklu (Fluted) Cam Tercihi
Opak veya çok koyu füme camlar küçük banyoları kutu gibi göstererek alan algısını daraltır. Bunun yerine 8mm temperli şeffaf camlar veya gün ışığını kırmadan mahremiyet sağlayan oluklu (fluted) cam paneller tercih edilmelidir. Şeffaf cam, gözün duvarın sonuna kadar ilerlemesini sağlayarak banyonuzu olduğundan 2 kat daha büyük gösterir.

### 3. Zeminle Hemzemin Tek Cam Duşakabin Çözümleri
Yüksek duş tekneleri banyo zeminini böler ve görsel bir engel yaratır. Zemine sıfır olarak monte edilen tek cam duş panelleri, seramik zeminle bütünleşerek kesintisiz bir görünüm sunar.

Banyonuzun net ölçülerine göre en uygun modeli belirlemek için [Özel Ölçü Tasarla & Fiyat Al](/tasarla) konfigüratörümüzü kullanabilir veya [tüm duşakabin koleksiyonlarımızı](/koleksiyonlar) inceleyebilirsiniz.',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1600&auto=format&fit=crop',
  '2026-07-20T10:00:00+03:00'::timestamptz,
  'blog',
  'published',
  'Küçük Banyolar İçin Duşakabin Modelleri | ERAYDUŞ Rehberi',
  'Dar ve küçük banyolar için en kullanışlı duşakabin modelleri. Katlanır kapılar, köşe kabinler ve şeffaf cam yerleşim ipuçları.',
  ARRAY['Küçük Banyo', 'Yer Tasarrufu', 'Duşakabin Modelleri', 'Rehber']::text[]
) ON CONFLICT (slug) WHERE content_type = 'blog' AND slug IS NOT NULL
DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  status = 'published',
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags;

INSERT INTO public.content_calendar (
  title, slug, description, body, featured_image, published_at, content_type, status, seo_title, seo_description, tags
) VALUES (
  'Menteşeli mi Sürgülü mü? Banyonuz İçin En Doğru Kapı Sistemi',
  'menteseli-mi-surgulu-mu-dusakabin',
  'Menteşeli pirinç kapılar ile kayar rulmanlı sürgülü sistemlerin karşılaştırması. Kullanım kolaylığı, alan gereksinimi ve uzun ömürlülük farkları.',
  'Duşakabin alırken verilmesi gereken temel kararlardan biri kapı mekanizması seçimidir. Menteşeli ve sürgülü kapı sistemlerinin kendilerine özgü mimari ve pratik avantajları bulunmaktadır.

### 1. Sürgülü (Rulmanlı) Kapı Sistemleri
Sürgülü kapılar, üst ve alt ray profili üzerinde hareket eden rulman tekerlekleri ile çalışır.
- **En Büyük Avantajı:** Kapı dışarı doğru açılmadığı için banyoda sıfır alan kaplar. Klozet veya lavaboya sıfır yanaşan dar banyolarda zorunludur.
- **Dikkat Edilmesi Gereken:** Rulmanların paslanmaz pirinç veya rulman çeliği olması gerekir. ERAYDUŞ sürgülü sistemlerinde çift tekerlekli sessiz rulmanlar kullanılır.

### 2. Menteşeli (Pivot) Kapı Sistemleri
Menteşeli kapılar, duvara veya sabit cama bağlanan paslanmaz pirinç menteşelerle 90 ya da 180 derece dışarı açılır.
- **En Büyük Avantajı:** Ray ve alt profil bulunmadığı için temizliği son derece kolaydır. Geniş giriş açıklığı sağlar.
- **Mimari Görünüm:** Profilsiz şeffaf cam estetiği sunar, otel ve lüks villa banyolarının 1 numaralı tercihidir.

### Hangisini Seçmelisiniz?
Banyonuz genişse ve lüks, kesintisiz bir görünüm arıyorsanız [Menteşeli Pivot Sistemlerimizi](/koleksiyonlar) tercih edin. Alanınız kısıtlıysa ve pratik kullanım istiyorsanız [Sürgülü Kabin Modellerimizi](/dusakabin-modelleri) inceleyin.',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1600&auto=format&fit=crop',
  '2026-07-19T10:00:00+03:00'::timestamptz,
  'blog',
  'published',
  'Menteşeli mi Sürgülü Duşakabin mi? Karşılaştırma | ERAYDUŞ',
  'Menteşeli ve sürgülü duşakabin kapı sistemlerinin artı ve eksileri. Hangisi banyonuza daha uygun? Detaylı teknik rehber.',
  ARRAY['Menteşeli Kabin', 'Sürgülü Kabin', 'Kapı Sistemleri', 'Karşılaştırma']::text[]
) ON CONFLICT (slug) WHERE content_type = 'blog' AND slug IS NOT NULL
DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  status = 'published',
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags;

INSERT INTO public.content_calendar (
  title, slug, description, body, featured_image, published_at, content_type, status, seo_title, seo_description, tags
) VALUES (
  'Fluted (Oluklu) Cam Duşakabinler: Banyolara Retro-Modern Dokunuş',
  'fluted-oluklu-cam-dusakabin-trendleri',
  'Çizgili ve oluklu yapısıyla ışığı kırarak büyüleyici bir mahremiyet yaratan Fluted oluklu temperli cam duşakabin modelleri.',
  'İç mimaride son yılların en güçlü trendlerinden biri olan **Fluted (Oluklu/Dikey Çizgili) Cam**, duşakabin tasarımlarında devrim yaratıyor. Fransız ve İtalyan banyo mimarisinden ilham alan oluklu camlar, şeffaflık ile gizlilik arasında mükemmel bir denge kurar.

### Fluted Camın Öne Çıkan Özellikleri
- **Işık Geçirgenliği ve Mahremiyet:** Işığı engellemez ancak arkasındaki silueti buğulayarak %100 mahremiyet sağlar.
- **Su Lekesi Göstermeme:** Dikey çizgili yüzey dokusu sayesinde su ve su damlası izlerini gizler.
- **Siyah ve Gold Profil Uyumu:** Mat siyah çerçevelerle birleştiğinde endüstriyel şıklık, gold profillerle birleştiğinde ise Art-Deco bir lüks sunar.

ERAYDUŞ üretim tesislerinde 6 mm ve 8 mm kalınlıkta güvenlik standartlarına uygun temperlenmiş oluklu camlar üretilmektedir. Özel tasarım projeleriniz için [Kumlama ve Özel Cam Sayfamızı](/kumlama-modelleri) inceleyin.',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1600&auto=format&fit=crop',
  '2026-07-18T10:00:00+03:00'::timestamptz,
  'blog',
  'published',
  'Fluted Oluklu Cam Duşakabin Modelleri | ERAYDUŞ Tasarım',
  'Oluklu dikey çizgili fluted temperli duşakabin camları. Banyonuza estetik ve mahremiyet katan yeni nesil cam trendi.',
  ARRAY['Oluklu Cam', 'Fluted Glass', 'Banyo Trendleri', 'Tasarım']::text[]
) ON CONFLICT (slug) WHERE content_type = 'blog' AND slug IS NOT NULL
DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  status = 'published',
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags;

INSERT INTO public.content_calendar (
  title, slug, description, body, featured_image, published_at, content_type, status, seo_title, seo_description, tags
) VALUES (
  'Çankaya''da Duşakabin Yenileme: Yerinde Ölçü ve Montaj Süreci',
  'ankara-cankaya-dusakabin-montaj-rehberi',
  'Ankara Çankaya, Ayrancı, Gaziosmanpaşa ve Bahçelievler bölgelerinde eski kabin sökümü, yerinde ücretsiz keşif ve hızlı montaj hizmeti.',
  'Ankara Çankaya bölgesindeki yüksek katlı konutlar, rezidanslar ve müstakil yapılarda banyo yenileme süreçleri özel bir teknik yaklaşım gerektirir. Eski yapılardaki duvar kaçıklıkları ve seramik altı tesisat durumları dikkate alınarak imalat yapılmalıdır.

### Çankaya Bölgesi Özel Hizmet Sürecimiz
1. **Aynı Gün Ücretsiz Keşif:** Çankaya, Gaziosmanpaşa, Ümitköy ve civarında adresinize gelerek banyonuzun net ölçüsünü alıyoruz.
2. **Eski Kabin Sökümü ve Temizliği:** Mevcut eski plastik veya paslanmış kabininizi zarar vermeden söküp alandan uzaklaştırıyoruz.
3. **Sızdırmazlık Garantili Montaj:** Antibakteriyel nötr silikon uygulaması ile 2 yıl su sızdırmazlık garantisi sunuyoruz.

Çankaya ve çevresinde ikamet ediyorsanız detaylı bilgi için [Ankara Çankaya Duşakabin Hizmeti](/ankara-cankaya-dusakabin) sayfamızı ziyaret edin veya [bize doğrudan ulaşın](/iletisim).',
  'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1600&auto=format&fit=crop',
  '2026-07-17T10:00:00+03:00'::timestamptz,
  'blog',
  'published',
  'Çankaya Duşakabin Montaj ve Yenileme Hizmeti | ERAYDUŞ Ankara',
  'Ankara Çankaya bölgesine özel ücretsiz keşif, duşakabin montajı ve eski kabin söküm hizmetleri. %100 yerli ve garantili imalat.',
  ARRAY['Ankara SEO', 'Çankaya Duşakabin', 'Montaj', 'Yerel Hizmet']::text[]
) ON CONFLICT (slug) WHERE content_type = 'blog' AND slug IS NOT NULL
DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  status = 'published',
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags;

INSERT INTO public.content_calendar (
  title, slug, description, body, featured_image, published_at, content_type, status, seo_title, seo_description, tags
) VALUES (
  'Çayyolu ve Ümitköy Bölgesi İçin Özel Ölçü Lüks Duşakabin Çözümleri',
  'ankara-cayyolu-umitkoy-banyo-dekorasyon',
  'Çayyolu, Ümitköy, İncek ve Alacaatlı bölgelerindeki villa ve lüks konutlara özel tavan boyu cam, gold profil ve tek cam duşakabin çözümleri.',
  'Çayyolu, Ümitköy ve İncek bölgesindeki geniş metrekareli villa ve müstakil konut banyolarında standart ölçü kabinler hem küçük kalmakta hem de mekanın lüks mimarisine uyum sağlayamamaktadır.

### Lüks Konutlar İçin Öne Çıkan Mimari Çözümler
- **240 cm Tavan Boyu Cam Paneller:** Yüksek tavanlı banyolarda tavana sabitlenen pirinç gergilerle sallantısız rüzgarlık mimarisi.
- **PVD Gold ve Antik Bronz Profiller:** Armatürlerinize özel üretilen solmaz renk kaplamalı profiller.
- **Gömme Niş ve Led Aydınlatma Uyumlu Kabinler:** Cam kabin içerisindeki şampuanlık nişleri ile entegre cam konumlandırması.

Ankara Batı aksındaki villa projelerinize özel mimari destek almak için [Çayyolu Duşakabin Sayfamızı](/cayyolu-dusakabin) inceleyin ya da [Showroom Randevusu](/iletisim) oluşturun.',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1600&auto=format&fit=crop',
  '2026-07-16T10:00:00+03:00'::timestamptz,
  'blog',
  'published',
  'Çayyolu & Ümitköy Lüks Duşakabin Çözümleri | ERAYDUŞ',
  'Çayyolu, Ümitköy ve İncek villa banyoları için tavan boyu özel ölçü duşakabinler. PVD Gold ve özel cam çözümleri.',
  ARRAY['Çayyolu', 'Ümitköy', 'Villa Banyoları', 'Lüks Kabin']::text[]
) ON CONFLICT (slug) WHERE content_type = 'blog' AND slug IS NOT NULL
DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  status = 'published',
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags;

INSERT INTO public.content_calendar (
  title, slug, description, body, featured_image, published_at, content_type, status, seo_title, seo_description, tags
) VALUES (
  'Duşakabin Altından Su Sızıyor! Nedeni ve Kesin Çözüm Yöntemleri',
  'dusakabin-su-sizdirma-sorunu-ve-cozumu',
  'Duşakabin dışına su taşması ve silikon kararması gibi sızıntı problemlerinin teknik nedenleri ve antibakteriyel silikon çözüm adımları.',
  'Duş aldıktan sonra banyo zemininde su birikintisi görmek en can sıkıcı banyo problemlerinden biridir. Duşakabin su sızdırmasının 3 temel nedeni ve çözümü:

### 1. Ömrünü Tamamlamış Silikon
Asetik bazlı ucuz silikonlar zamanla kuruyarak çatlar ve seramik aralarından su sızdırır.
- **Çözüm:** Eski silikon tamamen kazınmalı, alan alkol ile temizlenmeli ve %100 nötr antibakteriyel banyo silikonu çekilmelidir.

### 2. Yıpranmış veya Eksik Mıknatıslı Fitiller
Kapıların birleştiği noktadaki mıknatıslı suluk fitilleri zamanla sertleşerek aralık kalabilir.
- **Çözüm:** Cam kalınlığınıza uygun (6 mm veya 8 mm) şeffaf mıknatıslı suluk fitili ile değiştirilmelidir.

### 3. Hatalı Duğ Eşiği ve Meyilsizlik
Zemin seramiğindeki meyil duş giderine doğru değilse su dışarı yönlenir.
- **Çözüm:** Kabin altına mermer veya alüminyum su tutucu eşik profili eklenmelidir.

Teknik destek ve garantili bakım hizmetimiz için [Sıkça Sorulan Sorular](/sss) kısmını inceleyebilir ya da [Servis Ekibimizle](/iletisim) iletişime geçebilirsiniz.',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1600&auto=format&fit=crop',
  '2026-07-15T10:00:00+03:00'::timestamptz,
  'blog',
  'published',
  'Duşakabin Su Sızdırıyor! Nedeni ve Çözümü | ERAYDUŞ',
  'Duşakabin altından su sızması nasıl önlenir? Silikon değişimi, fitil yenileme ve su tutucu eşik çözümleri rehberi.',
  ARRAY['Su Sızdırma', 'Silikon', 'Tamir', 'Bakım']::text[]
) ON CONFLICT (slug) WHERE content_type = 'blog' AND slug IS NOT NULL
DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  status = 'published',
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags;

INSERT INTO public.content_calendar (
  title, slug, description, body, featured_image, published_at, content_type, status, seo_title, seo_description, tags
) VALUES (
  'Duşakabin Mıknatıslı Suluk Fitili Nasıl Değiştirilir? Bakım Rehberi',
  'miknatisli-fitil-degisimi-ve-bakimi',
  'Zamanla sararan, kireçlenen veya tutıcılığını kaybeden duşakabin mıknatıs ve damlalık fitillerini evde değiştirme adımları.',
  'Duşakabin kapılarının su geçirmesini engelleyen en önemli sarf malzemesi cam kenarlarına takılan plastik ve mıknatıslı fitillerdir.

### Fitiller Neden Sararır ve Bozulur?
Güneş ışığı (UV), sert şebeke suyu ve kireç önleyici ağır kimyasallar plastik fitillerin esnekliğini kaybettirerek sararmasına neden olur.

### 5 Adımda Evde Fitil Değişimi:
1. **Cam Kalınlığını Ölçün:** Fitil almadan önce camınızın 4 mm, 6 mm mi yoksa 8 mm mi olduğunu kumpas veya cetvel ile ölçün.
2. **Eski Fitili Çıkarın:** Eski fitili yukarı doğru çekerek camdan ayırın.
3. **Cam Kenarını Temizleyin:** Cam birleşim yerindeki kireç ve tortuları sirke ile silin.
4. **Yeni Fitili Kesin:** Yeni fitili kabin yüksekliğinize uygun maket bıçağı veya makasla kesin.
5. **Cama Bastırarak Takın:** Aşağıdan yukarıya doğru bastırarak oturtun.

Yedek parça ve orijinal ERAYDUŞ aksesuar talepleriniz için [İletişim Formumuzu](/iletisim) doldurabilirsiniz.',
  'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=1600&auto=format&fit=crop',
  '2026-07-14T10:00:00+03:00'::timestamptz,
  'blog',
  'published',
  'Duşakabin Mıknatıslı Fitil Değişimi Nasıl Yapılır? | ERAYDUŞ',
  'Sararan duşakabin suluk fitili ve mıknatıs değişimi teknikleri. Cam kalınlığına göre doğru fitil seçimi ipuçları.',
  ARRAY['Fitil Değişimi', 'Aksesuar', 'Kendin Yap', 'Tamir']::text[]
) ON CONFLICT (slug) WHERE content_type = 'blog' AND slug IS NOT NULL
DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  status = 'published',
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags;

INSERT INTO public.content_calendar (
  title, slug, description, body, featured_image, published_at, content_type, status, seo_title, seo_description, tags
) VALUES (
  'Temperli Cam Patlaması Neden Olur? Emniyet Camı Gerçekleri',
  'temperli-cam-patlamasi-neden-olur',
  'Duşakabin temperli camlarının kendiliğinden kırılması veya patlaması efsanesi. Termal şok, kenar darbesi ve güvenlik önlemleri.',
  'Kamuoyunda ''duşakabin camı durduk yere patladı'' şeklinde bilinen durum, temperli emniyet camlarının fiziksel niteliklerinden kaynaklanan nadir bir durumdur.

### Temperli Cam Nedir ve Neden Güvenlidir?
Normal cam kırıldığında bıçak gibi keskin büyük parçalara ayrılır ve hayati tehlike oluşturur. **Temperli cam** ise 700°C fırınlarda ısıtılıp aniden soğutularak yüzey gerilimi artırılmış camdır. Kırıldığında zararsız, tavla pulu büyüklüğünde küt parçalara ayrılır.

### Camın Kırılmasına Yol Açan 3 Ana Etken:
1. **Köşe ve Kenar Darbeleri:** Temperli camın en hassas noktası yüzeyi değil, 4 köşesidir. Montaj esnasında köşenin seramiğe çarpması mikro çatlak oluşturabilir.
2. **Kasalarda Ayarsızlık:** Çalışırken profile veya metala sürtünen camlar zamanla yorulur.
3. **Termal Şok:** Çok soğuk banyoya aniden 60°C kaynar su tutulması nadiren termal gerilime yol açabilir.

ERAYDUŞ olarak kullandığımız tüm camlar TSE ve CE belgeli rodajlı temperli emniyet camlarıdır. Güvenli cam standartlarımız hakkında bilgi almak için [Kalite Politikamızı](/hakkimizda) okuyabilirsiniz.',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1600&auto=format&fit=crop',
  '2026-07-13T10:00:00+03:00'::timestamptz,
  'blog',
  'published',
  'Temperli Cam Patlaması Neden Olur? | ERAYDUŞ Bilgilendirme',
  'Duşakabin temperli emniyet camı neden kırılır? Kendiliğinden cam kırılmasını önleyen montaj ve kullanım ipuçları.',
  ARRAY['Temperli Cam', 'Güvenlik', 'Emniyet Camı', 'Teknik']::text[]
) ON CONFLICT (slug) WHERE content_type = 'blog' AND slug IS NOT NULL
DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  status = 'published',
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags;

INSERT INTO public.content_calendar (
  title, slug, description, body, featured_image, published_at, content_type, status, seo_title, seo_description, tags
) VALUES (
  'Kumlama Cam Desenleri: Estetik ve Mahremiyeti Bir Arada Sunan Çözümler',
  'kumlama-cam-desenleri-banyo-gizlilik',
  'Çizgili, kare, dalga ve özel amblemli kumlama (frosted) duşakabin camı desenleri ile banyonuzda şık bir gizlilik alanı yaratın.',
  'Şeffaf cam duşakabinlerin sunduğu ferahlık harika olsa da, kalabalık ailelerde veya misafir kullanımında mahremiyet ihtiyacı ön plana çıkar. **Kumlama (Frosted) Cam Teknolojisi**, yüksek basınçlı kum püskürtülerek cam yüzeyinin mikro düzeyde matlaştırılması işlemidir.

### Popüler Kumlama Cam Desenleri
- **Şerit Çizgili (Bantlı) Kumlama:** Sadece mahrem bölgeyi (göğüs ve diz arası) kapatan, altı ve üstü şeffaf kalan modern çizgi tasarımı.
- **Tam Kumlama Mat Cam:** Camın tamamının matlaştırıldığı maksimum mahremiyet çözümü.
- **Geometrik & Kare Desenler:** Modern mimari banyolar için kübik ve çizgisel formlar.

Tüm desen opsiyonlarımızı yüksek çözünürlükle incelemek ve seçiminizi yapmak için [Kumlama Cam Modelleri Kataloğumuzu](/kumlama-modelleri) inceleyin.',
  'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=1600&auto=format&fit=crop',
  '2026-07-12T10:00:00+03:00'::timestamptz,
  'blog',
  'published',
  'Kumlama Cam Desenleri ve Banyo Gizlilik Çözümleri | ERAYDUŞ',
  'Buzlu ve kumlama desenli duşakabin camı modelleri. Şerit çizgili, mat ve dekoratif cam kumlama seçenekleri.',
  ARRAY['Kumlama Cam', 'Buzlu Cam', 'Desenler', 'Mahremiyet']::text[]
) ON CONFLICT (slug) WHERE content_type = 'blog' AND slug IS NOT NULL
DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  status = 'published',
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags;

INSERT INTO public.content_calendar (
  title, slug, description, body, featured_image, published_at, content_type, status, seo_title, seo_description, tags
) VALUES (
  'Tek Cam Duşakabin Nedir? Hemzemin Banyo Tasarımının Avantajları',
  'walk-in-dus-paneli-nedir',
  'Kapısız, tek sabit cam panelden oluşan tek cam duşakabin alanlarının mimari lüksü, eşiksiz geçiş rahatlığı ve temizlik kolaylığı.',
  'Modern otel ve lüks banyo tasarımlarında sıklıkla karşılaştığımız **Tek Cam Duşakabinler**, herhangi bir açılır/kapanır kapısı olmayan, sabit bir cam sabitleyici profil ve gergiden oluşan minimalist sistemlerdir.

### Tek Cam Sistemlerin 4 Büyük Avantajı
1. **Sıfır Engelli Geçiş:** Zeminle hemzemin seramik üzeri kurulumu sayesinde yaşlılar, çocuklar ve engelli bireyler için %100 güvenli ve basamaksız geçiş sunar.
2. **Minimum Parça, Sıfır Arıza:** Rulman, menteşe veya hareketli kapı mekanizması olmadığı için mekanik arıza riski sıfırdır.
3. **Işık ve Hacim Ferahlığı:** Banyonuzu bölmez, tek bir cam duvar görevi görerek mekanı devasa gösterir.
4. **Temizlik Kolaylığı:** Profil birleşim detayları az olduğu için kir tutacak köşe kalmaz.

Tek cam panellerinizde 8 mm temperli cam kullanılması statik duruş açısından zorunludur. Projenize özel tasarımı hemen [Özel Ölçü Tasarlama Robotumuzda](/tasarla) oluşturun.',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1600&auto=format&fit=crop',
  '2026-07-11T10:00:00+03:00'::timestamptz,
  'blog',
  'published',
  'Tek Cam Duşakabin Nedir? Hemzemin Banyo | ERAYDUŞ',
  'Tek cam kapısız duşakabin panelleri özellikleri. Hemzemin basamaksız banyo tasarımı ve minimalist şeffaf cam çözümleri.',
  ARRAY['Tek Cam', 'Hemzemin Banyo', 'Minimalizm', 'Lüks Tasarım']::text[]
) ON CONFLICT (slug) WHERE content_type = 'blog' AND slug IS NOT NULL
DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  status = 'published',
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags;

INSERT INTO public.content_calendar (
  title, slug, description, body, featured_image, published_at, content_type, status, seo_title, seo_description, tags
) VALUES (
  'Duş Teknesi mi Zemin Üzeri Seramik mi? Hangisini Tercih Etmelisiniz?',
  'dus-teknesi-mi-zemin-uzeri-seramik-mi',
  'Akrilik duş tekneleri ile doğrudan seramik üzerine kurulan eşiksiz duş sistemlerinin dayanıklılık, su yalıtımı ve estetik karşılaştırması.',
  'Banyo yenilerken en çok sorulan sorulardan biri şudur: *''Kabin altına akrilik duş teknesi mi koymalıyım yoksa zemin seramiğinin üzerine mi monte etmeliyim?''*

### 1. Akrilik Duş Teknesi Avantajları
- **Kesin Su Yalıtımı:** Kendinden mefilli ve sifonlu olduğu için seramik altı su sızdırma riskini sıfıra indirir.
- **Sıcak Dokunuş:** Akrilik malzeme ayağı üşütmez, hızlı ısınır.
- **Temizlik:** Derz araları olmadığı için derz kararması problemi yaşanmaz.

### 2. Zemin Üzeri Seramik (Flat/Hemzemin) Avantajları
- **Kesintisiz Estetik:** Banyo zemini duşun içine kadar aynı seramikle devam eder, alan bütünlüğü sağlar.
- **Modern ve Basamaksız:** Yükseklik farkı olmadığı için takılma riski yoktur.

### Karar Verirken:
Zemin seramiğinizi yeniliyorsanız ve alt kat su yalıtımından eminseniz **zemin üzeri kurulum**; seramiğe dokunmadan hızlı ve güvenli çözüm istiyorsanız **akrilik tekne üzeri kurulum** tercih edilmelidir. [Tüm Duş Teknesi ve Jakuzi Çözümlerimizi](/jakuzi-tekneler) inceleyebilirsiniz.',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&auto=format&fit=crop',
  '2026-07-10T10:00:00+03:00'::timestamptz,
  'blog',
  'published',
  'Duş Teknesi mi Zemin Üzeri Seramik mi? | ERAYDUŞ Karşılaştırma',
  'Duş teknesi ve hemzemin seramik üstü duşakabin montajı farkları. Su yalıtımı, kullanım kolaylığı ve maliyet analizi.',
  ARRAY['Duş Teknesi', 'Zemin Üstü', 'Seramik', 'Banyo Yenileme']::text[]
) ON CONFLICT (slug) WHERE content_type = 'blog' AND slug IS NOT NULL
DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  status = 'published',
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags;

INSERT INTO public.content_calendar (
  title, slug, description, body, featured_image, published_at, content_type, status, seo_title, seo_description, tags
) VALUES (
  'Füme (Siyah) Cam Duşakabin Kullanışlı mı? Temizlik ve Işık Analizi',
  'fume-cam-dusakabin-kullanisli-mi',
  'Siyah ve füme tonlu şeffaf camların estetik çekiciliği, banyo aydınlatmasına etkisi ve temizlik rutinleri hakkında bilmeniz gerekenler.',
  'Maskülen, gizemli ve son derece lüks bir banyo atmosferi yaratmak isteyenlerin ilk tercihi **Füme (Koyu Gri/Siyah) Camlı Duşakabinler** oluyor. Ancak füme cam almadan önce bilmeniz gereken pratik detaylar şunlardır:

### 1. Işık Geçirgenliği ve Banyo Aydınlatması
Füme camlar ortam ışığını %40 ila %50 oranında emer. Bu nedenle banyonuz küçükse veya yeterince güçlü spot/LED aydınlatmanız yoksa kabin içi karanlık kalabilir. Kabin içine su geçirmez LED aydınlatma yapılması harika bir atmosfer sunar.

### 2. Kireç Gösterme Durumu
Siyah profillerde olduğu gibi, koyu renk füme camlarda da kuruyan su damlaları beyaz kireç izi bırakabilir. ERAYDUŞ olarak füme cam siparişlerinizde **Nano-Shield Kireç Önleyici Kaplama** standart olarak sunulmaktadır.

Füme cam ile kombinleyebileceğiniz [Mat Siyah ve Krom Profil Çeşitlerimizi](/koleksiyonlar) hemen inceleyin.',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1600&auto=format&fit=crop',
  '2026-07-09T10:00:00+03:00'::timestamptz,
  'blog',
  'published',
  'Füme Cam Duşakabin Kullanışlı mı? | ERAYDUŞ İnceleme',
  'Füme siyah cam duşakabin modelleri kullanışlı mı? Işık geçirgenliği, kireç gösterme durumu ve dekorasyon ipuçları.',
  ARRAY['Füme Cam', 'Siyah Cam', 'Banyo Dekorasyonu', 'İnceleme']::text[]
) ON CONFLICT (slug) WHERE content_type = 'blog' AND slug IS NOT NULL
DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  status = 'published',
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags;

INSERT INTO public.content_calendar (
  title, slug, description, body, featured_image, published_at, content_type, status, seo_title, seo_description, tags
) VALUES (
  'Bronz Cam ve Antik Bronz Profil Kullanımı: Sıcak ve Lüks Banyo Konseptleri',
  'bronz-cam-ve-antik-bronz-profil',
  'Ahşap, bej ve mermer dokulu banyolarla kusursuz uyum sağlayan bronz temperli cam ve antik bronz çerçeve tasarımları.',
  'Gri ve beyaz soğuk banyo tonlarından sıkılan iç mimarların yeni gözdesi **Bronz Cam ve Antik Bronz Profil** kombinasyonlarıdır. Sıcak kahve, karamel ve altın yansımalara sahip bronz camlar, banyonuza otantik ve lüks bir spa havası kazandırır.

### Hangi Banyo Stilleri İle Uyumludur?
- **Ahşap ve Doğal Taş Banyolar:** Meşe, ceviz banyo mobilyaları ve traverten seramiklerle %100 renk uyumu sağlar.
- **Klasik ve Neo-Klasik Tasarımlar:** Antik bronz veya pirinç bataryalarla mükemmel bir bütünlük yakalar.

ERAYDUŞ Bronz Koleksiyonu, solmaz ve çizilmez PVD kaplama garantisiyle üretilmektedir. Hayalinizdeki bronz kabini tasarlamak için [Tasarım Konfigüratörümüzü](/tasarla) deneyin.',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1600&auto=format&fit=crop',
  '2026-07-08T10:00:00+03:00'::timestamptz,
  'blog',
  'published',
  'Bronz Cam ve Antik Bronz Profil Duşakabinler | ERAYDUŞ',
  'Bronz temperli cam ve antik bronz profil duşakabin modelleri. Sıcak ahşap ve mermer banyo tasarımlarına özel çözümler.',
  ARRAY['Bronz Cam', 'Antik Bronz', 'Sıcak Tonlar', 'Tasarım']::text[]
) ON CONFLICT (slug) WHERE content_type = 'blog' AND slug IS NOT NULL
DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  status = 'published',
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags;

INSERT INTO public.content_calendar (
  title, slug, description, body, featured_image, published_at, content_type, status, seo_title, seo_description, tags
) VALUES (
  'Duşakabin Rulman Tekerleği Takılıyor: Yağlama ve Değişim Rehberi',
  'dusakabin-rulman-tekerlek-bakimi',
  'Zamanla zor çalışan, ses yapan veya raydan çıkan sürgülü duşakabin tekerleklerini temizleme, yağlama ve değiştirme adımları.',
  'Sürgülü duşakabin kapılarının zamanla zor kayması veya takılarak ses yapması, rulman tekerleklerinde biriken kireç, sabun artığı ve saç tellerinden kaynaklanır.

### Rulman Ömrünü Uzatan 3 Bakım Adımı:
1. **Ray İçi Temizliği:** Eski bir diş fırçası ve sirke ile alt ve üst ray profilinin içini kireçten arındırın.
2. **Silikon Sprey ile Yağlama:** Rulman tekerleklerine gres veya sıvı yağ yerine toz tutmayan **Silikon Sprey (WD-40 Silikon)** sıkın.
3. **Yük Ayarı (Eksantrik Ayar):** Tekerlek göbeğindeki vida ile kapı yüksekliğini teraziye getirin.

Aşınmış rulmanlarınızı orijinal pirinç rulman takımları ile değiştirmek için [Yedek Parça ve Aksesuar](/sss) bölümümüze göz atabilirsiniz.',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1600&auto=format&fit=crop',
  '2026-07-07T10:00:00+03:00'::timestamptz,
  'blog',
  'published',
  'Duşakabin Rulman Tekerlek Bakımı ve Değişimi | ERAYDUŞ',
  'Zor kayan duşakabin kapısı nasıl tamir edilir? Rulman tekerlek yağlama, kireç temizleme ve ayar yapma rehberi.',
  ARRAY['Rulman', 'Tekerlek Bakımı', 'Tamir', 'Sürgülü Kabin']::text[]
) ON CONFLICT (slug) WHERE content_type = 'blog' AND slug IS NOT NULL
DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  status = 'published',
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags;

INSERT INTO public.content_calendar (
  title, slug, description, body, featured_image, published_at, content_type, status, seo_title, seo_description, tags
) VALUES (
  'Banyo Gider Kokusu ve Haşereleri Önleyen Duşakabin Sifon Sistemleri',
  'banyo-haşereleri-ve-gider-kokusu-onleme',
  'Banyodan gelen kötü kanalizasyon kokularını ve haşere girişini %100 engelleyen susuz çekvalfli ve klapeli gider sifonları.',
  'Banyolarda sıkça yaşanan rahatsızlıklardan biri duş giderinden gelen kötü kokulardır. Özellikle rüzgarlı havalarda veya binanın havalandırma bacası yetersiz olduğunda kanalizasyon gazı banyoya sızabilir.

### Koku Önleyici Çekvalfli Sifon Teknolojisi
Klasik sulu sifonlarda su kuruduğunda koku engeli ortadan kalkar. ERAYDUŞ duş teknelerinde ve zemin troplarında kullanılan **Kuru Çekvalfli (Klapeli) Sifonlar**:
- Su akarken klape açılır ve su hızla tahliye olur.
- Su akışı bittiğinde yaylı klape veya mıknatıslı kapak tam kapanır.
- Kötü koku, böcek ve haşere geçişini mekanik olarak %100 engeller.

Banyonuzda koku problemini kökten çözmek için [Duşakabin ve Sifon Ürünlerimizi](/dusakabin-modelleri) inceleyebilirsiniz.',
  'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=1600&auto=format&fit=crop',
  '2026-07-06T10:00:00+03:00'::timestamptz,
  'blog',
  'published',
  'Banyo Gider Kokusu Nasıl Önlenir? | ERAYDUŞ Çözümleri',
  'Duş giderinden gelen kötü koku ve haşereler nasıl engellenir? Çekvalfli sifon ve koku önleyici banyo tropları.',
  ARRAY['Gider Kokusu', 'Sifon', 'Banyo Hijyeni', 'Tesisat']::text[]
) ON CONFLICT (slug) WHERE content_type = 'blog' AND slug IS NOT NULL
DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  status = 'published',
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags;

INSERT INTO public.content_calendar (
  title, slug, description, body, featured_image, published_at, content_type, status, seo_title, seo_description, tags
) VALUES (
  'İncek ve Batıkent Villa/Rezidans Banyoları İçin Kabin Önerileri',
  'incek-ve-batikent-konut-banyo-projeleri',
  'Ankara İncek villaları ile Batıkent ve Eryaman yeni konut projelerine özel geniş cam kabin ve siyah profil trendleri.',
  'Ankara''nın hızla gelişen konut akslarından İncek, Batıkent ve Eryaman''daki yeni binalarda geniş ebatlı duş alanları standart hale gelmektedir.

### İncek Villa Projelerinde Öne Çıkanlar:
- **Tavan Boyu Siyah Menteşeli Sistemler:** 220 cm - 250 cm yükseklikte geniş açılır kapılar.
- **Kişiye Özel Çift Girişli Tek Cam Duşakabinler:** Geniş banyolarda ada tipi duş kurulumları.

### Batıkent & Eryaman Dairelerinde Öne Çıkanlar:
- **İki Duvar Arası Sürgülü Siyah Kabinler:** 120 cm - 160 cm aralığındaki niş alanları değerlendiren raylı sistemler.

Ankara genelinde yerinde ölçü ve ücretsiz keşif randevusu almak için [İletişim Formumuzu](/iletisim) doldurun.',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop',
  '2026-07-05T10:00:00+03:00'::timestamptz,
  'blog',
  'published',
  'İncek ve Batıkent Duşakabin Çözümleri | ERAYDUŞ Ankara',
  'İncek villaları ve Batıkent konutları için özel ölçü duşakabin modelleri. Ankara ücretsiz keşif ve hızlı teslimat.',
  ARRAY['Ankara SEO', 'İncek', 'Batıkent', 'Konut Projeleri']::text[]
) ON CONFLICT (slug) WHERE content_type = 'blog' AND slug IS NOT NULL
DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  status = 'published',
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags;

INSERT INTO public.content_calendar (
  title, slug, description, body, featured_image, published_at, content_type, status, seo_title, seo_description, tags
) VALUES (
  'Akordeon Katlanır Duşakabinler: Dar Banyolarda %100 Açılım Özgürlüğü',
  'akordeon-katlanir-dusakabin-faydalari',
  'İçeriye ve dışarıya akordeon şeklinde katlanarak açılan cam kapıların dar banyolara sağladığı geniş hareket alanı.',
  'Banyonuzda duş alanı genişliği 70 cm - 90 cm arasında ise sabit camlı veya sürgülü sistemler giriş açıklığını yarı yarıya daraltır. **Akordeon Katlanır Duşakabinler** ise cam kanatların kendi üzerine kırılarak katlanması ilkesiyle çalışır.

### Katlanır Kabinlerin Avantajları
- **%100 Tam Açılım:** Kapılar duvara sıfır katlandığı için duş alanının tüm genişliğini giriş için kullanabilirsiniz.
- **Engelsiz Kullanım:** Bebek yıkarken veya yaşlı bakımı yaparken büyük rahatlık sağlar.
- **Estetik İnce Profiller:** Özel katlanır pirinç menteşeler ile zarif bir duruş sunar.

Küçük banyonuz için en akılcı çözümü bulmak adına [Katlanır Kabin Modellerimizi](/dusakabin-modelleri) inceleyebilirsiniz.',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1600&auto=format&fit=crop',
  '2026-07-04T10:00:00+03:00'::timestamptz,
  'blog',
  'published',
  'Akordeon Katlanır Duşakabin Modelleri | ERAYDUŞ',
  'Dar banyolar için katlanır cam duşakabin sistemleri. Kendi üzerine kırılarak %100 geniş giriş sağlayan katlanır kabinler.',
  ARRAY['Katlanır Kabin', 'Akordeon Kapı', 'Küçük Banyo', 'Pratik Çözümler']::text[]
) ON CONFLICT (slug) WHERE content_type = 'blog' AND slug IS NOT NULL
DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  status = 'published',
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags;

INSERT INTO public.content_calendar (
  title, slug, description, body, featured_image, published_at, content_type, status, seo_title, seo_description, tags
) VALUES (
  'Duşakabin Silikonu Neden Kararır? Antibakteriyel Silikon Kullanımı',
  'dusakabin-silikonu-kararmasi-nasil-onlenir',
  'Duşakabin kenarlarındaki silikonların siyah küf ve mantar bağlamasının nedenleri, temizleme yöntemleri ve doğru silikon seçimi.',
  'Duşakabin dip noktalarında oluşan siyah küf ve mantar lekelenmeleri hem kötü bir görüntü oluşturur hem de hijyen açısından risk yaratır.

### Silikon Neden Kararır?
Ucuza satılan şeffaf veya beyaz solvent bazlı ucuz silikonlar nemli ortamda bakteri üretir. Sürekli su teması ve sabun artıkları silikonun gözeneklerine işleyerek siyah küf oluşturur.

### Küflenmeyi Önlemek İçin:
1. **%100 Nötr Sanitery Antibakteriyel Silikon Kullanın:** İçeriğinde küf önleyici fungisit maddeler barındıran profesyonel banyo silikonları tercih edilmelidir.
2. **Havalandırma:** Duş sonrasında banyo fanını çalıştırın veya pencereyi açarak nemi tahliye edin.

Sızdırmazlık garantili montaj hizmetlerimiz hakkında detaylı bilgiye [Montaj Rehberimizden](/montaj-kilavuzu) ulaşabilirsiniz.',
  'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=1600&auto=format&fit=crop',
  '2026-07-03T10:00:00+03:00'::timestamptz,
  'blog',
  'published',
  'Duşakabin Silikon Kararması Nasıl Önlenir? | ERAYDUŞ',
  'Duşakabin kenar silikonlarında siyah küf ve kararma neden olur? Antibakteriyel silikon seçimi ve temizlik adımları.',
  ARRAY['Silikon Kararması', 'Küf Önleme', 'Hijyen', 'Banyo Temizliği']::text[]
) ON CONFLICT (slug) WHERE content_type = 'blog' AND slug IS NOT NULL
DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  status = 'published',
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags;

INSERT INTO public.content_calendar (
  title, slug, description, body, featured_image, published_at, content_type, status, seo_title, seo_description, tags
) VALUES (
  'Otel, Rezidans ve Toplu Konut Projeleri İçin Toptan Duşakabin Üretimi',
  'otel-ve-rezidanslar-icin-toptan-dusakabin',
  'Müteahhitler, iç mimarlar ve otel projeleri için yüksek kapasiteli özel ölçü duşakabin imalatı ve toptan tedarik avantajları.',
  'ERAYDUŞ Ankara Siteler''deki modern üretim tesisinde bireysel tüketicilerin yanı sıra otel, rezidans, yurt ve toplu konut projelerine özel toptan duşakabin üretimi gerçekleştirmektedir.

### Proje Kurumsal Avantajlarımız:
- **Yüksek Üretim Kapasitesi:** Aylık 1.000+ adet cam kesim, temperleme ve profil işleme kapasitesi.
- **Özel Şartname Uyumluluğu:** 6mm/8mm temperli cam, özel PVD kaplama ve paslanmaz aksam standartları.
- **Zamanında Şantiye Teslimatı ve Montaj:** Proje takviminize sadık kalarak uzman montaj ekipleriyle hızlı kurulum.

Kurumsal iş ortaklığımız ve bayilik şartları için [Bayi ve Kurumsal Başvuru Sayfamızı](/bayi-basvurusu) ziyaret edin.',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1600&auto=format&fit=crop',
  '2026-07-02T10:00:00+03:00'::timestamptz,
  'blog',
  'published',
  'Toptan Duşakabin İmalatı & Proje Tedariği | ERAYDUŞ Kurumsal',
  'Otel, müteahhit ve inşaat projeleri için toptan duşakabin imalatı. Özel şartnameye uygun yüksek kapasiteli yerli üretim.',
  ARRAY['Kurumsal', 'Toptan Duşakabin', 'Otel Projeleri', 'Müteahhit']::text[]
) ON CONFLICT (slug) WHERE content_type = 'blog' AND slug IS NOT NULL
DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  status = 'published',
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags;

INSERT INTO public.content_calendar (
  title, slug, description, body, featured_image, published_at, content_type, status, seo_title, seo_description, tags
) VALUES (
  'Krom Profil mi Mat Siyah mı? Banyo Armatür Uyum Karşılaştırması',
  'krom-profil-mi-mat-siyah-mi',
  'Klasik parlak krom kaplama ile modern mat siyah elektrostatik profillerin banyo bataryaları ve seramiklerle renk uyumu.',
  'Duşakabin profillerinin rengine karar verirken banyonuzdaki lavabo bataryası, duş seti ve havlupan renkleri belirleyici unsur olmalıdır.

### 1. Parlak Krom Profil Özellikleri
- **Zamansız Klasik:** Zamansızdır, modası asla geçmez.
- **Işıltı ve Yansıma:** Parlak yüzeyi sayesinde ışığı yansıtarak banyoyu aydınlık gösterir.
- **Uyum:** Klasik krom bataryalarla %100 renk eşleşmesi sağlar.

### 2. Mat Siyah Profil Özellikleri
- **Modern ve Endüstriyel:** Son yılların en güçlü mimari trendidir.
- **Kontrast Şıklığı:** Beyaz mermer veya açık gri seramiklerle harika bir zıtlık oluşturur.

Banyonuz için en doğru kombinasyonu seçmek için [Duşakabin Ürünlerimizi](/dusakabin-modelleri) inceleyin.',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&auto=format&fit=crop',
  '2026-07-01T10:00:00+03:00'::timestamptz,
  'blog',
  'published',
  'Krom Profil mi Mat Siyah Duşakabin mi? | ERAYDUŞ',
  'Parlak krom ve mat siyah duşakabin profili karşılaştırması. Banyo bataryaları ile renk uyumu ve dekorasyon tavsiyeleri.',
  ARRAY['Krom Profil', 'Mat Siyah', 'Renk Seçimi', 'Karşılaştırma']::text[]
) ON CONFLICT (slug) WHERE content_type = 'blog' AND slug IS NOT NULL
DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  status = 'published',
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags;

INSERT INTO public.content_calendar (
  title, slug, description, body, featured_image, published_at, content_type, status, seo_title, seo_description, tags
) VALUES (
  'Banyoda Niş ve LED Aydınlatmalı Duşakabin Tasarımları',
  'banyoda-led-aydinlatmali-dusakabin',
  'Duş içi şampuanlık nişlerine entegre su geçirmez IP67 LED şeritler ile büyüleyici bir ambiyans aydınlatması oluşturma rehberi.',
  'Duş deneyimini bir üst seviyeye taşıyan en etkileyici mimari dokunuşlardan biri **Duş İçi Gömme Niş ve Gizli LED Aydınlatmalardır**.

### LED Aydınlatmalı Duş Tasarımında Püf Noktalar:
- **IP67/IP68 Su Geçirmezlik:** Duş alanındaki tüm elektrik armatürleri ve LED şeritler yüksek su geçirmezlik sertifikasına (12V güvenli voltaj) sahip olmalıdır.
- **Gün Işığı ve Amber Tonları:** 3000K sıcak gün ışığı tonları duş sırasında dinlendirici bir spa etkisi yaratır.
- **Cam Konumlandırması:** Şeffaf veya füme cam kabinler LED ışığını kırarak duvara harika bir gölge ve ışık oyunu yansıtır.

Lüks banyo projelerinize özel cam kesimleri için [Tasarım Konfigüratörümüzü](/tasarla) kullanabilirsiniz.',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1600&auto=format&fit=crop',
  '2026-06-30T10:00:00+03:00'::timestamptz,
  'blog',
  'published',
  'LED Aydınlatmalı Duşakabin ve Banyo Niş Tasarımları | ERAYDUŞ',
  'Banyo içi gömme niş ve su geçirmez LED aydınlatmalı duşakabin tasarımları. Evinizde lüks spa ambiyansı oluşturun.',
  ARRAY['LED Aydınlatma', 'Banyo Nişi', 'Spa Ambiyansı', 'Tasarım']::text[]
) ON CONFLICT (slug) WHERE content_type = 'blog' AND slug IS NOT NULL
DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  status = 'published',
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags;

INSERT INTO public.content_calendar (
  title, slug, description, body, featured_image, published_at, content_type, status, seo_title, seo_description, tags
) VALUES (
  'Yaşlı ve Engelli Dostu Duşakabin Tasarımları: Eşiksiz ve Güvenli Banyolar',
  'yasli-ve-engelli-dostu-dusakabinler',
  'Kaydırmaz zemin, tutunma barları, katlanır duş oturağı ve geniş genleşmeli eşiksiz duşakabin güvenlik standartları.',
  'Ev kazalarının büyük bir bölümü kaygan banyo zeminlerinde gerçekleşir. Yaşlı bireyler, hareket kısıtlılığı olanlar ve engelli kullanıcılar için banyo güvenliği ilk sırada gelmelidir.

### Engelsiz Banyo Tasarımının 4 Temel Unsuru:
1. **Eşiksiz ve Basamaksız Giriş:** Ayak takılmasına yol açan duş tekneleri yerine zeminle hemzemin eşiksiz geçiş.
2. **Geniş Açılır veya Katlanır Kapılar:** Tekerlekli sandalye veya yürüteç girişine imkan tanıyan 90 cm ve üzeri temiz geçiş genişliği.
3. **Tutunma Barları ve Katlanır Oturak:** Paslanmaz çelik tutunma barları ve duvara monte katlanabilir duş oturakları.
4. **Lamine Temperli Güvenlik Camı:** Kırılsa bile dağılmayan güvenlik camı kaplaması.

Engelsiz banyo çözümlerimiz hakkında detaylı bilgi için [Müşteri Hizmetlerimizle](/iletisim) görüşebilirsiniz.',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1600&auto=format&fit=crop',
  '2026-06-29T10:00:00+03:00'::timestamptz,
  'blog',
  'published',
  'Yaşlı ve Engelli Dostu Duşakabin Tasarımları | ERAYDUŞ',
  'Engelsiz eşiksiz duşakabin modelleri. Yaşlılar ve engelli bireyler için güvenli, tutunma barlı ve kaydırmaz banyo çözümleri.',
  ARRAY['Engelsiz Banyo', 'Güvenlik', 'Eşiksiz Kabin', 'Ergonomi']::text[]
) ON CONFLICT (slug) WHERE content_type = 'blog' AND slug IS NOT NULL
DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  status = 'published',
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags;

INSERT INTO public.content_calendar (
  title, slug, description, body, featured_image, published_at, content_type, status, seo_title, seo_description, tags
) VALUES (
  'Duşakabin Garanti Kapsamı Neleri İçerir? Erayduş Kalite Güvencesi',
  'dusakabin-garanti-kapsami-ve-servis',
  'Alüminyum profil korozyonu, cam kalitesi, montaj su sızdırmazlığı ve yedek parça temininde Erayduş garanti şartları.',
  'Duşakabin satın alırken ürünün estetiği kadar satış sonrası servis ve garanti desteği de büyük önem taşır. ERAYDUŞ olarak ürettiğimiz tüm duşakabinler standart 2 Yıl Ürün ve Montaj Garantisi altındadır.

### Garanti Kapsamındaki Konular:
- **Alüminyum Profiller:** Paslanma, oksitlenme ve boya dökülmelerine karşı garanti.
- **Rulman ve Menteşeler:** Mekanik kırılma ve fonksiyon kaybına karşı birebir değişim.
- **Montaj Sızdırmazlığı:** Uyguladığımız silikon izolasyonu kaynaklı sızıntılara karşı ücretsiz teknik servis müdahalesi.

Detaylı garanti şartları ve servis prosedürlerimiz için [Garanti Şartları Sayfamızı](/garanti-sartlari) inceleyebilirsiniz.',
  'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1600&auto=format&fit=crop',
  '2026-06-28T10:00:00+03:00'::timestamptz,
  'blog',
  'published',
  'Duşakabin Garanti Kapsamı ve Servis Güvencesi | ERAYDUŞ',
  'Erayduş duşakabin garanti şartları. Profil paslanmazlık, cam güvenliği ve montaj sızdırmazlık garantisi detayları.',
  ARRAY['Garanti', 'Kalite Güvencesi', 'Servis', 'Erayduş']::text[]
) ON CONFLICT (slug) WHERE content_type = 'blog' AND slug IS NOT NULL
DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  status = 'published',
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags;

INSERT INTO public.content_calendar (
  title, slug, description, body, featured_image, published_at, content_type, status, seo_title, seo_description, tags
) VALUES (
  'Kimyasalsız Doğal Banyo Temizliği: Sirke ve Karbonat ile Cam Parlatma',
  'sirke-ve-karbonatla-dogal-banyo-temizligi',
  'Ağır kimyasallar kullanmadan, evdeki elma sirkesi ve karbonat karışımıyla duşakabin camı ve profillerini parlatma tarifi.',
  'Ağır kimyasal içeren banyo temizleyicileri solunum yollarına zarar verebileceği gibi duşakabin profillerinin ve derzlerin yapısını da bozabilir. Evde hazırlayabileceğiniz %100 doğal ve etkili banyo temizleme tarifi:

### Doğal Cam Parlatma Karışımı Tarifi:
- 1 su bardağı elma sirkesi
- 1 su bardağı ılık su
- 1 yemek kaşığı bulaşık deterjanı

**Uygulama:** Karışımı bir sprey şişesine doldurun ve duşakabin camlarına sıkın. 10 dakika beklettikten sonra yumuşak süngerle silip durulayın. Camlarınızın ilk günkü gibi parladığını göreceksiniz.

Daha az temizlik zahmeti için [Nano Kaplamalı Cam Teknolojimizi](/blog/nano-kaplama-nedir) mutlaka inceleyin.',
  'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=1600&auto=format&fit=crop',
  '2026-06-27T10:00:00+03:00'::timestamptz,
  'blog',
  'published',
  'Sirke ve Karbonatla Doğal Banyo Temizliği | ERAYDUŞ',
  'Kimyasalsız doğal duşakabin camı temizliği. Elma sirkesi ve karbonat ile kireç çözme ve parlatma rehberi.',
  ARRAY['Doğal Temizlik', 'Sirke Karbonat', 'Cam Parlatma', 'Ekolojik']::text[]
) ON CONFLICT (slug) WHERE content_type = 'blog' AND slug IS NOT NULL
DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  status = 'published',
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags;

INSERT INTO public.content_calendar (
  title, slug, description, body, featured_image, published_at, content_type, status, seo_title, seo_description, tags
) VALUES (
  'Tavan Boyu Cam Duşakabinler: Buhar Hapsi ve Mimari Şıklık',
  'tavan-boyu-dusakabin-modelleri',
  'Zeminden tavana kadar kesintisiz uzanan tavan boyu cam duşakabinlerin buhar sauna etkisi ve mimari görkemi.',
  'Lüks rezidans ve pent-house banyolarında son dönemin en gözde mimari tercihi **Tavan Boyu Cam Duşakabinlerdir**. Cam panellerin tavana sıfır birleştiği bu sistemler, duş alanını adeta özel bir buhar odasına (sauna) dönüştürür.

### Tavan Boyu Kabinlerin Özellikleri
- **Buhar İzolasyonu:** Sıcak duş sırasında oluşan buhar banyonun geneline yayılmaz, kabin içinde hapsolarak sauna etkisi yaratır.
- **Yüksek Statik Mukavemet:** Tavana özel pirinç aparatlarla bağlanan 8 mm temperli camlar titreşim yapmaz.
- **Dikey Derinlik:** Banyoyu görsel olarak çok daha yüksek ve görkemli gösterir.

Projelerinize özel tavan boyu cam üretimi için [Tasarım Konfigüratörümüzden](/tasarla) ölçülerinizi girebilirsiniz.',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1600&auto=format&fit=crop',
  '2026-06-26T10:00:00+03:00'::timestamptz,
  'blog',
  'published',
  'Tavan Boyu Cam Duşakabin Modelleri | ERAYDUŞ Lüks Tasarım',
  'Zeminden tavana kesintisiz cam duşakabin panelleri. Buhar hapsi sağlayan lüks sauna etkili mimari cam kabinler.',
  ARRAY['Tavan Boyu Cam', 'Lüks Kabin', 'Sauna Etkisi', 'Mimari']::text[]
) ON CONFLICT (slug) WHERE content_type = 'blog' AND slug IS NOT NULL
DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  status = 'published',
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags;

INSERT INTO public.content_calendar (
  title, slug, description, body, featured_image, published_at, content_type, status, seo_title, seo_description, tags
) VALUES (
  '2026 Banyo Yenileme Maliyeti: Duşakabin ve Seramik Bütçe Rehberi',
  'banyo-yenileme-maliyeti-ve-butce-planlama',
  '2026 yılında bir banyoyu yenilerken duşakabin, seramik, tesisat ve işçilik kalemlerinin maliyet dağılımı ve bütçe ipuçları.',
  'Banyo tadilatına başlarken bütçeyi doğru planlamak sürpriz harcamaların önüne geçer. Standart bir banyo yenileme projesinde harcama kalemlerinin ortalama dağılımı şöyledir:

### Banyo Yenileme Bütçe Dağılımı:
1. **Duşakabin ve Cam Sistemleri (%30):** Banyonun odak noktasıdır. Kaliteli bir 6mm/8mm temperli cam kabin uzun ömürlülüğün anahtarıdır.
2. **Seramik ve Zemin Kaplama (%25):** Fayans ve seramik malzeme maliyetleri.
3. **Kırım, Tesisat ve İşçilik (%25):** Su ve gider tesisatının yenilenmesi.
4. **Batarya ve Duş Setleri (%20):** Armatür ve duş başlıkları.

En uygun bütçeyle kaliteli bir duşakabine sahip olmak için [Özel Ölçü Tasarla & Fiyat Al](/tasarla) aracımızla anında fiyat teklifi oluşturabilirsiniz.',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1600&auto=format&fit=crop',
  '2026-06-25T10:00:00+03:00'::timestamptz,
  'blog',
  'published',
  '2026 Banyo Yenileme Maliyeti ve Bütçe Rehberi | ERAYDUŞ',
  '2026 banyo tadilatı maliyetleri ne kadar? Duşakabin, seramik ve tesisat bütçe planlaması ipuçları.',
  ARRAY['Banyo Maliyeti', 'Tadilat', 'Bütçe Planlama', 'Tavsiyeler']::text[]
) ON CONFLICT (slug) WHERE content_type = 'blog' AND slug IS NOT NULL
DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  status = 'published',
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags;

INSERT INTO public.content_calendar (
  title, slug, description, body, featured_image, published_at, content_type, status, seo_title, seo_description, tags
) VALUES (
  'Kare mi Oval mi? Banyonuzun Geometrisine Göre Kabin Seçimi',
  'kare-ve-oval-dusakabin-karsilastirmasi',
  'Kare, dikdörtgen ve oval kavisli duşakabin formlarının banyo yerleşimine ve iç hacim genişliğine etkileri.',
  'Duşakabin kavis ve hat seçimi, banyonuzun genel mimari diliyle doğrudan ilişkilidir.

### 1. Oval (Kavisli) Duşakabinler
- **Yumuşak Geçiş:** Dışa doğru kavisli yapısı sayesinde banyo içinde keskin köşe oluşturmaz, geçiş alanını rahatlatır.
- **Estetik:** Klasik ve zamansız bir görünüme sahiptir.

### 2. Kare ve Dikdörtgen Duşakabinler
- **Maksimum İç Hacim:** Düz cam hatları sayesinde duş alanının iç açısını daraltmaz, ferah bir duş imkanı sunar.
- **Modern Mimari:** Keskin çizgileriyle modern mimari banyoların vazgeçilmezidir.

Banyonuzun geometrisine en uygun seçimi yapmak için [Duşakabin Koleksiyonlarımızı](/koleksiyonlar) inceleyin.',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&auto=format&fit=crop',
  '2026-06-24T10:00:00+03:00'::timestamptz,
  'blog',
  'published',
  'Kare mi Oval Duşakabin mi? Karşılaştırma | ERAYDUŞ',
  'Kare, dikdörtgen ve oval kavisli duşakabin modelleri karşılaştırması. Banyo tipinize göre en ideal form seçimi.',
  ARRAY['Kare Kabin', 'Oval Kabin', 'Form Seçimi', 'Banyo Mimarisi']::text[]
) ON CONFLICT (slug) WHERE content_type = 'blog' AND slug IS NOT NULL
DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  status = 'published',
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags;

INSERT INTO public.content_calendar (
  title, slug, description, body, featured_image, published_at, content_type, status, seo_title, seo_description, tags
) VALUES (
  'Jakuzi ve Hidromasajlı Duş Panelleri: Evinizde SPA Deneyimi',
  'jakuzi-ve-hidromasajli-dus-sistemleri',
  'Su jeti masajı, sırt nozulları ve termostatik bataryalı hidromasaj duş panellerinin sağlığa ve rahatlamaya faydaları.',
  'Günün stresini ve kas yorgunluğunu kendi evinizde atmak hidromasajlı duş sistemleri ile artık çok kolay.

### Hidromasaj Duş Panellerinin Öne Çıkan Faydaları:
- **Kas Gevşetici Su Jetleri:** Sırt ve bel bölgesine basınçlı su püskürten nozullar kan dolaşımını hızlandırır.
- **Termostatik Isı Sabitleme:** Su sıcaklığını sabitleyerek anı haşlanma veya soğuma riskini engeller.
- **Yağmurlama Tepe Duşu:** Geniş tepe duşu ile doğal yağmur etkisi yaratır.

Banyonuzu bir SPA merkezine dönüştüren [Jakuzi ve Hidromasaj Sistemlerimizi](/jakuzi-tekneler) hemen inceleyin.',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1600&auto=format&fit=crop',
  '2026-06-23T10:00:00+03:00'::timestamptz,
  'blog',
  'published',
  'Jakuzi ve Hidromasajlı Duş Sistemleri | ERAYDUŞ SPA',
  'Ev tipi jakuzi ve hidromasaj duş panelleri özellikleri. Su jeti masajı ile evinizde lüks spa deneyimi.',
  ARRAY['Jakuzi', 'Hidromasaj', 'Spa Deneyimi', 'Banyo Lüksü']::text[]
) ON CONFLICT (slug) WHERE content_type = 'blog' AND slug IS NOT NULL
DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  status = 'published',
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags;

INSERT INTO public.content_calendar (
  title, slug, description, body, featured_image, published_at, content_type, status, seo_title, seo_description, tags
) VALUES (
  'Duşakabin Cam Temizleme Aparatları ve Çekçek Seçim İpuçları',
  'dusakabin-cam-temizleme-aparatlari',
  'Camı çizmeden kurulayan silikon bıçaklı profesyonel çekçekler ve mikrofiber temizlik bezlerinin incelemesi.',
  'Duşakabin temizliğini dakikalar içinde tamamlamanın sırrı doğru temizleme araçlarını kullanmaktır.

### En Etkili Temizlik Aparatları:
- **Silikon Bıçaklı Çekçekler:** Kauçuk bıçak yerine silikon bıçaklı çekçekler cam yüzeyde iz bırakmaz ve çizilme yapmaz.
- **Mikrofiber Cam Bezleri:** Tüy ve hav bırakmayan özel dokulu mikrofiber bezler camı kurulamada 1 numaradır.
- **Mikrofiber Teleskopik Saplı Moplar:** Yüksek tavan boyu camların üst kısımlarına rahatça ulaşmanızı sağlar.

Pratik banyo çözümlerimiz ve [Duşakabin Modellerimiz](/dusakabin-modelleri) için sitemizi keşfedin.',
  'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=1600&auto=format&fit=crop',
  '2026-06-22T10:00:00+03:00'::timestamptz,
  'blog',
  'published',
  'Duşakabin Cam Temizleme Aparatları | ERAYDUŞ Pratik Bilgiler',
  'Duşakabin camı çizmeden nasıl kurulanır? Silikon çekçekler ve mikrofiber cam bezi seçim rehberi.',
  ARRAY['Temizlik Aparatı', 'Çekçek', 'Cam Bakımı', 'Pratik İpuçları']::text[]
) ON CONFLICT (slug) WHERE content_type = 'blog' AND slug IS NOT NULL
DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  status = 'published',
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags;

INSERT INTO public.content_calendar (
  title, slug, description, body, featured_image, published_at, content_type, status, seo_title, seo_description, tags
) VALUES (
  'Banyo Yenilemede Seramik ve Kabin Uyumu: Renk ve Doku Önerileri',
  'banyo-yenilemede-seramik-ve-kabin-uyumu',
  'Mermer desenli, ahşap dokulu, beton efektli ve terrazzo seramiklerle duşakabin profillerinin stil uyumu.',
  'Banyo tasarımında görsel bütünlük sağlamanın yolu seramik dokusu ile duşakabin renklerini doğru eşleştirmekten geçer.

### Stil Eşleşme İpuçları:
- **Carrara Mermer Desen Seramik:** Mat Siyah veya PVD Gold profilli şeffaf cam kabinlerle harika bir kontrast oluşturur.
- **Beton Efektli Gri Seramik:** Endüstriyel şıklık için antrasit ve krom profillerle kombinlenmelidir.
- **Ahşap Görünümlü Seramik:** Bronz cam ve antik bronz profiller ile sıcak bir doğallık sunar.

Siz de banyonuzun seramiklerine uygun duşakabini bulmak için [Koleksiyonlarımızı](/koleksiyonlar) keşfedin.',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1600&auto=format&fit=crop',
  '2026-06-21T10:00:00+03:00'::timestamptz,
  'blog',
  'published',
  'Banyo Seramik ve Duşakabin Uyumu | ERAYDUŞ Tasarım',
  'Seramik desenleri ile duşakabin profil renklerinin renk ve doku uyumu. İç mimarlardan stil ipuçları.',
  ARRAY['Seramik Uyumu', 'Banyo Stili', 'Renk Kombini', 'Tasarım']::text[]
) ON CONFLICT (slug) WHERE content_type = 'blog' AND slug IS NOT NULL
DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  status = 'published',
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags;

INSERT INTO public.content_calendar (
  title, slug, description, body, featured_image, published_at, content_type, status, seo_title, seo_description, tags
) VALUES (
  'Duşakabin Alırken Yapılan 5 Kritik Hata ve Kaçınma Yolları',
  'dusakabin-alirken-yapilan-5-kritik-hata',
  'İnce cam seçimi, yanlış ölçü alma, ucuz plastik profil kullanma gibi sıklıkla yapılan 5 hatanın çözümleri.',
  'Duşakabin alırken düşülen yaygın hatalar, kısa sürede su sızıntılarına ve kırılma risklerine yol açabilir.

### En Çok Yapılan 5 Hata:
1. **Temperlenmemiş Standart Cam Kullanmak:** Güvenlik riski oluşturur. Mutlaka TSE garantili temperli cam tercih edin.
2. **Duvar Eğikliğini Göz Ardı Etmek:** Şakül kaçıklığı olan duvarlarda ayarlı dikme profili şarttır.
3. **Plastik Rulman ve Menteşe Seçmek:** 6 ayda kırılır. Paslanmaz pirinç veya rulman çeliği tercih edilmelidir.
4. **Yanlış Kapı Açılım Yönü:** Kapının klozet veya lavaboya çarpması.
5. **Keşifsiz Sipariş Vermek:** Yerinde profesyonel ölçü alınmadan verilen siparişler uyumsuzluk yaratır.

Erayduş uzman ekibiyle riske girmeyin, [Ücretsiz Keşif Hizmetimizden](/iletisim) yararlanın.',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1600&auto=format&fit=crop',
  '2026-06-20T10:00:00+03:00'::timestamptz,
  'blog',
  'published',
  'Duşakabin Alırken Yapılan 5 Kritik Hata | ERAYDUŞ',
  'Duşakabin satın alırken dikkat edilmesi gerekenler. İnce cam, hatalı ölçü ve kalitesiz profil hatalarından kaçınma rehberi.',
  ARRAY['Satın Alma Hataları', 'Tavsiyeler', 'Kalite', 'Rehber']::text[]
) ON CONFLICT (slug) WHERE content_type = 'blog' AND slug IS NOT NULL
DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  status = 'published',
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags;

INSERT INTO public.content_calendar (
  title, slug, description, body, featured_image, published_at, content_type, status, seo_title, seo_description, tags
) VALUES (
  'Mika (Plastik) Duşakabin mi Temperli Cam mı? Hangisi Daha Mantıklı?',
  'mika-dusakabin-mi-temperli-cam-mi',
  'Polistiren mika camlar ile temperli güvenlik camlarının kırılmazlık, sararma, estetik ve fiyat mukayesesi.',
  'Ekonomik banyo çözümlerinde sıklıkla karşılaşılan mika (plastik) kabinler ile modern temperli cam kabinlerin detaylı mukayesesi:

### 1. Mika (Polistiren) Kabinler
- **Artısı:** Esnektir, kırılma riski son derece düşüktür ve fiyatı ekonomiktir.
- **Eksisi:** Zamanla sararır, çizilir, temizliği zordur ve şeffaf lüks görünüm sunamaz.

### 2. Temperli Cam Kabinler
- **Artısı:** Çizilmez, sararmaz, kırılsa dahi emniyetlidir ve banyoya %100 mimari değer katar.
- **Eksisi:** İlk satın alma maliyeti mikaya göre biraz daha yüksektir.

Uzun ömürlü ve estetik bir banyo için [Temperli Cam Duşakabin Modellerimizi](/dusakabin-modelleri) incelemenizi öneririz.',
  'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=1600&auto=format&fit=crop',
  '2026-06-19T10:00:00+03:00'::timestamptz,
  'blog',
  'published',
  'Mika Duşakabin mi Temperli Cam mı? | ERAYDUŞ Karşılaştırma',
  'Mika plastik duşakabin ile temperli cam kabin arasındaki farklar. Sararma, kırılma emniyeti ve fiyat karşılaştırması.',
  ARRAY['Mika Kabin', 'Temperli Cam', 'Karşılaştırma', 'Banyo Çözümleri']::text[]
) ON CONFLICT (slug) WHERE content_type = 'blog' AND slug IS NOT NULL
DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  status = 'published',
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags;

INSERT INTO public.content_calendar (
  title, slug, description, body, featured_image, published_at, content_type, status, seo_title, seo_description, tags
) VALUES (
  'Banyoda Havalandırma ve Nem Kontrolü: Duşakabin Ömrünü Uzatın',
  'banyoda-havalandirma-ve-nem-kontrolu',
  'Yoğuşma, nem ve buharın duşakabin profillerine, silikonlara ve banyo tavanına zararlarını önleyen havalandırma çözümleri.',
  'Sıcak duş sonrası banyoda hapsolan yüksek nem oranı, sadece duşakabin silikonlarında küf yapmakla kalmaz; banyo tavanındaki boyanın dökülmesine ve aynaların kararmasına da yol açar.

### Nem Kontrolü İçin 3 Etkili Yöntem:
1. **Zaman Ayarlı Aksiyel Banyo Fanı:** Işık açıldığında devreye giren ve ışık kapatıldıktan 15 dakika sonrasına kadar çalışmaya devam eden nem sensörlü fanlar.
2. **Duş Sonrası Cam Kurulama:** Nem kaynağını ortadan kaldırmak için çekçek ile suyu süzün.
3. **Pencere Havalandırması:** Dışa açılır pencereniz varsa duş biter bitmez 10 dakika çift açılım konumunda tutun.

Sağlıklı ve konforlu banyo tasarımları için [Blog Yazılarımızı](/blog) takip etmeye devam edin.',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&auto=format&fit=crop',
  '2026-06-18T10:00:00+03:00'::timestamptz,
  'blog',
  'published',
  'Banyoda Nem Kontrolü ve Havalandırma | ERAYDUŞ Bakım',
  'Banyo nemi ve buharı nasıl tahliye edilir? Duşakabin silikon kararması ve küfü önleyen havalandırma ipuçları.',
  ARRAY['Nem Kontrolü', 'Havalandırma', 'Küf Önleme', 'Banyo Sağlığı']::text[]
) ON CONFLICT (slug) WHERE content_type = 'blog' AND slug IS NOT NULL
DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  status = 'published',
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags;

INSERT INTO public.content_calendar (
  title, slug, description, body, featured_image, published_at, content_type, status, seo_title, seo_description, tags
) VALUES (
  'Özel Ölçü Duşakabin Sipariş Süreci Nasıl İşler? Erayduş Deneyimi',
  'ozel-olcu-dusakabin-siparis-sureci',
  'Keşif randevusundan milimetrik üretime, temperlemeden profesyonel montaja kadar adım adım sipariş rehberi.',
  'Standart yapı marketlerde satılan hazır kabinler çoğu zaman evinizin banyo ölçüsüne tam uymaz. ERAYDUŞ''ta tüm duşakabinler banyonuzun milimetrik ölçüsüne özel imal edilir.

### 5 Adımda Sipariş Süreci:
1. **Fiyat Teklifi ve Modellenme:** [Özel Ölçü Tasarla](/tasarla) aracımızla modelinizi seçip tahmini bütçenizi görün.
2. **Ücretsiz Keşif:** Uzman ekibimiz adresinize gelerek duvar şakülünü ve net ölçüyü alır.
3. **Özel Kesim ve Temperleme:** Camlarınız milimetrik kesilerek fırınlanır.
4. **Montaj:** Belirlenen günde adresinizde temiz ve garantili kurulum yapılır.
5. **Teslimat & Garanti:** Ürününüz 2 yıl üretici garantisiyle teslim edilir.

Hemen keşif randevusu almak için [İletişim Formumuzu](/iletisim) doldurun.',
  'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1600&auto=format&fit=crop',
  '2026-06-17T10:00:00+03:00'::timestamptz,
  'blog',
  'published',
  'Özel Ölçü Duşakabin Sipariş Süreci | ERAYDUŞ',
  'Adım adım özel ölçü duşakabin sipariş ve montaj süreci. Yerinde keşif, temperleme ve teslimat detayları.',
  ARRAY['Özel Ölçü', 'Sipariş Süreci', 'Keşif', 'Montaj']::text[]
) ON CONFLICT (slug) WHERE content_type = 'blog' AND slug IS NOT NULL
DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  status = 'published',
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags;

INSERT INTO public.content_calendar (
  title, slug, description, body, featured_image, published_at, content_type, status, seo_title, seo_description, tags
) VALUES (
  'Paslanmaz Çelik Duşakabin Aksesuarları: Korozyona Karşı 304 Kalite Güvencesi',
  'paslanmaz-celik-dusakabin-aksesuarlari',
  'Menteşe, kulp, gergilik ve tutamaklarda 304 kalite paslanmaz çelik kullanımının önemi ve döküm aksam farkları.',
  'Duşakabinin ömrünü belirleyen en kritik unsurlardan biri de kulp, menteşe ve gergi çubuklarının malzeme kalitesidir. Zamanla paslanan ve kırılan ucuz zamak döküm aksesuarlar tüm kabini kullanılamaz hale getirebilir.

### Neden 304 Kalite Paslanmaz Çelik?
- **Paslanmazlık:** Sürekli nem ve su buharına maruz kalan banyo ortamında paslanma veya kararma yapmaz.
- **Yüksek Yük Taşıma:** 8 mm ağır temperli cam panelleri sarkma yapmadan yıllarca güvenle taşır.
- **Hijyenik Yüzey:** Bakteri birikimine izin vermeyen pürüzsüz yüzey dokusu.

ERAYDUŞ menteşeli kabin serilerinde 1. sınıf 304 kalite paslanmaz çelik aksamlar standarttır. Ürün detaylarını [Koleksiyonlar sayfamızda](/koleksiyonlar) görebilirsiniz.',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1600&auto=format&fit=crop',
  '2026-06-16T10:00:00+03:00'::timestamptz,
  'blog',
  'published',
  '304 Kalite Paslanmaz Çelik Duşakabin Aksesuarları | ERAYDUŞ',
  'Duşakabin kulp, menteşe ve gergi çubuklarında 304 paslanmaz çelik kalitesi. Paslanmaz banyo aksamlarının önemi.',
  ARRAY['Paslanmaz Çelik', '304 Kalite', 'Aksesuar', 'Kalite Standardı']::text[]
) ON CONFLICT (slug) WHERE content_type = 'blog' AND slug IS NOT NULL
DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  status = 'published',
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags;

INSERT INTO public.content_calendar (
  title, slug, description, body, featured_image, published_at, content_type, status, seo_title, seo_description, tags
) VALUES (
  'Otel Odası Banyo Tasarımları ve Duşakabin Seçim Kriterleri',
  'otel-odasi-banyo-tasarimlari-ve-kabin-secimi',
  'Butik oteller ve zincir oteller için hızlı temizlenebilir, arıza riski düşük, lüks şeffaf duş kabini mimari standartları.',
  'Otel işletmeciliğinde banyolar müşteri memnuniyetini doğrudan etkileyen alanların başında gelir. Otel odası duşakabin seçiminde 3 altın kriter:

### 1. Hızlı Temizlenebilirlik (Nano Cam)
Kat hizmetleri personelinin zamandan tasarruf etmesi için Nano kaplamalı kireç tutmaz camlar zorunludur.

### 2. Düşük Arıza Riski (Tek Cam veya Menteşe)
Sürgülü rulmanlı sistemler yerine mekanik parçası az olan Tek Cam veya ağır hizmet tipi menteşeli camlar tercih edilir.

### 3. Ses ve Su İzolasyonu
Kapı altı çift suluk fitilleri ile oda içine su taşması engellenir.

Otel projelerinize özel çözümlerimiz için [Bayi ve Kurumsal Sayfamızı](/bayi-basvurusu) ziyaret edebilirsiniz.',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1600&auto=format&fit=crop',
  '2026-06-15T10:00:00+03:00'::timestamptz,
  'blog',
  'published',
  'Otel Banyo Tasarımı ve Duşakabin Seçimi | ERAYDUŞ Kurumsal',
  'Otel ve rezidans banyoları için duşakabin seçim kriterleri. Hızlı temizlik, dayanıklılık ve lüks şeffaf cam standartları.',
  ARRAY['Ostel Banyosu', 'Proje Tasarımı', 'Kurumsal', 'Tek Cam']::text[]
) ON CONFLICT (slug) WHERE content_type = 'blog' AND slug IS NOT NULL
DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  status = 'published',
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags;

INSERT INTO public.content_calendar (
  title, slug, description, body, featured_image, published_at, content_type, status, seo_title, seo_description, tags
) VALUES (
  'Banyo Aydınlatması ve Cam Yansımaları: Doğru Armatür Yerleşimi',
  'banyo-aydinlatmasi-ve-cam-yansimalari',
  'Tavan spotları, ayna üstü aplikler ve duş içi ışıklarının şeffaf ve kumlama camlar üzerindeki yansıma efektleri.',
  'Aydınlatma armatürlerinin banyodaki konumu, duşakabin camlarının görünümünü doğrudan etkiler.

### Doğru Aydınlatma İpuçları:
- **Tavan Spotu Konumu:** Spot ışığını doğrudan duşakabin kapı açılım çizgisine koymak yerine duş alanının merkezine konumlandırın.
- **Kumlama Cam Aydınlatması:** Kumlama mat camların arkasından gelen ışık yumuşak bir difüzör görevi görerek banyoya dinlendirici bir ambiyans katar.
- **Renksel Geriverim (CRI > 90):** Doğal ten renginizi doğru göstermesi için yüksek CRI değerli LED''ler seçin.

Görsel zenginliği yüksek [Koleksiyonlarımızı](/koleksiyonlar) hemen keşfedin.',
  'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=1600&auto=format&fit=crop',
  '2026-06-14T10:00:00+03:00'::timestamptz,
  'blog',
  'published',
  'Banyo Aydınlatması ve Duşakabin Cam Yansımaları | ERAYDUŞ',
  'Banyo aydınlatmasında armatür yerleşimi. Duşakabin cam yansımalarını önleyen ve banyoyu geniş gösteren ışık çözümleri.',
  ARRAY['Aydınlatma', 'Banyo Tasarımı', 'Işık Düzeni', 'Ambiyans']::text[]
) ON CONFLICT (slug) WHERE content_type = 'blog' AND slug IS NOT NULL
DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  status = 'published',
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags;

