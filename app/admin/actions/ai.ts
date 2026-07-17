"use server"

// ============================================================
// AI Content Generation — paylaşılan istemci (@/lib/ai) üzerinden.
// ============================================================

import { callOpenRouter } from '@/lib/ai'

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
