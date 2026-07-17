'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

import { createClient } from '@/services/supabase/server'
import { loginSchema } from '@/features/auth/schema'
import { checkRateLimit, registerFailure, reset } from '@/features/auth/utils/rate-limit'

export type SignInState = { error?: string }

// Generic message — never reveal whether the email exists or the password is
// wrong (prevents user enumeration).
const GENERIC_AUTH_ERROR = 'Giriş başarısız. Bilgilerinizi kontrol edip tekrar deneyin.'

async function getClientIp(): Promise<string> {
  const h = await headers()
  const forwarded = h.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0]!.trim()
  return h.get('x-real-ip')?.trim() || 'unknown'
}

export async function signIn(formData: FormData): Promise<SignInState> {
  // 1) Honeypot — bots fill hidden fields; humans never see them.
  const honeypot = (formData.get('company') as string | null)?.trim()
  if (honeypot) {
    // Silently reject with the generic error; give no signal to the bot.
    return { error: GENERIC_AUTH_ERROR }
  }

  // 2) Server-side validation (never trust the client).
  const parsed = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? GENERIC_AUTH_ERROR }
  }
  const { email, password } = parsed.data
  const normalizedEmail = email.toLowerCase()

  // 3) Rate limiting (per IP + email) to blunt brute-force / credential stuffing.
  const ip = await getClientIp()
  const rlKey = `${ip}:${normalizedEmail}`

  const gate = checkRateLimit(rlKey)
  if (!gate.allowed) {
    const minutes = Math.max(1, Math.ceil(gate.retryAfterSeconds / 60))
    return {
      error: `Çok fazla başarısız deneme. Lütfen ${minutes} dakika sonra tekrar deneyin.`,
    }
  }

  // 4) Authenticate.
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email: normalizedEmail,
    password,
  })

  if (error) {
    const failure = registerFailure(rlKey)
    if (!failure.allowed) {
      const minutes = Math.max(1, Math.ceil(failure.retryAfterSeconds / 60))
      return {
        error: `Çok fazla başarısız deneme. Lütfen ${minutes} dakika sonra tekrar deneyin.`,
      }
    }
    return { error: GENERIC_AUTH_ERROR }
  }

  // 5) Success — clear the rate-limit bucket and enter the admin area.
  reset(rlKey)
  revalidatePath('/admin', 'layout')
  redirect('/admin')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()

  revalidatePath('/', 'layout')
  redirect('/giris')
}
