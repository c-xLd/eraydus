"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Save, Settings2, Bell, Mail, Phone, ShoppingBag, ShieldAlert, Sparkles, Cpu, ArrowRight } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { updateSiteSettings } from "../actions"

const generalSettingsSchema = z.object({
  maintenanceMode: z.boolean(),
  contactEmail: z.string().email("Geçerli bir e-posta adresi girin"),
  whatsappNumber: z.string().min(10, "Geçerli bir WhatsApp numarası girin"),
  showPrices: z.boolean(),
  enableOnlineQuotes: z.boolean(),
  orderNotificationEmail: z.string().email("Geçerli bir e-posta adresi girin"),
  autoReplyMessage: z.string().optional()
})

type GeneralSettingsValues = z.infer<typeof generalSettingsSchema>

export function SettingsClient({ initialData }: { initialData: any }) {
  const [isSaving, setIsSaving] = useState(false)

  const defaultValues = {
    maintenanceMode: initialData?.maintenanceMode || false,
    contactEmail: initialData?.contactEmail || "info@eraydus.net",
    whatsappNumber: initialData?.whatsappNumber || "+905551234567",
    showPrices: initialData?.showPrices ?? true,
    enableOnlineQuotes: initialData?.enableOnlineQuotes ?? true,
    orderNotificationEmail: initialData?.orderNotificationEmail || "satis@eraydus.net",
    autoReplyMessage: initialData?.autoReplyMessage || "Talebiniz alınmıştır, en kısa sürede dönüş yapılacaktır."
  }

  const { register, handleSubmit, formState: { errors, isDirty }, watch, setValue } = useForm<GeneralSettingsValues>({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues
  })

  // Watch for toggles
  const maintenanceMode = watch("maintenanceMode")
  const showPrices = watch("showPrices")
  const enableOnlineQuotes = watch("enableOnlineQuotes")

  const onSubmit = async (data: GeneralSettingsValues) => {
    setIsSaving(true)
    const result = await updateSiteSettings(data)
    setIsSaving(false)
    
    if (result.success) {
      toast.success("Platform Ayarları başarıyla güncellendi", {
        description: "Değişiklikler tüm sisteme uygulandı.",
      })
    } else {
      toast.error("Hata", {
        description: "Kaydedilirken hata oluştu: " + result.error,
      })
    }
  }

  // Custom Toggle Component to keep code clean
  const Toggle = ({ checked, onChange, danger = false }: { checked: boolean, onChange: (val: boolean) => void, danger?: boolean }) => (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 ${
        checked ? (danger ? 'bg-red-500' : 'bg-black') : 'bg-neutral-200'
      }`}
    >
      <span className="sr-only">Ayar Değiştir</span>
      <span
        aria-hidden="true"
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-300 ease-in-out ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto pb-32">
      
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-black/5 pb-4 pt-6 mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-black">
            Platform Ayarları
          </h1>
          <p className="text-sm text-black/50 mt-1 font-light">
            Sistemin temel çalışma dinamiklerini ve operasyonel tercihlerini yönetin.
          </p>
        </div>
        <button 
          type="submit"
          disabled={isSaving || !isDirty} 
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-black text-white text-sm font-medium rounded-xl hover:bg-neutral-800 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-y-0"
        >
          {isSaving ? (
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="size-4 border-[1.5px] border-white/30 border-t-white rounded-full" 
            />
          ) : (
            <Save className="size-4" />
          )}
          {isSaving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
        </button>
      </div>

      <div className="space-y-12">
        {/* AI & Cloud Limits Banner Card */}
        <Link href="/admin/settings/ai" className="block group">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-slate-800 shadow-xl transition-all hover:shadow-indigo-500/10 hover:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
                <Cpu className="size-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold text-white">Ollama Cloud AI & Limit Kontrol Paneli</h3>
                  <span className="text-[10px] uppercase font-bold tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    Ücretsiz Modeller
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1 font-light">
                  Oturum limitleri (%0.2), haftalık kotalar, model havuzu ve Humanizer kurallarını yönetin.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300 group-hover:text-white transition-colors shrink-0">
              <span>Limitleri İncele</span>
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>

        {/* Section 1: Sistem Durumu */}
        <section className="scroll-mt-32" id="general">
          <div className="mb-6">
            <h3 className="text-base font-semibold text-black flex items-center gap-2">
              <Settings2 className="size-4 text-black/50" />
              Sistem Durumu
            </h3>
            <p className="text-sm text-black/50 mt-1 font-light">Sitenin genel erişilebilirliğini yönetin.</p>
          </div>
          
          <div className="bg-white rounded-2xl border border-black/5 p-6 shadow-sm">
            <div className={`p-6 rounded-xl border transition-colors duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-6 ${maintenanceMode ? 'bg-red-50/50 border-red-100' : 'bg-neutral-50/50 border-neutral-200'}`}>
              <div className="flex gap-4 items-start">
                <div className={`p-3 rounded-full shrink-0 ${maintenanceMode ? 'bg-red-100/80 text-red-600' : 'bg-white text-black/60 shadow-sm'}`}>
                  <ShieldAlert className="size-5" />
                </div>
                <div>
                  <h4 className={`text-sm font-semibold ${maintenanceMode ? 'text-red-900' : 'text-black'}`}>Site Bakım Modu</h4>
                  <p className={`text-sm mt-1.5 font-light ${maintenanceMode ? 'text-red-700' : 'text-black/60'}`}>
                    Aktif edildiğinde sistem dışarıya kapanır. Yalnızca yönetim paneli erişilebilir kalır.
                  </p>
                </div>
              </div>
              <Toggle 
                checked={maintenanceMode} 
                onChange={(val) => setValue("maintenanceMode", val, { shouldDirty: true })} 
                danger={true}
              />
            </div>
          </div>
        </section>

        {/* Section 2: İletişim */}
        <section className="scroll-mt-32" id="contact">
          <div className="mb-6">
            <h3 className="text-base font-semibold text-black flex items-center gap-2">
              <Mail className="size-4 text-black/50" />
              İletişim & Bildirimler
            </h3>
            <p className="text-sm text-black/50 mt-1 font-light">Müşterilerle iletişim kanallarını ve sistem bildirimlerini yapılandırın.</p>
          </div>
          
          <div className="bg-white rounded-2xl border border-black/5 p-6 md:p-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
              
              <div className="space-y-3">
                <label className="text-sm font-semibold text-black flex items-center gap-2">
                  Genel İletişim E-postası
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="size-4 text-black/40" />
                  </div>
                  <input 
                    {...register("contactEmail")} 
                    className={`w-full pl-11 pr-4 py-3 bg-neutral-50/50 border ${errors.contactEmail ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-neutral-200 focus:border-black focus:ring-black/5'} rounded-xl outline-none transition-all text-sm`} 
                    placeholder="info@eraydus.net"
                  />
                </div>
                {errors.contactEmail && <p className="text-red-500 text-xs">{errors.contactEmail.message}</p>}
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-black flex items-center gap-2">
                  Sipariş Bildirim E-postası
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Bell className="size-4 text-black/40" />
                  </div>
                  <input 
                    {...register("orderNotificationEmail")} 
                    className={`w-full pl-11 pr-4 py-3 bg-neutral-50/50 border ${errors.orderNotificationEmail ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-neutral-200 focus:border-black focus:ring-black/5'} rounded-xl outline-none transition-all text-sm`} 
                    placeholder="satis@eraydus.net"
                  />
                </div>
                {errors.orderNotificationEmail && <p className="text-red-500 text-xs">{errors.orderNotificationEmail.message}</p>}
              </div>

              <div className="space-y-3 md:col-span-2 pt-4 border-t border-black/5">
                <label className="text-sm font-semibold text-black flex items-center gap-2">
                  WhatsApp İletişim Numarası
                </label>
                <div className="relative max-w-md">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone className="size-4 text-black/40" />
                  </div>
                  <input 
                    {...register("whatsappNumber")} 
                    className={`w-full pl-11 pr-4 py-3 bg-neutral-50/50 border ${errors.whatsappNumber ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-neutral-200 focus:border-black focus:ring-black/5'} rounded-xl outline-none transition-all text-sm`} 
                    placeholder="+905551234567"
                  />
                </div>
                <p className="text-xs text-black/50 font-light mt-2">Müşterilerin hızlı iletişim butonlarından ulaşacağı numara. Ülke kodu ile giriniz (örn: +90).</p>
                {errors.whatsappNumber && <p className="text-red-500 text-xs">{errors.whatsappNumber.message}</p>}
              </div>

              <div className="space-y-3 md:col-span-2 pt-4 border-t border-black/5">
                <label className="text-sm font-semibold text-black">Form Otomatik Yanıt Metni</label>
                <textarea 
                  rows={3} 
                  {...register("autoReplyMessage")} 
                  className="w-full px-4 py-3 bg-neutral-50/50 border border-neutral-200 rounded-xl outline-none focus:border-black focus:ring-4 focus:ring-black/5 transition-all text-sm resize-none" 
                  placeholder="Talebiniz alınmıştır..."
                />
                <p className="text-xs text-black/50 font-light mt-2">İletişim formunu dolduran müşteriye ekranda gösterilecek başarı mesajı.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Katalog */}
        <section className="scroll-mt-32" id="catalog">
          <div className="mb-6">
            <h3 className="text-base font-semibold text-black flex items-center gap-2">
              <ShoppingBag className="size-4 text-black/50" />
              Katalog Yönetimi
            </h3>
            <p className="text-sm text-black/50 mt-1 font-light">Ürünlerin sunumu ve satış/teklif politikalarını yapılandırın.</p>
          </div>
          
          <div className="bg-white rounded-2xl border border-black/5 p-2 shadow-sm divide-y divide-black/5">
            {/* Setting Row */}
            <div className="p-6 bg-transparent flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-neutral-50/50 transition-colors">
              <div>
                <h4 className="text-sm font-semibold text-black">Fiyatları Herkese Göster</h4>
                <p className="text-sm text-black/50 mt-1.5 font-light">
                  Aktif ise site ziyaretçileri ürün fiyatlarını görebilir. Kapalıysa fiyatlar yerine "Teklif İsteyin" butonu yer alır.
                </p>
              </div>
              <Toggle 
                checked={showPrices} 
                onChange={(val) => setValue("showPrices", val, { shouldDirty: true })} 
              />
            </div>

            {/* Setting Row */}
            <div className="p-6 bg-transparent flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-neutral-50/50 transition-colors">
              <div>
                <h4 className="text-sm font-semibold text-black">Online Teklif İsteme (Tasarla) Modülü</h4>
                <p className="text-sm text-black/50 mt-1.5 font-light">
                  Kullanıcıların kendi ölçüleriyle ürünleri konfigüre edip online teklif almasına olanak tanır.
                </p>
              </div>
              <Toggle 
                checked={enableOnlineQuotes} 
                onChange={(val) => setValue("enableOnlineQuotes", val, { shouldDirty: true })} 
              />
            </div>
          </div>
        </section>

      </div>
    </form>
  )
}
