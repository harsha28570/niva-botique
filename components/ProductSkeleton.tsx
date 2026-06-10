export default function ProductSkeleton() {
    return (
      <div className="animate-pulse">
        {/* Image skeleton */}
        <div className="aspect-[3/4] bg-soft-blush/50 mb-4" />
  
        {/* Text skeletons */}
        <div className="space-y-2">
          <div className="h-4 bg-soft-blush/50 rounded w-3/4" />
          <div className="h-3 bg-soft-blush/30 rounded w-1/2" />
          <div className="h-4 bg-soft-blush/50 rounded w-1/4" />
        </div>
      </div>
    )
  }
  
  export function ProductGridSkeleton({ count = 4 }: { count?: number }) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {[...Array(count)].map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    )
  }