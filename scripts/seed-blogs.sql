
INSERT INTO blog (title, slug, description, body, featured_image, published_at, seo_title, seo_description, tags, status, language, content_type)
VALUES (
  '6 mm mi 8 mm mi? Duşakabin Cam Kalınlığı Seçimi',
  '6-mm-mi-8-mm-dusakabin',
  'Banyonuz için doğru cam kalınlığını seçmek rulman ömrünü ve kullanım rahatlığını belirler. Gereksiz ağırlıktan kaçınmanın yolları.',
  'Duşakabin siparişi verirken en sık sorulan soru cam kalınlığıdır. "Cam kalın olsun, daha sağlam olur" düşüncesi her zaman doğru değildir. Banyonuzdaki sürgülü sistemler için gereğinden ağır bir cam seçmek, zamanla rulman tekerleklerinin çökmesine ve kapıların sıkışmasına neden olur.

## 6 mm Cam Neden Standart Kabul Ediliyor?
Türkiye genelindeki çoğu ev tipi banyoda sürgülü veya katlanır duşakabinler kullanılır. 6 mm kalınlığındaki rodajlı ve temperli bir cam, ev kullanımı için optimum güvenlik sağlar. 700 derecede ısıl işlemden geçtiği için darbelere karşı son derece dirençlidir. En büyük avantajı, mekanizmaya fazla yük bindirmediği için kapıların yıllarca sessiz ve yumuşak kaymasını sağlamasıdır.

## 8 mm Cam Ne Zaman Gerekli?
Menteşeli (dışarı açılır) kapılarda veya duvardan duvara sabit 120 cm ve üzeri devasa cam panellerde 8 mm kalınlık kullanmak statik açıdan faydalıdır. Kapı çerçevesi olmayan lüks otel tipi duşlarda camın esnememesi için daha tok duran 8 mm tercih edilebilir. Ancak standart sürgülü bir kabinde 8 mm cam kullanmak gereksiz maliyet ve raylar üzerinde lüzumsuz ağırlık yaratır.

Banyonuzun ölçüsü belli ise [Özel Ölçü Tasarlama Robotu](/tasarla) üzerinden 6 mm veya 8 mm cam tercihini kolayca yapabilir, fiyat farkını hemen görebilirsiniz.',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1600&auto=format&fit=crop',
  '2026-08-14T10:00:00+03:00',
  '6 mm mi 8 mm mi? Duşakabin Cam Kalınlığı Nasıl Olmalı?',
  'Duşakabin camı 6 mm mi 8 mm mi olmalı? Banyo duşakabinlerinde cam kalınlığı seçerken dikkat edilmesi gerekenler ve fiyat performans karşılaştırması.',
  ARRAY['Cam Kalınlığı','Rehber','Temperli Cam'],
  'published',
  'tr',
  'blog'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags,
  content_type = EXCLUDED.content_type,
  updated_at = now();

INSERT INTO blog (title, slug, description, body, featured_image, published_at, seo_title, seo_description, tags, status, language, content_type)
VALUES (
  'Duşakabinde Su Lekesine Son: Kireç Tutmaz (Nano) Cam Nedir?',
  'nano-kaplama-nedir',
  'Her duş sonrası oluşan beyaz kireç lekelerinden bıktınız mı? Fabrikasyon kireç önleyici hidrofobik cam teknolojisinin çalışma prensibi.',
  'Cam duşakabin alanların en büyük derdi her duş sonrası oluşan beyaz kireç lekeleridir. Su damlaları camda kuruduğunda geriye çıkarılması zor sabun ve kireç kalıntıları bırakır. Piyasada ''su lekesi tutmaz'' diye satılan birçok sprey, ne yazık ki birkaç yıkamada akıp gider. Gerçek çözüm fabrikasyon nano kaplamadır.

## Kireç Önleyici Cam Nasıl Çalışır?
Cam yüzeyi ne kadar pürüzsüz görünse de mikroskobik düzeyde tırtıklıdır. Su damlaları bu tırtıklara tutunarak kurur. Fabrikamızda uygulanan hidrofobik kireç önleyici kaplama (Nano-Shield), bu mikroskobik gözenekleri doldurarak cam yüzeyini kayganlaştırır. Tıpkı teflon tavada yumurtanın yapışmaması gibi, su damlaları camda tutunamaz ve hızla aşağı kayar.

## Temizlikte Dikkat Edilmesi Gerekenler
Nano kaplamalı camı kireç sökücü, çamaşır suyu veya krem deterjanlarla (örneğin Cif) fırçalamak yapılan en büyük hatadır. Ağır asitler ve aşındırıcılar koruyucu tabakayı yakarak yok eder.
Kireç önleyici camı sadece elma sirkesi damlatılmış nemli bir bezle silmeniz yeterlidir. Duş sonrası çekçek kullanmayı alışkanlık haline getirirseniz, camlarınız yıllarca ilk günkü gibi şeffaf kalır.

Ürün yelpazemizdeki tüm [Duşakabin Modellerinde](/urunler) nano kaplama seçeneğini inceleyebilirsiniz.',
  'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=1600&auto=format&fit=crop',
  '2026-08-13T10:00:00+03:00',
  'Nano Kaplama Cam Nedir? Kireç Tutmayan Duşakabin Camı',
  'Kireç önleyici nano kaplama cam nedir, nasıl çalışır? Duşakabin camlarındaki su lekelerine kalıcı çözüm sağlayan teknoloji.',
  ARRAY['Nano Kaplama','Temizlik','Teknoloji','Cam Bakımı'],
  'published',
  'tr',
  'blog'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags,
  content_type = EXCLUDED.content_type,
  updated_at = now();

INSERT INTO blog (title, slug, description, body, featured_image, published_at, seo_title, seo_description, tags, status, language, content_type)
VALUES (
  'Altın (Gold) Profil Duşakabin Kararır mı? Solmaz Renk Gerçekleri',
  'altin-profil-kararir-mi',
  'Lüks altın profilli kabinlerin buhar ve deterjan karşısında soyulmaması için kullanılan PVD kaplama teknolojisinin detayları.',
  'Gold armatür ve duşakabin çerçeveleri son yılların en lüks banyo trendlerinden biri. Ancak mağazada parlak duran bu altın profiller, 6 ay sonra buhardan ve deterjandan kapkara bir hale gelebilir. Piyasada satılan ucuza boyanmış gold profillerin kararması ve soyulması neredeyse kesindir.

## Sıradan Boya ile PVD Kaplama Arasındaki Fark
Ucuz profiller sprey boya (yaş boya) veya basit sarı vernikle renklendirilir. Banyo gibi nemin %100''e ulaştığı ortamlarda bu boya tabakası hızlıca kabarır. 
ERAYDUŞ üretim hattında ise Titanyum PVD (Physical Vapor Deposition) veya yüksek dereceli elektrostatik kaplama teknolojisi kullanılır. Bu işlemde renk yüzeye sürülmez, doğrudan alüminyumun moleküllerine işlenir. Bu sayede profil, kaynar suya, şampuana ve banyo nemine karşı bağışıklık kazanır.

## Temizlikte Altın Kural
Gold profiller kimyasal kireç sökücülere ve tuz ruhuna dayanamaz. Temizlerken ılık sabunlu su ve yumuşak mikrofiber bez kullanmalısınız. Renk atma veya soyulma yaşamayacağınız kaliteli [Gold Duşakabin Serilerimizi](/urunler) showroomda yakından inceleyebilirsiniz.',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1600&auto=format&fit=crop',
  '2026-08-12T10:00:00+03:00',
  'Altın Gold Profil Duşakabin Kararır mı? Solmaz Kaplama',
  'Altın renkli gold duşakabin profilleri kararır mı veya soyulur mu? Solmaz PVD kaplama teknolojisi ve bakım ipuçları.',
  ARRAY['Gold Profil','Solmaz Kaplama','Kalite','Lüks Banyo'],
  'published',
  'tr',
  'blog'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags,
  content_type = EXCLUDED.content_type,
  updated_at = now();

INSERT INTO blog (title, slug, description, body, featured_image, published_at, seo_title, seo_description, tags, status, language, content_type)
VALUES (
  'Siyah Duşakabin Temizliği: Beyaz Kireç Lekelerinden Kurtulmanın Yolları',
  'siyah-dusakabin-temizligi',
  'Mat siyah duşakabin profillerinde un serpilmiş gibi duran beyaz kireç lekelerinin zarar vermeden, doğal yollarla temizlenmesi.',
  'Mat siyah profiller banyolara müthiş bir endüstriyel şıklık katar. Fakat siyahın bir dezavantajı vardır: Kireç izini hemen belli eder. Banyo sonrası alüminyum çerçevenin üzerinde kalan su kuruduğunda, geriye un serpilmiş gibi beyaz lekeler kalır. Bu lekeleri çıkarmak için sert kimyasallara sarılmak, boyaya yapılabilecek en büyük kötülüktür.

## Siyah Profil Nasıl Temizlenmeli?
Asla sert sünger (süngerlerin yeşil kısmı) kullanmayın. Çizilen mat siyah profilin geri dönüşü yoktur, tamir edilemez. En sağlıklı yöntem bir fısfıs şişesine yarı yarıya su ve elma sirkesi koyarak profil yüzeyine sıkmaktır. 5 dakika bekledikten sonra yumuşak bir bezle silerek tertemiz bir sonuç alabilirsiniz.

## Kesin Çözüm: Duş Çekçeği
Aslında kireçle savaşmanın en ucuz ve en kesin yolu duş bittikten sonra 30 saniye ayırmaktır. Duştan çıkmadan önce camları ve profilleri ufak bir camsil çekçeği ile sıyırın. Su kalmazsa, leke de kalmaz. Kireç derdini düşünmeden gönül rahatlığıyla tercih edebileceğiniz [Mat Siyah Duşakabin Modellerimiz](/urunler) için online sipariş oluşturabilirsiniz.',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&auto=format&fit=crop',
  '2026-08-11T10:00:00+03:00',
  'Siyah Duşakabin Nasıl Temizlenir? Kireç Lekesi Çıkarma',
  'Mat siyah duşakabin profillerindeki beyaz kireç ve su lekesi nasıl temizlenir? Mat siyah profile zarar vermeyen temizlik formülü.',
  ARRAY['Mat Siyah','Temizlik','Bakım','Kireç Önleme'],
  'published',
  'tr',
  'blog'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags,
  content_type = EXCLUDED.content_type,
  updated_at = now();

INSERT INTO blog (title, slug, description, body, featured_image, published_at, seo_title, seo_description, tags, status, language, content_type)
VALUES (
  'Duşakabin Ölçüsü Nasıl Alınır? Montaj Günü Sürpriz Yaşamayın',
  'dusakabin-olculeri-nasil-alinir',
  'Zemin eğimi, duvar yamukluğu ve tesisat paylarını hesaba katarak milimetrik duşakabin ölçüsü almanın püf noktaları.',
  'Duşakabin ölçüsü yanlış alındığında sorun çoğu zaman montaj günü ortaya çıkar. Duvarlar arasındaki birkaç milimetrelik şakül (eğim) farkı bile, sürgülü kapının tam kapanmamasına veya menteşeli kapının lavaboya çarpmasına neden olabilir. Kendi ölçünüzü alırken sadece zeminden ölçmek yetersizdir.

## Adım Adım Doğru Ölçü Alma Tekniği
1. **Duvardan Duvara Genişlik:** Eğer iki duvar arasına kabin yaptıracaksanız metrenizi 3 farklı noktadan çekin: Taban, göbek hizası ve tavan hizası. Duvarlarınız yamuk örülmüş olabilir. Çıkan 3 ölçüden en küçük olanını esas almalısınız.
2. **Duvar Eğimi (Şakül) Kontrolü:** Elinizde bir su terazisi varsa, duvara dayayarak yukarıdan aşağıya doğru dışa bir bombe olup olmadığına bakın. Eğim varsa ''ayarlı dikme profili'' olan sistemler tercih edilmelidir.
3. **Kapı Açılım Yönü Testi:** Banyonuz darsa kapının nereye açılacağını kurgulayın. Dışa açılan bir kapı klozet kapağına çarpıyorsa mecburen sürgülü veya içe katlanır modellerden birini seçmelisiniz.

Ankara sınırları içerisindeyseniz hata payını sıfıra indirmek için [ücretsiz yerinde keşif ve ölçü](/iletisim) hizmetimizden faydalanabilirsiniz.',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1600&auto=format&fit=crop',
  '2026-08-10T10:00:00+03:00',
  'Duşakabin Ölçüsü Nasıl Alınır? Teknik Keşif Rehberi',
  'Duşakabin ölçüsü alırken duvar şakülü nasıl hesaplanır? Duvardan duvara duşakabin ölçüsü alma adımları.',
  ARRAY['Ölçü Alma','Montaj','Teknik Rehber','Banyo Yenileme'],
  'published',
  'tr',
  'blog'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags,
  content_type = EXCLUDED.content_type,
  updated_at = now();

INSERT INTO blog (title, slug, description, body, featured_image, published_at, seo_title, seo_description, tags, status, language, content_type)
VALUES (
  'Küçük Banyolar İçin Duşakabin Modelleri: Yeri Genişleten Çözümler',
  'kucuk-banyolar-icin-dusakabin-modelleri',
  'Dar banyolarda hareket alanını genişletmek için sürgülü, katlanır ve şeffaf camlı minimalist kabin tasarımları.',
  'Küçük banyolar için yanlış seçilen bir duşakabin, içeri girmeyi bile işkenceye dönüştürebilir. Dar bir alanda dışarıya doğru açılan kapı modelini tercih ederseniz, klozet veya lavaboya çarpma sorunu yaşarsınız. Küçük metrekarelerde amaç hem alanı ferah göstermek hem de geçişleri kolaylaştırmaktır.

## 1. Akordeon Katlanır Kapılar
Banyonuzda giriş açıklığı çok kısıtlıysa, içeri veya kendi üzerine kırılan katlanır cam kapılar hayat kurtarır. Kapıyı açtığınızda cam kanatlar üst üste toplanarak %100 tam açılım sağlar ve duş bittikten sonra banyonun kullanılabilir alanını artırır.

## 2. Şeffaf Cam Tercihi
Koyu renk veya desenli kumlama camlar banyonuzu ikiye bölerek kutu gibi görünmesine neden olur. Gözün duvarın sonuna kadar gitmesine izin veren şeffaf 6 mm camlar, banyonuzu olduğundan iki kat daha büyük gösterir.

## 3. Zemin Üstü (Hemzemin) Kurulum
Kalın kenarlı ve yüksek akrilik tekneler yerine, duş alanını zemin seramiğiyle aynı hizada (hemzemin) yapmak mekan bütünlüğü sağlar. Basamaksız bir giriş banyoya modern bir hava katarken mekanı ferahlatır.

Küçük banyonuzun potansiyelini görmek için [Koleksiyonlarımızı](/urunler) inceleyerek en uygun modeli seçebilirsiniz.',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1600&auto=format&fit=crop',
  '2026-08-09T10:00:00+03:00',
  'Küçük Banyolar İçin Duşakabin Modelleri ve Tavsiyeler',
  'Dar banyolarda yer tasarrufu sağlayan katlanır ve sürgülü duşakabin modelleri. Küçük banyoyu geniş gösteren cam tasarımları.',
  ARRAY['Küçük Banyo','Yer Tasarrufu','Duşakabin Modelleri','Rehber'],
  'published',
  'tr',
  'blog'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags,
  content_type = EXCLUDED.content_type,
  updated_at = now();

INSERT INTO blog (title, slug, description, body, featured_image, published_at, seo_title, seo_description, tags, status, language, content_type)
VALUES (
  'Menteşeli mi Sürgülü mü? Banyonuza En Uygun Kapı Sistemini Seçin',
  'menteseli-mi-surgulu-mu-dusakabin',
  'Lüks menteşeli kapıların şıklığı ile raylı sistemlerin pratikliği arasındaki teknik farklar ve mimari tercihler.',
  'Yeni bir duşakabin alırken tasarım kadar kapı mekanizmasının işlevselliği de çok önemlidir. Sürgülü kapılar ile menteşeli (dışa açılır) kapıların kendilerine has avantajları ve kullanım alanları vardır.

## Sürgülü (Rulmanlı) Sistemlerin Avantajları
Sürgülü kapıların en büyük faydası banyo içerisinde sıfır yer kaplamasıdır. Raylar üzerinde hareket eden bu kapılar dar banyolarda klozet veya dolap engeline takılmaz. Ancak rayların içerisinde zamanla saç ve kireç birikmesi yaşanabilir; bu yüzden ara sıra temizlik ve rulman yağlaması gerektirir.

## Menteşeli (Pivot) Sistemlerin Avantajları
Eğer banyonuz genişse ve otel lüksünde bir görünüm arıyorsanız menteşeli modeller tek seçeneğinizdir. Altında ray veya tekerlek olmadığı için temizliği son derece kolaydır; sadece cam ve menteşe vardır. Fakat menteşeli kapılar dışarı veya içeri doğru açıldığı için kapının tarama alanında hiçbir eşya (çamaşır makinesi, lavabo) olmaması gerekir.

Banyonuzun yerleşim planına karar verdiyseniz [Tüm Ürünlerimizi](/urunler) inceleyip hem sürgülü hem de menteşeli tasarımlarımızı görebilirsiniz.',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1600&auto=format&fit=crop',
  '2026-08-08T10:00:00+03:00',
  'Sürgülü Mü Menteşeli Duşakabin Mi? Avantajları Neler?',
  'Menteşeli cam kapılar ile sürgülü rulmanlı kapıların karşılaştırması. Banyonuz için en doğru duşakabin sistemi hangisi?',
  ARRAY['Menteşeli Kabin','Sürgülü Kabin','Kapı Sistemleri','Karşılaştırma'],
  'published',
  'tr',
  'blog'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags,
  content_type = EXCLUDED.content_type,
  updated_at = now();

INSERT INTO blog (title, slug, description, body, featured_image, published_at, seo_title, seo_description, tags, status, language, content_type)
VALUES (
  'Duşakabin Altından Su Sızdırıyor! Kesin Çözüm Yöntemleri',
  'dusakabin-su-sizdirma-sorunu-ve-cozumu',
  'Duş sonrası dışarı taşan suyun sebepleri. Kötü silikon, eskimiş fitil ve yanlış meyil hatalarının profesyonel çözümü.',
  'Duştan çıktıktan sonra banyo zeminine göllenmiş su görmek ev sahiplerinin en nefret ettiği durumlardan biridir. Duşakabinden su sızmasının genelde 3 temel sebebi vardır ve çözümleri oldukça basittir.

## 1. Çatlamış ve Kurumuş Silikon
En yaygın su kaçağı sebebi, profillerin altına çekilen kalitesiz veya eskimiş silikondur. Zamanla çekip kuruyan silikon, köşelerde ufak yarıklar açar ve su buradan seramiklerin üstüne sızar. Çözüm: Eski silikonu maket bıçağıyla kazıyıp, zemini kuruladıktan sonra "antibakteriyel nötr silikon" çekmektir.

## 2. Eskimiş Mıknatıslı Fitiller
Camların arasına takılan mıknatıslı ve balon fitiller zamanla sertleşir, aralıklar oluşur. Camların kapanma noktasından sızan su, doğrudan dışarı akar. Cam kalınlığınıza (örneğin 6 mm) uygun yeni bir fitil takımı alıp eskisini çıkararak takmak sorunu kökten çözer.

## 3. Yanlış Zemin Eğimi
Zemin ustası seramikleri döşerken süzgece (gidere) doğru yeterli eğim vermediyse, su köşelerde birikir ve basınçla dışarı taşar. Kabin altına bir su tutucu (mermer eşik veya alüminyum profil) yapıştırarak suyun yönünü değiştirebilirsiniz.

Kronik sızdırmazlık sorunları yaşıyorsanız ve kabininizi tamamen yenilemek istiyorsanız [Yeni Nesil Modellerimize](/urunler) göz atabilirsiniz.',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1600&auto=format&fit=crop',
  '2026-08-07T10:00:00+03:00',
  'Duşakabin Su Sızdırıyor! Nedenleri ve Kesin Çözümü',
  'Duşakabin altından veya kenarından su kaçırıyor sorununa pratik çözümler. Silikon yenileme ve mıknatıs fitil değişimi.',
  ARRAY['Su Sızdırma','Silikon','Tamir','Bakım'],
  'published',
  'tr',
  'blog'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags,
  content_type = EXCLUDED.content_type,
  updated_at = now();

INSERT INTO blog (title, slug, description, body, featured_image, published_at, seo_title, seo_description, tags, status, language, content_type)
VALUES (
  'Duşakabin Silikonları Neden Kararır? Küf ve Siyah Lekelere Kesin Çözüm',
  'dusakabin-silikonu-kararmasi-nasil-onlenir',
  'Banyodaki nem ve sabun artıkları yüzünden mantar bağlayan silikonların temizlenmesi ve doğru silikon seçimi.',
  'Duşakabin ile seramik arasına çekilen silikonların zamanla simsiyah küf tutması hem kötü kokar hem de banyonuzu kirli gösterir. Aslında bu siyah lekeler basit bir kir değil, neme bayılan mantar (fungus) kolonileridir.

## Silikonlar Neden Siyahlaşır?
Ucuza satılan asetik veya solvent bazlı şeffaf silikonlar, gözenekli bir yapıya sahiptir. Duş aldıktan sonra ortamda kalan nem, vücut yağı ve sabun artıkları bu gözeneklere hapsolur. Sürekli ıslak kalan, yeterince havalandırılmayan banyolarda mantar üremesi kaçınılmazdır.

## Kararmayı Önlemek İçin 2 Kural
1. **Doğru Malzeme (Nötr Silikon):** Montaj sırasında veya eski silikonu yenilerken mutlaka "Sanitery Nötr %100 Silikon" kullanılmalıdır. Bu silikonlar içinde küf önleyici kimyasallar barındırır.
2. **Havalandırma ve Kurutma:** Duştan çıktıktan sonra banyonun kapısını veya havalandırma fanını 10 dakika açık bırakın. Kabin içinde su birikintisi kalmamasına özen gösterin.

Kararmış silikonları temizlemek yerine, tamamen söküp yeniden antibakteriyel silikon çekmek kalıcı çözümdür. Ankara''da ikamet ediyorsanız [İletişim](/iletisim) sayfamızdan servis ve bakım talebinde bulunabilirsiniz.',
  'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=1600&auto=format&fit=crop',
  '2026-08-06T10:00:00+03:00',
  'Duşakabin Silikonu Kararması Neden Olur? Nasıl Temizlenir?',
  'Duşakabin kenarındaki silikonlar neden siyahlaşır ve küflenir? Antibakteriyel silikon seçimi ile banyoda küf önleme yöntemleri.',
  ARRAY['Silikon Kararması','Küf Önleme','Hijyen','Banyo Temizliği'],
  'published',
  'tr',
  'blog'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags,
  content_type = EXCLUDED.content_type,
  updated_at = now();

INSERT INTO blog (title, slug, description, body, featured_image, published_at, seo_title, seo_description, tags, status, language, content_type)
VALUES (
  'Kapısız Ferahlık: Tek Cam (Walk-In) Duş Paneli Nedir?',
  'walk-in-dus-paneli-nedir',
  'Hareketli parçası olmayan, doğrudan seramik üzerine kurulan minimalist ve kapısız tek cam duşakabinlerin mimari avantajları.',
  'Modern, lüks otel tarzı banyolarda sıkça gördüğümüz tek bir cam panelden ibaret duş alanlarına ''Walk-in'' (Tek Cam Duş Paneli) denir. Ortada kayan rulmanlar, sürgülü kapılar veya menteşeler yoktur; sadece duvara sabitlenmiş şeffaf ve kalın bir cam vardır.

## Tek Cam Sistemlerin Avantajları
1. **Sıfır Engelli Giriş:** Herhangi bir eşik veya dar kapıdan geçmek zorunda kalmazsınız. Hemzemin seramik üzerinden doğrudan duşa yürüyerek girersiniz. Bu, özellikle yaşlılar ve hareket kısıtlılığı olanlar için inanılmaz bir rahatlıktır.
2. **Bozulacak Parça Yok:** Ortada tekerlek veya menteşe olmadığı için mekanik bir arıza yaşama ihtimaliniz sıfırdır.
3. **Kusursuz Görünüm ve Temizlik:** Profil köşeleri ve kapı lastikleri bulunmadığından banyoyu ikiye bölmez, ortamı devasa gösterir. Sadece tek bir düz camı temizlemek, dört kapılı bir kabini temizlemekten çok daha kolaydır.

Tek cam paneller, esnemeyi önlemek için genelde 8 mm kalınlığında ve tavana/duvara bağlanan paslanmaz kollar (germe profilleri) ile desteklenir. Eğer banyonuz kapısız bir tasarım için uygun genişlikteyse, lüks projeler için [Tasarım Modellerimizi](/urunler) inceleyebilirsiniz.',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1600&auto=format&fit=crop',
  '2026-08-05T10:00:00+03:00',
  'Tek Cam Duşakabin (Walk In) Nedir? Avantajları Nelerdir?',
  'Kapısız ve profil detayından arınmış minimalist tek cam duş panellerinin özellikleri. Walk-in duş alanı temizliği ve mimari yapısı.',
  ARRAY['Tek Cam','Hemzemin Banyo','Minimalizm','Lüks Tasarım'],
  'published',
  'tr',
  'blog'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags,
  content_type = EXCLUDED.content_type,
  updated_at = now();

INSERT INTO blog (title, slug, description, body, featured_image, published_at, seo_title, seo_description, tags, status, language, content_type)
VALUES (
  'Temperli Cam Neden Patlar? Efsaneler ve Gerçekler',
  'temperli-cam-patlamasi-neden-olur',
  'Durduk yere patlayan duşakabin camlarının arkasındaki bilimsel sebepler. Montaj hataları, köşe darbeleri ve alınması gereken önlemler.',
  'Kamuoyunda "duşakabin camı durduk yere bomba gibi patladı" şeklinde bilinen olay, aslında temperli emniyet camlarının fiziksel doğasından kaynaklanan bir durumdur. Öncelikle şunu bilmelisiniz: Temperli camlar hayat kurtarmak için üretilmiştir.

## Temperli Cam Neden Güvenlidir?
Normal bir cam kırıldığında devasa ve bıçak gibi keskin parçalara ayrılarak ölümcül yaralanmalara sebep olabilir. Temperli cam ise fırınlanıp hızla soğutularak yüzey gerilimi artırılmış camdır. Kırıldığı zaman tavla pulu büyüklüğünde, kesici olmayan binlerce küçük küt parçaya ayrılır.

## Camın Patlamasına Yol Açan 3 Ana Etken
1. **Köşe ve Kenar Hassasiyeti:** Temperli camın en zayıf noktası yüzeyi değil, 4 köşesidir. Montaj sırasında seramiğe sertçe çarpan bir köşe, gözle görülmeyen mikro çatlaklar oluşturur. Bu çatlak aylar sonra camın "durduk yere" patlamasına yol açabilir.
2. **Kasalarda Ayarsızlık:** Sürgülü kapı düzgün teraziye alınmamışsa, her açıp kapamada profile veya metal bir aksama sürtünerek yorulur.
3. **Termal Şok:** Kışın buz gibi soğuk bir banyoya girip, cama aniden 60°C kaynar su tutarsanız, camda termal şok (anlık genleşme) oluşabilir.

Kaliteli ve TSE belgeli emniyet camları kullanan [Tüm Modellerimizi](/urunler) güvenle tercih edebilirsiniz.',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1600&auto=format&fit=crop',
  '2026-08-04T10:00:00+03:00',
  'Temperli Cam Neden Patlar? Duşakabin Camı Kırılması',
  'Duşakabin temperli camı durduk yere neden patlar? Cam kırılmasına yol açan montaj hataları ve güvenlik önlemleri.',
  ARRAY['Temperli Cam','Güvenlik','Emniyet Camı','Teknik'],
  'published',
  'tr',
  'blog'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags,
  content_type = EXCLUDED.content_type,
  updated_at = now();

INSERT INTO blog (title, slug, description, body, featured_image, published_at, seo_title, seo_description, tags, status, language, content_type)
VALUES (
  'Oluklu (Fluted) Cam Duşakabinler: Banyonuza Çizgisel Bir Dokunuş',
  'fluted-oluklu-cam-dusakabin-trendleri',
  'Şeffaf kumlama veya standart desenlere alternatif arayanlar için mimari trend: Mahremiyet sağlayan dikey oluklu fluted cam tasarımları.',
  'İç mimaride son yılların en güçlü trendlerinden biri olan Fluted (Oluklu/Dikey Çizgili) Cam, duşakabin tasarımlarında yepyeni bir dönem başlatıyor. Fransız ve İtalyan banyo mimarisinden ilham alan bu tasarım, düz camların sıkıcılığından kurtulmak isteyenler için mükemmel bir alternatiftir.

## Neden Oluklu Cam Seçmelisiniz?
Standart kumlama (buzlu) camlar ışığı tamamen keserek banyoyu karanlık yapabilir. Ancak fluted camlar, dikey yivleri sayesinde ışığı kırarak içeri alır fakat dışarıdan içerisinin net görünmesini engeller. Böylece hem ferah bir banyoya hem de mükemmel bir mahremiyete sahip olursunuz.

## Su Lekesi Göstermeme Avantajı
Fluted camın bir diğer harika özelliği ise yüzeyindeki dalgalı doku sayesinde su ve kireç damlalarını gizlemesidir. Özellikle siyah veya antik bronz profillerle kombinlendiğinde, ortaya retro-modern, lüks bir spa havası çıkar.

Sıradan bir banyoyu 5 yıldızlı bir otel suitine dönüştürmek isterseniz, [Tasarım Konfigüratörümüzden](/tasarla) oluklu cam seçeneğini değerlendirebilirsiniz.',
  'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=1600&auto=format&fit=crop',
  '2026-08-03T10:00:00+03:00',
  'Fluted (Oluklu) Cam Duşakabin Modelleri ve Özellikleri',
  'Yeni mimari trend fluted oluklu dikey çizgili duşakabin camları. Mahremiyet sağlayan retro tasarım cam seçenekleri.',
  ARRAY['Oluklu Cam','Fluted Glass','Banyo Trendleri','Tasarım'],
  'published',
  'tr',
  'blog'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags,
  content_type = EXCLUDED.content_type,
  updated_at = now();

INSERT INTO blog (title, slug, description, body, featured_image, published_at, seo_title, seo_description, tags, status, language, content_type)
VALUES (
  'Duşakabin Mıknatıslı Suluk Fitili Nasıl Değiştirilir?',
  'miknatisli-fitil-degisimi-ve-bakimi',
  'Sararan, kireçlenen ve su sızdıran kapı fitillerinizi ustaya ihtiyaç duymadan, evde kendiniz nasıl değiştirebilirsiniz?',
  'Duşakabin kapılarının arasından su kaçmasını engelleyen o şeffaf, mıknatıslı ve lastik parçalara ''suluk fitili'' diyoruz. Bu fitiller zamanla şebeke suyunun kirecinden, kullanılan deterjanlardan ve güneş ışığından (UV) dolayı sertleşerek sararır.

## Fitil Değişimi Ustaya Gerek Bırakmaz
Eğer fitilleriniz sarardıysa veya su kaçırıyorsa tüm duşakabini yenilemenize gerek yoktur. Eski fitilleri yukarıdan tutup çekerek camdan kolayca ayırabilirsiniz.

## 3 Adımda Kolay Montaj
1. **Cam Kalınlığınızı Bilin:** Yeni fitil siparişi vermeden önce camınızın 6 mm mi yoksa 8 mm mi olduğunu bir cetvelle ölçün.
2. **Temizlik:** Eski fitili çıkardıktan sonra cam kenarlarında biriken kireci elma sirkesi ve eski bir diş fırçasıyla temizleyip kurulayın.
3. **Kes ve Tak:** Yeni fitilinizi cam boyunuza göre makasla veya maket bıçağıyla kesin. Aşağıdan başlayarak, sertçe bastırarak yukarı doğru cama geçirin.

Yedek parça desteğine ihtiyacınız varsa veya kabininiz artık tamamen yenilenmek istiyorsa [Sıkça Sorulan Sorular](/sss) ve [İletişim](/iletisim) bölümlerimizden destek alabilirsiniz.',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&auto=format&fit=crop',
  '2026-08-02T10:00:00+03:00',
  'Duşakabin Mıknatıs ve Suluk Fitili Nasıl Değiştirilir?',
  'Duşakabin kapı fitilleri neden sararır? Mıknatıslı fitil ve suluk fitil değişimi, montajı için resimli bakım rehberi.',
  ARRAY['Fitil Değişimi','Aksesuar','Kendin Yap','Tamir'],
  'published',
  'tr',
  'blog'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags,
  content_type = EXCLUDED.content_type,
  updated_at = now();

INSERT INTO blog (title, slug, description, body, featured_image, published_at, seo_title, seo_description, tags, status, language, content_type)
VALUES (
  'Duş Teknesi mi Zemin Üzeri Seramik mi? Karar Rehberi',
  'dus-teknesi-mi-zemin-uzeri-seramik-mi',
  'Banyo yenilerken akrilik duş teknesi kullanmak mı daha mantıklı yoksa kabini doğrudan seramik üzerine mi monte etmeli?',
  'Banyo dekorasyonunda en çok sorulan ve kafa karıştıran konulardan biri budur: "Duşakabini bir teknenin üzerine mi oturtmalıyım, yoksa doğrudan zemin seramiğime mi?"

## Akrilik Duş Teknesinin Avantajları
Eski binalarda seramik altı su yalıtımı sorunlu olabilir. Duş teknesi %100 su yalıtımı sağlar; suyu doğrudan kendi sifonuyla gidere ilettiği için alt kata su sızma riskini ortadan kaldırır. Ayrıca kış aylarında ayaklarınızın soğuk seramiğe temas etmesini önleyerek sıcak bir dokunuş sunar.

## Zemin Üzeri (Hemzemin) Kurulumun Avantajları
Modern mimaride banyo zemininin hiçbir basamak olmadan, kesintisiz bir şekilde duşun içine kadar devam etmesi en çok tercih edilen stildir. Basamaksız bir giriş banyoyu çok daha ferah gösterir. Ancak bu sistemi yapabilmek için duş giderinin (süzgeç) meylinin kusursuz olması ve seramik altında kaliteli bir su yalıtımı yapılmış olması şarttır.

Eğer su tesisatınıza güveniyorsanız seramik üstü modern sistemlerimizi, alt katla su sızıntı riski yaşamak istemiyorsanız [Duş Teknesi ve Jakuzi Çözümlerimizi](/jakuzi-tekneler) tercih edebilirsiniz.',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1600&auto=format&fit=crop',
  '2026-08-01T10:00:00+03:00',
  'Duş Teknesi mi Yoksa Zemin Üzeri Seramik mi Seçilmeli?',
  'Duşakabin montajında akrilik tekne kullanımı ve hemzemin zemin üstü kurulumun yalıtım, temizlik, estetik farkları.',
  ARRAY['Duş Teknesi','Zemin Üstü','Seramik','Banyo Yenileme'],
  'published',
  'tr',
  'blog'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags,
  content_type = EXCLUDED.content_type,
  updated_at = now();

INSERT INTO blog (title, slug, description, body, featured_image, published_at, seo_title, seo_description, tags, status, language, content_type)
VALUES (
  'Banyoda Gizlilik: Kumlama Cam Desenleri ve Modelleri',
  'kumlama-cam-desenleri-banyo-gizlilik',
  'Şeffaf duşakabinlerde mahremiyet sağlamak için uygulanan kumlama desen seçenekleri. Şeritli kumlama, tam mat kumlama.',
  'Geniş ve şeffaf cam duşakabinler çok ferah görünse de, kalabalık ailelerde veya otel tarzı açık banyo konseptlerinde mahremiyet (gizlilik) sorunu yaratabilir. Duş alırken tamamen görünür olmayı istemeyenler için en ideal çözüm "Kumlama" (Buzlu Cam) işlemidir.

## Kumlama (Frosted) İşlemi Nedir?
Yüksek basınçlı kumlama makineleriyle camın yüzeyi mikroskobik olarak çizilir ve mat bir doku elde edilir. Bu işlem kesinlikle camın dayanıklılığını veya temper özelliğini bozmaz.

## En Çok Tercih Edilen Kumlama Modelleri
1. **Orta Şerit (Bant) Kumlama:** Sadece omuz hizasından diz hizasına kadar olan bölge kumlama yapılır. Hem dışarıdaki görüntüyü şeffaf bırakarak ferahlığı korur, hem de kritik bölgelerde gizlilik sağlar.
2. **Tam Mat Kumlama:** Maksimum gizlilik isteyenler için camın %100 matlaştırılmasıdır. Arkasındaki kişiyi sadece bir siluet (gölge) olarak gösterir.
3. **Kare ve Çizgisel Kumlama:** Daha modern ve endüstriyel banyolar için ince çizgiler veya damalı desenler şeklinde uygulanan tasarımlardır.

Kişiselleştirilmiş kumlama seçenekleri için [Kumlama Modelleri Kataloğumuzu](/kumlama-modelleri) inceleyerek zevkinize uygun tasarımı belirleyebilirsiniz.',
  'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=1600&auto=format&fit=crop',
  '2026-07-31T10:00:00+03:00',
  'Kumlama ve Buzlu Cam Duşakabin Modelleri',
  'Duşakabinde mahremiyet sağlayan kumlama, şerit kumlama ve tam buzlu cam tasarımları. Temizlik ve estetik özellikleri.',
  ARRAY['Kumlama Cam','Buzlu Cam','Desenler','Mahremiyet'],
  'published',
  'tr',
  'blog'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags,
  content_type = EXCLUDED.content_type,
  updated_at = now();

INSERT INTO blog (title, slug, description, body, featured_image, published_at, seo_title, seo_description, tags, status, language, content_type)
VALUES (
  'Füme (Koyu Renk) Cam Duşakabin Kullanışlı mı?',
  'fume-cam-dusakabin-kullanisli-mi',
  'Lüks ve maskülen banyoların gözdesi siyah/füme renkli temperli camlar. Aydınlatma ihtiyacı ve kireç gösterme potansiyeli.',
  'Maskülen, modern ve son derece gizemli bir banyo atmosferi yaratmak isteyenlerin ilk tercihi Füme (Koyu Gri/Siyah) Camlı Duşakabinler oluyor. Mat siyah profillerle mükemmel bir uyum yakalayan füme camlar lüks hissini zirveye taşır. Peki kullanışlı mıdır?

## 1. Işık Faktörü
Füme camlar yapıları gereği ortam ışığını %40 ila %50 oranında emer. Eğer banyonuz küçük, karanlık veya tek bir ampulle aydınlanıyorsa, füme cam kabinin içini oldukça karanlık bir mağaraya çevirebilir. Bu tarz camları kullanırken kabin içerisine suya dayanıklı bir LED spot aydınlatma yapılması şiddetle tavsiye edilir.

## 2. Kireç Lekesi Gösterir mi?
Ne yazık ki evet. Açık renk (şeffaf) camlara kıyasla füme camlar su ve kireç lekelerini daha belirgin gösterir. Koyu renkli bir aracın toz göstermesiyle aynı mantıktır. Bu yüzden füme cam alırken Nano-Shield (Kireç Önleyici) kaplama yaptırmanız ve duş sonrası çekçek kullanmanız şarttır.

Füme cam ile oluşturabileceğiniz [Mat Siyah ve Krom Kombinasyonlarımızı](/urunler) online mağazamızdan inceleyebilirsiniz.',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1600&auto=format&fit=crop',
  '2026-07-30T10:00:00+03:00',
  'Füme Cam Duşakabin Modelleri Kullanışlı Mı? Lekeler',
  'Siyah ve füme temperli camlı duşakabinler kireç gösterir mi? Banyo ışığına etkisi ve koyu renk cam bakım ipuçları.',
  ARRAY['Füme Cam','Siyah Cam','Banyo Dekorasyonu','İnceleme'],
  'published',
  'tr',
  'blog'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags,
  content_type = EXCLUDED.content_type,
  updated_at = now();

INSERT INTO blog (title, slug, description, body, featured_image, published_at, seo_title, seo_description, tags, status, language, content_type)
VALUES (
  'Kayan Kapınız Takılıyor Mu? Rulman ve Tekerlek Bakımı',
  'dusakabin-rulman-tekerlek-bakimi',
  'Açılıp kapanırken gıcırdayan, raydan çıkan veya zor kayan duşakabin tekerleklerini tamir etme ve yağlama yöntemleri.',
  'İlk aldığınızda yağ gibi kayan duşakabin kapınız, aylar sonra yerinden kıpırdamayan inatçı bir yapıya bürünebilir. Ses yapması, takılması veya raydan çıkması tamamen tekerlek (rulman) mekanizmasındaki bakımsızlıktan kaynaklanır.

## Rulmanlar Neden Bozulur?
Sürgülü sistemlerin içinde bulunan raylarda zamanla saç telleri, sabun köpüğü artıkları ve şebeke suyunun kireci birikir. Bu tabaka kuruduğunda rulmanın dönüşünü engeller. Zorlanarak çalışan rulmanlar zamanla aşınır ve tekerlek raydan çıkar.

## Hayat Kurtaran Bakım Adımları
1. **Ray Temizliği:** Eski bir diş fırçasını sirkeye veya hafif bir kireç çözücüye batırarak kapının hareket ettiği alt ve üst ray kanallarını iyice temizleyin.
2. **Silikon Sprey Mucizesi:** Rulmanları asla sıvı makine yağı, gres veya zeytinyağı ile yağlamayın! Bu tür yağlar toz toplayarak durumu daha kötü yapar. Çözüm, yapı marketlerde satılan ''WD-40 Silikon Sprey'' kullanmaktır. Toz tutmayan bu sprey rulmanların tekrar pürüzsüz dönmesini sağlar.

Eğer tekerlekleriniz tamamen paslanıp kırıldıysa, yedek parça siparişi için [İletişim](/iletisim) sayfamızdan servis talebi açabilirsiniz.',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&auto=format&fit=crop',
  '2026-07-29T10:00:00+03:00',
  'Duşakabin Tekerleği Takılıyor: Rulman Yağlama ve Tamir',
  'Zor kayan sürgülü duşakabin kapısı nasıl tamir edilir? Ray içi kireç temizliği ve rulman tekerlek silikon sprey yağlama.',
  ARRAY['Rulman','Tekerlek Bakımı','Tamir','Sürgülü Kabin'],
  'published',
  'tr',
  'blog'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags,
  content_type = EXCLUDED.content_type,
  updated_at = now();

INSERT INTO blog (title, slug, description, body, featured_image, published_at, seo_title, seo_description, tags, status, language, content_type)
VALUES (
  'Banyodan Gelen Kötü Koku ve Böceklere Son: Çekvalf Sistemleri',
  'banyo-hasereleri-ve-gider-kokusu-onleme',
  'Duş giderinden gelen kanalizasyon kokularını ve gümüş böceği gibi haşereleri %100 mekanik olarak engelleyen koku önleyici sistemler.',
  'Tertemiz yaptığınız banyoda duş kabininin süzgecinden ağır bir lağım/kanalizasyon kokusu veya banyo haşereleri geliyorsa, sorun temizliğinizde değil gider tesisatınızın sifon sistemindedir.

## Kötü Koku Neden Olur?
Klasik banyo ve duş süzgeçlerinde "Sulu Sistem" kullanılır. Giderin içinde bir miktar su kalarak alttan gelen kokuya bariyer oluşturur. Ancak duşu birkaç gün kullanmadığınızda veya ortam sıcaksa, sifon içindeki bu su buharlaşır ve kanalizasyon gazı doğrudan banyonuza dolar.

## Kesin Çözüm: Kuru Çekvalf ve Klape
ERAYDUŞ üretim hattındaki duş teknelerinde ve zemin troplarında koku önleyici ''Kuru Çekvalf'' (Mekanik Klape) sistemleri standarttır. Bu sistem suyu tahliye ederken suyun ağırlığıyla kapağı aşağı doğru açar. Su bittiği anda altındaki yay veya ağırlık sistemiyle tık diye geri kapanır. Böylece borudan banyonuza doğru koku, rüzgar sesi ve haşere girişi fiziksel (mekanik) olarak %100 engellenir.

Yeni bir banyo yaptırırken mutlaka koku önleyicili sifon kullanılmasına dikkat edin. Tesisat sorunları çekmeden kurdurabileceğiniz [Duş Teknesi Seçeneklerimiz](/jakuzi-tekneler) için sayfamızı ziyaret edin.',
  'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1600&auto=format&fit=crop',
  '2026-07-28T10:00:00+03:00',
  'Banyo Gider Kokusu Nasıl Giderilir? Çekvalfli Sifonlar',
  'Duşakabin süzgecinden ve giderden gelen kötü kokular, lağım kokusu ve böcekler çekvalfli sifon ile nasıl önlenir.',
  ARRAY['Gider Kokusu','Sifon','Banyo Hijyeni','Tesisat'],
  'published',
  'tr',
  'blog'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags,
  content_type = EXCLUDED.content_type,
  updated_at = now();

INSERT INTO blog (title, slug, description, body, featured_image, published_at, seo_title, seo_description, tags, status, language, content_type)
VALUES (
  'Banyolarda Sıcak Tonlar: Bronz Cam ve Antik Bronz Profil Uyumu',
  'bronz-cam-ve-antik-bronz-profil',
  'Klasik soğuk banyolardan sıkılanlar için ahşap ve doğal taşla mükemmel uyum sağlayan bronz konsept duşakabin tasarımları.',
  'Yıllarca banyolarda soğuk, parlak beyaz seramikler ve parlak krom profiller gördük. Artık iç mimari dünyası doğaya, ahşaba ve sıcak tonlara geri dönüyor. Bu değişimin duşakabin dünyasındaki en lüks yansıması ise Bronz Temperli Cam ve Antik Bronz (Eskitme Sarı) profillerdir.

## Hangi Banyo Stilleriyle Uyumludur?
Eğer banyonuzda bej, toprak tonları, mermer dokulu seramikler veya ceviz, meşe gibi ahşap desenli banyo dolapları kullandıysanız, şeffaf krom bir duşakabin oraya sırıtabilir. Ancak karamel-kahve yansımalara sahip bronz camlı bir kabin, bu sıcak tonlara tam olarak oturur ve mekana bir SPA hissiyatı katar.

## Antik Bronz Kaplama Kalitesi
Antik bronz (eskitme) profillerimiz standart elektrostatik boyama değil, uzun ömürlü asitle eskitme ve fırçalama teknikleriyle elde edilir. Klasik ve Neo-Klasik banyolarda, eskitme bataryalarınızla (musluklarınızla) muhteşem bir takım oluşturur.

Hayalinizdeki otantik veya lüks tasarımı canlandırmak için [Tasarım Konfigüratörümüz](/tasarla) üzerinden bronz renk seçeneklerini deneyebilirsiniz.',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1600&auto=format&fit=crop',
  '2026-07-27T10:00:00+03:00',
  'Bronz Cam Duşakabin ve Antik Eskitme Profil Uyumu',
  'Sıcak banyo dekorasyonu arayanlara özel bronz renkli temperli cam ve antik eskitme bronz profil duşakabin modelleri.',
  ARRAY['Bronz Cam','Antik Bronz','Sıcak Tonlar','Tasarım'],
  'published',
  'tr',
  'blog'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags,
  content_type = EXCLUDED.content_type,
  updated_at = now();

INSERT INTO blog (title, slug, description, body, featured_image, published_at, seo_title, seo_description, tags, status, language, content_type)
VALUES (
  'Dar Alanlara Özgürlük: Katlanır (Akordeon) Cam Kabinler',
  'akordeon-katlanir-dusakabin-faydalari',
  'Klozet, çamaşır makinesi veya lavabonun duş alanını daralttığı zor banyolarda hayat kurtaran içe kırılır katlanır kapı sistemleri.',
  'Bazı banyolar o kadar dardır ki; duş alanının hemen önüne konan klozet veya çamaşır makinesi, kabin kapısının açılmasını imkansız hale getirir. Sabit kanatlı sürgülü kapılar yaptırsanız, giriş mesafesi (kapı açıklığı) 35-40 cm gibi gülünç bir rakama düşer. İşte bu noktada Katlanır (Akordeon) Duşakabinler kurtarıcıdır.

## Tam Açılım Avantajı (%100 Özgürlük)
Katlanır kapılar, birbirine özel pirinç menteşelerle bağlı iki veya daha fazla cam kanattan oluşur. Kapıyı ittiğinizde, camlar kendi üzerine akordeon körüğü gibi kırılarak duvar dibine toplanır.
Eğer duş alanınızın genişliği 80 cm ise, kapıyı açtığınızda içeri girmek için yine 80 cm boşluğunuz olur. Sürgülü sistemlerde bu alan yarı yarıya (40 cm) düşerdi.

## Bebek Yıkama ve Yaşlı Bakımında Kolaylık
Kapı duvara tam katlandığında duş alanı adeta açık bir platforma dönüşür. Bu sayede duş teknesi içerisine bebek küveti yerleştirmek veya banyo taburesinde oturan yaşlı bir bireye yardımcı olmak çok kolaylaşır.

Dar banyonuz için en akılcı çözümü bulmak isterseniz, [Katlanır Cam Modellerimiz](/urunler) üzerinden ölçülerinize uygun üretim talebinde bulunabilirsiniz.',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1600&auto=format&fit=crop',
  '2026-07-26T10:00:00+03:00',
  'Katlanır Duşakabin (Akordeon Kapı) Avantajları',
  'Dar banyolarda %100 tam açılım sağlayan, içeri veya dışarı katlanır akordeon cam duşakabin sistemlerinin özellikleri.',
  ARRAY['Katlanır Kabin','Akordeon Kapı','Küçük Banyo','Pratik Çözümler'],
  'published',
  'tr',
  'blog'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  featured_image = EXCLUDED.featured_image,
  published_at = EXCLUDED.published_at,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  tags = EXCLUDED.tags,
  content_type = EXCLUDED.content_type,
  updated_at = now();