export type AIResult = { content: string } | { error: string }

export async function callOpenRouter(
  systemPrompt: string,
  userPrompt: string,
  modelOverride: string = '',
  maxTokens: number = 250
): Promise<AIResult> {
  const apiKey = process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY

  if (!apiKey) {
    return { error: 'API anahtarı bulunamadı (OPENROUTER_API_KEY veya OPENAI_API_KEY ekleyin).' }
  }

  const model = modelOverride || process.env.OPENROUTER_MODEL || 'google/gemini-2.0-flash-001'

  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://eraydus.net',
        'X-Title': 'Erayduş Showroom',
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        max_tokens: maxTokens,
        temperature: 0.7,
      }),
    })

    if (!res.ok) {
      const errText = await res.text()
      return { error: `AI Yanıtı Alınamadı (${res.status}): ${errText}` }
    }

    const data = await res.json()
    const content = data.choices?.[0]?.message?.content?.trim() || ''

    return { content }
  } catch (err: any) {
    return { error: err.message || 'AI servisine bağlanırken beklenmeyen bir hata oluştu.' }
  }
}
