import { readFile } from 'node:fs/promises'
import nextEnv from '@next/env'
import { createClient } from '@supabase/supabase-js'

const { loadEnvConfig } = nextEnv
loadEnvConfig(process.cwd())

const EXAMPLE_SLUG = 'dusakabin-cam-kalinligi-ne-olmali'
const DUPLICATE_SLUG = '6-mm-mi-8-mm-dusakabin'
const CONTENT_PATH = new URL('../lib/data/editorial-blog-posts.json', import.meta.url)
const BACKUP_BUCKET = 'projects'
const backupTimestamp = new Date().toISOString().replace(/[:.]/g, '-')
const BACKUP_PATH = `backups/blog-before-editorial-rewrite-${backupTimestamp}.json`

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL ve SUPABASE_SERVICE_ROLE_KEY gerekli.')
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

const editorialPosts = JSON.parse(await readFile(CONTENT_PATH, 'utf8'))
  .filter((post) => post.slug !== EXAMPLE_SLUG)

if (editorialPosts.length !== 20) {
  throw new Error(`20 düzenlenecek yazı bekleniyordu; ${editorialPosts.length} bulundu.`)
}

const uniqueSlugs = new Set(editorialPosts.map((post) => post.slug))
if (uniqueSlugs.size !== editorialPosts.length) {
  throw new Error('İçerik paketinde yinelenen slug bulundu.')
}

const { data: existingPosts, error: readError } = await supabase
  .from('blog')
  .select('*')
  .order('created_at', { ascending: true })

if (readError) throw readError

const existingBySlug = new Map(existingPosts.map((post) => [post.slug, post]))
const missingSlugs = editorialPosts
  .map((post) => post.slug)
  .filter((slug) => !existingBySlug.has(slug))

if (!existingBySlug.has(EXAMPLE_SLUG) || !existingBySlug.has(DUPLICATE_SLUG) || missingSlugs.length > 0) {
  throw new Error(`Veritabanında eksik kayıt var: ${missingSlugs.join(', ') || 'örnek veya eski kopya yazı'}`)
}

const backupBody = JSON.stringify({
  created_at: new Date().toISOString(),
  reason: 'Humanizer standardına göre blog editoryal revizyonu öncesi yedek',
  posts: existingPosts,
}, null, 2)

const { error: backupError } = await supabase.storage
  .from(BACKUP_BUCKET)
  .upload(BACKUP_PATH, backupBody, {
    contentType: 'application/json',
    upsert: false,
  })

if (backupError) throw new Error(`Yedek oluşturulamadı: ${backupError.message}`)

const updatedAt = new Date().toISOString()
const rowsToUpsert = editorialPosts.map((post) => ({
  ...existingBySlug.get(post.slug),
  title: post.title,
  description: post.description,
  body: post.body,
  featured_image: post.featured_image,
  seo_title: post.seo_title,
  seo_description: post.seo_description,
  tags: post.tags,
  status: post.status,
  updated_at: updatedAt,
}))

rowsToUpsert.push({
  ...existingBySlug.get(DUPLICATE_SLUG),
  status: 'draft',
  updated_at: updatedAt,
})

const { error: updateError } = await supabase
  .from('blog')
  .upsert(rowsToUpsert, { onConflict: 'id' })

if (updateError) throw new Error(`Blog kayıtları güncellenemedi: ${updateError.message}`)

const { data: verification, error: verificationError } = await supabase
  .from('blog')
  .select('slug, title, status, body, featured_image, updated_at')
  .in('slug', [...uniqueSlugs, EXAMPLE_SLUG, DUPLICATE_SLUG])

if (verificationError) throw verificationError

const verifiedBySlug = new Map(verification.map((post) => [post.slug, post]))
for (const editorialPost of editorialPosts) {
  const savedPost = verifiedBySlug.get(editorialPost.slug)
  if (!savedPost || savedPost.title !== editorialPost.title || savedPost.body !== editorialPost.body) {
    throw new Error(`${editorialPost.slug} doğrulaması başarısız.`)
  }
}

if (verifiedBySlug.get(DUPLICATE_SLUG)?.status !== 'draft') {
  throw new Error('Eski kopya yazı taslağa alınamadı.')
}

const exampleBefore = existingBySlug.get(EXAMPLE_SLUG)
const exampleAfter = verifiedBySlug.get(EXAMPLE_SLUG)
if (exampleAfter?.title !== exampleBefore?.title || exampleAfter?.body !== exampleBefore?.body) {
  throw new Error('Örnek yazının değişmediği doğrulanamadı.')
}

console.log(JSON.stringify({
  updated: editorialPosts.length,
  untouchedExample: EXAMPLE_SLUG,
  redirectedDuplicate: DUPLICATE_SLUG,
  backup: `${BACKUP_BUCKET}/${BACKUP_PATH}`,
}, null, 2))
