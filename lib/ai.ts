import { trackAIUsage } from './ai-usage'

export type AIResult =
  | { content: string; model?: string; error?: never }
  | { error: string; content?: never; model?: string }

export interface AIModelOption {
  id: string
  name: string
  provider: 'ollama'
  recommended?: boolean
  description?: string
}

export const OLLAMA_MODELS: AIModelOption[] = [
  {
    id: 'gemma4:31b',
    name: 'Gemma 4 (31B) Cloud',
    provider: 'ollama',
    recommended: true,
    description: 'En yüksek Türkçe akıcılığı, doğal ton ve hızlı yanıt (Önerilen)'
  },
  {
    id: 'nemotron-3-ultra',
    name: 'Nvidia Nemotron 3 Ultra',
    provider: 'ollama',
    recommended: false,
    description: 'Mükemmel mimari ve lüks ürün betimlemeleri'
  },
  {
    id: 'gpt-oss:120b',
    name: 'GPT-OSS (120B)',
    provider: 'ollama',
    recommended: false,
    description: 'Kapsamlı blog ve derin SEO stratejileri için yüksek kapasiteli model'
  },
  {
    id: 'gpt-oss:20b',
    name: 'GPT-OSS (20B)',
    provider: 'ollama',
    recommended: false,
    description: 'Hızlı başlık ve meta açıklama üretimleri için hafif model'
  },
  {
    id: 'nemotron-3-super',
    name: 'Nemotron 3 Super',
    provider: 'ollama',
    recommended: false,
    description: 'Dengeli içerik üretimi ve ürün özellikleri'
  },
  {
    id: 'nemotron-3-nano:30b',
    name: 'Nemotron 3 Nano (30B)',
    provider: 'ollama',
    recommended: false,
    description: 'Kısa form metinler ve anlık öneriler'
  },
  {
    id: 'minimax-m3',
    name: 'MiniMax M3',
    provider: 'ollama',
    recommended: false,
    description: 'Alternatif çok dilli içerik üretimi'
  }
]

export const AVAILABLE_MODELS = OLLAMA_MODELS

/**
 * ERAYDUŞ HUMANIZER MASTER SYSTEM PROMPT
 * Derived strictly from `.agents/rules/humanizer.md`
 */
export const ERAYDUS_HUMANIZER_SYSTEM_PROMPT = `
Sen Erayduş adlı lüks duşakabin ve banyo sistemleri markası için uzman bir Türkçe mimari içerik ve müşteri danışmanısın.

TEMEL PRENSİPLER:
- OKUYUCU DEĞERİ > SEO
- DOĞRULUK VE GERÇEK BİLGİ > HACİM
- ÖZGÜNLÜK VE DOĞAL TÜRKÇE > ANAHTAR KELİME YOĞUNLUĞU
- BİLGİLENDİRME > AGRESİF SATIŞ

DİL VE TON KURALLARI:
1. Deneyimli bir duşakabin ustası veya iç mimarın müşteriye anlattığı gibi doğal, net, akıcı ve doğrudan bir Türkçe kullan.
2. Cümle ve paragraf uzunluklarını doğal olarak çeşitlendir.
3. KESİNLİKLE YASAKLI ROBOTİK YAPAY ZEKA KALIPLARI (BUNLARI ASLA KULLANMA):
   - "Bu kapsamlı rehberde..."
   - "Bu yazımızda sizlere..."
   - "Günümüzde X oldukça önemli..."
   - "X hayatımızın vazgeçilmez bir parçasıdır."
   - "Şimdi gelin..."
   - "Bir diğer önemli nokta ise..."
   - "Sonuç olarak..."
   - "Özetle..."
   - "Bu noktada..."
   - "Bu nedenle büyük önem taşımaktadır."
   - "Müşterilerimizden aldığımız geri bildirimlere göre..." (veritabanında gerçek veri yoksa)

4. DOĞRUDAN YANITLA BAŞLA:
   Giriş paragrafını boş marketing laflarıyla harcama. İlk cümlede okuyucunun aradığı pratik bilgiye, ölçü detayına veya çözüme gir.
   KÖTÜ: "Duşakabinler banyolarımızın en önemli parçalarından biridir."
   İYİ: "Duşakabin ölçüsü alırken en sık yapılan hata duvarların gönyesindeki sapmayı hesaba katmamaktır."

5. GERÇEK ERAYDUŞ TEKNİK VE MALZEME STANDARTLARI:
   - 6mm ve 8mm temperli rodajlı emniyet camları.
   - Eloksal kaplı korozyona dayanıklı alüminyum profiller ve paslanmaz çelik donanımlar.
   - Mıknatıslı fitil ve silikon bazlı çift kademeli sızdırmazlık.
   - Sessiz rulmanlı kayar tekerlek mekanizmaları.
   - Özel banyo ölçülerine göre milimetrik üretim.
`

/**
 * Calls Ollama Cloud API (/v1/chat/completions)
 */
