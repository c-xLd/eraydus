4. AI servisini oluştur
lib/ai/deepseek.ts
Önerilen
import OpenAI from "openai"

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
})

export async function generateProductSEO(prompt: string) {
  const completion = await client.chat.completions.create({
    model: "deepseek/deepseek-chat",
    messages: [
      { role: "system", content: "Sen lüks duş kabini SEO uzmanısın." },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
  })

  return completion.choices[0].message.content || ""
}
5. Server Action
features/admin/products/actions/generate-seo.ts
Server
'use server'

import { generateProductSEO } from '@/lib/ai/deepseek'

export async function generateSEO(data: {
  name: string
  color: string
  size: string
}) {
  return await generateProductSEO(`
Ürün: ${data.name}
Renk: ${data.color}
Ölçü: ${data.size}

SEO başlığı ve meta açıklama üret.
`)
}
6. Admin panel butonu
Product form
UI
<Button
  onClick={async () => {
    const result = await generateSEO({
      name: productName,
      color: productColor,
      size: productSize,
    })

    setMetaDescription(result)
  }}
>
  AI ile SEO Oluştur
</Button>