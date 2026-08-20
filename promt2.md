Sayfayı inceledim. Şu an `/tasarla` **9 adımlı bir akış** kullanıyor; ilk aşama “Yerleşim” ve altında “İki Duvar Arası / Köşe...” seçenekleri geliyor. Configurator'ın hemen devamında da uzun SEO açıklamaları ve SSS başlıyor. ([eraydus.net][1]) Mobilde sorun bence tasarımın kötü olmasından çok, **masaüstü configurator mantığının telefona küçültülmüş gibi hissettirmesi**.

Ben mobil `/tasarla` sayfasını tamamen farklı davranan, **uygulama gibi çalışan full-screen bir tasarım aracına** dönüştürürdüm. Masaüstündeki yapı korunabilir; mobilde ise preview + bottom sheet + sabit fiyat/ileri butonu kullanırız.

Şöyle düşün:

```text
MOBİL /TASARLA

┌─────────────────────────────┐
│ ←  Tasarla          1 / 9   │
│ ███░░░░░░░░░░░░░░░░░░░     │
├─────────────────────────────┤
│                             │
│                             │
│       DUŞAKABİN 2D           │
│        CANLI ÖNİZLEME         │
│                             │
│                             │
│      [ ↗ Tam Ekran ]         │
├─────────────────────────────┤
│                             │
│ Banyonuzun yerleşimi?       │
│                             │
│ ┌──────────┐ ┌──────────┐   │
│ │   ║  ║   │ │   ╔══    │   │
│ │ 2 Duvar  │ │   Köşe   │   │
│ └──────────┘ └──────────┘   │
│                             │
├─────────────────────────────┤
│  Tahmini Fiyat   12.450 TL  │
│                 [ Devam → ] │
└─────────────────────────────┘
```

En büyük fark şu olacak: kullanıcı telefonda sayfayı aşağı yukarı gezerek configurator kullanmayacak. **Her adım tek bir görev** olacak.

Antigravity'ye bunu ver:

