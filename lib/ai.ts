// ============================================================
// Paylaşılan AI istemcisi (OpenRouter)
// Tüm admin AI üreticileri (ürün, içerik, SEO) buradan geçer.
// - Bir model listesi sırayla denenir; biri başarısız olursa (402/404/429/5xx/
//   boş yanıt/ağ hatası) otomatik olarak sıradaki modele geçilir.
// - 429 (rate limit) ve 5xx için aynı model kısa bir backoff ile bir kez daha
//   denenir; ücretsiz modeller sağlayıcı tarafında paylaşımlı limitli olduğu için
//   bu, geçici limitleri aşmaya yardımcı olur.
// - API anahtarı sunucudan çıkmaz.
// ============================================================

export type AIResult = { success: true; content: string } | { error: string }

/**
 * Varsayılan ücretsiz OpenRouter model zinciri (Temmuz 2026 itibarıyla geçerli
 * slug'lar). `OPENROUTER_MODELS` env'i (virgülle ayrılmış) ile override edilebilir;
 * tek model için `OPENROUTER_MODEL` de desteklenir.
 */
const DEFAULT_FREE_MODELS = [
  "meta-llama/llama-3-8b-instruct:free",
  "qwen/qwen-2.5-72b-instruct:free",
  "google/gemma-2-9b-it:free",
  "mistralai/mistral-7b-instruct:free",
  "huggingfaceh4/zephyr-7b-beta:free",
  "meta-llama/llama-3.2-3b-instruct:free",
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

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

/**
 * OpenRouter chat completion çağrısı yapar ve üretilen metni döndürür.
 * @param fallback  Tüm modeller başarısız olursa döndürülecek yedek metin.
 *                  Boşsa hata döndürülür.
 * @param maxTokens Yanıt için üst sınır.
 */
export async function callOpenRouter(
  systemPrompt: string,
  userPrompt: string,
  fallback = "",
  maxTokens = 1024
): Promise<AIResult> {
  const apiKey = process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY
  const baseUrl =
    process.env.OPENROUTER_BASE_URL || process.env.OPENAI_BASE_URL || "https://openrouter.ai/api/v1"
  const models = resolveModels()

  if (!apiKey) {
    return { error: "OPENROUTER_API_KEY (veya OPENAI_API_KEY) tanımlı değil." }
  }

  const errors: string[] = []

  for (const model of models) {
    // Her model için: ilk deneme + 429/5xx durumunda kısa backoff ile 1 tekrar.
    for (let attempt = 0; attempt < 2; attempt++) {
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

        if (response.ok) {
          const data = await response.json()
          const content: string = data.choices?.[0]?.message?.content?.trim() || ""
          if (content) return { success: true, content }
          errors.push(`${model}: boş yanıt`)
          break // boş yanıt → sıradaki model
        }

        const detail = await response.text().catch(() => "")
        errors.push(
          `${model}: ${response.status} ${response.statusText}${detail ? ` - ${detail.slice(0, 120)}` : ""}`
        )

        // 429 / 5xx → aynı modeli bir kez daha dene (kısa backoff + jitter)
        if ((response.status === 429 || response.status >= 500) && attempt === 0) {
          await sleep(600 + Math.floor(Math.random() * 400))
          continue
        }
        break // 402/404/4xx → tekrar denemeden sıradaki modele geç
      } catch (err: any) {
        errors.push(`${model}: ${err?.message || "ağ hatası"}`)
        if (attempt === 0) {
          await sleep(500)
          continue
        }
        break
      }
    }
  }

  // Sunucu konsoluna tüm hataları yaz
  console.error("\n--- OPENROUTER AI FAILURES ---")
  errors.forEach((e) => console.error(e))
  console.error("------------------------------\n")

  if (fallback) return { success: true, content: fallback }
  return {
    error:
      "Tüm AI modelleri başarısız oldu (ücretsiz limit/kota). Terminal loglarına bakın veya OpenRouter'a kredi ekleyin.",
  }
}
