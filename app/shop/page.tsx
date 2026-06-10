'use client'

import RecentlyViewed from '@/components/RecentlyViewed'
import { useState } from 'react'
import { motion } from 'framer-motion'
import ProductCard from '@/components/ProductCard'
import { products } from '@/lib/data'
import { Grid3X3, LayoutGrid } from 'lucide-react'
import { ProductGridSkeleton } from '@/components/ProductSkeleton'

type FilterCategory = 'all' | 'tops' | 'dresses' | 'trousers' | 'outerwear' | 'accessories'
type SortOption = 'newest' | 'price-low' | 'price-high' | 'name'

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all')
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [gridCols, setGridCols] = useState(3)
  const [visibleCount, setVisibleCount] = useState(12)

  const filteredProducts = products.filter(p =>
    activeCategory === 'all' || p.category === activeCategory
  )

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price
      case 'price-high': return b.price - a.price
      case 'name': return a.name.localeCompare(b.name)
      default: return a.id.localeCompare(b.id)
    }
  })

  const visibleProducts = sortedProducts.slice(0, visibleCount)
const hasMore = visibleCount < sortedProducts.length
const isLoading = false // set to true when fetching from API

  return (
    <>
      {/* Header Banner */}
      <section className="pt-[70px] bg-blush/30 py-16 md:py-24">
        <div className="container-wide text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-cormorant italic font-light text-[clamp(40px,6vw,64px)] text-espresso mb-4"
          >
            The Collection
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-jost font-light text-sm text-taupe"
          >
            {products.length} curated pieces, this season
          </motion.p>
        </div>
      </section>

      {/* Filter & Sort Bar */}
      <section className="sticky top-[70px] z-30 bg-ivory/95 backdrop-blur-sm border-b border-soft-blush py-4">
        <div className="container-wide">
          <div className="flex items-center justify-between gap-4">

            {/* Category Filters */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {(['all', 'tops', 'dresses', 'trousers', 'outerwear', 'accessories'] as FilterCategory[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat)
                    setVisibleCount(12)
                  }}
                  className={`px-4 py-2 border font-jost text-xs tracking-wide whitespace-nowrap transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-dusty-rose border-dusty-rose text-ivory'
                      : 'border-soft-blush text-taupe hover:border-dusty-rose hover:text-dusty-rose'
                  }`}
                >
                  {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center gap-4">

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-transparent font-jost text-xs text-taupe border border-soft-blush px-3 py-2 cursor-pointer focus:outline-none hover:border-dusty-rose transition-colors"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name A-Z</option>
              </select>

              {/* Grid Toggle - Desktop Only */}
              <div className="hidden lg:flex items-center gap-1 border border-soft-blush">
                {[3, 4].map((cols) => (
                  <button
                    key={cols}
                    onClick={() => setGridCols(cols)}
                    className={`p-2 transition-colors ${
                      gridCols === cols
                        ? 'bg-espresso text-ivory'
                        : 'text-taupe hover:text-espresso'
                    }`}
                    aria-label={`${cols} columns`}
                  >
                    {cols === 3
                      ? <Grid3X3 size={16} strokeWidth={1.5} />
                      : <LayoutGrid size={16} strokeWidth={1.5} />
                    }
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Count */}
          <p className="mt-4 font-jost text-xs text-taupe">
            Showing {Math.min(visibleCount, sortedProducts.length)} of {sortedProducts.length} pieces
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="section-spacing">
        <div className="container-wide">
        {isLoading ? (
  <ProductGridSkeleton count={8} />
) : visibleProducts.length === 0 ? (

            /* Empty State */
            <div className="text-center py-20">
              <p className="font-cormorant italic text-3xl text-espresso mb-4">
                No pieces found
              </p>
              <p className="font-jost text-sm text-taupe mb-8">
                Try adjusting your filters
              </p>
              <button
                onClick={() => setActiveCategory('all')}
                className="px-8 py-3 border border-gold text-gold font-jost text-xs tracking-[0.25em] uppercase hover:bg-gold hover:text-ivory transition-all duration-300"
              >
                View All Pieces
              </button>
            </div>

          ) : (
            <>
              <div
                className={`grid grid-cols-2 gap-6 lg:gap-8 ${
                  gridCols === 4
                    ? 'lg:grid-cols-4'
                    : 'lg:grid-cols-3'
                }`}
              >
                {visibleProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: (index % gridCols) * 0.08 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>

              {/* Load More */}
              {hasMore && (
                <div className="text-center mt-16">
                  <button
                    onClick={() => setVisibleCount(prev => prev + 12)}
                    className="px-12 py-4 border border-gold text-gold font-jost text-xs tracking-[0.25em] uppercase hover:bg-gold hover:text-ivory transition-all duration-300"
                  >
                    Load More Pieces
                  </button>
                  <p className="mt-4 font-jost text-xs text-taupe">
                    Showing {visibleCount} of {sortedProducts.length} — {sortedProducts.length - visibleCount} remaining
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
          {/* Recently Viewed */}
          <RecentlyViewed />
    </>
  )
}