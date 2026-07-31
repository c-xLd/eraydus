import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface FaqItem {
  question: string
  answer: string
}

export function ProductFaq({ faqs }: { faqs?: FaqItem[] }) {
  if (!faqs || faqs.length === 0) return null

  return (
    <div className="space-y-12">
      <h2 className="text-3xl font-medium tracking-tight">Sıkça Sorulan Sorular</h2>
      
      <Accordion className="w-full">
        {faqs.map((faq, idx) => (
          <AccordionItem key={idx} value={`item-${idx}`}>
            <AccordionTrigger className="text-left text-lg font-medium">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed text-base">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
