'use client'

import { useState } from 'react'
import { updateSeoSettings } from '@/features/seo/actions'
import { toast } from 'sonner'
import { Save, Code2, Link, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

export default function SchemaClient({ initialData }: { initialData: any }) {
  const [isSaving, setIsSaving] = useState(false)
  
  const [form, setForm] = useState({
    organization_name: initialData?.organization_name || 'Erayduş',
    organization_logo: initialData?.organization_logo || '',
    contact_phone: initialData?.contact_phone || '',
    contact_email: initialData?.contact_email || '',
    social_facebook: initialData?.social_facebook || '',
    social_instagram: initialData?.social_instagram || '',
    social_twitter: initialData?.social_twitter || '',
    enable_product_schema: initialData?.enable_product_schema ?? true,
    enable_breadcrumb_schema: initialData?.enable_breadcrumb_schema ?? true,
  })

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await updateSeoSettings({ schema_settings: form })
      toast.success('Schema ayarları kaydedildi')
    } catch (err: any) {
      toast.error(err.message || 'Hata oluştu')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="bg-white border rounded-3xl p-8 shadow-sm">
      <div className="flex flex-col gap-6">
        
        {/* Toggle Switches */}
        <div className="flex gap-8 border-b pb-8">
          <div className="flex items-center justify-between flex-1 bg-gray-50 p-4 rounded-2xl">
            <div>
              <h3 className="font-medium text-gray-900">Product Schema</h3>
              <p className="text-xs text-gray-500 mt-1">Ürün sayfalarında otomatik JSON-LD oluştur</p>
            </div>
            <Switch 
              checked={form.enable_product_schema} 
              onCheckedChange={(v) => setForm(f => ({ ...f, enable_product_schema: v }))} 
            />
          </div>
          <div className="flex items-center justify-between flex-1 bg-gray-50 p-4 rounded-2xl">
            <div>
              <h3 className="font-medium text-gray-900">Breadcrumb Schema</h3>
              <p className="text-xs text-gray-500 mt-1">Navigasyon yollarını Google'a bildir</p>
            </div>
            <Switch 
              checked={form.enable_breadcrumb_schema} 
              onCheckedChange={(v) => setForm(f => ({ ...f, enable_breadcrumb_schema: v }))} 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LocalBusiness / Organization */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <MapPin className="size-4 text-blue-500" /> Kurumsal Bilgiler (LocalBusiness)
            </h3>
            <div className="space-y-2">
              <Label>Firma Adı</Label>
              <Input 
                value={form.organization_name}
                onChange={e => setForm(f => ({ ...f, organization_name: e.target.value }))}
                placeholder="Erayduş"
              />
            </div>
            <div className="space-y-2">
              <Label>Logo URL</Label>
              <Input 
                value={form.organization_logo}
                onChange={e => setForm(f => ({ ...f, organization_logo: e.target.value }))}
                placeholder="https://eraydus.net/logo.png"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Telefon</Label>
                <Input 
                  value={form.contact_phone}
                  onChange={e => setForm(f => ({ ...f, contact_phone: e.target.value }))}
                  placeholder="+90 555..."
                />
              </div>
              <div className="space-y-2">
                <Label>E-Posta</Label>
                <Input 
                  value={form.contact_email}
                  onChange={e => setForm(f => ({ ...f, contact_email: e.target.value }))}
                  placeholder="info@eraydus.net"
                />
              </div>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <Link className="size-4 text-indigo-500" /> Sosyal Medya (SameAs)
            </h3>
            <div className="space-y-2">
              <Label>Instagram URL</Label>
              <Input 
                value={form.social_instagram}
                onChange={e => setForm(f => ({ ...f, social_instagram: e.target.value }))}
                placeholder="https://instagram.com/..."
              />
            </div>
            <div className="space-y-2">
              <Label>Facebook URL</Label>
              <Input 
                value={form.social_facebook}
                onChange={e => setForm(f => ({ ...f, social_facebook: e.target.value }))}
                placeholder="https://facebook.com/..."
              />
            </div>
            <div className="space-y-2">
              <Label>Twitter / X URL</Label>
              <Input 
                value={form.social_twitter}
                onChange={e => setForm(f => ({ ...f, social_twitter: e.target.value }))}
                placeholder="https://twitter.com/..."
              />
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t flex justify-end">
          <Button onClick={handleSave} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700">
            <Save className="size-4 mr-2" /> 
            {isSaving ? 'Kaydediliyor...' : 'Schema Ayarlarını Kaydet'}
          </Button>
        </div>
      </div>
    </div>
  )
}
