import { Lock } from 'lucide-react'

export default function MFAPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 p-4">
      <div className="bg-white p-8 rounded-2xl border border-black/5 shadow-xl max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto text-indigo-600">
          <Lock className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-2xl font-light text-[#050505] tracking-tight">Güvenlik Doğrulaması (MFA)</h1>
          <p className="text-sm text-neutral-500 mt-2">
            Yönetim paneline erişmek için çok faktörlü doğrulama uygulamasını (Google Authenticator) kullanarak şifrenizi giriniz.
          </p>
        </div>
        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="6 Haneli Kod" 
            className="w-full border border-black/10 rounded-xl px-4 py-3 text-center text-lg tracking-widest font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
            maxLength={6}
          />
          <button className="w-full bg-[#050505] text-white py-3 rounded-xl font-semibold hover:bg-black/80 transition-colors">
            Doğrula ve Devam Et
          </button>
        </div>
      </div>
    </div>
  )
}
