import { createClient } from 'redis'

let redisClient: any = null

export async function getRedisClient() {
  if (redisClient) return redisClient

  if (process.env.REDIS_URL) {
    redisClient = createClient({
      url: process.env.REDIS_URL
    })
    
    redisClient.on('error', (err: any) => console.warn('Redis Client Error', err))
    
    await redisClient.connect()
    return redisClient
  }
  
  return null
}

export async function checkRateLimit(ip: string, limit: number = 10, windowInSeconds: number = 10): Promise<{ success: boolean }> {
  try {
    const redis = await getRedisClient()
    if (!redis) return { success: true } // Fallback allow if redis is not configured

    const key = `rate_limit:${ip}`
    const current = await redis.incr(key)
    
    if (current === 1) {
      await redis.expire(key, windowInSeconds)
    }

    if (current > limit) {
      return { success: false }
    }
    
    return { success: true }
  } catch (error) {
    console.warn('Rate limit error:', error)
    return { success: true } // Fail open
  }
}
