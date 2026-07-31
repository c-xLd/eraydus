import { ProductSpecs } from './product-specs'
import { ProductReviews } from './product-reviews'
import { ProductFaq } from './product-faq'

export function ProductDetailSections({ product, reviews }: { product: any, reviews: any[] }) {
  return (
    <div className="space-y-20 lg:space-y-32 border-t border-border pt-12 lg:pt-24">
      
      {/* Long Description (if available) */}
      {product.long_description && (
        <div className="max-w-3xl space-y-6">
          <h2 className="text-3xl font-medium tracking-tight">Ürün Hakkında</h2>
          <div className="prose prose-neutral dark:prose-invert prose-p:leading-relaxed text-muted-foreground">
            {/* If long_description is HTML, we might need dangerouslySetInnerHTML, but assuming text or simple markup for now */}
            <p className="whitespace-pre-line">{product.long_description}</p>
          </div>
        </div>
      )}

      {/* Specifications */}
      <ProductSpecs 
        specs={product.technical_specs} 
        features={product.features} 
      />

      {/* Reviews */}
      <ProductReviews 
        productId={product.id} 
        productName={product.name} 
        reviews={reviews} 
      />

      {/* FAQs */}
      {product.faqs && product.faqs.length > 0 && (
        <div className="pt-12 border-t border-border mt-12">
          <ProductFaq faqs={product.faqs} />
        </div>
      )}
    </div>
  )
}
