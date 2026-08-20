Görseldeki topbar mantığı **WordPress admin bar + modern SaaS control bar** karışımı. Erayduş için oldukça uygun; ama görseldeki haliyle kopyalamak yerine daha premium, daha işlevsel ve senin gerçek sistemlerine bağlı hale getirmek gerekir.

Görselde yaklaşık **46 px yüksekliğinde**, koyu arka planlı sabit bir bar var. Solda marka/admin paneli, ardından `Yeni Ekle`, cache temizleme, Performance ve SEO durumu; sağda ise **hangi sayfada olduğun**, düzenleme aksiyonu ve admin hesabı bulunuyor. Ben Erayduş'ta `Performance: 10` / `SEO: 0` gibi sürekli görünen sert rakamları biraz daha şık kullanırdım ve en önemlisi **gerçek veriye bağlardım**.

Antigravity'ye aşağıdaki promptu ver:

```text
ERAYDUŞ — FRONTEND ADMIN TOPBAR
PREMIUM WORDPRESS-STYLE LIVE SITE MANAGEMENT BAR
PRODUCTION-READY IMPLEMENTATION

Referans görseldeki koyu admin topbar mantığını ERAYDUŞ web sitesi için yeniden tasarla.

AMA:

Referans tasarımı birebir kopyalama.

ERAYDUŞ markasına uygun:

- daha premium
- daha temiz
- daha modern
- daha fonksiyonel
- daha minimal
- daha profesyonel

bir frontend admin toolbar oluştur.

Bu toolbar:

/admin paneli içinde kullanılan normal admin header DEĞİL.

Bu toolbar sadece yetkili admin kullanıcı public ERAYDUŞ web sitesini görüntülerken görünmeli.

Örneğin admin giriş yaptıktan sonra:

https://www.eraydus.net/

veya:

https://www.eraydus.net/urunler/...

sayfalarına girdiğinde üst tarafta görünmeli.

Normal ziyaretçiler bu toolbar'ın:

HTML'ini
JavaScript'ini
CSS'ini
verilerini

gereksiz yere almamalı.

==================================================
1. ANA TASARIM
==================================================

Topbar:

position: fixed

top: 0

width: 100%

height:

44px – 48px

arasında olabilir.

Desktop için yaklaşık:

46px

tercih et.

z-index çok yüksek olmalı.

Site navbarının üzerinde bulunmalı.

Arka plan:

çok koyu charcoal / graphite

örneğin ERAYDUŞ admin design system içindeki mevcut dark surface tokenlarını kullan.

Hardcoded renk kullanmak yerine mevcut design tokens kullan.

Visual style:

Premium
Minimal
Architectural
Modern SaaS
Professional
Compact

WordPress admin bar hissi olabilir ancak daha modern görünmeli.

==================================================
2. LAYOUT
==================================================

Toolbar iki ana gruba ayrılmalı:

LEFT SIDE

ERAYDUŞ Yönetim
Yeni Ekle
Cache
Performance
SEO
System status gerektiğinde

RIGHT SIDE

Current Page
Edit
Preview / Admin navigation gerektiğinde
Admin Profile

Yaklaşık yapı:

[ ERAYDUŞ Yönetim ]

|

[ + Yeni Ekle ▾ ]

[ ↻ Önbellek ]

|

[ ⚡ Performance 96 ]

[ Search icon SEO 91 ]

---------------------------------------------

Sayfa:
Anasayfa

[ Düzenle ]

|

[ Admin Avatar ▾ ]

==================================================
3. ERAYDUŞ YÖNETİM
==================================================

Sol tarafta:

ERAYDUŞ Yönetim

bulunsun.

Icon:

minimal dashboard/grid icon.

Tıklandığında:

/admin/dashboard

sayfasına gitmeli.

Hover sırasında:

"Yönetim Paneline Git"

tooltip gösterilebilir.

Toolbar içinde büyük logo kullanma.

Compact text + icon yeterli.

==================================================
4. YENİ EKLE
==================================================

Referanstaki:

+ Yeni Ekle

mantığını geliştir.

Tıklandığında dropdown açılmalı.

Dropdown seçenekleri mevcut ERAYDUŞ sistemine göre dinamik olsun.

Örneğin:

Ürün
Kategori
Blog Yazısı
Sayfa

Eğer Collections sistemi aktif olarak kullanılıyorsa:

Koleksiyon

eklenebilir.

GEREKSİZ MENÜ EKLEME.

Customers ve Quotes kaldırıldığı için:

Customer
Quote
Lead

gibi seçenekler oluşturma.

==================================================
5. YENİ EKLE DROPDOWN DESIGN
==================================================

Dropdown referanstaki gibi sade ama daha premium olsun.

Örnek:

┌─────────────────────────┐
│ HIZLI OLUŞTUR           │
│                         │
│ □  Yeni Ürün             │
│ ▱  Yeni Blog Yazısı      │
│ ◇  Yeni Kategori         │
│ ▤  Yeni Sayfa            │
└─────────────────────────┘

Her item:

icon
label
optional keyboard shortcut

içerebilir.

Dropdown:

accessible
keyboard navigable
click outside close
ESC close

olmalı.

==================================================
6. ROLE / PERMISSION
==================================================

Yeni Ekle seçenekleri kullanıcı yetkisine göre görünmeli.

Örneğin:

EDITOR:

Product / Blog oluşturabilir.

SEO_MANAGER:

Yeni ürün oluşturamıyorsa seçenek görünmemeli.

Ancak:

Sadece frontend'de gizlemek authorization değildir.

Route/action tarafında gerçek permission kontrolü yapılmalı.

==================================================
7. CACHE CONTROL
==================================================

Referanstaki:

Önbelleği Temizle

özelliğini daha profesyonel yap.

Toolbar'da:

↻ Cache

veya:

↻ Önbellek

gösterilebilir.

Tıklandığında küçük dropdown:

Current Page
Products
SEO
Entire Site

gibi seçenekler olabilir.

ANCAK sadece mevcut sistem gerçekten destekliyorsa göster.

==================================================
8. CACHE GERÇEKTEN ÇALIŞMALI
==================================================

Cache button sadece animasyon yapmamalı.

Next.js 15 mimarisine göre mevcut caching sistemini analiz et.

Gerekirse:

revalidatePath()

revalidateTag()

ve mevcut proje cache architecture'ını kullan.

Örneğin admin ürün değiştirdiğinde:

product tag

revalidate edilebilir.

Current Page seçilirse:

mevcut path

revalidate edilmeli.

Entire Site gibi ağır işlem:

SUPER_ADMIN / ADMIN

permission gerektirebilir.

==================================================
9. CACHE CONFIRMATION
==================================================

Tüm site cache temizleme gibi ağır aksiyonlarda confirmation kullan.

Örneğin:

"Site genelindeki önbelleği yenilemek istediğinize emin misiniz?"

[İptal]

[Önbelleği Yenile]

İşlem sonunda gerçek toast:

"Önbellek başarıyla yenilendi."

Hata:

"Önbellek yenilenemedi."

==================================================
10. PERFORMANCE INDICATOR
==================================================

Toolbar içinde:

⚡ Performance

bulunsun.

Ama referanstaki gibi:

Performance: 10

şeklinde fake değer gösterme.

Gerçek performance sistemi varsa:

⚡ 96

veya:

⚡ Performance 96

göster.

Renk / status:

90–100
Good

50–89
Needs Attention

0–49
Poor

gibi olabilir.

Ancak gerçek PageSpeed / performance engine değerlerine göre hesaplanmalı.

==================================================
11. PERFORMANCE DATA SOURCE
==================================================

Performance değeri:

PageSpeed Insights
CrUX
RUM
Vercel Speed Insights

veya mevcut gerçek performance sisteminden gelebilir.

LAB ve FIELD data birbirine karıştırılmamalı.

Toolbar çok sık API çağırmamalı.

Son cache edilmiş sonucu kullan.

Hover tooltip:

Performance
96 / 100

Mobile

Last checked:
14 min ago

Source:
PageSpeed Insights

gibi gösterebilir.

==================================================
12. PERFORMANCE NOT CONFIGURED
==================================================

Performance sistemi bağlı değilse:

Performance —

veya:

Performance
Not configured

göster.

Fake:

100

gösterme.

==================================================
13. PERFORMANCE CLICK
==================================================

Performance göstergesine tıklanınca:

/admin/analytics

veya mevcut performance dashboard route'una git.

Eğer ayrı bir performance sayfası varsa onu kullan.

Gereksiz yeni route oluşturma.

==================================================
14. SEO INDICATOR
==================================================

Performance'ın yanında:

SEO

göstergesi bulunabilir.

Örneğin:

SEO 94

veya:

SEO
● Healthy

Gerçek SEO audit engine sonucundan gelmeli.

==================================================
15. SEO SCORE
==================================================

Fake SEO skoru YASAK.

Score mevcut:

/admin/seo

sistemindeki gerçek SEO auditinden gelmeli.

Örneğin:

SEO 94

tooltip:

Technical SEO: 98
On-Page: 91
Indexability: 100
Schema: 88

3 warnings

Last audit:
20 min ago

gibi olabilir.

==================================================
16. SEO PROBLEM INDICATOR
==================================================

SEO kritik problemi varsa toolbar bunu anlaşılır gösterebilir.

Örneğin:

SEO 78
● 3 issues

veya:

SEO ⚠

Ancak toolbarı alarm paneline çevirme.

Detay:

hover/click dropdown

içinde gösterilsin.

==================================================
17. SEO CLICK
==================================================

SEO göstergesine tıklanınca:

/admin/seo

sayfasına gitmeli.

==================================================
18. CURRENT PAGE CONTEXT
==================================================

Sağ bölümde referanstaki:

Sayfa: anasayfa

mantığını geliştir.

Örneğin:

Sayfa
Anasayfa

veya daha kompakt:

Anasayfa

göster.

Page type'ı otomatik belirle.

Örneğin:

PAGE · Anasayfa

PRODUCT · Katlanır Duşakabin 05

CATEGORY · Katlanır Duşakabin

BLOG · Duşakabin Cam Kalınlığı Rehberi

==================================================
19. CURRENT ENTITY RESOLUTION
==================================================

Public URL:

/urunler/katlanir-dusakabin/katlanir-dusakabin-05

ise toolbar mevcut route üzerinden ilgili gerçek product kaydını bulmalı.

Göster:

Ürün:
Katlanır Duşakabin 05

Hardcoded route listesi oluşturma.

Mevcut database/entity mapping sistemini kullan.

==================================================
20. EDIT CURRENT PAGE
==================================================

Referanstaki:

✎ Düzenle

aksiyonu Erayduş için çok kullanışlı.

Public entity türüne göre doğru admin edit route'una götür.

Örneğin:

Homepage:

Düzenle
→ mevcut page/content editor

Product:

Düzenle
→ /admin/products/[id]/edit
veya projedeki gerçek edit route

Category:

Düzenle
→ category editor

Blog:

Düzenle
→ blog editor

==================================================
21. DYNAMIC EDIT BUTTON
==================================================

Edit button sadece gerçekten düzenlenebilir entity varsa göster.

Örneğin:

404
search results
system route

gibi sayfalarda yanlış Edit link oluşturma.

==================================================
22. EDIT PERMISSION
==================================================

Kullanıcının edit permission'ı yoksa:

Düzenle

butonunu gösterme veya readonly state göster.

Server-side permission yine zorunlu.

==================================================
23. QUICK PAGE ACTIONS
==================================================

Current page yanında optional three-dot menu olabilir:

•••

Örneğin Product Page'de:

Edit Product
Open SEO
Copy URL
Open Analytics
View Sitemap Status

gibi context-sensitive aksiyonlar.

Ancak sadece gerçekten çalışan fonksiyonları göster.

==================================================
24. PAGE SEO QUICK VIEW
==================================================

Current page bir indexable public sayfa ise:

küçük SEO quick status gösterebilir.

Örneğin:

SEO
✓ Indexable

veya tooltip:

Title ✓
Description ✓
Canonical ✓
Schema ✓
Sitemap ✓

Bu bilgiler gerçek page SEO analysis'ten gelmeli.

==================================================
25. PAGE PERFORMANCE QUICK VIEW
==================================================

Mevcut sayfanın ayrı performance sonucu varsa:

Current Page Performance

gösterilebilir.

Yoksa global performance değerini current page sonucu gibi sunma.

==================================================
26. ADMIN USER
==================================================

Sağ tarafta:

Admin
Avatar

göster.

Örneğin:

Ahmet
A

veya:

Admin
avatar

Tıklandığında dropdown:

Account
Security
Admin Panel
Logout

gibi gerçek seçenekler.

==================================================
27. LOGOUT
==================================================

Logout gerçek Supabase Auth logout gerçekleştirmeli.

Sadece client-side route redirect yapma.

Logout sonrası admin toolbar tamamen kaybolmalı.

==================================================
28. SECURITY
==================================================

Bu toolbar admin güvenliği açısından public bypass oluşturmamalı.

Sadece:

authenticated
+
authorized

kullanıcılara server-side render edilmeli.

Public kullanıcı toolbar endpointlerinden:

cache reset
SEO update
page edit
admin data

işlemlerini yapamamalı.

==================================================
29. NO ADMIN DATA LEAK
==================================================

Normal ziyaretçi:

SEO internal score
performance admin data
profile information
admin routes metadata
permissions
security status

almamalı.

Admin toolbar yalnızca admin authenticated request'lerde oluşturulmalı.

==================================================
30. TOPBAR PUBLIC PERFORMANCE
==================================================

ÇOK ÖNEMLİ.

Anonymous ziyaretçiler için:

Admin toolbar JavaScript bundle yükleme.

Admin toolbar query çalıştırma.

Admin toolbar CSS göndermeye gerek yoksa gönderme.

Admin toolbar performance'ı normal ziyaretçinin:

LCP
INP
CLS

değerlerini etkilememeli.

==================================================
31. LAYOUT SHIFT
==================================================

Admin toolbar görünür olduğunda site içeriğini yanlış şekilde kapatmamalı.

Admin session varsa:

body / root üzerinde toolbar yüksekliği kadar offset oluştur.

Örneğin:

--admin-toolbar-height: 46px

Site navigation:

top:
var(--admin-toolbar-height)

gibi mevcut layouta uygun davranabilir.

CLS oluşturma.

==================================================
32. STICKY WEBSITE HEADER SUPPORT
==================================================

ERAYDUŞ frontend header zaten sticky/fixed ise:

ADMIN TOOLBAR
↓
WEBSITE NAVBAR
↓
CONTENT

şeklinde doğru stacking oluştur.

İki header birbirinin üzerine binmemeli.

==================================================
33. DESKTOP DESIGN
==================================================

Desktop:

height ~46px

Left:
brand
create
cache
performance
seo

Right:
page context
edit
profile

Toolbar çok yüksek olmamalı.

Spacing compact ama sıkışık olmamalı.

==================================================
34. VISUAL SEPARATORS
==================================================

Referanstaki gibi çok ince vertical separators kullan.

Örneğin:

ERAYDUŞ Yönetim
|
Yeni Ekle
|
Cache
Performance
SEO

Ancak separator kullanımını abartma.

==================================================
35. ICONS
==================================================

Mevcut icon library kullan.

Lucide varsa Lucide kullan.

Yeni icon package ekleme.

Örnek:

LayoutDashboard
Plus
RefreshCw
Zap
Search
Pencil
User
LogOut
Settings
ChevronDown

==================================================
36. MICRO INTERACTIONS
==================================================

Hover:

subtle background change

Active:

slightly stronger surface

Dropdown:

150–200ms smooth transition

Gereksiz:

bounce
glow
large animations
gradient animation

kullanma.

==================================================
37. PREMIUM ERAYDUŞ STYLE
==================================================

Topbar:

WordPress kadar kullanışlı

ancak WordPress kadar eski görünmemeli.

Visual inspiration:

Linear
Vercel
Stripe Dashboard
Modern CMS
Premium architecture software

gibi temiz hissiyat.

ERAYDUŞ showroom markasıyla uyumlu.

==================================================
38. COLOR SYSTEM
==================================================

Background:

near-black graphite.

Text:

primary light
secondary muted.

Accent sadece durumlarda:

Performance
SEO
Warning
Error
Success

için kullan.

Toolbarı rengarenk yapma.

==================================================
39. PERFORMANCE COLOR
==================================================

Performance icon'da referanstaki kırmızı lightning icon yerine status'a göre semantic color kullanılabilir.

Ancak accessibility için sadece renge güvenme.

Icon + label/status da kullan.

==================================================
40. MOBILE VERSION
==================================================

Mobilde desktop toolbar'ın tamamını sıkıştırma.

Mobil toolbar:

[ERAYDUŞ]

[+]

[Edit]

[•••]

gibi compact olabilir.

••• menüsü altında:

Dashboard
Performance
SEO
Cache
Current Page
Security
Logout

bulunabilir.

==================================================
41. TABLET
==================================================

Tablet'te daha az önemli label'ları icon-only yap.

Tooltip kullan.

==================================================
42. COMMAND PALETTE
==================================================

Toolbar'dan:

Cmd/Ctrl + K

admin command palette açılabilir.

Örneğin:

Search Product
New Product
Edit Current Page
Open SEO
Open Analytics
Clear Current Page Cache

Ancak mevcut command palette varsa onu kullan.

Gereksiz ikinci sistem oluşturma.

==================================================
43. KEYBOARD SHORTCUTS
==================================================

İsteğe bağlı:

Ctrl/Cmd + K
Search

Ctrl/Cmd + E
Edit current page

gibi shortcutlar olabilir.

Input içinde yazarken yanlışlıkla çalışmamalı.

==================================================
44. TOAST
==================================================

Toolbar işlemlerinde mevcut toast sistemi kullan.

Örneğin:

Cache refreshed.

SEO audit started.

Copied to clipboard.

Logged out.

İkinci toast library ekleme.

==================================================
45. LOADING STATES
==================================================

Cache işleminde:

Refresh icon spin.

SEO/performance load edilirken:

küçük skeleton veya neutral indicator.

Toolbarın tamamını skeleton yapma.

==================================================
46. ERROR STATES
==================================================

Performance API başarısız:

Performance
—

tooltip:

Unable to load latest performance data.

SEO başarısız:

SEO
—

Toolbar çökmemeli.

==================================================
47. DATA FRESHNESS
==================================================

SEO ve Performance tooltip/dropdown içinde:

Last checked

bilgisi göster.

Bu kullanıcının gördüğü skorun ne kadar güncel olduğunu anlamasını sağlar.

==================================================
48. DO NOT FETCH HEAVY DATA ON EVERY NAVIGATION
==================================================

Toolbar her page navigation'da:

PageSpeed API
Search Console API
full SEO crawl

çalıştırmamalı.

Son audit/cache verisini oku.

Heavy operations background/on-demand olmalı.

==================================================
49. SEO AUDIT QUICK ACTION
==================================================

SEO dropdown içinde:

Current Page SEO

Score:
92

Warnings:
2

[Open SEO]

ve gerekiyorsa:

[Run Page Audit]

olabilir.

Audit gerçekten çalışmalı.

==================================================
50. PERFORMANCE QUICK ACTION
==================================================

Performance dropdown:

Current Site

Mobile:
92

Desktop:
98

Core Web Vitals:
Passing

Last checked:
...

[Analytics]

[Run Check]

Gerçek veri varsa göster.

==================================================
51. CACHE UX
==================================================

"Önbelleği Temizle"

yerine kullanıcı açısından:

"Önbelleği Yenile"

veya:

"Cache Yenile"

daha doğru olabilir.

Çünkü Next.js'de genellikle amaç sadece cache silmek değil veriyi yeniden doğrulamaktır.

==================================================
52. OPTIONAL DEPLOYMENT STATUS
==================================================

Mevcut Vercel deployment bilgisine gerçekten erişilebiliyorsa:

Production
● Live

gibi küçük bir durum olabilir.

Ancak entegrasyon yoksa fake deployment status gösterme.

Bu özellik zorunlu değildir.

==================================================
53. OPTIONAL PREVIEW MODE
==================================================

CMS draft/preview sistemi gerçekten varsa:

Preview

durumu toolbar içinde gösterilebilir.

Örneğin:

PREVIEW MODE

[Exit Preview]

Gerçek preview sistemi yoksa oluşturma.

==================================================
54. ACCESSIBILITY
==================================================

Toolbar tamamen keyboard accessible olmalı.

ARIA menu semantics.

ARIA labels.

Focus-visible.

ESC closes dropdown.

Arrow-key menu navigation.

Contrast WCAG AA.

==================================================
55. NO DEAD UI
==================================================

KESİN KURAL:

Yeni Ekle
Cache
Performance
SEO
Edit
Profile
Logout

gibi görünen bütün kontroller çalışmalı.

Placeholder button oluşturma.

==================================================
56. REAL DATA ONLY
==================================================

Performance = REAL DATA

SEO = REAL AUDIT

Current Page = REAL ROUTE/ENTITY

User = REAL AUTH USER

Permissions = REAL SERVER AUTHORIZATION

Cache = REAL REVALIDATION

Fake hiçbir data kullanma.

==================================================
57. EXISTING ARCHITECTURE FIRST
==================================================

Implementasyondan önce incele:

existing layout
public header
admin layout
authentication
Supabase SSR
RBAC
permissions
products
categories
blog/pages
SEO
analytics
cache architecture
design tokens
icon library
toast system
routes

Mevcut sistemi tekrar oluşturma.

==================================================
58. NEXT.JS IMPLEMENTATION
==================================================

Next.js 15 App Router conventions kullan.

Server Components mümkün olduğunca kullan.

Client Component sadece:

dropdown
tooltip
command interaction
cache button state
mobile menu

gibi gerçekten interaktif kısımlarda kullanılmalı.

Toolbar'ın tamamını gereksiz yere:

"use client"

yapma.

==================================================
59. COMPONENT ARCHITECTURE
==================================================

Componentleri mantıklı ayır.

Örneğin:

AdminFrontendToolbar
AdminToolbarBrand
AdminCreateMenu
AdminCacheControl
AdminPerformanceIndicator
AdminSeoIndicator
AdminCurrentPage
AdminPageActions
AdminProfileMenu
AdminMobileToolbar

Ancak aşırı component fragmentation yapma.

==================================================
60. FINAL DESKTOP TARGET
==================================================

Final desktop görünüm yaklaşık:

┌─────────────────────────────────────────────────────────────────────────────┐
│ ▦ ERAYDUŞ Yönetim │ + Yeni Ekle ▾ │ ↻ Cache │ ⚡ 96 │ SEO 94             │
│                                                   ÜRÜN · Katlanır 05        │
│                                                   ✎ Düzenle │ Admin ▾       │
└─────────────────────────────────────────────────────────────────────────────┘

Ancak tek satırda, kompakt ve profesyonel şekilde uygulanmalı.

==================================================
61. FINAL MOBILE TARGET
==================================================

Mobile:

┌─────────────────────────────────────┐
│ ▦ ERAYDUŞ     +    ✎ Düzenle    ••• │
└─────────────────────────────────────┘

••• içinde:

Dashboard
New
SEO
Performance
Cache
Current Page
Account
Logout

==================================================
62. ERAYDUŞ'A ÖZEL KURAL
==================================================

Customers ve Quotes sistemleri kaldırıldı.

Bu nedenle toolbar:

Customer
Quote
CRM
Lead
Sales Pipeline

aksiyonları içermemeli.

Ana yönetim sistemleri:

Products
Categories
Content / Blog
Media
Analytics
SEO
Settings

üzerinden çalışmalı.

==================================================
63. ABSOLUTE ACCEPTANCE CRITERIA
==================================================

Normal visitor:

Toolbar görmez.

Authenticated authorized admin:

Toolbar görür.

ERAYDUŞ Yönetim:

/admin/dashboard çalışır.

Yeni Ekle:

gerçek create route'larına gider.

Cache:

gerçek Next.js cache/revalidation işlemi yapar.

Performance:

gerçek son performance verisini gösterir.

SEO:

gerçek audit sonucunu gösterir.

Current Page:

gerçek entity'yi tanır.

Düzenle:

doğru admin edit sayfasını açar.

Profile:

gerçek auth user'ı kullanır.

Logout:

gerçek session'ı sonlandırır.

Mobile:

kullanılabilir.

Public Lighthouse/performance:

admin toolbar nedeniyle etkilenmez.

Security:

server-side authentication + authorization ile korunur.

TypeScript clean.

ESLint clean.

Production build successful.

Console errors = 0.

==================================================
FINAL RULE
==================================================

REFERANS GÖRSELDEKİ YAKLAŞIMI KULLAN:

dark fixed topbar
compact controls
quick create
cache
SEO
performance
current page
edit
admin profile

AMA GÖRSELİ BİREBİR KOPYALAMA.

ERAYDUŞ'A ÖZEL, MODERN, PREMIUM VE DAHA İŞLEVSEL BİR SİSTEM OLUŞTUR.

BU SADECE TASARIM DEĞİL.

HER ELEMENT GERÇEK SİSTEME BAĞLI OLMALI.

UI-ONLY IMPLEMENTATION KABUL EDİLMEZ.