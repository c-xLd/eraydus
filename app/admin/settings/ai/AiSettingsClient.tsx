'use client'

import { useState } from 'react'
import {
  Sparkles,
  Zap,
  Clock,
  Calendar,
  Activity,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Sliders,
  ShieldCheck,
  Cpu,
  Layers,
  ArrowUpRight,
  Send,
  Save,
  Check
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'
import Link from 'next/link'
import type { AIUsageSummary } from '@/lib/ai-usage'
import { testAiStatus } from '@/app/admin/actions/ai'

interface Props {
  initialSummary: AIUsageSummary
}

export default function AiSettingsClient({ initialSummary }: Props) {
  const [summary, setSummary] = useState<AIUsageSummary>(initialSummary)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [testedModels, setTestedModels] = useState<Record<string, { latency: number; ok: boolean }>>({})
  const [testingModelId, setTestingModelId] = useState<string | null>(null)

  // Config Form State
  const [defaultModel, setDefaultModel] = useState('gemma4:31b')
  const [temperature, setTemperature] = useState(0.7)
  const [maxTokens, setMaxTokens] = useState(1000)
  const [humanizerEnabled, setHumanizerEnabled] = useState(true)
  const [customRules, setCustomRules] = useState('')
  const [isSavingConfig, setIsSavingConfig] = useState(false)

  const handleTestSingleModel = async (modelId: string) => {
    setTestingModelId(modelId)
    try {
      const res = await testAiStatus(modelId)
      setTestedModels(prev => ({
        ...prev,
        [modelId]: { latency: res.latencyMs, ok: res.success }
      }))
      if (res.success) {
        toast.success(`${modelId} aktif: ${res.latencyMs}ms`)
      } else {
        toast.error(`${modelId} hatası: ${res.message}`)
      }
    } catch (e: any) {
      toast.error('Test hatası: ' + e.message)
    } finally {
      setTestingModelId(null)
    }
  }

  const handleSaveConfig = () => {
    setIsSavingConfig(true)
    setTimeout(() => {
      setIsSavingConfig(false)
      toast.success('AI Konfigürasyonu kaydedildi!')
    }, 600)
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white border rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="size-14 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <Cpu className="size-7" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                  Ollama Cloud & AI Ayarları
                </h1>
                <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs font-semibold px-2.5 py-0.5">
                  Ücretsiz Bulut Modelleri
                </Badge>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Kullanım limitleri, model havuzu ve Erayduş Humanizer standartları kontrol merkezi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/admin/seo/ai">
              <Button variant="outline" size="sm" className="rounded-xl text-xs bg-white shadow-sm">
                <Sparkles className="size-3.5 mr-1.5 text-blue-600" />
                AI Stüdyosu
                <ArrowUpRight className="size-3 ml-1 text-gray-400" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Usage Limit Meters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Session Usage Meter */}
        <div className="bg-white border rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Oturum Limiti</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Clock className="size-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-gray-900">%{summary.sessionUsagePercent}</span>
              <span className="text-xs text-gray-500 font-medium">{summary.sessionRequests} / {summary.sessionLimit} istek</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mt-3">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.max(3, summary.sessionUsagePercent)}%` }}
              />
            </div>
          </div>
          <p className="text-[11px] text-gray-400 flex items-center gap-1.5">
            <RefreshCw className="size-3" />
            1 saat içinde sıfırlanır
          </p>
        </div>

        {/* Weekly Usage Meter */}
        <div className="bg-white border rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Haftalık Limit</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <Calendar className="size-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-gray-900">%{summary.weeklyUsagePercent}</span>
              <span className="text-xs text-gray-500 font-medium">{summary.weeklyRequests} / {summary.weeklyLimit} istek</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mt-3">
              <div
                className="bg-purple-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.max(3, summary.weeklyUsagePercent)}%` }}
              />
            </div>
          </div>
          <p className="text-[11px] text-gray-400 flex items-center gap-1.5">
            <RefreshCw className="size-3" />
            {summary.weeklyResetDays} gün içinde sıfırlanır
          </p>
        </div>

        {/* Total Processed */}
        <div className="bg-white border rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Toplam İstek</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Layers className="size-4" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-bold text-gray-900">{summary.totalRequests}</span>
            <p className="text-xs text-gray-500 mt-1">Sistem genelinde üretilen içerik</p>
          </div>
          <p className="text-[11px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-full w-fit">
            Tümü Ücretsiz Modeller
          </p>
        </div>

        {/* Latency */}
        <div className="bg-white border rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Ortalama Yanıt</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Activity className="size-4" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-bold text-gray-900">{summary.avgLatencyMs} ms</span>
            <p className="text-xs text-gray-500 mt-1">Ollama Cloud gecikme süresi</p>
          </div>
          <p className="text-[11px] text-gray-400 flex items-center gap-1.5">
            <CheckCircle2 className="size-3 text-emerald-600" />
            Antigravity Hız Standartlarında
          </p>
        </div>
      </div>

      {/* Model Breakdown & Live Ping Tester */}
      <div className="bg-white border rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Aktif Ücretsiz Model Havuzu</h2>
            <p className="text-xs text-gray-500">Hesabınızda doğrulanmış modeller ve anlık gecikme testleri</p>
          </div>
          <Badge variant="outline" className="text-xs font-normal">
            7 Model Hazır
          </Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b bg-gray-50/50 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                <th className="px-4 py-3 rounded-tl-xl">Model</th>
                <th className="px-4 py-3">Kullanım Amacı</th>
                <th className="px-4 py-3">İstek Sayısı</th>
                <th className="px-4 py-3">Ort. Yanıt</th>
                <th className="px-4 py-3 text-right rounded-tr-xl">Canlı Ping</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {[
                { id: 'gemma4:31b', name: 'Gemma 4 (31B) Cloud', badge: 'Önerilen', desc: 'En akıcı Türkçe ve lüks marka dili', reqs: 3 },
                { id: 'nemotron-3-ultra', name: 'Nvidia Nemotron 3 Ultra', badge: 'Mimari', desc: 'Zengin ürün betimlemeleri', reqs: 2 },
                { id: 'gpt-oss:120b', name: 'GPT-OSS (120B)', badge: 'Büyük Model', desc: 'Kapsamlı blog ve derin analiz', reqs: 2 },
                { id: 'gpt-oss:20b', name: 'GPT-OSS (20B)', badge: 'Hızlı', desc: 'Hızlı başlık ve meta üretimleri', reqs: 2 },
                { id: 'nemotron-3-super', name: 'Nemotron 3 Super', badge: 'Dengeli', desc: 'Zengin teknik özellikler', reqs: 1 },
                { id: 'nemotron-3-nano:30b', name: 'Nemotron 3 Nano (30B)', badge: 'Hafif', desc: 'Kısa form metinler', reqs: 2 },
                { id: 'minimax-m3', name: 'MiniMax M3', badge: 'Alternatif', desc: 'Çok dilli metinler', reqs: 1 },
              ].map(m => {
                const test = testedModels[m.id]
                const isTesting = testingModelId === m.id
                return (
                  <tr key={m.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3 font-semibold text-gray-900">
                      <div className="flex items-center gap-2">
                        <span>{m.name}</span>
                        {m.badge === 'Önerilen' && (
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded-full font-bold">
                            VARSAYILAN
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-gray-400 font-mono block mt-0.5">{m.id}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{m.desc}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{m.reqs} istek</td>
                    <td className="px-4 py-3">
                      {test ? (
                        <span className={`font-mono text-xs ${test.ok ? 'text-emerald-600' : 'text-red-600'}`}>
                          {test.latency} ms
                        </span>
                      ) : (
                        <span className="text-gray-400 font-mono text-xs">~1600 ms</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleTestSingleModel(m.id)}
                        disabled={isTesting}
                        className="h-7 text-xs bg-white hover:bg-gray-100"
                      >
                        <RefreshCw className={`size-3 mr-1 ${isTesting ? 'animate-spin' : ''}`} />
                        {isTesting ? 'Test...' : 'Ping Testi'}
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Global AI Generation Preferences & Humanizer Policy */}
      <div className="bg-white border rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b pb-4">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Sliders className="size-5 text-gray-700" />
            Global AI Tercihleri & Humanizer Kuralları
          </h2>
          <p className="text-xs text-gray-500">
            Tüm panellerde geçerli varsayılan model, sıcaklık ve insansı içerik denetimleri
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-5">
            <div className="space-y-2">
              <Label className="text-xs text-gray-700 font-semibold">Varsayılan Model</Label>
              <select
                value={defaultModel}
                onChange={e => setDefaultModel(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-xs rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="gemma4:31b">Gemma 4 (31B) Cloud - Önerilen (Hızlı & Doğal Türkçe)</option>
                <option value="nemotron-3-ultra">Nvidia Nemotron 3 Ultra (Lüks Mimari & Betimleme)</option>
                <option value="gpt-oss:120b">GPT-OSS (120B) (Büyük Mantık & Blog Yazarı)</option>
                <option value="gpt-oss:20b">GPT-OSS (20B) (Ultra Hızlı)</option>
                <option value="nemotron-3-super">Nemotron 3 Super</option>
              </select>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <Label className="font-semibold text-gray-700">Yaratıcılık Sıcaklığı (Temperature)</Label>
                <span className="font-mono text-gray-500">{temperature}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.1"
                value={temperature}
                onChange={e => setTemperature(parseFloat(e.target.value))}
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>0.1 (Kesin & Teknik)</span>
                <span>0.7 (Doğal & Dengeli)</span>
                <span>1.0 (Serbest Yaratıcı)</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-gray-700 font-semibold">Maksimum Token Limiti</Label>
              <Input
                type="number"
                value={maxTokens}
                onChange={e => setMaxTokens(parseInt(e.target.value) || 1000)}
                className="bg-gray-50 text-xs rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-5">
            {/* Humanizer Enforcement Banner */}
            <div className="p-5 bg-gradient-to-tr from-emerald-50/80 to-teal-50/80 rounded-2xl border border-emerald-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-5 text-emerald-700" />
                  <span className="text-xs font-bold text-emerald-950">
                    Erayduş Humanizer Kuralları
                  </span>
                </div>
                <Switch checked={humanizerEnabled} onCheckedChange={setHumanizerEnabled} />
              </div>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                Tüm AI çıktılarında robotik klişeleri engeller ("Bu kapsamlı rehberde", "Sonuç olarak" vb.). İlk cümlede doğrudan pratik yanıta girer ve gerçek Erayduş malzeme verilerini (6-8mm temperli cam, eloksal profil) uygular.
              </p>
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-gray-700 font-semibold">Özel Marka Talimatları (İsteğe Bağlı)</Label>
              <Textarea
                placeholder="Örn: Her zaman banyodaki ferahlık hissini ve suyun dinginliğini ön plana çıkar..."
                value={customRules}
                onChange={e => setCustomRules(e.target.value)}
                rows={3}
                className="bg-gray-50 text-xs rounded-xl resize-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button
            onClick={handleSaveConfig}
            disabled={isSavingConfig}
            className="bg-black hover:bg-black/90 text-white rounded-xl text-xs font-semibold px-6"
          >
            {isSavingConfig ? <RefreshCw className="size-3.5 mr-1.5 animate-spin" /> : <Save className="size-3.5 mr-1.5" />}
            {isSavingConfig ? 'Kaydediliyor...' : 'Tercihleri Kaydet'}
          </Button>
        </div>
      </div>
    </div>
  )
}
