'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { motion, AnimatePresence } from 'framer-motion'

export default function CartDrawer() {
  const {
    isCartOpen,
    setCartOpen,
    cartItems,
    updateQuantity,
    removeFromCart,
    cartTotal,
    cartCount,
  } = useStore()

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isCartOpen])

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCartOpen(false)
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [setCartOpen])

  const shippingThreshold = 150
  const currentTotal = cartTotal()

  // Fixed: use Math.max so it never goes negative
  const amountToFreeShipping = Math.max(0, shippingThreshold - currentTotal)
  const shippingProgress = Math.min((currentTotal / shippingThreshold) * 100, 100)

  const handleQuantityChange = (
    itemId: string,
    size: string,
    color: string,
    newQty: number
  ) => {
    const id = `${itemId}-${size}-${color}`
    if (newQty < 1) {
      removeFromCart(id)
    } else {
      updateQuantity(id, newQty)
    }
  }

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-espresso/20 backdrop-blur-sm z-[60]"
            onClick={() => setCartOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-ivory z-[70] flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-soft-blush">
              <h2 className="font-playfair text-xl text-espresso">
                Your Bag ({cartCount()})
              </h2>
              <button
                onClick={() => setCartOpen(false)}
                className="text-espresso/70 hover:text-espresso transition-colors"
                aria-label="Close cart"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Free Shipping Progress */}
            {/* Fixed: only show when items exist AND threshold not yet met */}
            {cartItems.length > 0 && amountToFreeShipping > 0 && (
              <div className="px-6 py-4 bg-blush/50">
                <p className="font-jost text-xs text-taupe text-center">
                  You&apos;re{' '}
                  <span className="text-dusty-rose">
                    ${amountToFreeShipping.toFixed(0)}
                  </span>{' '}
                  away from free shipping
                </p>
                <div className="progress-bar mt-2">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${shippingProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Free shipping achieved message */}
            {cartItems.length > 0 && amountToFreeShipping === 0 && (
              <div className="px-6 py-3 bg-dusty-rose/10 text-center">
                <p className="font-jost text-xs text-dusty-rose">
                  ✓ You have free shipping!
                </p>
              </div>
            )}

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (

                /* Empty State */
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag
                    size={48}
                    strokeWidth={1}
                    className="text-soft-blush mb-4"
                  />
                  <p className="font-cormorant italic text-2xl text-espresso mb-2">
                    Your bag is empty
                  </p>
                  <p className="font-jost text-sm text-taupe mb-6">
                    Discover our curated collection
                  </p>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="font-jost text-xs tracking-[0.2em] uppercase text-dusty-rose hover:text-espresso transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>

              ) : (

                /* Items List */
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <motion.div
                      key={`${item.id}-${item.size}-${item.color}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex gap-4 pb-6 border-b border-soft-blush last:border-b-0"
                    >
                      {/* Item Image */}
                      <div className="w-24 h-32 bg-blush overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 flex flex-col">
                        <h3 className="font-playfair text-base text-espresso mb-1">
                          {item.name}
                        </h3>
                        <p className="font-jost text-xs text-taupe mb-2">
                          {item.color} / {item.size}
                        </p>
                        <p className="font-cormorant text-lg text-dusty-rose mb-auto">
                          ${item.price}
                        </p>

                        <div className="flex items-center justify-between mt-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-soft-blush">
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  item.id,
                                  item.size,
                                  item.color,
                                  item.quantity - 1
                                )
                              }
                              className="w-8 h-8 flex items-center justify-center text-taupe hover:text-espresso transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} strokeWidth={1.5} />
                            </button>
                            <span className="w-8 text-center font-jost text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  item.id,
                                  item.size,
                                  item.color,
                                  item.quantity + 1
                                )
                              }
                              className="w-8 h-8 flex items-center justify-center text-taupe hover:text-espresso transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} strokeWidth={1.5} />
                            </button>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() =>
                              removeFromCart(
                                `${item.id}-${item.size}-${item.color}`
                              )
                            }
                            className="font-jost text-xs text-taupe hover:text-dusty-rose transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-soft-blush bg-warm-white">
                <div className="flex justify-between mb-2">
                  <span className="font-jost text-sm text-taupe">Subtotal</span>
                  <span className="font-cormorant text-xl text-espresso">
                    ${cartTotal().toFixed(2)}
                  </span>
                </div>
                <p className="font-jost text-xs text-taupe mb-6">
                  Shipping and taxes calculated at checkout
                </p>

                {/* Checkout Button */}
                <Link
                  href="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="block w-full bg-gold text-ivory font-jost text-xs tracking-[0.2em] uppercase py-4 text-center hover:bg-gold/90 transition-colors"
                >
                  Proceed to Checkout
                </Link>

                {/* Continue Shopping */}
                {/* Fixed: inline-flex instead of block + inline icon */}
                <button
                  onClick={() => setCartOpen(false)}
                  className="w-full mt-3 font-jost text-xs tracking-wide text-taupe text-center hover:text-dusty-rose transition-colors inline-flex items-center justify-center gap-1"
                >
                  Continue Shopping
                  <ArrowRight size={12} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}