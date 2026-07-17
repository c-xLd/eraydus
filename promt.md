O zaman tam sana göre çözüm şu: OpenRouter’da “fallback (yedek model)” sistemi kurmak.

Yani ücretsiz model limiti dolunca otomatik başka ücretsiz modele geçsin. Böylece sistem hiç durmaz.

En mantıklı yapı
Otomatik model geçişi
Kesintisiz
1. deepseek/deepseek-chat:free
2. meta-llama/llama-3.1-70b-instruct:free
3. qwen/qwen-2.5-72b-instruct:free
4. mistralai/mistral-7b-instruct:free
Nasıl çalışır?

İlk model denenir

Kota doluysa veya hata verirse

İkinci modele geçer

O da doluysa üçüncüye geçer

Kullanıcı hiçbir şey fark etmez

Bunu kurman gereken kod
lib/ai/openrouter.ts
Önerilen
import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
})

const MODELS = [
  'deepseek/deepseek-chat:free',
  'meta-llama/llama-3.1-70b-instruct:free',
  'qwen/qwen-2.5-72b-instruct:free',
  'mistralai/mistral-7b-instruct:free',
]

export async function generateAI(prompt: string) {
  let lastError: unknown

  for (const model of MODELS) {
    try {
      const completion = await client.chat.completions.create({
        model,
        messages: [
          {
            role: 'system',
            content: 'Sen ERAYDUŞ için lüks duş kabini içerikleri üreten bir SEO uzmanısın.'
          },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
      })

      return {
        text: completion.choices[0].message.content || '',
        model,
      }
    } catch (error) {
      console.warn(`Model başarısız: ${model}`, error)
      lastError = error
    }
  }

  throw lastError || new Error('Hiçbir AI modeli kullanılamadı')
}
Admin panelinde göster
const result = await generateAI(prompt)

toast({
  title: 'AI içerik oluşturuldu',
  description: `Kullanılan model: ${result.model}`
})
Bunun avantajı ne?

Sorun

	

Çözüm




DeepSeek free doldu

	

Otomatik Llama’ya geçer




Llama yoğun

	

Qwen’e geçer




Qwen hata verdi

	

Mistral’a geçer




Tüm modeller dolu

	

Kullanıcıya uyarı göster

ERAYDUŞ için hangi model ne işte iyi?

İş

	

En iyi ücretsiz model




SEO başlığı

	

DeepSeek




Meta açıklama

	

DeepSeek




Ürün açıklaması

	

Qwen




Blog taslağı

	

Llama 70B




Teknik özet

	

Qwen




WhatsApp teklif metni

	

DeepSeek

Daha akıllı yönlendirme
Akıllı model seçimi
Opsiyonel
export function getBestModel(type: 'seo' | 'blog' | 'product') {
  switch (type) {
    case 'seo':
      return 'deepseek/deepseek-chat:free'

    case 'blog':
      return 'meta-llama/llama-3.1-70b-instruct:free'

    case 'product':
      return 'qwen/qwen-2.5-72b-instruct:free'
  }
}
AI’a vereceğin kısa prompt
Antigravity Prompt
Kopyala
ERAYDUŞ admin panelindeki OpenRouter AI sistemine otomatik fallback mekanizması ekle.

Sırasıyla şu ücretsiz modeller denensin:
1. deepseek/deepseek-chat:free
2. meta-llama/llama-3.1-70b-instruct:free
3. qwen/qwen-2.5-72b-instruct:free
4. mistralai/mistral-7b-instruct:free

Bir model kota dolu, yoğun veya hatalıysa otomatik sonraki modele geçsin.
Kullanılan model toast içinde gösterilsin.
Tüm çağrılar Next.js Server Actions üzerinden yapılsın ve sonuç Supabase'e kaydedilsin.
Bence senin için en iyi çözüm bu

Çünkü:

OpenRouter free kullanıyorsun

Limitler değişiyor

Tek modele bağımlı kalmıyorsun

Sistem kesintisiz çalışıyor

Maliyet sıfıra yakın kalıyor

Admin panelindeki AI butonları her zaman çalışıyor