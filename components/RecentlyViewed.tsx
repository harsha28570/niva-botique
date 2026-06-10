'use client'

import { useStore } from '@/store/useStore'
import { products } from '@/lib/data'
import ProductCard from '@/components/ProductCard'
import { motion } from 'framer-motion'

export default function RecentlyViewed({ 
  currentProductId 
}: { 
  currentProductId?: string 
}) {
  const { recentlyViewed } = useStore()

  // Get full product details
  // Exclude current product if on product page
  const recentProducts = recentlyViewed
    .filter(id => id !== currentProductId)
    .map(id => products.find(p => p.id === id))
    .filter(Boolean)
    .slice(0, 4) as typeof products

  if (recentProducts.length === 0) return null

  return (
    <section className="section-spacing border-t border-soft-blush">
      <div className="container-wide">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="font-cormorant italic text-sm text-dusty-rose mb-2">
            Your Journey
          </p>
          <h2 className="font-cormorant italic font-light text-[clamp(28px,4vw,40px)] text-espresso">
            Recently Viewed
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {recentProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}