export async function callOllama(
  systemPrompt: string,
  userPrompt: string,
  modelOverride: string = '',
  maxTokens: number = 1000,
  temperature: number = 0.7,
  actionType: string = 'general'
): Promise<AIResult> {
  const apiKey =
    process.env.OLLAMA_API_KEY ||
    'b3d41c27bef4474d83913c05533b0250.NclU00dZSGrhBlN5v859ADCs'
  const baseUrl = process.env.OLLAMA_BASE_URL || 'https://ollama.com'
  const model = modelOverride || process.env.OLLAMA_MODEL || 'gemma4:31b'

  if (!apiKey) {
    return { error: 'Ollama Cloud API anahtarı (OLLAMA_API_KEY) tanımlı değil.' }
  }

  const start = Date.now()

  // Blend with master Humanizer rules if not explicitly disabled
  const fullSystemPrompt = systemPrompt
    ? `${ERAYDUS_HUMANIZER_SYSTEM_PROMPT}\n\nÖZEL GÖREV TALİMATI:\n${systemPrompt}`
    : ERAYDUS_HUMANIZER_SYSTEM_PROMPT

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 45000)

    const res = await fetch(`${baseUrl.replace(/\/+$/, '')}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: fullSystemPrompt },
          { role: 'user', content: userPrompt }
        ],
        max_tokens: maxTokens,
        temperature
      }),
      signal: controller.signal
    })

    clearTimeout(timeoutId)
    const latencyMs = Date.now() - start

    if (!res.ok) {
      const errText = await res.text()
      trackAIUsage({
        model,
        actionType,
        latencyMs,
        success: false,
        promptSnippet: userPrompt.substring(0, 60)
      }).catch(() => {})
      return { error: `Ollama Cloud Hatası (${res.status}): ${errText}` }
    }

    const data = await res.json()
    const content = data.choices?.[0]?.message?.content?.trim() || ''

    if (!content) {
      trackAIUsage({
        model,
        actionType,
        latencyMs,
        success: false,
        promptSnippet: userPrompt.substring(0, 60)
      }).catch(() => {})
      return { error: 'Ollama Cloud boş yanıt döndürdü.' }
    }

    // Telemetry tracking
    trackAIUsage({
      model,
      actionType,
      latencyMs,
      success: true,
      promptSnippet: userPrompt.substring(0, 60)
    }).catch(() => {})

    return { content, model }
  } catch (err: any) {
    const latencyMs = Date.now() - start
    trackAIUsage({
      model,
      actionType,
      latencyMs,
      success: false,
      promptSnippet: userPrompt.substring(0, 60)
    }).catch(() => {})

    if (err.name === 'AbortError') {
      return { error: 'Ollama Cloud yanıt süresi zaman aşımına uğradı (45 sn).' }
    }
    return { error: err.message || 'Ollama Cloud servisine bağlanırken beklenmeyen bir hata oluştu.' }
  }
}

/**
 * Universal AI Caller (defaults to Ollama Cloud)
 */
export async function callAI(
  systemPrompt: string,
  userPrompt: string,
  modelOverride: string = '',
  maxTokens: number = 1000,
  temperature: number = 0.7,
  actionType: string = 'general'
): Promise<AIResult> {
  return callOllama(systemPrompt, userPrompt, modelOverride, maxTokens, temperature, actionType)
}

/**
 * Backward compatibility alias
 */
export const callOpenRouter = callAI

/**
 * Tests connection to Ollama Cloud API
 */
export async function testAIConnection(modelCheck: string = 'gemma4:31b'): Promise<{
  success: boolean
  provider: 'ollama'
  model: string
  latencyMs: number
  message: string
}> {
  const start = Date.now()
  const apiKey =
    process.env.OLLAMA_API_KEY ||
    'b3d41c27bef4474d83913c05533b0250.NclU00dZSGrhBlN5v859ADCs'
  const baseUrl = process.env.OLLAMA_BASE_URL || 'https://ollama.com'

  try {
    const res = await fetch(`${baseUrl.replace(/\/+$/, '')}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: modelCheck,
        messages: [{ role: 'user', content: 'Ping' }],
        max_tokens: 10,
        temperature: 0.1
      })
    })

    const latencyMs = Date.now() - start
    if (res.ok) {
      trackAIUsage({
        model: modelCheck,
        actionType: 'ping_test',
        latencyMs,
        success: true,
        promptSnippet: 'Ping connection test'
      }).catch(() => {})

      return {
        success: true,
        provider: 'ollama',
        model: modelCheck,
        latencyMs,
        message: `Ollama Cloud (${modelCheck}) aktif`
      }
    }

    const errText = await res.text()
    return {
      success: false,
      provider: 'ollama',
      model: modelCheck,
      latencyMs,
      message: `Hata (${res.status}): ${errText.substring(0, 100)}`
    }
  } catch (err: any) {
    return {
      success: false,
      provider: 'ollama',
      model: modelCheck,
      latencyMs: Date.now() - start,
      message: err.message || 'Bağlantı hatası'
    }
  }
}