```text
ERAYDUŞ — /tasarla
MOBILE-FIRST PREMIUM SHOWER CONFIGURATOR REDESIGN
NEXT.JS 15 + REACT 19 + TYPESCRIPT
PRODUCTION-READY IMPLEMENTATION

Mevcut:

https://www.eraydus.net/tasarla

sayfasını analiz et ve özellikle MOBILE UX'i tamamen yeniden tasarla.

MEVCUT ÇALIŞAN:

- configurator logic
- 9-step flow
- pricing
- selections
- Supabase data
- product rules
- glass options
- profile options
- dimensions
- live preview
- WhatsApp flow

BOZULMAYACAK.

Ama mevcut mobil arayüzü masaüstünün küçültülmüş hali olarak bırakma.

MOBILE /tasarla deneyimini sıfırdan düşün.

ANA HEDEF:

Telefon kullanıcısı ERAYDUŞ Tasarla aracını bir web formu gibi değil,
premium bir native mobile configurator uygulaması gibi kullanmalı.

REFERENCE EXPERIENCE:

Tesla configurator
Apple product customization
Porsche configurator
modern mobile commerce apps

Ama hiçbirini birebir kopyalama.

ERAYDUŞ'a özel premium bathroom/showroom deneyimi oluştur.

==================================================
1. MOBILE = DIFFERENT EXPERIENCE
==================================================

Desktop ve mobile aynı layout'un responsive versiyonu olmak zorunda değil.

Desktop:

preview + options

split-screen kullanılabilir.

Mobile:

FULL-SCREEN STEP-BY-STEP CONFIGURATOR

olmalı.

Mobile breakpoint altında özel layout oluştur.

==================================================
2. MOBILE VIEWPORT
==================================================

Configurator mümkün olduğunca:

100dvh

deneyimi vermeli.

Mobile kullanıcı configurator kullanırken:

header
preview
step controls
price
CTA

tek viewport içerisinde mümkün olduğunca görünmeli.

Uzun SEO içerikleri configurator'ın arasına girmemeli.

==================================================
3. MOBILE HEADER
==================================================

Mobil configurator header:

┌─────────────────────────────┐
│ ←  Duşakabin Tasarla  1 / 9 │
│ █████░░░░░░░░░░░░░░░░       │
└─────────────────────────────┘

Compact olsun.

İçerik:

Back
Tasarla
Current step
Progress

Normal public navigation configurator sırasında mümkün olduğunca sadeleşebilir.

Kullanıcı tasarım görevine odaklanmalı.

==================================================
4. PROGRESS SYSTEM
==================================================

Mevcut:

1/9

bilgisini geliştir.

Göster:

1 / 9

ve progress bar.

Ayrıca step title:

Yerleşim

Ölçüler

Kapı

Cam

Profil

Desen

Aksesuar

Zemin

Özet

gibi mevcut gerçek configurator step'lerine göre otomatik oluştur.

Mevcut step yapısını analiz et.

Hardcode ederek çalışan sistemi bozma.

==================================================
5. MOBILE LIVE PREVIEW
==================================================

Ekranın üst bölümünü canlı duşakabin preview'ına ayır.

Yaklaşık:

40–48dvh

olabilir.

Preview:

large
centered
clean
high contrast
touch friendly

olmalı.

Preview küçük bir thumbnail gibi görünmemeli.

DUŞAKABİN SAYFANIN KAHRAMANI OLMALI.

==================================================
6. PREVIEW BACKGROUND
==================================================

Preview alanı premium showroom hissi vermeli.

Minimal:

soft warm-white / stone background

veya mevcut ERAYDUŞ design system background kullan.

Preview ile controls birbirinden net ayrılmalı.

Aşırı gradient kullanma.

==================================================
7. FULLSCREEN PREVIEW
==================================================

Preview üzerinde küçük:

[ ↗ ]

veya:

"Tam Ekran"

butonu bulunabilir.

Tıklanınca shower design fullscreen incelenebilmeli.

Pinch zoom gerçekten desteklenebiliyorsa ekle.

Fake zoom button oluşturma.

==================================================
8. DOOR INTERACTION
==================================================

Mevcut sayfada:

"Kapıyı açmak için fareyle üzerine gelin"

metni bulunuyor.

MOBILE'DA FARE YOK.

Bu davranışı düzelt.

Mobile:

"Kapıyı görmek için dokunun"

veya gerçek touch interaction kullan.

Tap:

door open

Tap again:

door close

Desktop hover behavior ayrı kalabilir.

Touch cihazlarında hover dependent UX kullanma.

==================================================
9. MOBILE CONTROL PANEL
==================================================

Preview'ın altında:

BOTTOM CONTROL PANEL

oluştur.

Bu bölüm her step'e göre değişmeli.

Örneğin:

Yerleşim:

Banyonuzun yerleşimini seçin

[ İki Duvar Arası ]

[ Köşe ]

[ Oval ]

==================================================
10. LARGE OPTION CARDS
==================================================

Mobil selection seçenekleri küçük radio button şeklinde olmasın.

Her option:

illustration
title
short explanation
selected state

içeren büyük card olsun.

Minimum touch target:

44x44px

ama cardlar çok daha büyük olabilir.

==================================================
11. VISUAL LAYOUT CARDS
==================================================

Yerleşim seçiminde text-only seçenek kullanma.

Basit architectural line illustrations oluştur.

Örneğin:

İKİ DUVAR ARASI

║     ║
║ ━━━ ║

KÖŞE

║
║━━━━

OVAL

╭────╮
╰────╯

Gerçek cabin geometry seçeneklerine uygun clean SVG illustrations kullan.

==================================================
12. SELECTED STATE
==================================================

Seçili option çok net anlaşılmalı.

Selected:

strong border
check indicator
subtle background

kullan.

Sadece renk değiştirerek selected state oluşturma.

==================================================
13. DIMENSION STEP
==================================================

Ölçü girişi mobile için tamamen optimize edilsin.

Örneğin:

GENİŞLİK

[ − ]   120 cm   [ + ]

ve gerekiyorsa:

numeric input

kullan.

inputMode="numeric"

veya gereken uygun mobile keyboard kullan.

Tiny desktop input kullanma.

==================================================
14. DIMENSION VISUALIZATION
==================================================

Kullanıcı genişliği değiştirdiğinde preview üzerinde:

← 120 cm →

şeklinde gerçek-time dimension indicator gösterilebilir.

Height:

↕ 190 cm

gibi.

Kullanıcı neyi değiştirdiğini görmeli.

==================================================
15. GLASS SELECTION
==================================================

Cam seçimi mobilde visual swatches/cards şeklinde olsun.

Örneğin:

[ Şeffaf ]
visual

[ Füme ]
visual

[ Bronz ]
visual

[ Kumlama ]
visual

Camın gerçek görünümünü mümkün olduğunca preview'da anında güncelle.

==================================================
16. GLASS PATTERN
==================================================

Kumlama desenleri çok fazlaysa 30 seçeneği aynı anda ekrana basma.

Mobile için:

horizontal category filter
+
2-column image grid

kullan.

Seçilen pattern büyük preview'a anında yansısın.

==================================================
17. PROFILE COLOR
==================================================

Profil seçiminde:

visual material swatch

kullan.

Örneğin:

Krom
Siyah
Mat Siyah
Altın
Bronz

gerçek sistemde hangi seçenekler varsa onları kullan.

Fake option ekleme.

==================================================
18. OPTION DETAILS
==================================================

Her option'ın altında uzun açıklamalar kullanma.

Örneğin:

Siyah Profil

Modern mat yüzey

gibi maksimum kısa bilgi.

Detay gerekiyorsa:

ⓘ

ile bottom sheet.

==================================================
19. BOTTOM STICKY BAR
==================================================

MOBILE'DA EN ÖNEMLİ UX ÖĞELERİNDEN BİRİ.

Ekranın altında sürekli:

┌─────────────────────────────┐
│ Tahmini Fiyat               │
│ 12.450 TL       [ Devam → ] │
└─────────────────────────────┘

sticky bottom action bar oluştur.

Fiyat gerçek configurator fiyat engine'inden gelmeli.

==================================================
20. PRICE UPDATE
==================================================

Option değiştiğinde fiyat değişiyorsa:

12.450 TL
↓
13.100 TL

çok kısa subtle transition ile gösterilebilir.

Fiyatın neden değiştiğini kullanıcı isterse görebilmeli.

Fake pricing yok.

==================================================
21. CTA
==================================================

Primary action:

Devam Et

Secondary:

Geri

Geri için gerektiğinde header arrow kullan.

Her adımda bir tane belirgin primary CTA olsun.

Bir ekrana 4 farklı büyük CTA koyma.

==================================================
22. AUTO ADVANCE
==================================================

Basit tek seçimli adımlarda:

option select
↓
300–500ms visual feedback
↓
next step

opsiyonunu değerlendir.

Ancak kullanıcı kontrolünü kaybetmemeli.

Tercihen:

option seçilir
+
Devam

ilk sürüm için daha güvenli olabilir.

Mevcut UX'i analiz ederek karar ver.

==================================================
23. STEP TRANSITIONS
==================================================

Step değişiminde:

subtle horizontal transition

veya:

fade + slight slide

kullan.

Framer Motion varsa mevcut library'yi kullan.

Transition:

180–280ms

arasında hızlı hissettirmeli.

Aşırı animasyon kullanma.

==================================================
24. BACK NAVIGATION
==================================================

Kullanıcı geri geldiğinde önceki seçimleri KAYBETMEMELİ.

State persist etmeli.

Step:

1 → 2 → 3 → back → 2

yapıldığında mevcut selection görünmeli.

==================================================
25. PAGE REFRESH
==================================================

Mümkünse configurator state:

session storage

veya mevcut state persistence architecture

ile kısa süreli korunabilir.

Ancak fiyat/product logic ile stale data problemi oluşturma.

State versioning değerlendir.

==================================================
26. MOBILE SUMMARY DRAWER
==================================================

Desktop'taki olası summary sidebar mobile'da sidebar olarak gösterilmemeli.

Header veya bottom bar üzerinde:

"Seçimlerim"

butonu.

Tıklanınca bottom sheet:

Yerleşim
İki Duvar Arası

Ölçü
120 × 190

Cam
Şeffaf

Profil
Siyah

...

Toplam
12.450 TL

göster.

==================================================
27. FINAL SUMMARY
==================================================

9/9 final ekran çok güçlü olmalı.

Başlık:

Duşakabininiz Hazır

Büyük shower preview.

Altında:

Yerleşim
Ölçü
Cam
Profil
Desen
Aksesuar
Toplam

==================================================
28. FINAL CTA
==================================================

Final primary CTA:

WhatsApp'tan Sipariş / Bilgi Al

Erayduş'un mevcut satış modeline göre doğru wording kullan.

CTA gerçek WhatsApp flow'a bağlanmalı.

==================================================
29. WHATSAPP MESSAGE
==================================================

WhatsApp mesajına configurator seçimini otomatik ekle.

Örneğin:

Merhaba, Erayduş Tasarla aracından oluşturduğum duşakabin hakkında bilgi almak istiyorum.

Model: ...
Yerleşim: İki Duvar Arası
Ölçü: 120 × 190 cm
Cam: Şeffaf
Profil: Siyah
...
Tahmini fiyat: ...

Config/configuration reference ID varsa onu da ekle.

Kullanıcı seçimlerini yeniden yazmak zorunda kalmamalı.

==================================================
30. SHARE CONFIGURATION
==================================================

Mümkünse kullanıcı oluşturduğu tasarımı:

Paylaş

ile link olarak paylaşabilsin.

URL:

/tasarla?config=...

gibi devasa query string kullanmak yerine mevcut architecture'a göre güvenli configuration ID kullanılabilir.

Ancak bu özellik mevcut backend'e gereksiz complexity katıyorsa sonraki aşamaya bırak.

==================================================
31. START SCREEN
==================================================

Mobile kullanıcı /tasarla açtığında doğrudan küçük form göstermek yerine premium giriş ekranı değerlendir.

Örneğin:

DUŞAKABİNİNİ TASARLA

Banyonuzun ölçülerine göre duşakabininizi oluşturun ve fiyatını anında görün.

[ Tasarlamaya Başla ]

Yaklaşık 2 dakika

9 kolay adım

Ancak kullanıcıyı gereksiz splash screen ile yavaşlatma.

İstersen first step doğrudan açık olabilir.

==================================================
32. MOBILE NAVIGATION
==================================================

Configurator içinde normal website mega menu gereksiz alan tüketmemeli.

Mobile configurator focus mode oluştur.

Minimal:

ERAYDUŞ
Close

veya:

Back
Tasarla

header yeterli olabilir.

Exit durumunda:

"Tasarımı bırakmak istiyor musunuz?"

sadece gerçekten state kaybı olacaksa göster.

==================================================
33. KEYBOARD SAFE
==================================================

Dimension input açıldığında sticky CTA keyboard altında kaybolmamalı.

100vh yerine:

100dvh

ve visual viewport davranışlarını dikkate al.

iOS Safari keyboard test et.

Android Chrome test et.

==================================================
34. SAFE AREA
==================================================

iPhone:

env(safe-area-inset-bottom)

dikkate al.

Sticky CTA home indicator üzerine binmemeli.

==================================================
35. SCROLL STRATEGY
==================================================

Nested scrolling minimum olmalı.

Preview ayrı scroll,
options ayrı scroll,
body ayrı scroll

şeklinde 3 farklı scroll alanı oluşturma.

Mümkün olduğunca tek doğal interaction modeli kullan.

==================================================
36. SEO CONTENT
==================================================

Mevcut sayfadaki:

"Özel Ölçü Duşakabin Tasarımı"
"Anında Fiyat Hesaplama"
"Özel Üretim Kalitesi"
"Kumlama ve Cam Seçenekleri"
SSS

gibi SEO içerikleri KORUNACAK.

Ancak configurator'ın mobil UX'ini bölmemeli.

Configurator bittikten sonra normal document flow içinde göster.

==================================================
37. MOBILE SEO CONTENT DESIGN
==================================================

SEO bölümünü mobile'da:

clean typography
short sections
accordions gerektiğinde
FAQ accordion

ile göster.

Configurator kullanırken SEO metni ekrana karışmasın.

==================================================
38. FAQ
==================================================

FAQ gerçek semantic HTML kullanmalı.

JS olmadan temel içerik erişilebilir olmalı.

Schema sadece gerçek FAQ içeriğine uygun şekilde kullanılmalı.

==================================================
39. PERFORMANCE
==================================================

MOBILE PERFORMANCE KRİTİK.

Configurator sayfasını aşırı JavaScript ile doldurma.

Preview renderer'ı optimize et.

Memoization gerektiğinde kullan.

Gereksiz re-render önle.

Heavy assets lazy load.

Ama ilk viewport preview için gerekli assetleri gereksiz lazy load etme.

==================================================
40. NEXT.JS
==================================================

Next.js 15 App Router conventions kullan.

Server Components mümkün olduğunca koru.

Configurator interactive core Client Component olabilir.

Ancak bütün sayfayı gereksiz yere:

"use client"

yapma.

SEO content Server Component kalabilir.

==================================================
41. IMAGE ASSETS
==================================================

next/image kullan.

Doğru:

sizes
width
height
quality

kullan.

Mobile'a desktop resolution asset gönderme.

==================================================
42. 2D PREVIEW PERFORMANCE
==================================================

Mevcut 2D configurator SVG/canvas/DOM architecture'ını analiz et.

Çalışan renderer'ı sırf redesign için yeniden yazma.

Responsive scaling oluştur.

Preview her telefonda doğru aspect ratio korumalı.

==================================================
43. VISUAL POLISH
==================================================

ERAYDUŞ premium showroom identity:

warm architectural neutrals
clean typography
glass-inspired subtle surfaces
high quality shadows
large whitespace

kullan.

Ancak aşırı:

glassmorphism
blur
gradient
neon

kullanma.

Ürün ön planda olmalı.

==================================================
44. TYPOGRAPHY
==================================================

Mobile heading:

24–30px range

Step question:

20–24px

Body:

14–16px

Option:

15–17px

gibi okunabilir ölçek kullan.

Tiny desktop typography kullanma.

==================================================
45. MOBILE CARD GRID
==================================================

Option sayısına göre:

1 column

veya:

2 column

kullan.

3–4 column tiny cards kullanma.

==================================================
46. BOTTOM SHEETS
==================================================

Mobile için:

help
details
summary
option info

gibi secondary content bottom sheet olabilir.

Desktop modal'ını doğrudan mobile'a küçültme.

==================================================
47. FEEDBACK
==================================================

Her selection anında feedback vermeli.

Tap
↓
selected
↓
preview update
↓
price update

Kullanıcı:

"Seçim oldu mu?"

diye düşünmemeli.

==================================================
48. VALIDATION
==================================================

Geçersiz ölçülerde:

red error text

tek başına kullanma.

Örneğin:

Bu model için minimum genişlik 90 cm.

gibi açıklayıcı mesaj göster.

==================================================
49. DISABLED CTA
==================================================

Required selection yapılmadıysa:

Devam

disabled olabilir.

Ama neden disabled olduğu belli olmalı.

==================================================
50. PRICE LOADING
==================================================

Price hesaplanırken:

12.450 TL

yerine fake eski fiyat gösterme.

Small loader:

Fiyat hesaplanıyor...

kullan.

==================================================
51. ERROR RECOVERY
==================================================

Price calculation başarısız:

"Fiyat şu anda hesaplanamadı."

[ Tekrar Dene ]

Configurator selections kaybolmamalı.

==================================================
52. ACCESSIBILITY
==================================================

Touch target ≥ 44px.

Proper labels.

Keyboard accessible desktop.

Screen reader selection announcements.

Color contrast WCAG AA.

Selected state sadece color değil.

==================================================
53. ANALYTICS
==================================================

Mevcut /admin/analytics sistemine gerçek configurator events ekle.

Örneğin:

configurator_started
configurator_step_viewed
configurator_option_selected
configurator_completed
configurator_whatsapp_click

PII KAYDETME.

==================================================
54. ANALYTICS VALUE
==================================================

Böylece admin analytics'te:

Configurator Starts
Completion Rate
Drop-off Step
WhatsApp Conversion

görülebilir.

Örneğin:

Step 1:
100%

Step 2:
82%

Step 3:
76%

Step 4:
48%

Bu değerler gerçek eventlerden gelmeli.

==================================================
55. DO NOT BLOCK UI FOR ANALYTICS
==================================================

Analytics event başarısız olursa configurator çalışmaya devam etmeli.

Tracking primary business flow'u bloklamamalı.

==================================================
56. DESKTOP
==================================================

Desktop deneyimi de iyileştirilebilir.

Desktop:

LEFT / CENTER:
large live shower preview

RIGHT:
configuration controls

Bottom/right:
price + CTA

kullan.

Ancak bu görevin en yüksek önceliği MOBILE.

==================================================
57. TABLET
==================================================

Tablet için ayrı breakpoint davranışı kontrol et.

Mobile'ın büyütülmüş hali veya desktop'ın sıkıştırılmış hali gibi görünmemeli.

==================================================
58. REMOVE MOBILE CLUTTER
==================================================

Mobile first viewport içinde aynı anda:

website header
breadcrumb
H1
paragraph
configurator
sidebar
SEO text
FAQ

göstermeye çalışma.

Öncelik:

CONFIGURATOR.

==================================================
59. NO DEAD UI
==================================================

Her:

button
option
swatch
next
back
fullscreen
summary
WhatsApp CTA

gerçekten çalışmalı.

UI-only implementation kabul edilmez.

==================================================
60. PRESERVE BUSINESS LOGIC
==================================================

Mevcut çalışan fiyat hesaplama business logic'i çok önemli.

UI redesign sırasında:

pricing rules
measurement rules
availability
product relationships
glass prices
profile prices
accessory prices

bozulmamalı.

ÖNCE mevcut implementation'ı analiz et.

SONRA UI katmanını yeniden düzenle.

==================================================
61. MOBILE TEST MATRIX
==================================================

Gerçek responsive test yap:

320px
360px
375px
390px
412px
430px

width.

Test:

iPhone SE size
iPhone modern
large iPhone
Android small
Android large

==================================================
62. TEST FULL FLOW
==================================================

Mobile:

/tasarla

aç.

Step 1 selection.

Devam.

Dimensions.

Glass.

Profile.

Diğer mevcut steps.

Final.

WhatsApp.

Tüm 9 adımı gerçekten tamamla.

Screenshot seviyesinde yalnızca görünümü kontrol edip bırakma.

==================================================
63. TEST BACK
==================================================

Step 7'den Step 4'e dön.

Selections korunmalı.

Fiyat tutarlı kalmalı.

==================================================
64. TEST ROTATION
==================================================

Portrait primary.

Landscape'de layout tamamen bozulmamalı.

==================================================
65. TEST PERFORMANCE
==================================================

Mobile production build test.

Layout shift minimum.

Scroll jank yok.

Option seçiminde noticeable freeze yok.

Preview update smooth.

==================================================
66. FINAL MOBILE UX
==================================================

Mobile /tasarla kullanıcı deneyimi şu hissi vermeli:

OPEN
↓
SEE PRODUCT
↓
CHOOSE
↓
SEE CHANGE
↓
SEE PRICE
↓
NEXT

Her aşamada bu döngü devam etmeli.

Kullanıcı uzun form dolduruyormuş gibi hissetmemeli.

==================================================
67. FINAL STRUCTURE
==================================================

MOBILE:

Compact Header
↓
Progress
↓
Large Live Preview
↓
Current Step Controls
↓
Sticky Price + Next

DESKTOP:

Large Preview
+
Configuration Panel
+
Persistent Price

SEO CONTENT:

Configurator'ın altında.

==================================================
68. ABSOLUTE RULE
==================================================

MEVCUT MOBİL SAYFAYI SADECE CSS İLE KÜÇÜLTME.

MOBILE UX'İ YENİDEN TASARLA.

DESKTOP COMPONENTS'İ ZORLA MOBILE'A SIĞDIRMA.

MOBILE-FIRST CONFIGURATOR EXPERIENCE OLUŞTUR.

Mevcut logic'i koru.

Mevcut fiyat hesaplama sistemini bozma.

Mock data kullanma.

Fake fiyat kullanma.

Fake option kullanma.

Production-ready implementation yap.

TypeScript clean.
ESLint clean.
Build successful.
No console errors.