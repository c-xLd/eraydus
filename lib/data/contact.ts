export const BUSINESS_PHONE_DISPLAY = '(0312) 350 79 39'
export const BUSINESS_PHONE_E164 = '+903123507939'
export const WHATSAPP_DISPLAY = '0554 883 00 71'
export const WHATSAPP_E164 = '+905548830071'
export const WHATSAPP_DIGITS = '905548830071'

const TEMPLATE_PHONE_DIGITS = new Set([
  '905551234567',
  '905550000000',
  '905000000000',
])

export function normalizeWhatsappNumber(value: unknown): string {
  if (typeof value !== 'string') return WHATSAPP_E164

  const digits = value.replace(/\D/g, '')
  if (!digits || TEMPLATE_PHONE_DIGITS.has(digits)) return WHATSAPP_E164

  return value
}
