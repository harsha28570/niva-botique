'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, ArrowRight } from 'lucide-react'
import { useStore } from '@/store/useStore'
import ProductCard from '@/components/ProductCard'
import { products, Product } from '@/lib/data'

export default function WishlistPage() {
  const { wishlistItems } = useStore()

  // Get full product details for wishlist items
  const wishlistProducts = wishlistItems
    .map(item => products.find(p => p.id === item.id))
    .filter((p): p is Product => Boolean(p))

  // Recommendations — products not already in wishlist
  const recommendedProducts = products
    .filter(p => !wishlistItems.some(w => w.id === p.id))
    .slice(0, 4)

  return (
    <>
      {/* Header */}
      <section className="pt-[70px] bg-ivory border-b border-soft-blush py-16 md:py-24">
        <div className="container-wide text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-cormorant italic font-light text-[clamp(40px,6vw,64px)] text-espresso mb-4"
          >
            Your Wishlist
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-jost font-light text-sm text-taupe"
          >
            {wishlistItems.length}{' '}
            {wishlistItems.length === 1 ? 'piece' : 'pieces'} saved
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="section-spacing">
        <div className="container-wide">
          {wishlistProducts.length === 0 ? (

            /* Empty Wishlist */
            <div className="text-center py-20 max-w-md mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <Heart
                  size={64}
                  strokeWidth={1}
                  className="mx-auto text-soft-blush mb-8"
                />
                <p className="font-cormorant italic text-3xl text-espresso mb-4">
                  Your wishlist is empty
                </p>
                <p className="font-jost font-light text-sm text-taupe mb-10">
                  Save pieces you love by clicking the heart icon on any product.
                </p>
                <Link
                  href="/shop"
                  className="inline-flex items-center px-8 py-3 border border-gold text-gold font-jost text-xs tracking-[0.25em] uppercase hover:bg-gold hover:text-ivory transition-all duration-300"
                >
                  Explore Collection
                  <ArrowRight size={14} className="ml-2" />
                </Link>
              </motion.div>
            </div>

          ) : (

            /* Wishlist Grid */
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {wishlistProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>

          )}
        </div>
      </section>

      {/* Recommendations */}
      {wishlistProducts.length > 0 && recommendedProducts.length > 0 && (
        <section className="section-spacing bg-blush/30">
          <div className="container-wide">

            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="font-cormorant italic text-sm text-dusty-rose mb-2">
                  Continue Browsing
                </p>
                <h2 className="font-cormorant italic font-light text-[clamp(28px,4vw,40px)] text-espresso">
                  You might also love
                </h2>
              </div>
              <Link
                href="/shop"
                className="font-jost text-sm text-taupe hover:text-dusty-rose transition-colors group items-center hidden sm:inline-flex"
              >
                View All
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {recommendedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>

          </div>
        </section>
      )}
    </>
  )
}