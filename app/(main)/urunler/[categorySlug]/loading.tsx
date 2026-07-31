import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Category Hero Skeleton */}
      <div className="pt-24 sm:pt-32 pb-10 sm:pb-16 bg-black/[0.02] border-b border-black/[0.03]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center space-x-2 mb-6 sm:mb-12">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-3" />
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-3" />
            <Skeleton className="h-3 w-28" />
          </div>
          <div className="max-w-4xl space-y-3">
            <Skeleton className="h-10 sm:h-16 w-64 sm:w-96 rounded-xl" />
            <Skeleton className="h-4 w-32 rounded" />
            <div className="flex gap-2 pt-3">
              <Skeleton className="h-8 w-28 rounded-full" />
              <Skeleton className="h-8 w-28 rounded-full" />
              <Skeleton className="h-8 w-28 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-16">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Desktop Filters Skeleton */}
          <div className="hidden lg:block w-72 shrink-0 space-y-6">
            <Skeleton className="h-8 w-full rounded-xl" />
            <Skeleton className="h-48 w-full rounded-2xl" />
            <Skeleton className="h-48 w-full rounded-2xl" />
          </div>

          {/* Product Grid Skeleton */}
          <div className="flex-1 space-y-6">
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-36 rounded" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-9 w-32 rounded-full" />
                <Skeleton className="h-9 w-20 rounded-full" />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-6 md:gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-2.5">
                  <Skeleton className="aspect-[3/4] w-full rounded-xl sm:rounded-2xl" />
                  <Skeleton className="h-3 w-1/3 rounded" />
                  <Skeleton className="h-4 w-3/4 rounded" />
                  <Skeleton className="h-4 w-1/2 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
