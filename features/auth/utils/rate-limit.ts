/**
 * Lightweight in-memory rate limiter for authentication attempts.
 *
 * NOTE: This is a per-instance (per-runtime) limiter. On serverless it protects
 * each warm instance and mitigates the most common brute-force / credential
 * stuffing bursts. For a hard, cluster-wide guarantee, back it with a shared
 * store (Supabase table / Redis). The interface below is intentionally simple
 * so it can be swapped without touching call sites.
 */

type Bucket = {
  count: number
  // epoch ms when the current window started
  windowStart: number
  // epoch ms until which the key is locked out (0 = not locked)
  lockedUntil: number
}

const WINDOW_MS = 15 * 60 * 1000 // 15 minutes
const MAX_ATTEMPTS = 5 // failed attempts allowed per window
const LOCKOUT_MS = 15 * 60 * 1000 // lockout duration after exceeding attempts

const buckets = new Map<string, Bucket>()

// Opportunistic cleanup so the map cannot grow unbounded.
function sweep(now: number) {
  if (buckets.size < 5000) return
  for (const [key, b] of buckets) {
    if (b.lockedUntil < now && now - b.windowStart > WINDOW_MS) {
      buckets.delete(key)
    }
  }
}

export type RateLimitResult =
  | { allowed: true }
  | { allowed: false; retryAfterSeconds: number }

/**
 * Checks whether a key (e.g. `${ip}:${email}`) is currently allowed to attempt.
 * Does NOT consume an attempt — call `registerFailure` after a failed attempt
 * and `reset` after a successful one.
 */
export function checkRateLimit(key: string, now = Date.now()): RateLimitResult {
  sweep(now)
  const bucket = buckets.get(key)
  if (!bucket) return { allowed: true }

  if (bucket.lockedUntil > now) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((bucket.lockedUntil - now) / 1000),
    }
  }
  return { allowed: true }
}

/** Records a failed attempt and locks the key out once the threshold is hit. */
export function registerFailure(key: string, now = Date.now()): RateLimitResult {
  const bucket = buckets.get(key)

  if (!bucket || now - bucket.windowStart > WINDOW_MS) {
    buckets.set(key, { count: 1, windowStart: now, lockedUntil: 0 })
    return { allowed: true }
  }

  bucket.count += 1

  if (bucket.count >= MAX_ATTEMPTS) {
    bucket.lockedUntil = now + LOCKOUT_MS
    return { allowed: false, retryAfterSeconds: Math.ceil(LOCKOUT_MS / 1000) }
  }

  return { allowed: true }
}

/** Clears the bucket for a key after a successful authentication. */
export function reset(key: string) {
  buckets.delete(key)
}
