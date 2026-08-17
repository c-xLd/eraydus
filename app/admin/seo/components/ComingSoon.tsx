import { Hammer, Blocks } from 'lucide-react'

interface Props {
  title: string
  description: string
  integrationRequired?: boolean
}

export default function ComingSoon({ title, description, integrationRequired }: Props) {
  return (
    <div className="bg-white border rounded-3xl p-12 shadow-sm flex flex-col items-center justify-center text-center h-[500px]">
      <div className={`size-20 rounded-full flex items-center justify-center mb-6 ${integrationRequired ? 'bg-amber-50 text-amber-500' : 'bg-gray-50 text-gray-400'}`}>
        {integrationRequired ? <Blocks className="size-10" /> : <Hammer className="size-10" />}
      </div>
      <h2 className="text-2xl font-medium text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-500 max-w-md">{description}</p>
      
      {integrationRequired && (
        <div className="mt-8 bg-amber-50 border border-amber-200 text-amber-800 px-4 py-2 rounded-xl text-sm font-semibold tracking-wide">
          ⚠️ ENTEGRASYON GEREKLİ
        </div>
      )}
    </div>
  )
}
