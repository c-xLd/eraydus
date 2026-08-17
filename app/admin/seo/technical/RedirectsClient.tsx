'use client'

import { useState } from 'react'
import { createRedirect } from '@/features/seo/actions'
import { toast } from 'sonner'
import { ArrowRight, Link as LinkIcon, AlertCircle, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'

export default function RedirectsClient({ initialRedirects, initial404 }: { initialRedirects: any[], initial404: any[] }) {
  const [redirects, setRedirects] = useState(initialRedirects)
  const [logs] = useState(initial404)
  const [isOpen, setIsOpen] = useState(false)
  const [oldUrl, setOldUrl] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!oldUrl.startsWith('/')) return toast.error('Eski URL / ile başlamalıdır.')
    if (!newUrl.startsWith('/') && !newUrl.startsWith('http')) return toast.error('Yeni URL geçerli bir formatta olmalıdır.')

    setIsSubmitting(true)
    try {
      await createRedirect(oldUrl, newUrl)
      toast.success('Yönlendirme oluşturuldu')
      setRedirects(prev => [{ old_url: oldUrl, new_url: newUrl, status_code: 301, hit_count: 0 }, ...prev])
      setIsOpen(false)
      setOldUrl('')
      setNewUrl('')
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* 404 Logs Section */}
      <div className="bg-white border rounded-3xl p-6 shadow-sm">
        <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
          <AlertCircle className="size-5 text-red-500" />
          Son 404 Hataları (Kırık Linkler)
        </h2>
        {logs.length === 0 ? (
          <p className="text-sm text-gray-500 bg-gray-50 p-4 rounded-xl">Şu an için tespit edilen bir 404 hatası bulunmuyor.</p>
        ) : (
          <div className="border rounded-xl overflow-hidden divide-y">
            {logs.map(log => (
              <div key={log.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                <div>
                  <p className="text-sm font-semibold text-red-600">{log.url}</p>
                  <p className="text-xs text-gray-500 mt-1">Hit: {log.hit_count} | Referrer: {log.referrer || 'Direct'}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => {
                  setOldUrl(log.url)
                  setIsOpen(true)
                }}>
                  Çöz (301 Yönlendir)
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Redirects List */}
      <div className="bg-white border rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
            <LinkIcon className="size-5 text-blue-500" />
            Aktif 301 Yönlendirmeleri
          </h2>
          <Button size="sm" onClick={() => setIsOpen(true)}>
            <Plus className="size-4 mr-2" /> Yeni Yönlendirme
          </Button>
        </div>
        
        {redirects.length === 0 ? (
          <p className="text-sm text-gray-500 bg-gray-50 p-4 rounded-xl">Henüz bir yönlendirme (301) kuralı oluşturulmamış.</p>
        ) : (
          <div className="border rounded-xl overflow-hidden divide-y">
            {redirects.map((r, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-900">{r.old_url}</span>
                  <ArrowRight className="size-4 text-gray-400" />
                  <span className="text-sm font-medium text-green-600">{r.new_url}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded">Hit: {r.hit_count}</span>
                  <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-1 rounded">{r.status_code}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Yeni 301 Yönlendirmesi</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="space-y-2">
              <Label>Eski URL Path (örn: /eski-urun)</Label>
              <Input required value={oldUrl} onChange={e => setOldUrl(e.target.value)} placeholder="/eski-link" />
            </div>
            <div className="space-y-2">
              <Label>Yeni URL (örn: /yeni-urun veya https://...)</Label>
              <Input required value={newUrl} onChange={e => setNewUrl(e.target.value)} placeholder="/yeni-hedef" />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>İptal</Button>
              <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Kaydediliyor...' : 'Oluştur'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
