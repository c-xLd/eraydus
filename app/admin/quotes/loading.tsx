import { Zap, Clock, Send, CheckCircle2, Search, Download, Plus } from "lucide-react"

export default function QuotesLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="h-8 w-48 bg-gray-200 rounded-lg mb-2"></div>
          <div className="h-4 w-72 bg-gray-100 rounded-lg"></div>
        </div>
        <div className="flex gap-2">
          <div className="h-10 w-28 bg-gray-200 rounded-lg"></div>
          <div className="h-10 w-32 bg-gray-300 rounded-lg"></div>
        </div>
      </div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-start justify-between mb-2">
              <div className="size-8 bg-gray-100 rounded-lg"></div>
            </div>
            <div className="h-8 w-16 bg-gray-200 rounded-lg mt-2 mb-1"></div>
            <div className="h-3 w-24 bg-gray-100 rounded-lg"></div>
          </div>
        ))}
      </div>

      {/* Filters Skeleton */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[250px]">
            <div className="h-10 w-full bg-gray-100 rounded-lg"></div>
          </div>
          <div className="w-36 h-10 bg-gray-100 rounded-lg"></div>
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-6">
        <div className="space-y-4">
          <div className="h-6 w-full bg-gray-100 rounded"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 w-full bg-gray-50 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  )
}
