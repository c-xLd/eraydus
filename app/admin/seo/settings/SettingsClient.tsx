'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateSeoSettings } from '@/features/seo/actions'
import { toast } from 'sonner'
import { Settings, Save, AlertTriangle, ShieldAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function SettingsClient({ initialData }: { initialData: any }) {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  
  const [form, setForm] = useState({
    site_title: initialData?.site_title || 'Erayduş',
    default_meta_description: initialData?.default_meta_description || '',
    canonical_base_url: initialData?.canonical_base_url || 'https://www.eraydus.net',
    language: initialData?.language || 'tr',
    locale: initialData?.locale || 'tr_TR',
    product_title_template: initialData?.product_title_template || '{productName} | Erayduş',
    product_desc_template: initialData?.product_desc_template || '{productName} model duşakabin özellikleri.',
    robots_txt_content: initialData?.robots_txt_content || 'User-agent: *\nAllow: /'
  })

  // Robots Safety Lock Check
  const hasDangerousRobots = form.robots_txt_content.includes('Disallow: /') && !form.robots_txt_content.includes('Disallow: /admin')

  const handleSave = async () => {
    if (hasDangerousRobots) {
      const confirm = window.confirm('DİKKAT: Bütün siteyi Google\'a kapatıyorsunuz (Disallow: /). Emin misiniz?')
      if (!confirm) return
    }

    setIsSaving(true)
    try {
      await updateSeoSettings(form)
      toast.success('SEO ayarları kaydedildi')
      router.refresh()
    } catch (err: any) {
      toast.error(err.message || 'Kayıt sırasında hata oluştu')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="bg-white border rounded-3xl p-8 shadow-sm">
      <div className="flex items-center gap-2 mb-8 border-b pb-4">
        <Settings className="size-5 text-gray-500" />
        <h2 className="text-xl font-medium text-gray-900">Genel SEO & Şablonlar</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Site Ana Başlığı (Site Title)</Label>
            <Input 
              value={form.site_title}
              onChange={e => setForm(f => ({ ...f, site_title: e.target.value }))}
              placeholder="Örn: Erayduş"
            />
          </div>

          <div className="space-y-2">
            <Label>Varsayılan Meta Description</Label>
            <Textarea 
              value={form.default_meta_description}
              onChange={e => setForm(f => ({ ...f, default_meta_description: e.target.value }))}
              placeholder="Tüm sayfalar için fallback..."
            />
          </div>

          <div className="space-y-2">
            <Label>Canonical Base URL</Label>
            <Input 
              value={form.canonical_base_url}
              onChange={e => setForm(f => ({ ...f, canonical_base_url: e.target.value }))}
              placeholder="https://www.eraydus.net"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
            <h3 className="text-sm font-semibold text-blue-900 mb-4">Otomatik Şablonlar (Templates)</h3>
            <p className="text-xs text-blue-700 mb-4">Desteklenen değişkenler: <code>{`{productName}`}</code>, <code>{`{categoryName}`}</code></p>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-blue-900">Ürün Title Şablonu</Label>
                <Input 
                  value={form.product_title_template}
                  onChange={e => setForm(f => ({ ...f, product_title_template: e.target.value }))}
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-blue-900">Ürün Description Şablonu</Label>
                <Textarea 
                  value={form.product_desc_template}
                  onChange={e => setForm(f => ({ ...f, product_desc_template: e.target.value }))}
                  className="bg-white text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t space-y-4">
        <h3 className="text-sm font-semibold text-gray-900">Robots.txt İçeriği</h3>
        {hasDangerousRobots && (
          <div className="bg-rose-50 text-rose-700 p-4 rounded-xl flex gap-3 items-start border border-rose-100">
            <ShieldAlert className="size-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm">CRITICAL WARNING - SAFETY LOCK</p>
              <p className="text-xs mt-1">Girdiğiniz <code>Disallow: /</code> komutu tüm sitenizin indekslenmesini engeller. Bunu yaparsanız Google sitenizi arama sonuçlarından siler.</p>
            </div>
          </div>
        )}
        <Textarea 
          rows={5}
          className="font-mono text-sm bg-gray-50"
          value={form.robots_txt_content}
          onChange={e => setForm(f => ({ ...f, robots_txt_content: e.target.value }))}
        />
      </div>

      <div className="mt-8 flex justify-end">
        <Button onClick={handleSave} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700">
          <Save className="size-4 mr-2" /> 
          {isSaving ? 'Kaydediliyor...' : 'Ayarları Kaydet'}
        </Button>
      </div>
    </div>
  )
}
