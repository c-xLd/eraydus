import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 text-foreground">
        Kategori Bulunamadı
      </h1>
      <p className="text-muted-foreground mb-8 text-lg max-w-md">
        Aradığınız kategori mevcut değil veya kaldırılmış olabilir.
      </p>
      <Link 
        href="/urunler" 
        className="inline-flex shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/80 h-14 px-8 text-base font-medium transition-all shadow-sm"
      >
        Tüm Ürünlere Dön
      </Link>
    </div>
  )
}
