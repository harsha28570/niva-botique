'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Minus, Plus, X, ArrowRight, ShoppingBag, Lock } from 'lucide-react'
import { useStore } from '@/store/useStore'

export default function CartPage() {
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    cartTotal, 
    cartCount,
    toggleWishlist,
  } = useStore()

  const shippingThreshold = 150
  const currentTotal = cartTotal()
  const amountToFreeShipping = Math.max(0, shippingThreshold - currentTotal)
  const estimatedTax = currentTotal * 0.08
  const orderTotal = currentTotal + estimatedTax

  const handleQuantityChange = (itemId: string, size: string, color: string, newQty: number) => {
    const id = `${itemId}-${size}-${color}`
    if (newQty < 1) {
      removeFromCart(id)
    } else {
      updateQuantity(id, newQty)
    }
  }

  const handleMoveToWishlist = (item: typeof cartItems[0]) => {
    toggleWishlist({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: '',
    })
    removeFromCart(`${item.id}-${item.size}-${item.color}`)
  }

  return (
    <>
      {/* Header */}
      <section className="pt-[70px] bg-ivory border-b border-soft-blush py-16 md:py-24">
        <div className="container-wide text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-playfair text-3xl md:text-4xl text-espresso mb-2"
          >
            Your Bag
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-jost font-light text-sm text-taupe"
          >
            {cartCount()} {cartCount() === 1 ? 'item' : 'items'}
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="section-spacing">
        <div className="container-wide">
          {cartItems.length === 0 ? (

            /* Empty Cart */
            <div className="text-center py-20 max-w-md mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <ShoppingBag
                  size={64}
                  strokeWidth={1}
                  className="mx-auto text-soft-blush mb-8"
                />
                <p className="font-cormorant italic text-3xl text-espresso mb-4">
                  Your bag is empty
                </p>
                <p className="font-jost font-light text-sm text-taupe mb-10">
                  Discover our curated collection of quiet luxury pieces.
                </p>
                <Link
                  href="/shop"
                  className="inline-flex items-center px-8 py-3 border border-gold text-gold font-jost text-xs tracking-[0.25em] uppercase hover:bg-gold hover:text-ivory transition-all duration-300"
                >
                  Continue Shopping
                  <ArrowRight size={14} className="ml-2" />
                </Link>
              </motion.div>
            </div>

          ) : (
            <div className="grid lg:grid-cols-[1fr_400px] gap-12 lg:gap-16">

              {/* Cart Items */}
              <div>
                {/* Free Shipping Progress */}
                {amountToFreeShipping > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-blush/50 px-6 py-4 mb-8"
                  >
                    <p className="font-jost text-xs text-taupe text-center">
                      You&apos;re{' '}
                      <span className="text-dusty-rose">
                        ${amountToFreeShipping.toFixed(0)}
                      </span>{' '}
                      away from free shipping
                    </p>
                    <div className="progress-bar mt-3">
                      <div
                        className="progress-bar-fill"
                        style={{
                          width: `${Math.min(
                            (currentTotal / shippingThreshold) * 100,
                            100
                          )}%`,
                        }}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Items List */}
                <div className="space-y-6">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={`${item.id}-${item.size}-${item.color}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex gap-6 pb-6 border-b border-soft-blush last:border-b-0"
                    >
                      {/* Image */}
                      <div className="w-28 h-36 bg-blush overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-playfair text-lg text-espresso">
                              {item.name}
                            </h3>
                            <p className="font-jost text-xs text-taupe mt-1">
                              {item.color} / {item.size}
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              removeFromCart(
                                `${item.id}-${item.size}-${item.color}`
                              )
                            }
                            className="text-taupe hover:text-dusty-rose transition-colors p-1"
                            aria-label="Remove item"
                          >
                            <X size={16} strokeWidth={1.5} />
                          </button>
                        </div>

                        <p className="font-cormorant text-xl text-dusty-rose mb-auto">
                          ${item.price}
                        </p>

                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-soft-blush/50">

                          {/* Quantity */}
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
                              className="w-10 h-10 flex items-center justify-center text-taupe hover:text-espresso transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} strokeWidth={1.5} />
                            </button>
                            <span className="w-10 text-center font-jost text-sm">
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
                              className="w-10 h-10 flex items-center justify-center text-taupe hover:text-espresso transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} strokeWidth={1.5} />
                            </button>
                          </div>

                          {/* Move to Wishlist */}
                          <button
                            onClick={() => handleMoveToWishlist(item)}
                            className="font-jost text-xs text-taupe hover:text-dusty-rose transition-colors"
                          >
                            Move to Wishlist
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Continue Shopping */}
                <div className="mt-8">
                  <Link
                    href="/shop"
                    className="font-jost text-sm text-taupe hover:text-dusty-rose transition-colors inline-flex items-center group"
                  >
                    <span className="mr-2 group-hover:-translate-x-1 transition-transform duration-300">
                      ←
                    </span>
                    Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:sticky lg:top-24 lg:self-start"
              >
                <div className="bg-warm-white p-8 border border-soft-blush">
                  <h2 className="font-playfair text-xl text-espresso mb-6">
                    Order Summary
                  </h2>

                  {/* Line Items */}
                  <div className="space-y-3 pb-6 border-b border-soft-blush">
                    <div className="flex justify-between font-jost text-sm">
                      <span className="text-taupe">Subtotal</span>
                      <span className="text-espresso">${currentTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-jost text-sm">
                      <span className="text-taupe">Shipping</span>
                      <span className="text-espresso">
                        {currentTotal >= shippingThreshold
                          ? 'FREE'
                          : 'Calculated at checkout'}
                      </span>
                    </div>
                    <div className="flex justify-between font-jost text-sm">
                      <span className="text-taupe">Estimated Tax</span>
                      <span className="text-espresso">${estimatedTax.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between py-6">
                    <span className="font-jost text-base text-espresso">Total</span>
                    <span className="font-cormorant text-2xl text-espresso">
                      ${orderTotal.toFixed(2)}
                    </span>
                  </div>

                  {/* Promo Code */}
                  <div className="mb-6">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Promo code"
                        className="flex-1 bg-transparent border-b border-soft-blush py-2 px-0 font-jost text-sm text-espresso outline-none focus:border-dusty-rose transition-colors"
                      />
                      <button className="font-jost text-xs tracking-wide text-taupe hover:text-dusty-rose transition-colors">
                        Apply
                      </button>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Link
                    href="/checkout"
                    className="block w-full bg-gold text-ivory font-jost text-xs tracking-[0.2em] uppercase py-4 text-center hover:bg-gold/90 transition-colors mb-4"
                  >
                    Proceed to Checkout
                  </Link>

                  {/* Security Note */}
                  <div className="flex items-center justify-center gap-2 text-taupe mb-6">
                    <Lock size={14} strokeWidth={1.5} />
                    <span className="font-jost text-xs">Secure Checkout</span>
                  </div>

                  {/* Payment Icons */}
                  <div className="flex items-center justify-center gap-3 pt-4 border-t border-soft-blush">
                    {['VISA', 'MC', 'AMEX', 'Pay'].map((label) => (
                      <div
                        key={label}
                        className="px-2 py-1 border border-soft-blush rounded"
                      >
                        <span className="font-jost text-[9px] text-taupe">
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Help Text */}
                <p className="mt-4 font-jost text-xs text-taupe text-center">
                  Free returns within 30 days
                </p>
              </motion.div>

            </div>
          )}
        </div>
      </section>
    </>
  )
}