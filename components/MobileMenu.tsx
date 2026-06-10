'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { X, Heart, ShoppingBag } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { motion, AnimatePresence } from 'framer-motion'

export default function MobileMenu() {
  const { isMenuOpen, setMenuOpen, cartCount } = useStore()

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [setMenuOpen])

  const menuLinks = [
    { href: '/shop', label: 'Shop' },
    { href: '/shop?collection=new', label: 'Collections' },
    { href: '/about', label: 'About' },
    { href: '/journal', label: 'Journal' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-blush/95 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Close Button */}
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 text-espresso/70 hover:text-espresso transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dusty-rose"
            aria-label="Close menu"
          >
            <X size={24} strokeWidth={1.5} />
          </button>

          {/* NIVA Logo */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="absolute top-6 left-8 font-cormorant italic text-xl text-espresso"
          >
            NIVA
          </motion.p>

          {/* Nav Links */}
          <nav className="flex flex-col items-center gap-8">
            {menuLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-cormorant italic text-4xl font-light text-espresso hover:text-dusty-rose transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Bottom Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="absolute bottom-12 flex flex-col items-center gap-6"
          >
            {/* Wishlist + Cart */}
            <div className="flex items-center gap-8">
              <Link
                href="/wishlist"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 font-jost text-xs tracking-[0.2em] uppercase text-taupe hover:text-dusty-rose transition-colors"
              >
                <Heart size={16} strokeWidth={1.5} />
                Wishlist
              </Link>
              <Link
                href="/cart"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 font-jost text-xs tracking-[0.2em] uppercase text-taupe hover:text-dusty-rose transition-colors"
              >
                <ShoppingBag size={16} strokeWidth={1.5} />
                Bag {cartCount() > 0 && `(${cartCount()})`}
              </Link>
            </div>

            {/* Tagline */}
            <p className="font-jost text-xs tracking-[0.2em] uppercase text-taupe/60">
              Quiet Luxury Since 2020
            </p>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  )
}