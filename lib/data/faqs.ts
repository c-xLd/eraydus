export interface FaqItem {
  q: string
  a: string
}

export interface FaqGroup {
  title: string
  items: FaqItem[]
}

export const faqGroups: FaqGroup[] = [
  {
    title: 'Ürünler & Özel Ölçü İmalat',
    items: [
      {
        q: 'Duşakabinleriniz özel ölçüye göre üretiliyor mu?',
        a: 'Evet. Tüm duşakabin sistemlerimiz banyonuzun net ölçülerine özel olarak Siteler / Ankara fabrikamızda üretilir. Ankara merkez ilçelerinde teknik ekibimiz adresinize gelerek ücretsiz ölçü almaktadır.',
      },
      {
        q: 'Hangi cam kalınlığı ve türlerini kullanıyorsunuz?',
        a: 'Tüm duşakabinlerimizde 6mm temperli emniyet camı kullanılmaktadır. Camlarımız darbelere 5 kat dayanıklıdır. Ürünler sayfamızda sunulan cam türleri: Şeffaf, Füme (Siyah) Cam, Bronz Cam, Aynalı Cam, Kumlama (Buzlu Özel Desenli) ve Buz Mat Cam.',
      },
      {
        q: 'Sipariş öncesi net fiyat teklifi nasıl alabilirim?',
        a: 'Web sitemizdeki 2D Konfigüratörü kullanarak, WhatsApp hattımızdan (0554 883 00 71) ölçü göndererek veya (0312) 350 79 39 numaralı telefonumuzdan ücretsiz net fiyat teklifi alabilirsiniz.',
      },
    ],
  },
  {
    title: 'Teslimat, Keşif & Montaj',
    items: [
      {
        q: 'Ankara içi keşif ve ölçüm ücretli midir?',
        a: 'Hayır, Ankara Çankaya, Çayyolu, İncek, Keçiören, Yenimahalle, Etimesgut, Batıkent ve tüm merkez ilçelerde yerinde ölçüm ve teknik keşif hizmetimiz tamamen ücretsizdir.',
      },
      {
        q: 'İmalat ve montaj süresi ne kadar sürer?',
        a: 'Ölçü onayının ardından 6mm temperli cam kesimi ve profil imalatı ortalama 3-5 iş günü içinde tamamlanır. Kendi uzman ekibimiz adresinizde montajı 1-2 saat içerisinde başarıyla tamamlayıp teslim eder.',
      },
      {
        q: 'Duşakabinde su sızdırma sorunu yaşar mıyım?',
        a: 'Doğru ölçü ve profesyonel montajla su sızıntısı riski en aza indirilir. Mıknatıslı suluk fitilleri, alüminyum su tutucu eşik profilleri ve banyoya uygun silikon uygulamasıyla sızdırmazlık sağlanır.',
      },
    ],
  },
  {
    title: 'Garanti, Servis & Temizlik',
    items: [
      {
        q: 'Ürünleriniz garantili mi ve kapsam şartları nelerdir?',
        a: 'Tüm Erayduş duşakabin modellerimiz 2 yıl üretici garantisi altındadır. İmalat, malzeme ve montaj kaynaklı kusurlar garanti kapsamında giderilir. Sert darbe veya kaza kaynaklı cam kırılmalarında ücretli orijinal parça temini sağlanır.',
      },
      {
        q: 'Siyah ve Gold profillerde zamanla kararma veya soyulma olur mu?',
        a: 'Profillerimizde banyo nemine ve sıcak suya dayanıklı boya ve renk kaplama teknolojileri kullanılır. Doğru temizlik ürünleriyle kullanıldığında renk ve yüzey bütünlüğü uzun süre korunur.',
      },
      {
        q: 'Duşakabin temizliği nasıl yapılmalıdır?',
        a: 'Tuz ruhu veya kezzap gibi asitli ağır kimyasallar yerine ılık sabunlu su ve yumuşak mikrofiber bez kullanılmalıdır. Duş sonrası camları çekçek ile temizlemek kireç lekesi oluşumunu önemli ölçüde azaltır.',
      },
    ],
  },
]

export const allFaqs = faqGroups.flatMap((group) =>
  group.items.map((item) => ({ question: item.q, answer: item.a }))
)
