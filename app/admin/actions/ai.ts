"use server"

import { callAI, testAIConnection, OLLAMA_MODELS, type AIModelOption } from '@/lib/ai'

// Brand guidelines to enforce the "Antigravity UX" luxury feel
const SYSTEM_PROMPT = `
Brand: Erayduş
Tone: Quiet Luxury, Minimalist, Architectural, Professional, Editorial.
Avoid: Cliché sales jargon, overly enthusiastic exclamation marks, generic marketing speak, "Bu kapsamlı rehberde", "Sonuç olarak", "Özetle".
Focus: Premium craftsmanship, 6mm / 8mm tempered glass, sleek profiles, smooth micro-animations, light/water harmony.
`

export async function getAvailableModels(): Promise<AIModelOption[]> {
  return OLLAMA_MODELS as unknown as AIModelOption[]
}

export async function testAiStatus(model: string = 'gemma4:31b') {
  try {
    return await testAIConnection(model)
  } catch (err: any) {
    return {
      success: false,
      provider: 'ollama' as const,
      model,
      latencyMs: 0,
      message: err.message || 'Bağlantı testi başarısız oldu'
    }
  }
}

export async function generateContentIdea(
  contentType: string,
  language: string = 'tr',
  modelOverride: string = 'gemma4:31b'
) {
  const userPrompt = `
    Sen Erayduş adında lüks bir duşakabin markasının içerik stratejistisin.
    Bana ${contentType} (blog, sayfa veya sosyal medya) için son derece ilgi çekici, premium hissettiren TEK BİR başlık (title) önerisi üret.
    Sadece başlığı döndür, başka hiçbir açıklama veya tırnak işareti kullanma.
    Dil: ${language === 'tr' ? 'Türkçe' : 'İngilizce'}
  `

  const result = await callAI(SYSTEM_PROMPT, userPrompt, modelOverride, 120)
  if ('error' in result && result.error) {
    console.error("AI Error:", result.error)
    return { success: false, error: result.error }
  }

  return { success: true, title: result.content, model: result.model }
}

export async function generateSeoMeta(
  pageSlug: string,
  currentTitle: string = '',
  modelOverride: string = 'gemma4:31b'
) {
  const userPrompt = `
    Sen Erayduş adında lüks bir duşakabin markasının SEO uzmanısın.
    Hedef sayfa/ürün: "${pageSlug}"
    Mevcut/Önerilen başlık: "${currentTitle}"

    Bana bu sayfa için son derece optimize edilmiş, tıklanma oranını (CTR) artıracak, Google standartlarında bir Meta Başlık (Title, max 60 karakter) ve Meta Açıklama (Description, max 160 karakter) üret.
    
    Format tam olarak şöyle olmalı (başka hiçbir metin ekleme):
    TITLE: [Senin Ürettiğin Başlık]
    DESC: [Senin Ürettiğin Açıklama]
  `

  const result = await callAI(SYSTEM_PROMPT, userPrompt, modelOverride, 250)
  if ('error' in result && result.error) {
    console.error("AI Error:", result.error)
    return { success: false, error: result.error }
  }

  const content = result.content || ''
  const titleMatch = content.match(/TITLE:\s*(.+)/i)
  const descMatch = content.match(/DESC:\s*(.+)/i)

  return { 
    success: true, 
    title: titleMatch ? titleMatch[1].trim() : (currentTitle || pageSlug),
    description: descMatch ? descMatch[1].trim() : '',
    model: result.model
  }
}

export async function generateSocialCopy(
  productName: string,
  platform: 'instagram' | 'whatsapp' | 'linkedin' = 'instagram',
  modelOverride: string = 'gemma4:31b'
) {
  let promptDetails = ''
  if (platform === 'whatsapp') {
    promptDetails = `"${productName}" için doğrudan müşteriye gönderilecek, samimi, güven veren, net ve kısa bir WhatsApp teklif/bilgilendirme mesajı yaz.`
  } else if (platform === 'instagram') {
    promptDetails = `"${productName}" için Instagram gönderi açıklaması (caption) ve 4-5 ilgili hashtag yaz. Minimalist, estetik ve mimari lüks hissiyatı ver.`
  } else {
    promptDetails = `"${productName}" için LinkedIn'de mimarlar, iç mimarlar ve inşaat projelerine hitap eden kurumsal bir paylaşım metni hazırla.`
  }

  const result = await callAI(SYSTEM_PROMPT, promptDetails, modelOverride, 400)
  if ('error' in result && result.error) {
    return { success: false, error: result.error }
  }

  return { success: true, content: result.content, model: result.model }
}

export async function generateCustomPrompt(
  prompt: string,
  customSystemPrompt: string = '',
  modelOverride: string = 'gemma4:31b',
  maxTokens: number = 1000
) {
  const finalSys = customSystemPrompt || SYSTEM_PROMPT
  const result = await callAI(finalSys, prompt, modelOverride, maxTokens)
  if ('error' in result && result.error) {
    return { success: false, error: result.error }
  }
  return { success: true, content: result.content, model: result.model }
}

