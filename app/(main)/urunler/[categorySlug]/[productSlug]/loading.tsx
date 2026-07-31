export default function ProductLoading() {
  return (
    <div className="container py-20 lg:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Left: Gallery Skeleton */}
        <div className="space-y-4">
          <div className="aspect-[4/5] bg-muted/20 animate-pulse rounded-2xl w-full" />
          <div className="flex gap-4 overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-20 h-20 bg-muted/20 animate-pulse rounded-xl flex-shrink-0" />
            ))}
          </div>
        </div>

        {/* Right: Info Skeleton */}
        <div className="space-y-8 py-4">
          <div className="space-y-4">
            <div className="w-1/4 h-6 bg-muted/20 animate-pulse rounded-md" />
            <div className="w-3/4 h-12 bg-muted/20 animate-pulse rounded-md" />
            <div className="w-full h-24 bg-muted/20 animate-pulse rounded-md" />
          </div>
          
          <div className="space-y-4">
            <div className="w-1/3 h-10 bg-muted/20 animate-pulse rounded-md" />
            <div className="w-full h-32 bg-muted/20 animate-pulse rounded-md" />
          </div>
        </div>
      </div>
    </div>
  )
}
