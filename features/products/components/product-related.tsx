import { ProductCard } from '@/features/products/components/product-card'

export function ProductRelated({ products, title = "İlgili Ürünler" }: { products: any[], title?: string }) {
  if (!products || products.length === 0) return null

  return (
    <div className="space-y-10 pt-12 lg:pt-24 border-t border-border">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-medium tracking-tight">{title}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
