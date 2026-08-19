Tabii. Senin yapına göre Analytics'i **CRM değil, tamamen otomatik çalışan “Erayduş Digital Analytics Center”** olarak kurmak en doğrusu.

Antigravity'ye direkt şu promptu ver:

```text
ERAYDUŞ ADMIN — /admin/analytics
ADVANCED REAL-WORLD ANALYTICS SYSTEM
PRODUCTION-READY IMPLEMENTATION

/admin/analytics sayfasını tamamen gerçek verilerle çalışan gelişmiş bir analytics merkezi haline getir.

ANA AMAÇ:

Erayduş web sitesindeki kullanıcı davranışlarını otomatik olarak ölç.

Kullanıcıdan veya çalışanlardan hiçbir manuel işlem isteme.

Özellikle Erayduş'un satış modeli WhatsApp üzerinden olduğu için:

WEBSITE
↓
PRODUCT VIEW
↓
USER INTERACTION
↓
WHATSAPP CLICK
↓
ANALYTICS

akışını doğru şekilde ölç.

KESİNLİKLE CRM OLUŞTURMA.

CUSTOMERS
QUOTES
SALES PIPELINE
FOLLOW-UP
MANUEL MÜŞTERİ TAKİBİ

BU SAYFANIN KAPSAMINDA DEĞİL.

==================================================
1. ÖNCE MEVCUT SİSTEMİ ANALİZ ET
==================================================

Kodlamaya başlamadan önce:

- Next.js
- Supabase
- mevcut analytics sistemi
- mevcut database schema
- products
- categories
- collections
- blog
- users
- mevcut event tracking
- middleware
- authentication
- mevcut admin dashboard

yapısını incele.

Mevcut analytics altyapısı varsa yeniden oluşturma.

Mevcut sistemi genişlet.

Gereksiz tablo oluşturma.

==================================================
2. GERÇEK VERİ KURALI
==================================================

KESİNLİKLE MOCK DATA KULLANMA.

Fake:

Visitors
Users
Pageviews
Sessions
Clicks
Conversions
Revenue
Traffic
CTR
Conversion Rate

oluşturma.

Gerçek veri yoksa:

"Henüz yeterli veri yok"

göster.

Analytics sistemi kurulmamışsa:

"Analytics tracking is not configured"

göster.

Fake grafik üretme.

==================================================
3. ANA ANALYTICS DASHBOARD
==================================================

Üst bölümde tarih filtresi:

Today
Yesterday
Last 7 Days
Last 30 Days
Last 90 Days
This Month
Last Month
This Year
Custom Range

göster.

KPI:

Visitors
Page Views
Sessions
Product Views
WhatsApp Clicks
WhatsApp Conversion Rate

göster.

Her KPI gerçek event/database verisinden hesaplanmalı.

==================================================
4. PERIOD COMPARISON
==================================================

Seçilen dönemi önceki eşdeğer dönemle karşılaştır.

Örneğin:

Last 30 Days
vs
Previous 30 Days

Göster:

Visitors
Page Views
Product Views
WhatsApp Clicks

Değişim:

+18.4%

veya

-7.2%

olarak hesaplanmalı.

Karşılaştırma verisi yoksa:

"No comparison data"

göster.

==================================================
5. TRAFFIC OVERVIEW
==================================================

Gerçek analytics eventlerinden:

Visitors
Sessions
Page Views

grafiği oluştur.

Zaman ekseni:

Hour
Day
Week
Month

seçilebilir olsun.

Grafik sadece gerçek verileri göstermeli.

==================================================
6. TRAFFIC SOURCES
==================================================

Kullanıcıların nereden geldiğini ölç.

Kaynaklar:

Google
Direct
Social
Referral
Other

Mümkünse:

source
medium
campaign

kaydet.

Göster:

Traffic Source
Visitors
Sessions
Product Views
WhatsApp Clicks
Conversion Rate

==================================================
7. GOOGLE ORGANIC TRAFFIC
==================================================

Organic traffic için:

Organic Visitors
Organic Sessions
Organic Product Views
Organic WhatsApp Clicks

göster.

Google Search Console entegrasyonu varsa ayrıca:

Clicks
Impressions
CTR
Average Position

verilerini kullan.

Search Console verisi yoksa fake değer gösterme.

==================================================
8. WHATSAPP ANALYTICS
==================================================

BU SİSTEMİN EN ÖNEMLİ BÖLÜMLERİNDEN BİRİ.

Erayduş satışlarının WhatsApp üzerinden gerçekleştiğini dikkate al.

Her WhatsApp CTA tıklamasını event olarak takip et.

Event:

whatsapp_click

Örneğin:

Product Page
Category Page
Homepage
Contact Page

kaynağını kaydet.

Göster:

Total WhatsApp Clicks
Unique WhatsApp Clicks
WhatsApp Conversion Rate

==================================================
9. WHATSAPP PRODUCT ANALYTICS
==================================================

Hangi ürünlerin WhatsApp'a daha fazla kullanıcı gönderdiğini göster.

Örneğin:

Katlanır Duşakabin 05

Views:
2,481

WhatsApp Clicks:
183

Conversion:
7.37%

Başka ürün:

Views:
1,920

WhatsApp:
41

Conversion:
2.13%

Tüm veriler gerçek olmalı.

==================================================
10. WHATSAPP CATEGORY ANALYTICS
==================================================

Kategori bazında:

Category
Views
WhatsApp Clicks
Conversion

göster.

Örneğin:

Katlanır Duşakabin
3,421 views
248 WhatsApp clicks
7.25%

==================================================
11. PRODUCT ANALYTICS
==================================================

Ürün bazında:

Views
Unique Views
WhatsApp Clicks
Conversion Rate

göster.

Sıralama:

Most Viewed
Most WhatsApp Clicked
Highest Conversion

olarak değiştirilebilir.

==================================================
12. PRODUCT PERFORMANCE
==================================================

Her ürün için performans skoru hesaplanabilir.

Ancak skor:

gerçek:

Views
Engagement
WhatsApp Clicks
Conversion

verilerinden hesaplanmalı.

Fake score oluşturma.

==================================================
13. PAGE ANALYTICS
==================================================

Public sayfaları analiz et:

Homepage
Products
Categories
Product Pages
Blog
Contact
Other

Göster:

Views
Unique Visitors
Average Engagement
WhatsApp Clicks

==================================================
14. BLOG ANALYTICS
==================================================

Blog varsa:

Blog Views
Unique Visitors
Average Engagement
Internal Clicks
WhatsApp Clicks

göster.

En başarılı blog yazılarını listele.

==================================================
15. USER DEVICE
==================================================

Gerçek analytics verisine göre:

Mobile
Desktop
Tablet

göster.

Örneğin:

Mobile 74%
Desktop 24%
Tablet 2%

Ancak gerçek veri olmadan oran oluşturma.

==================================================
16. BROWSER / OS
==================================================

Gerçek veri mevcutsa:

Chrome
Safari
Edge
Firefox

ve:

Android
iOS
Windows
macOS

göster.

Gereksiz PII toplama.

==================================================
17. GEOGRAPHY
==================================================

Analytics altyapısı gerçekten sağlıyorsa:

Country
City
Region

göster.

Türkiye özelinde:

İstanbul
Ankara
İzmir
Bursa

gibi gerçek trafik dağılımını göster.

Kesin konum toplama.

IP adreslerini admin panelinde gösterme.

==================================================
18. USER JOURNEY
==================================================

Mümkün olduğunca anonim kullanıcı davranış akışını ölç.

Örneğin:

Google
↓
Category
↓
Product
↓
WhatsApp

veya:

Direct
↓
Product
↓
WhatsApp

gibi.

Kullanıcı kimliğini belirlemeye çalışma.

==================================================
19. FUNNEL
==================================================

Erayduş için gerçek conversion funnel:

VISIT
↓
PRODUCT VIEW
↓
PRODUCT ENGAGEMENT
↓
WHATSAPP CLICK

olarak oluştur.

Örneğin:

10,000 Visitors

↓ 42%

4,200 Product Views

↓ 6%

252 WhatsApp Clicks

Bu değerler gerçek eventlerden hesaplanmalı.

==================================================
20. EVENT TRACKING
==================================================

Aşağıdaki event sistemini oluştur:

page_view
product_view
category_view
blog_view
search
whatsapp_click
phone_click
email_click
outbound_click
image_view
scroll_depth
cta_click

Ancak yalnızca gerçekten anlamlı eventleri kaydet.

Her şeyi event olarak kaydetme.

==================================================
21. EVENT DATA
==================================================

Event mümkün olduğunca şu bilgileri içerebilir:

event_name
timestamp
page_url
page_type
product_id
category_id
session_id
anonymous_id
referrer
source
medium
campaign
device_type

PII toplama.

Telefon
E-posta
Şifre
Adres

analytics eventlerine kaydetme.

==================================================
22. SESSION SYSTEM
==================================================

Analytics için anonim session sistemi oluştur.

Session:

UUID

veya güvenli anonim ID ile takip edilebilir.

Kullanıcı hesabına bağlamak zorunda değilsin.

==================================================
23. PRIVACY
==================================================

KVKK açısından gereksiz kişisel veri toplama.

Analytics:

privacy-conscious

olmalı.

IP adresini mümkünse saklama veya anonimleştir.

Email / phone event metadata'ya koyma.

==================================================
24. REALTIME ANALYTICS
==================================================

Mümkünse Supabase Realtime ile:

Active Visitors
Recent Events
Live Page Views
Live WhatsApp Clicks

göster.

Ancak realtime altyapı yoksa fake active users gösterme.

==================================================
25. RECENT EVENTS
==================================================

Son eventleri göster:

18:42
Product View
Katlanır Duşakabin 05

18:41
WhatsApp Click
Katlanır Duşakabin 05

18:40
Page View
/urunler

Tam kullanıcı kimliği gösterme.

Anonim event.

==================================================
26. TOP LANDING PAGES
==================================================

Gerçek analytics verisinden:

Landing Page
Visitors
Sessions
WhatsApp Clicks
Conversion

göster.

==================================================
27. TOP EXIT PAGES
==================================================

Gerçek veri varsa:

Exit Page
Views
Exit Rate

göster.

==================================================
28. SEARCH ANALYTICS
==================================================

Site içinde arama varsa:

Search Query
Search Count
Result Clicks
No Result Searches

göster.

Özellikle:

hangi ürünlerin aranıp bulunamadığını

tespit et.

==================================================
29. INTERNAL SEARCH OPPORTUNITIES
==================================================

Çok aranan ama sonucu olmayan sorguları göster.

Örneğin:

"oval duşakabin"

Searches:
42

Results:
0

Bu bilgi yeni ürün/content fırsatı olarak gösterilebilir.

==================================================
30. PERFORMANCE ANALYTICS
==================================================

Gerçek RUM / web performance verisi varsa:

LCP
INP
CLS
FCP
TTFB

göster.

PageSpeed API sonuçları ile gerçek kullanıcı verisini birbirine karıştırma.

Lab Data
Field Data

ayrı göster.

==================================================
31. PAGE SPEED
==================================================

PageSpeed Insights API entegrasyonu varsa:

Mobile
Desktop

ayrı göster.

Performance
Accessibility
Best Practices
SEO

göster.

Fake score kullanma.

==================================================
32. SEO ANALYTICS
==================================================

SEO sisteminden gerçek verilerle:

Organic Visitors
Organic Product Views
Organic WhatsApp Clicks

göster.

Search Console varsa:

Clicks
Impressions
CTR
Position

ekle.

==================================================
33. TOP SEO PRODUCTS
==================================================

Google'dan trafik alan ürünleri göster.

Örneğin:

Product
Organic Clicks
Impressions
CTR
Position
WhatsApp Clicks

Bu sayede:

"Google'dan gelen kullanıcı hangi üründe WhatsApp'a gidiyor?"

sorusunun cevabı görülebilir.

==================================================
34. UTM TRACKING
==================================================

Destekle:

utm_source
utm_medium
utm_campaign
utm_content
utm_term

Örneğin:

Instagram
Google Ads
Facebook
Campaign

gibi kaynaklar analiz edilebilir.

==================================================
35. CAMPAIGN ANALYTICS
==================================================

Campaign:

Visitors
Sessions
Product Views
WhatsApp Clicks
Conversion

göster.

==================================================
36. EXPORT
==================================================

Analytics verileri:

CSV

olarak export edilebilir.

Export gerçek database verisinden yapılmalı.

Export yetkisi role göre kontrol edilmeli.

==================================================
37. FILTERS
==================================================

Filtreler:

Date
Source
Medium
Campaign
Product
Category
Device
Country
Event

olarak çalışmalı.

Filtre değişince grafik ve tablolar gerçekten değişmeli.

==================================================
38. DATABASE PERFORMANCE
==================================================

Analytics yüksek event üretebilir.

Her page view'da ağır Supabase query çalıştırma.

N+1 query kullanma.

Gerekirse:

aggregation tables
database functions
materialized views
daily summaries

kullan.

Raw events ile dashboard sorgularını birbirinden ayır.

==================================================
39. DATA RETENTION
==================================================

Analytics eventleri sonsuza kadar saklamak zorunda değilsin.

Gelecekte:

30 days
90 days
1 year

retention ayarı desteklenebilir.

Ancak mevcut sistemde veri kaybına yol açacak otomatik deletion uygulama.

==================================================
40. CACHING
==================================================

Dashboard her açıldığında milyonlarca event sorgulama.

Analytics aggregation sonuçlarını cache'le.

Realtime widget ayrı çalışabilir.

==================================================
41. ADMIN DASHBOARD INTEGRATION
==================================================

/admin/dashboard üzerinde kısa özet göster:

Visitors
Product Views
WhatsApp Clicks
Organic Traffic

"Detaylı Analytics"

butonu:

/admin/analytics

sayfasına gitmeli.

==================================================
42. NOTIFICATIONS
==================================================

Analytics kaynaklı önemli uyarılar üretilebilir.

Örneğin:

WhatsApp clicks unusually increased

Organic traffic dropped

404 increased

Product traffic increased

Ancak spam notification üretme.

Threshold ayarlanabilir olmalı.

==================================================
43. AUTOMATIC INSIGHTS
==================================================

Gerçek veriler üzerinden basit otomatik analiz:

"Son 7 günde WhatsApp tıklamaları %18 arttı."

"Katlanır Duşakabin 05 en fazla WhatsApp talebi oluşturan ürün."

"Organik trafik son 30 günde %12 arttı."

Bu cümleler sadece gerçek hesaplamalardan oluşturulmalı.

AI kullanılıyorsa AI veriyi uydurmamalı.

==================================================
44. ANOMALY DETECTION
==================================================

Basit anomaly detection sistemi oluştur.

Örneğin:

Normal:
100 WhatsApp clicks/day

Bugün:
12

Dashboard:

"WhatsApp click activity is significantly lower than usual."

Ancak yeterli geçmiş veri yoksa anomaly üretme.

==================================================
45. MOBILE
==================================================

Analytics tamamen mobile responsive.

Mobilde:

KPI cards
Charts
Tables
Filters

kullanılabilir olmalı.

Yatay taşma olmamalı.

==================================================
46. UX
==================================================

Premium ERAYDUŞ admin design.

Ancak analytics ekranı:

gösterişli değil,
okunabilir,
hızlı,
veri odaklı

olmalı.

Charts sade.

Tooltip detaylı.

KPI trendleri anlaşılır.

==================================================
47. ERROR HANDLING
==================================================

Analytics query başarısız olursa:

"Analytics data could not be loaded."

Retry

göster.

Dashboard tamamen çökmemeli.

==================================================
48. EMPTY STATES
==================================================

Yeni site ise:

"Analytics data is being collected."

göster.

Fake 0 değerlerini gerçek veri gibi sunma.

==================================================
49. SECURITY
==================================================

Analytics sadece yetkili adminlere açık.

RLS.

Server-side authorization.

Sensitive analytics data client'a gereksiz gönderilmeyecek.

Service role key browser'a gönderilmeyecek.

==================================================
50. TEST
==================================================

ŞU TESTLERİ GERÇEKTEN YAP:

TEST 1

Homepage aç.

page_view oluşmalı.

TEST 2

Ürün sayfası aç.

product_view oluşmalı.

TEST 3

Kategori aç.

category_view oluşmalı.

TEST 4

WhatsApp butonuna tıkla.

whatsapp_click oluşmalı.

TEST 5

Analytics dashboard.

Event görünmeli.

TEST 6

Tarih filtresi değiştir.

Veriler değişmeli.

TEST 7

Ürün filtresi.

Sadece ilgili ürün verileri gelmeli.

TEST 8

Source filtresi.

Gerçek source verileri filtrelenmeli.

TEST 9

Mobile.

Responsive çalışmalı.

TEST 10

Analytics database bağlantısını geçici olarak boz.

Fake data gösterilmemeli.

Doğru error state gösterilmeli.

TEST 11

Admin olmayan kullanıcı:

/admin/analytics

erişememeli.

TEST 12

Production build:

TypeScript errors = 0
ESLint errors = 0
Console errors = 0

==================================================
51. FINAL ARCHITECTURE
==================================================

Sistem:

USER
↓
NEXT.JS
↓
ANALYTICS EVENT TRACKER
↓
SUPABASE
↓
EVENT STORAGE
↓
AGGREGATION
↓
/admin/analytics

şeklinde çalışmalı.

Özellikle:

USER
↓
PRODUCT
↓
WHATSAPP CLICK

akışı doğru ölçülmeli.

==================================================
52. EN ÖNEMLİ KURAL
==================================================

BU SAYFAYI SADECE TASARLAMA.

GERÇEK ANALYTICS SİSTEMİ KUR.

MOCK DATA YOK.

FAKE VISITOR YOK.

FAKE WHATSAPP CLICK YOK.

FAKE CONVERSION YOK.

FAKE GOOGLE DATA YOK.

FAKE PAGESPEED YOK.

FAKE ACTIVE USER YOK.

Gerçek veri yoksa açıkça:

"Henüz yeterli veri yok"

veya

"Bu entegrasyon yapılandırılmamış"

göster.

MEVCUT SUPABASE SCHEMA'YI ÖNCE İNCELE.

MEVCUT ANALYTICS SİSTEMİ VARSA ONU KULLAN.

GEREKSİZ TABLO OLUŞTURMA.

GEREKSİZ EVENT TOPLAMA.

PII TOPLAMA.

KVKK / PRIVACY KURALLARINA UY.

PRODUCTION-READY KOD YAZ.

NEXT.JS 15
REACT 19
TYPESCRIPT
TAILWIND
SHADCN/UI
SUPABASE

mimarisine uy.

HER BUTON, FILTER, SELECT, DATE PICKER, EXPORT VE REFRESH GERÇEKTEN ÇALIŞMALI.

Sadece UI oluşturup bırakma.
```

**Özellikle WhatsApp event tracking kısmını atlama.** Senin sitende en değerli metrik muhtemelen klasik “kaç kişi geldi?” değil:

> **Kaç kişi ürün gördü → kaç kişi WhatsApp'a tıkladı → hangi ürün/kategori bunu sağladı → hangi trafik kaynağı bunu getirdi?**

olacak.

Bunu kurduğumuzda Google'da yaptığın SEO çalışmalarının da ticari olarak işe yarayıp yaramadığını görebilirsin.
