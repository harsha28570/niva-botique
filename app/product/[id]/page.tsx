'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Minus, Plus, ChevronDown, Truck, RotateCcw, Star, Check } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import { products } from '@/lib/data'
import { useStore } from '@/store/useStore'
import { formatPrice } from '@/lib/currency'
import SizeGuideModal from '@/components/SizeGuideModal'
import ImageZoom from '@/components/ImageZoom'
import RecentlyViewed from '@/components/RecentlyViewed'
import ReviewSystem from '@/components/ReviewSystem'


export default function ProductPage() {
  const params = useParams()
  const product = products.find(p => p.id === params.id)

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || { name: '', hex: '' })
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [openAccordion, setOpenAccordion] = useState<string | null>(null)
  const [addedToCart, setAddedToCart] = useState(false)
const [sizeGuideOpen, setSizeGuideOpen] = useState(false)

// Track this product as recently viewed
useEffect(() => {
  if (product) {
    addToRecentlyViewed(product.id)
  }
}, [product?.id])

const { addToCart, toggleWishlist, isInWishlist, addToRecentlyViewed, currency } = useStore()

  // Product not found
  if (!product) {
    return (
      <div className="pt-[70px] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-cormorant italic text-3xl text-espresso mb-4">
            Product not found
          </p>
          <Link
            href="/shop"
            className="font-jost text-sm text-dusty-rose hover:text-espresso transition-colors"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    )
  }

  const isWishlisted = isInWishlist(product.id)

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    if (!selectedSize) return
    addToCart({
      id: `${product.id}-${selectedSize}-${selectedColor.name}`,
      name: product.name,
      price: product.price,
      image: product.images[0],
      color: selectedColor.name,
      size: selectedSize,
      quantity,
    })
    // Show success feedback
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleWishlist = () => {
    toggleWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      category: product.category,
    })
  }

  return (
    <>
      {/* Breadcrumb */}
      <section className="pt-[70px] bg-ivory border-b border-soft-blush">
        <div className="container-wide py-4">
          <nav className="font-jost text-xs tracking-wide text-taupe">
            <Link href="/shop" className="hover:text-dusty-rose transition-colors">
              Shop
            </Link>
            <span className="mx-2">/</span>
            <Link
              href={`/shop?category=${product.category}`}
              className="hover:text-dusty-rose transition-colors capitalize"
            >
              {product.category.replace(/([A-Z])/g, ' $1').trim()}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-espresso">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Product Layout */}
      <section className="section-spacing">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">

            {/* Left - Image Gallery */}
            <div className="flex flex-col gap-4">

              {/* Desktop: Thumbnails + Main Image side by side */}
              <div className="flex gap-4">
                {/* Thumbnails - Desktop Only */}
                <div className="hidden md:flex flex-col gap-3 w-20">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-full aspect-[3/4] overflow-hidden border-2 transition-colors ${
                        selectedImage === index
                          ? 'border-dusty-rose'
                          : 'border-transparent hover:border-soft-blush'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>

               {/* Main Image with Zoom */}
<motion.div
  key={selectedImage}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
  className="flex-1 relative aspect-[3/4] bg-blush overflow-hidden"
>
  {/* Zoom Component — desktop only */}
  <div className="hidden md:block w-full h-full">
    <ImageZoom
      src={product.images[selectedImage]}
      alt={product.name}
      className="w-full h-full"
    />
  </div>

  {/* Regular image — mobile */}
  <div className="md:hidden relative w-full h-full">
    <Image
      src={product.images[selectedImage]}
      alt={product.name}
      fill
      sizes="100vw"
      className="object-cover"
      priority
    />
  </div>

  {/* Badge */}
  {product.badge && (
    <span className="absolute top-6 left-6 font-cormorant italic text-xs text-ivory bg-dusty-rose px-4 py-2 z-10">
      {product.badge === 'new'
        ? 'New Arrival'
        : product.badge === 'low-stock'
        ? 'Low Stock'
        : 'Sale'}
    </span>
  )}

  {/* Wishlist */}
  <button
    onClick={handleWishlist}
    className={`absolute top-6 right-6 w-12 h-12 bg-ivory/80 backdrop-blur-sm flex items-center justify-center transition-colors z-10 ${
      isWishlisted
        ? 'text-dusty-rose'
        : 'text-espresso/50 hover:text-dusty-rose'
    }`}
    aria-label="Add to wishlist"
  >
    <Heart
      size={20}
      strokeWidth={1.5}
      fill={isWishlisted ? 'currentColor' : 'none'}
    />
  </button>
</motion.div>
              </div>

              {/* Mobile Thumbnails - Below Main Image */}
              <div className="md:hidden flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-16 h-20 flex-shrink-0 border-2 overflow-hidden transition-colors ${
                      selectedImage === index
                        ? 'border-dusty-rose'
                        : 'border-transparent hover:border-soft-blush'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right - Product Info */}
            <div className="lg:py-8">

              {/* Category & Status */}
              <p className="font-jost text-[11px] tracking-[0.2em] uppercase text-taupe mb-3">
                {product.category.replace(/([A-Z])/g, ' $1').trim()}
                {product.badge === 'low-stock' && ' • Low Stock'}
              </p>

              {/* Product Name */}
              <h1 className="font-playfair text-3xl lg:text-4xl text-espresso mb-4">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
              <span className="font-cormorant text-2xl text-dusty-rose">
  {formatPrice(product.price, currency)}
</span>
{product.originalPrice && (
  <span className="font-cormorant text-lg text-taupe line-through">
    {formatPrice(product.originalPrice, currency)}
  </span>
)}
              </div>

              {/* Short Description */}
              <p className="font-jost font-light text-[15px] text-taupe leading-[1.9] mb-8">
                {product.shortDescription}
              </p>

              <div className="h-px bg-soft-blush mb-8" />

              {/* Color Selector */}
              <div className="mb-6">
                <p className="font-jost text-xs tracking-wide text-espresso mb-3">
                  Color: <span className="text-taupe">{selectedColor.name}</span>
                </p>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColor.name === color.name
                          ? 'border-gold ring-2 ring-gold/20'
                          : 'border-transparent hover:border-soft-blush'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      aria-label={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="mb-8">
                <p className="font-jost text-xs tracking-wide text-espresso mb-3">
                  Size:{' '}
                  {selectedSize && (
                    <span className="text-taupe">{selectedSize}</span>
                  )}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 border font-jost text-xs transition-all ${
                        selectedSize === size
                          ? 'bg-espresso border-espresso text-ivory'
                          : 'border-soft-blush text-taupe hover:border-espresso hover:text-espresso'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <button
  onClick={() => setSizeGuideOpen(true)}
  className="mt-3 font-jost text-xs text-taupe hover:text-dusty-rose transition-colors underline underline-offset-4"
>
  Size Guide →
</button>

<SizeGuideModal
  isOpen={sizeGuideOpen}
  onClose={() => setSizeGuideOpen(false)}
  category={product.category}
/>
              </div>

              {/* Quantity Selector */}
              <div className="mb-8">
                <p className="font-jost text-xs tracking-wide text-espresso mb-3">
                  Quantity
                </p>
                <div className="flex items-center border border-soft-blush w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center text-taupe hover:text-espresso transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} strokeWidth={1.5} />
                  </button>
                  <span className="w-12 text-center font-jost text-sm">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center text-taupe hover:text-espresso transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              {/* Add to Bag Button */}
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className={`w-full py-4 font-jost text-xs tracking-[0.2em] uppercase transition-all duration-300 mb-4 flex items-center justify-center gap-2 ${
                  !selectedSize
                    ? 'bg-soft-blush text-taupe cursor-not-allowed'
                    : addedToCart
                    ? 'bg-espresso text-ivory'
                    : 'bg-gold text-ivory hover:bg-gold/90'
                }`}
              >
                <AnimatePresence mode="wait">
                  {addedToCart ? (
                    <motion.span
                      key="added"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="flex items-center gap-2"
                    >
                      <Check size={14} strokeWidth={2} />
                      Added to Bag
                    </motion.span>
                  ) : (
                    <motion.span
                      key="add"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                    >
                      {selectedSize ? 'Add to Bag' : 'Select a Size'}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Save to Wishlist */}
              <button
                onClick={handleWishlist}
                className="w-full py-3 font-jost text-sm text-taupe hover:text-dusty-rose transition-colors flex items-center justify-center gap-2"
              >
                <Heart
                  size={16}
                  strokeWidth={1.5}
                  fill={isWishlisted ? 'currentColor' : 'none'}
                  className={isWishlisted ? 'text-dusty-rose' : ''}
                />
                {isWishlisted ? 'Saved to Wishlist' : 'Save to Wishlist'}
              </button>

              <div className="h-px bg-soft-blush my-8" />

              {/* Accordion */}
              <div className="space-y-0">
                {[
                  {
                    id: 'details',
                    title: 'Details & Care',
                    content: product.details.join('\n'),
                  },
                  {
                    id: 'fabric',
                    title: 'Fabric & Material',
                    content: product.details[0],
                  },
                  {
                    id: 'sizing',
                    title: 'Sizing & Fit',
                    content:
                      "Model is 5'10\" and wears size S. This style runs true to size with a relaxed fit.",
                  },
                  {
                    id: 'shipping',
                    title: 'Shipping & Returns',
                    content:
                      'Free standard shipping on orders over $150. Free returns within 30 days of delivery.',
                  },
                ].map((item) => (
                  <div key={item.id} className="border-b border-soft-blush">
                    <button
                      onClick={() =>
                        setOpenAccordion(
                          openAccordion === item.id ? null : item.id
                        )
                      }
                      className="w-full py-4 flex items-center justify-between font-jost text-sm text-espresso"
                    >
                      {item.title}
                      <ChevronDown
                        size={16}
                        strokeWidth={1.5}
                        className={`transition-transform duration-300 ${
                          openAccordion === item.id ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openAccordion === item.id
                          ? 'max-h-40 pb-4'
                          : 'max-h-0'
                      }`}
                    >
                      <p className="font-jost font-light text-sm text-taupe leading-relaxed whitespace-pre-line">
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Info */}
              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3 text-taupe">
                  <Truck size={16} strokeWidth={1.5} />
                  <span className="font-jost text-xs">
                    Free standard shipping over $150
                  </span>
                </div>
                <div className="flex items-center gap-3 text-taupe">
                  <RotateCcw size={16} strokeWidth={1.5} />
                  <span className="font-jost text-xs">
                    Free returns within 30 days
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Complete the Look */}
      {relatedProducts.length > 0 && (
        <section className="section-spacing bg-warm-white">
          <div className="container-wide">
            <h2 className="font-cormorant italic font-light text-[clamp(28px,4vw,36px)] text-espresso mb-12 text-center">
              Wear it with
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {relatedProducts.map((related) => (
                <ProductCard key={related.id} product={related} />
              ))}
            </div>
          </div>
        </section>
      )}

      
                {/* Reviews */}
      <ReviewSystem productId={product.id} />

{/* Recently Viewed */}
<RecentlyViewed currentProductId={product.id} />
    </>
  )
}