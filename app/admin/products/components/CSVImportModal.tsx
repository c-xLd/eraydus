"use client"

import { useState, useRef } from "react"
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2, X } from "lucide-react"
import { importWooCommerceCSVAction } from "../actions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface CSVImportModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function CSVImportModal({ isOpen, onClose, onSuccess }: CSVImportModalProps) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [resultMsg, setResultMsg] = useState<{ imported: number; skipped: number } | null>(null)

  if (!isOpen) return null

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.name.endsWith('.csv')) {
        setErrorMsg('Lütfen sadece .csv uzantılı dosya seçin.')
        setSelectedFile(null)
        return
      }
      setErrorMsg(null)
      setResultMsg(null)
      setSelectedFile(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) {
      if (!file.name.endsWith('.csv')) {
        setErrorMsg('Lütfen sadece .csv uzantılı dosya seçin.')
        setSelectedFile(null)
        return
      }
      setErrorMsg(null)
      setResultMsg(null)
      setSelectedFile(file)
    }
  }

  const handleImport = async () => {
    if (!selectedFile) return

    setLoading(true)
    setErrorMsg(null)
    setResultMsg(null)

    try {
      const reader = new FileReader()
      reader.onload = async (event) => {
        const csvText = event.target?.result as string
        if (!csvText) {
          setErrorMsg('CSV içeriği okunamadı.')
          setLoading(false)
          return
        }

        const res = await importWooCommerceCSVAction(csvText)
        setLoading(false)

        if (res.success) {
          setResultMsg({ imported: res.importedCount || 0, skipped: res.skippedCount || 0 })
          toast.success(`${res.importedCount} adet ürün başarıyla Supabase veritabanına aktarıldı!`)
          router.refresh()
          onSuccess()
        } else {
          setErrorMsg(res.error || 'İçe aktarma sırasında hata oluştu.')
          toast.error(res.error || 'İçe aktarma hatası')
        }
      }

      reader.onerror = () => {
        setLoading(false)
        setErrorMsg('Dosya okuma hatası oluştu.')
      }

      reader.readAsText(selectedFile, 'UTF-8')
    } catch (err: any) {
      setLoading(false)
      setErrorMsg(err.message || 'İşlem başarısız.')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-900 w-full max-w-xl rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">WooCommerce CSV İçe Aktar</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              WooCommerce&apos;den dışa aktardığınız ürün CSV dosyasını seçerek Supabase&apos;e yükleyin.
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* File Dropzone */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
              selectedFile
                ? 'border-black dark:border-white bg-gray-50 dark:bg-gray-800/50'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/30'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
            />
            {selectedFile ? (
              <div className="flex flex-col items-center space-y-2">
                <FileText className="size-10 text-black dark:text-white" />
                <span className="font-semibold text-sm text-gray-900 dark:text-white">{selectedFile.name}</span>
                <span className="text-xs text-gray-400">({(selectedFile.size / 1024).toFixed(1)} KB)</span>
                <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">Değiştirmek için tıklayın</span>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-2">
                <Upload className="size-10 text-gray-400" />
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  CSV dosyasını buraya sürükleyin veya <span className="text-black dark:text-white font-semibold underline">seçin</span>
                </p>
                <p className="text-xs text-gray-400">Desteklenen format: .csv (WooCommerce Export)</p>
              </div>
            )}
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 flex items-start space-x-3 text-red-700 dark:text-red-300 text-xs">
              <AlertCircle className="size-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Result Success Message */}
          {resultMsg && (
            <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-900 flex items-start space-x-3 text-green-700 dark:text-green-300 text-xs">
              <CheckCircle2 className="size-4 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">Aktarım Tamamlandı!</p>
                <p className="mt-1">
                  <strong>{resultMsg.imported}</strong> ürün veritabanına aktarıldı veya güncellendi.
                  {resultMsg.skipped > 0 && ` (${resultMsg.skipped} atlandı)`}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/40 border-t border-gray-100 dark:border-gray-800 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            Kapat
          </button>
          <button
            type="button"
            onClick={handleImport}
            disabled={!selectedFile || loading}
            className="flex items-center space-x-2 px-5 py-2 text-sm font-medium text-white bg-black dark:bg-white dark:text-black rounded-lg hover:bg-black/90 dark:hover:bg-white/90 disabled:opacity-50 transition-colors shadow-sm"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>İçeri Aktarılıyor...</span>
              </>
            ) : (
              <>
                <Upload className="size-4" />
                <span>Veritabanına Aktar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
