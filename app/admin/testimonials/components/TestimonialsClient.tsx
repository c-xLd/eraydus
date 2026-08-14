'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2, Star, CheckCircle2, XCircle } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { createTestimonial, updateTestimonial, deleteTestimonial } from '@/features/homepage/actions/testimonials'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'

interface Testimonial {
  id: string
  name: string
  role?: string | null
  quote: string
  rating: number
  is_published: boolean
  image_url?: string | null
  created_at?: string
}

export function TestimonialsClient({ initialTestimonials }: { initialTestimonials: Testimonial[] }) {
  const router = useRouter()
  const [items, setItems] = useState<Testimonial[]>(initialTestimonials)
  
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    quote: '',
    rating: 5,
    is_published: true
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)

  const openNew = () => {
    setEditingItem(null)
    setFormData({ name: '', role: '', quote: '', rating: 5, is_published: true })
    setIsDialogOpen(true)
  }

  const openEdit = (item: Testimonial) => {
    setEditingItem(item)
    setFormData({
      name: item.name || '',
      role: item.role || '',
      quote: item.quote || '',
      rating: item.rating || 5,
      is_published: item.is_published
    })
    setIsDialogOpen(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (editingItem) {
        const { error } = await updateTestimonial(editingItem.id, formData)
        if (error) throw new Error(error)
        toast.success('Yorum başarıyla güncellendi.')
      } else {
        const { error } = await createTestimonial(formData)
        if (error) throw new Error(error)
        toast.success('Yeni yorum başarıyla eklendi.')
      }
      setIsDialogOpen(false)
      router.refresh()
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Bir hata oluştu'
      toast.error(msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!deletingId) return
    setIsSubmitting(true)
    try {
      const { error } = await deleteTestimonial(deletingId)
      if (error) throw new Error(error)
      toast.success('Yorum başarıyla silindi.')
      setItems(items.filter(i => i.id !== deletingId))
      setIsDeleteDialogOpen(false)
      router.refresh()
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Bir hata oluştu'
      toast.error(msg)
    } finally {
      setIsSubmitting(false)
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={openNew} className="gap-2 bg-black text-white hover:bg-black/80">
          <Plus className="size-4" />
          <span>Yeni Yorum Ekle</span>
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/50 text-muted-foreground uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-4">Müşteri / Konum</th>
              <th className="px-6 py-4">Yorum</th>
              <th className="px-6 py-4 text-center">Puan</th>
              <th className="px-6 py-4 text-center">Durum</th>
              <th className="px-6 py-4 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold text-foreground">{item.name}</div>
                  <div className="text-xs text-muted-foreground">{item.role || '-'}</div>
                </td>
                <td className="px-6 py-4 max-w-[300px] truncate text-muted-foreground">
                  {item.quote}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center text-champagne gap-0.5">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="size-3 fill-current" />
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  {item.is_published ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-600 text-xs font-medium">
                      <CheckCircle2 className="size-3.5" />
                      Aktif
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-50 text-zinc-500 text-xs font-medium">
                      <XCircle className="size-3.5" />
                      Pasif
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(item)}>
                      <Pencil className="size-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => {
                        setDeletingId(item.id)
                        setIsDeleteDialogOpen(true)
                      }}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                  Henüz yorum eklenmemiş.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Yorumu Düzenle' : 'Yeni Yorum Ekle'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-6 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Müşteri Adı (Google Kullanıcı Adı)</Label>
                <Input 
                  value={formData.name} 
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })} 
                  required 
                  placeholder="Örn: Ahmet Yılmaz"
                />
              </div>
              <div className="space-y-2">
                <Label>Konum / Alt Başlık (Opsiyonel)</Label>
                <Input 
                  value={formData.role} 
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, role: e.target.value })} 
                  placeholder="Örn: Çankaya, Ankara"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Yorum Metni</Label>
              <Textarea 
                value={formData.quote} 
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, quote: e.target.value })} 
                required 
                rows={4}
                placeholder="Google'daki yorumu buraya yapıştırın..."
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Puan (Yıldız)</Label>
                <Input 
                  type="number" 
                  min={1} 
                  max={5} 
                  value={formData.rating} 
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, rating: Number(e.target.value) })} 
                  className="w-24"
                />
              </div>
              
              <div className="flex items-center gap-3">
                <Label>Sitede Göster</Label>
                <Switch 
                  checked={formData.is_published}
                  onCheckedChange={checked => setFormData({ ...formData, is_published: checked })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                İptal
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-black text-white hover:bg-black/80">
                {isSubmitting ? 'Kaydediliyor...' : 'Kaydet'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Emin misiniz?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground mt-2">
            Bu yorum kalıcı olarak silinecektir. Bu işlem geri alınamaz.
          </p>
          <div className="flex justify-end gap-3 pt-4 mt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              İptal
            </Button>
            <Button 
              type="button"
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Siliniyor...' : 'Evet, Sil'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

