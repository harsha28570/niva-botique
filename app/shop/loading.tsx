import { ProductGridSkeleton } from '@/components/ProductSkeleton'

export default function ShopLoading() {
  return (
    <div className="pt-[70px]">
      {/* Header skeleton */}
      <section className="bg-blush/30 py-16 md:py-24">
        <div className="container-wide text-center">
          <div className="h-12 bg-soft-blush/50 rounded w-48 mx-auto mb-4 animate-pulse" />
          <div className="h-4 bg-soft-blush/30 rounded w-32 mx-auto animate-pulse" />
        </div>
      </section>

      {/* Filter bar skeleton */}
      <section className="border-b border-soft-blush py-4">
        <div className="container-wide">
          <div className="flex items-center gap-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-8 w-20 bg-soft-blush/40 rounded animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Products skeleton */}
      <section className="section-spacing">
        <div className="container-wide">
          <ProductGridSkeleton count={8} />
        </div>
      </section>
    </div>
  )
}