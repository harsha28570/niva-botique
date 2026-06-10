'use client'

import { useEffect, useState } from 'react'
import { X, Search } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { products } from '@/lib/data'

export default function SearchOverlay() {
  const { isSearchOpen, setSearchOpen } = useStore()
  const [query, setQuery] = useState('')

  // Lock body scroll when open
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isSearchOpen])

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  // Clear query when closing
  const handleClose = () => {
    setSearchOpen(false)
    setQuery('')
  }

  // Search filter — name, category and description
  const searchResults =
    query.length > 1
      ? products
          .filter(
            (p) =>
              p.name.toLowerCase().includes(query.toLowerCase()) ||
              p.category.toLowerCase().includes(query.toLowerCase()) ||
              p.shortDescription?.toLowerCase().includes(query.toLowerCase())
          )
          .slice(0, 5)
      : []

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-ivory/98 backdrop-blur-md z-[60]"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-label="Search"
        >
          {/* Content — stopPropagation prevents backdrop click from firing */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex flex-col items-center pt-32 px-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 text-espresso/70 hover:text-espresso transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dusty-rose"
              aria-label="Close search"
            >
              <X size={24} strokeWidth={1.5} />
            </button>

            <div className="w-full max-w-2xl">

              {/* Search Input */}
              <div className="relative flex items-center border-b border-soft-blush pb-4">
                <Search size={24} strokeWidth={1.5} className="text-taupe mr-4 flex-shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for pieces..."
                  className="w-full bg-transparent font-cormorant italic text-3xl md:text-4xl text-espresso outline-none placeholder:text-taupe/50"
                  autoFocus
                />
                {/* Clear input button */}
                {query.length > 0 && (
                  <button
                    onClick={() => setQuery('')}
                    className="ml-4 text-taupe hover:text-espresso transition-colors"
                    aria-label="Clear search"
                  >
                    <X size={18} strokeWidth={1.5} />
                  </button>
                )}
              </div>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-8"
                >
                  <p className="font-jost text-xs tracking-[0.2em] uppercase text-taupe mb-4">
                    {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                  </p>
                  <div className="space-y-4">
                    {searchResults.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        onClick={handleClose}
                        className="flex items-center gap-4 group"
                      >
                        <div className="w-16 h-20 bg-blush overflow-hidden flex-shrink-0">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div>
                          <p className="font-playfair text-lg text-espresso group-hover:text-dusty-rose transition-colors">
                            {product.name}
                          </p>
                          <p className="font-jost text-xs text-taupe capitalize mb-1">
                            {product.category}
                          </p>
                          <p className="font-cormorant text-dusty-rose">
                            ${product.price}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* No Results */}
              {query.length > 1 && searchResults.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-8 text-center"
                >
                  <p className="font-jost text-sm text-taupe mb-4">
                    No pieces found for &quot;{query}&quot;
                  </p>
                  <Link
                    href="/shop"
                    onClick={handleClose}
                    className="font-jost text-xs tracking-[0.2em] uppercase text-dusty-rose hover:text-espresso transition-colors"
                  >
                    Browse all pieces →
                  </Link>
                </motion.div>
              )}

              {/* Default State — Trending */}
              {query.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="mt-12 text-center"
                >
                  <p className="font-jost text-xs tracking-[0.2em] uppercase text-taupe mb-4">
                    Trending Pieces
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    {['Linen', 'Cashmere', 'Silk', 'Dresses', 'Tops'].map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-4 py-2 border border-soft-blush text-taupe font-jost text-xs tracking-wide hover:border-dusty-rose hover:text-dusty-rose transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}