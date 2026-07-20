import { cache } from "react"
import { createPublicClient } from "@/services/supabase/server"

export type BlogPost = {
  id: string
  title: string
  slug: string
  description: string | null
  body: string | null
  featured_image: string | null
  published_at: string | null
  seo_title: string | null
  seo_description: string | null
  tags: string[] | null
}

export const fallbackBlogPosts: BlogPost[] = [
  {
    id: "6-mm-mi-8-mm-dusakabin",
    title: "6 mm mi 8 mm mi? Duşakabin Cam Kalınlığı Seçim Rehberi",
    slug: "6-mm-mi-8-mm-dusakabin",
    description: "Duşakabin satın alırken en çok kararsız kalınan 6 mm ve 8 mm temperli camlar arasındaki dayanıklılık, ağırlık ve estetik farkları inceleyin.",
    body: `Duşakabin satın alma sürecinde en kritik teknik kararlardan biri cam kalınlığı seçimidir. Piyasada en yaygın tercih edilen 6 mm ve 8 mm temperli emniyet camları, banyonuzun boyutuna ve kullanım sıklığına göre farklı avantajlar sunar.

### 1. 6 mm Temperli Cam Özellikleri
6 mm kalınlığındaki emniyet camları, standart sürgülü ve rulmanlı duşakabin modellerinde sıklıkla kullanılır. 
- **Ağırlık:** 8 mm cama kıyasla %25 daha hafiftir, bu sayede rulman tekerleklerine binen yük azalır.
- **Maliyet:** Fiyat-performans açısından daha ekonomiktir.
- **Kullanım Alanı:** 90x90 cm veya 80x80 cm gibi standart ölçülerdeki ev banyoları için idealdir.

### 2. 8 mm Temperli Cam Özellikleri
8 mm kalınlığındaki camlar, lüks ve profilsiz menteşeli duşakabin modellerinin vazgeçilmezidir.
- **Dayanıklılık:** Darbelere, ısı değişimlerine ve esnemeye karşı üstün direnç gösterir.
- **Mimari Görünüm:** Profilsiz menteşeli sistemlerde rijit bir duruş sağlar, sallanma ve esneme yapmaz.
- **Kullanım Alanı:** Geniş walk-in paneller, tavan boyu cam kabinler ve rezidans/villa projeleri için önerilir.

### Sonuç: Hangisini Seçmelisiniz?
Eğer banyonuzda menteşeli profilsiz bir model veya 120 cm üzeri geniş tek parça cam tercih edecekseniz **8 mm temperli cam** şarttır. Standart kayar kapılı sürgülü bir kabin düşünüyorsanız **6 mm temperli cam** tam performans sağlayacaktır.`,
    featured_image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1600&auto=format&fit=crop",
    published_at: "2026-07-15T10:00:00+03:00",
    seo_title: "6 mm mi 8 mm Duşakabin Camı mı? | ERAYDUŞ",
    seo_description: "6 mm ve 8 mm temperli duşakabin camı arasındaki farklar. Hangisi daha dayanıklı ve kullanışlı? Teknik karşılaştırma rehberi.",
    tags: ["Cam Kalınlığı", "Rehber", "Temperli Cam"],
  },
  {
    id: "nano-kaplama-nedir",
    title: "Nano Kaplama Nedir? Kireç Tutmaz Banyo Cam Teknolojisi",
    slug: "nano-kaplama-nedir",
    description: "Duşakabin camlarında kireç ve su lekesi oluşumunu %90 oranında engelleyen Nano-Shield sıvı cam kaplama teknolojisi nasıl çalışır?",
    body: `Banyo temizliğinde en çok vakit alan konu duşakabin camlarındaki kireç ve sabun kalıntılarıdır. ERAYDUŞ ürünlerinde uygulanan **Nano-Shield Hidrofobik Kaplama**, cam yüzeyindeki mikroskobik gözenekleri kapatarak suyun tutunmasını engeller.

### Nano Kaplama Nasıl Çalışır?
Cam yüzeyi çıplak gözle pürüzsüz görünse de mikroskop altında girintili çıkıntılı bir yapıya sahiptir. Su damlaları bu girintilere yerleşerek kuruduğunda kireç lekesi oluşturur.
Nano kaplama, bu pürüzleri moleküler düzeyde doldurarak **Nilüfer Çiçeği Effect (Lotus Effect)** yaratır. Su damlaları cam yüzeyinden bilye gibi kayarak akar.

### Nano Kaplamanın 4 Büyük Avantajı
1. **Zahmetsiz Temizlik:** Deterjan ve ovma gerektirmeden sadece bir microfiber bezle kurulama yeterlidir.
2. **Kireç ve Mantar Engelleyici:** Küf, bakteri ve kireç birikimini önler.
3. **İlk Günkü Parlaklık:** Camın matlaşmasını ve sararmasını engeller.
4. **Çevre Dostu:** Kimyasal temizleyici kullanımını %80 azaltır.`,
    featured_image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=1600&auto=format&fit=crop",
    published_at: "2026-07-10T10:00:00+03:00",
    seo_title: "Nano Kaplama Cam Nedir? Kireç Tutmaz Teknoloji | ERAYDUŞ",
    seo_description: "Nano kaplamalı duşakabin camı özellikleri. Kireç ve su lekesine son veren hidrofobik cam teknolojisi hakkında her şey.",
    tags: ["Nano Kaplama", "Temizlik", "Teknoloji"],
  },
  {
    id: "altin-profil-kararir-mi",
    title: "Altın Profil Kararır mı? PVD Kaplama Dayanıklılık Analizi",
    slug: "altin-profil-kararir-mi",
    description: "Gold ve altın renkli duşakabin profillerinde kararma, soyulma ve renk değişimi riski var mıdır? PVD titanyum teknolojisini keşfedin.",
    body: `Gold (Altın) renkli armatür ve duşakabin profilleri son yılların en popüler banyo trendlerinden biridir. Ancak kullanıcıların zihnindeki en büyük soru şudur: *'Altın profil zamanla kararır mı?'*

### PVD Kaplama ile Yaş Boya Arasındaki Fark
Sıradan ucuza imal edilen altın profillerde püskürtme yaş boya veya lak kaplama kullanılır. Bu boyalar nemli banyo ortamında ve deterjan temasında 6 ay içinde soyulmaya ve kararmaya başlar.

ERAYDUŞ Gold serisinde ise **PVD (Physical Vapor Deposition)** titanyum buharlaştırma teknolojisi kullanılır:
- Vakumlu yüksek sıcaklık odalarında titanyum atomları alüminyum profile işlenir.
- Kaplama yüzeyin bir parçası haline gelir, üst üste binmiş katman oluşturmaz.
- Çizilmeye, deterjana ve yüksek su sıcaklığına karşı %100 dayanıklıdır.

### Altın Profil Temizliği Nasıl Yapılmalı?
PVD kaplama altın profillerinizi temizlerken çamaşır suyu veya tuz ruhu gibi aşırı asidik kimyasallar yerine nötr sabunlu su kullanılması tavsiye edilir.`,
    featured_image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1600&auto=format&fit=crop",
    published_at: "2026-07-05T10:00:00+03:00",
    seo_title: "Altın Profil Duşakabin Kararır mı? PVD Analizi | ERAYDUŞ",
    seo_description: "Gold altın profil duşakabin modellerinde kararma olur mu? PVD titanyum kaplama kalitesi ve renk dayanıklılığı detayları.",
    tags: ["Gold Profil", "PVD Kaplama", "Kalite"],
  },
  {
    id: "siyah-dusakabin-temizligi",
    title: "Siyah Duşakabin Temizliği ve Bakımı: Lekesiz Görünüm Rehberi",
    slug: "siyah-dusakabin-temizligi",
    description: "Mat siyah profilli ve siyah çerçeveli duşakabinlerin beyaz kireç lekelerinden korunması ve ilk günkü estetiğini koruması için pratik öneriler.",
    body: `Mat siyah duşakabinler banyolara büyüleyici ve modern bir atmosfer katar. Ancak suyun içerisindeki kireç, mat siyah yüzeylerde beyaz lekeler halinde kendini belli edebilir.

### Siyah Duşakabin Bakımında 3 Altın Kural
1. **Asitli Temizleyicilerden Kaçının:** Sirke veya sert kireç çözücüler mat siyah elektrostatik boyanın dokusuna zarar verebilir. Bunun yerine elma sirkesi damlatılmış ılık su veya nötr banyo spreyi tercih edin.
2. **Duş Sonrası Çekçek Kullanımı:** Duş bittikten sonra 30 saniyenizi ayırarak cam ve profillerdeki suyu çekçek ile sıyırmak leke oluşumunu kökten çözer.
3. **Mikrofiber Bez Tercihi:** Çizilmeyi önlemek için sert süngerlerin yeşil kısmını kesinlikle siyah profillere sürmeyin.

ERAYDUŞ elektrostatik fırın boyalı siyah profilleri boya dökülmelerine karşı 10 yıl garantilidir.`,
    featured_image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&auto=format&fit=crop",
    published_at: "2026-06-28T10:00:00+03:00",
    seo_title: "Siyah Duşakabin Temizliği Nasıl Yapılır? | ERAYDUŞ",
    seo_description: "Mat siyah duşakabin profili ve camı nasıl temizlenir? Beyaz kireç lekesini önleyen lekesiz siyah kabin bakım rehberi.",
    tags: ["Mat Siyah", "Temizlik", "Bakım"],
  },
  {
    id: "dusakabin-olculeri-nasil-alinir",
    title: "Adım Adım Duşakabin Ölçüsü Nasıl Alınır? Teknik Rehber",
    slug: "dusakabin-olculeri-nasil-alinir",
    description: "Hatasız duşakabin siparişi için duvar eğiminden seramik payına kadar doğru ölçü alma tekniklerini fotoğraflarla öğrenin.",
    body: `Yanlış alınan duşakabin ölçüsü montaj sırasında su sızıntılarına ve uyumsuzluklara yol açabilir. Kendi ölçünüzü alırken dikkat etmeniz gereken adım adım rehberimiz:

### 1. Duvardan Duvara Net Ölçü (Genişlik)
Metrenizi seramik kaplanmış bitmiş duvardan karşı duvara uzatın. Ölçümü tabandan, ortadan ve tavana yakın yüksekten olmak üzere 3 farklı noktadan alın. En küçük çıkan ölçüyü esas alın (duvarlarda şakül kaçıklığı olabilir).

### 2. Yükseklik Ölçüsü
Duş teknesi veya seramik zeminden yukarıya doğru tavan mesafesini veya istediğiniz kabin yüksekliğini (standart 190 cm - 200 cm) belirleyin.

### 3. Duvar Eğimi (Şakül Kontrolü)
Bir su terazisi yardımıyla duvarlarınızın dikliğini kontrol edin. Duvarınızda içeriye veya dışarıya doğru eğim varsa ayarlı dikme profili tercih edilmelidir.

*Ankara merkez ilçelerinde ERAYDUŞ teknik ekibi adresinize gelerek profesyonel lazer metre ile ücretsiz ölçüm yapmaktadır.*`,
    featured_image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1600&auto=format&fit=crop",
    published_at: "2026-06-20T10:00:00+03:00",
    seo_title: "Duşakabin Ölçüsü Nasıl Alınır? (Fotoğraflı Rehber) | ERAYDUŞ",
    seo_description: "Özel ölçü duşakabin alırken net ölçü alma teknikleri. Duvar eğimi ve seramik payı nasıl hesaplanır?",
    tags: ["Ölçü Alma", "HowTo", "Rehber"],
  },
  {
    id: "banyo-trendleri-2026",
    title: "2026 Banyo Dekorasyon ve Lüks Kabin Trendleri",
    slug: "banyo-trendleri-2026",
    description: "2026 yılında öne çıkan minimalizm, tavan boyu cam paneller, akıllı ısıtmalı camlar ve doğal taş dokulu banyo konseptleri.",
    body: `2026 banyo mimarisinde öne çıkan ana tema: **'Kişisel SPA ve Şeffaf Ferahlık'**. Artık banyolar sadece yıkanma alanı değil, günün yorgunluğunun atıldığı birer arınma mabedi olarak tasarlanıyor.

### 2026'nın En Popüler 5 Banyo Trendi:
1. **Tavan Boyu Kesintisiz Camlar:** 240 cm ve üzeri yükseklikte tavana kadar uzanan şeffaf cam paneller alan derinliğini 2 katına çıkarıyor.
2. **Gizli Su Tahliye & Eşiksiz Zeminler:** Zemin seramiği ile hemzemin duş alanları yaşsız erişilebilirlik ve kesintisiz estetik sağlıyor.
3. **Mat Antrasit ve Rose Gold Profiller:** Siyah ve krom klasikleşirken, bronz ve mat antrasit tonlar mimarların yeni gözdesi.
4. **Kumlama Geometrik Desenler:** Çizgisel ve oluklu (fluted) kumlama camlar gizlilik ve ışık geçirgenliğini mükemmel dengeliyor.
5. **Akıllı Cam (Smart Glass) Entegrasyonu:** Tek bir butonla şeffaf halden buzlu hale geçen opak cam sistemleri lüks villa projelerinde yerini alıyor.`,
    featured_image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1600&auto=format&fit=crop",
    published_at: "2026-06-10T10:00:00+03:00",
    seo_title: "2026 Banyo Dekorasyon ve Kabin Trendleri | ERAYDUŞ",
    seo_description: "2026 banyo tasarım trendleri. Lüks villa ve rezidanslar için yeni nesil duşakabin modelleri ve mimari öneriler.",
    tags: ["Trendler", "2026 Banyo", "Mimari"],
  },
]

const postFields = "id, title, slug, description, body, featured_image, published_at, seo_title, seo_description, tags"

export const getPublishedPosts = cache(async (): Promise<BlogPost[]> => {
  try {
    const supabase = createPublicClient()
    const { data, error } = await supabase.from("content_calendar").select(postFields).eq("content_type", "blog").eq("status", "published").not("slug", "is", null).order("published_at", { ascending: false })
    if (error) throw error
    return data?.length ? (data as BlogPost[]) : fallbackBlogPosts
  } catch (error) {
    console.error("Published blog posts could not be loaded:", error)
    return fallbackBlogPosts
  }
})

export const getPublishedPostBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
  try {
    const supabase = createPublicClient()
    const { data, error } = await supabase.from("content_calendar").select(postFields).eq("content_type", "blog").eq("status", "published").eq("slug", slug).maybeSingle()
    if (error) throw error
    return (data as BlogPost | null) || fallbackBlogPosts.find((post) => post.slug === slug) || null
  } catch (error) {
    console.error("Blog post could not be loaded:", error)
    return fallbackBlogPosts.find((post) => post.slug === slug) || null
  }
})
