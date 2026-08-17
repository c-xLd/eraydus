import { ShieldAlert } from "lucide-react"

export function MaintenanceScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F9F9] p-4 text-center font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl p-10 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] border border-neutral-100 flex flex-col items-center">
        <div className="size-16 bg-black rounded-full flex items-center justify-center mb-6">
          <ShieldAlert className="size-8 text-white" />
        </div>
        <h1 className="text-2xl font-light text-neutral-900 mb-3 tracking-tight">Sistem Bakımda</h1>
        <p className="text-neutral-500 font-light leading-relaxed mb-8">
          Size daha iyi hizmet verebilmek için dijital mağazamızda kısa süreli bir bakım çalışması yapıyoruz. Lütfen daha sonra tekrar ziyaret edin.
        </p>
        <div className="w-full h-px bg-neutral-100 mb-6" />
        <p className="text-xs text-neutral-400 font-mono tracking-wider">ERAYDUŞ DIGITAL EXPERIENCE</p>
      </div>
    </div>
  )
}
