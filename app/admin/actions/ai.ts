"use server"

// ============================================================
// AI Content Generation (OpenRouter → Fallback System)
// ============================================================

type AIResult = { success: true; content: string } | { error: string }

const DEFAULT_FREE_MODELS = [
  "google/gemini-2.0-flash-lite-preview-02-05:free",
  "google/gemini-2.5-flash:free",
  "qwen/qwen-2.5-72b-instruct:free",
  "google/gemma-2-9b-it:free",
  "mistralai/mistral-7b-instruct:free",
  "huggingfaceh4/zephyr-7b-beta:free"
]

function resolveModels(): string[] {
  const list = process.env.OPENROUTER_MODELS
  if (list) {
    const parsed = list.split(",").map((m) => m.trim()).filter(Boolean)
    if (parsed.length) return parsed
  }
  const single = process.env.OPENROUTER_MODEL
  if (single) return [single]
  return DEFAULT_FREE_MODELS
}

/**
 * Shared helper: sends a chat completion request to OpenRouter and returns the
 * generated text. Bir model listesi sırayla denenir; bir model başarısız olursa
 * (402 kredi/kota, 429 rate limit, 5xx, boş yanıt veya ağ hatası) otomatik
 * olarak sıradaki modele geçilir. API anahtarı sunucudan çıkmaz.
 */
async function callOpenRouter(
  systemPrompt: string,
  userPrompt: string,
  fallback = "",
  maxTokens = 150
): Promise<AIResult> {
  const apiKey = process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY
  const baseUrl = process.env.OPENROUTER_BASE_URL || process.env.OPENAI_BASE_URL || "https://openrouter.ai/api/v1"
  const models = resolveModels()

  if (!apiKey) {
    return { error: "OPENROUTER_API_KEY veya OPENAI_API_KEY environment variable is not set" }
  }

  const errors: string[] = []

  for (const model of models) {
    try {
      const response = await fetch(`${baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://eraydus.com",
          "X-Title": "Eraydus Admin",
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.7,
          max_tokens: maxTokens,
        }),
      })

      if (!response.ok) {
        const detail = await response.text().catch(() => "")
        errors.push(`${model}: ${response.status} ${response.statusText}${detail ? ` - ${detail.slice(0, 150)}` : ""}`)
        // 402/429/5xx → sıradaki modeli dene
        continue
      }

      const data = await response.json()
      const content: string = data.choices?.[0]?.message?.content?.trim() || ""
      if (content) {
        return { success: true, content }
      }
      errors.push(`${model}: boş yanıt`)
    } catch (err: any) {
      errors.push(`${model}: ${err?.message || "ağ hatası"}`)
    }
  }

  // Log full errors to server console before failing
  console.error("\n--- OPENROUTER AI FAILURES ---")
  errors.forEach(e => console.error(e))
  console.error("------------------------------\n")

  // Tüm modeller başarısız oldu: fallback varsa onu kullan, yoksa hatayı döndür
  if (fallback) {
    return { success: true, content: fallback }
  }
  return { error: `Tüm modeller başarısız oldu. Lütfen terminal loglarını kontrol edin.` }
}

// Brand guidelines to enforce the "Antigravity UX" luxury feel
const SYSTEM_PROMPT = `
Brand: Erayduş
Tone: Quiet Luxury, Minimalist, Architectural, Professional, Editorial.
Avoid: Cliché sales jargon, overly enthusiastic exclamation marks, generic marketing speak.
Focus: Premium craftsmanship, 6mm/8mm tempered glass, sleek profiles, smooth micro-animations, light/water harmony.
`

export async function generateContentIdea(contentType: string, language: string = 'tr') {
  const userPrompt = `
    Sen Erayduş adında lüks bir duşakabin markasının içerik stratejistisin.
    Bana ${contentType} (blog, sayfa veya sosyal medya) için son derece ilgi çekici, premium hissettiren TEK BİR başlık (title) önerisi üret.
    Sadece başlığı döndür, başka hiçbir açıklama veya tırnak işareti kullanma.
    Dil: ${language === 'tr' ? 'Türkçe' : 'İngilizce'}
  `

  const result = await callOpenRouter(SYSTEM_PROMPT, userPrompt, "", 60)
  if ('error' in result) {
    console.error("AI Error:", result.error)
    return { success: false, error: result.error }
  }

  return { success: true, title: result.content }
}

export async function generateSeoMeta(pageSlug: string, currentTitle: string = '') {
  const userPrompt = `
    Sen Erayduş adında lüks bir duşakabin markasının SEO uzmanısın.
    Hedef sayfa slug: "${pageSlug}"
    Mevcut/Önerilen başlık: "${currentTitle}"

    Bana bu sayfa için son derece optimize edilmiş, tıklanma oranını (CTR) artıracak ve lüks hissiyatı verecek bir Meta Başlık (Title) ve Meta Açıklama (Description) üret.
    
    Format tam olarak şöyle olmalı (başka hiçbir metin ekleme):
    TITLE: [Senin Ürettiğin Başlık]
    DESC: [Senin Ürettiğin Açıklama]
  `

  const result = await callOpenRouter(SYSTEM_PROMPT, userPrompt, "", 150)
  if ('error' in result) {
    console.error("AI Error:", result.error)
    return { success: false, error: result.error }
  }

  const titleMatch = result.content.match(/TITLE:\s*(.+)/)
  const descMatch = result.content.match(/DESC:\s*(.+)/)

  return { 
    success: true, 
    title: titleMatch ? titleMatch[1].trim() : '',
    description: descMatch ? descMatch[1].trim() : ''
  }
}
