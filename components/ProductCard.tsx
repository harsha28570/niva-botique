'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useStore } from '@/store/useStore'
import { formatPrice } from '@/lib/currency'
import Link from 'next/link'
import { Heart, Plus } from 'lucide-react'

import { motion } from 'framer-motion'
import { Product } from '@/lib/data'

interface ProductCardProps {
  product: Product
  showQuickAdd?: boolean
}

export default function ProductCard({ 
  product, 
  showQuickAdd = true 
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { addToCart, toggleWishlist, isInWishlist } = useStore()

  const isWishlisted = isInWishlist(product.id)
const { currency } = useStore()

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart({
      id: `${product.id}-${product.sizes[0]}-${product.colors[0].name}`,
      name: product.name,
      price: product.price,
      image: product.images[0],
      color: product.colors[0].name,
      size: product.sizes[0],
      quantity: 1,
    })
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    toggleWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      category: product.category,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.id}`} className="block">

        {/* Image Container */}
        <div className="relative aspect-[3/4] bg-blush overflow-hidden mb-4">

          {/* Primary Image */}
          <Image
  src={product.images[0]}
  alt={product.name}
  fill
  sizes="(max-width: 768px) 50vw, 25vw"
  className={`object-cover transition-opacity duration-500 ${
    isHovered && product.images[1] ? 'opacity-0' : 'opacity-100'
  }`}
/>

          {/* Secondary Image on Hover */}
          {product.images[1] && (
  <Image
    src={product.images[1]}
    alt={`${product.name} - alternate view`}
    fill
    sizes="(max-width: 768px) 50vw, 25vw"
    className={`object-cover transition-opacity duration-500 ${
      isHovered ? 'opacity-100' : 'opacity-0'
    }`}
  />
)}

          {/* Badge */}
          {product.badge && (
            <span className="absolute top-4 left-4 font-cormorant italic text-xs text-ivory bg-dusty-rose px-3 py-1">
              {product.badge === 'new'
                ? 'New'
                : product.badge === 'low-stock'
                ? 'Low Stock'
                : 'Sale'}
            </span>
          )}

          {/* Wishlist Button */}
          {/* On desktop: only show on hover */}
          {/* On mobile: always visible */}
          <button
            onClick={handleWishlist}
            className={`absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-ivory/80 backdrop-blur-sm transition-all duration-300 ${
              isWishlisted
                ? 'text-dusty-rose'
                : 'text-espresso/50 hover:text-dusty-rose'
            } opacity-100 md:opacity-0 md:group-hover:opacity-100`}
            aria-label="Add to wishlist"
          >
            <Heart
              size={18}
              strokeWidth={1.5}
              fill={isWishlisted ? 'currentColor' : 'none'}
            />
          </button>

          {/* Quick Add Button */}
{showQuickAdd && (
  <button
    onClick={handleQuickAdd}
    className={`absolute bottom-4 left-4 right-4 bg-ivory/95 backdrop-blur-sm py-3 flex items-center justify-center gap-2 text-espresso font-jost text-xs tracking-[0.15em] uppercase transition-all duration-300 ${
      isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
    } md:flex`}
  >
    <Plus size={14} strokeWidth={1.5} />
    Quick Add
  </button>
)}
        </div>

        {/* Product Info */}
        <div className="space-y-1">
          <h3 className="font-playfair text-base text-espresso group-hover:text-dusty-rose transition-colors">
            {product.name}
          </h3>
          <p className="font-jost text-[11px] tracking-[0.2em] uppercase text-taupe">
            {product.category.replace(/([A-Z])/g, ' $1').trim()}
          </p>
          <div className="flex items-center gap-3">
          <span className="font-cormorant text-lg text-dusty-rose">
  {formatPrice(product.price, currency)}
</span>
{product.originalPrice && (
  <span className="font-cormorant text-base text-taupe line-through">
    {formatPrice(product.originalPrice, currency)}
  </span>
)}
          </div>
        </div>

      </Link>
    </motion.div>
  )
}