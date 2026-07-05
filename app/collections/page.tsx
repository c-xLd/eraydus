import { ProductShowcase } from "@/features/homepage/components/ProductShowcase";

export default function CollectionsPage() {
  return (
    <div className="pt-24 min-h-screen">
      <div className="container mx-auto px-6 max-w-[1440px] mb-12">
        <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-4">
          Tüm Koleksiyonlar
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Mimari projeniz için en uygun seriyi seçin. Her koleksiyonumuz kendi içinde benzersiz bir karakter barındırır.
        </p>
      </div>
      <ProductShowcase />
    </div>
  )
}
