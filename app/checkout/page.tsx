'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Lock, ArrowLeft } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { formatPrice } from '@/lib/currency'

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart, currency } = useStore()
  const currentTotal = cartTotal()
  const [orderPlaced, setOrderPlaced] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would call your payment API here
    setOrderPlaced(true)
    clearCart()
  }

  return (
    <>
      {/* Header */}
      <section className="pt-[70px] bg-ivory border-b border-soft-blush py-8">
        <div className="container-wide">
          <div className="flex items-center justify-between">
            <Link
              href="/cart"
              className="flex items-center font-jost text-xs text-taupe hover:text-dusty-rose transition-colors"
            >
              <ArrowLeft size={14} className="mr-2" />
              Back to Bag
            </Link>
            <span className="font-cormorant italic text-2xl text-espresso">NIVA</span>
            <div className="flex items-center gap-2 text-taupe">
              <Lock size={14} strokeWidth={1.5} />
              <span className="font-jost text-xs">Secure Checkout</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-spacing bg-blush/30">
        <div className="container-wide max-w-4xl">

          {/* Order Success State */}
          {orderPlaced ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-20 max-w-md mx-auto"
            >
              <div className="w-16 h-16 bg-dusty-rose/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-dusty-rose text-2xl">✓</span>
              </div>
              <h2 className="font-cormorant italic text-3xl text-espresso mb-4">
                Order Confirmed
              </h2>
              <p className="font-jost font-light text-sm text-taupe mb-8">
                Thank you for your order. You will receive a confirmation email shortly.
              </p>
              <Link
                href="/shop"
                className="inline-block px-8 py-3 border border-gold text-gold font-jost text-xs tracking-[0.25em] uppercase hover:bg-gold hover:text-ivory transition-all duration-300"
              >
                Continue Shopping
              </Link>
            </motion.div>

          ) : cartItems.length === 0 ? (

            /* Empty Cart */
            <div className="text-center py-20">
              <p className="font-cormorant italic text-3xl text-espresso mb-4">
                Your bag is empty
              </p>
              <Link
                href="/shop"
                className="font-jost text-sm text-dusty-rose hover:text-espresso transition-colors"
              >
                Continue Shopping
              </Link>
            </div>

          ) : (

            /* Checkout Form */
            <div className="grid lg:grid-cols-[1fr_400px] gap-12">

              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                onSubmit={handleSubmit}
              >
                {/* Contact */}
                <div className="mb-10">
                  <h2 className="font-playfair text-xl text-espresso mb-6">Contact</h2>
                  <input
                    type="email"
                    placeholder="Email address"
                    required
                    className="w-full bg-ivory border border-soft-blush py-4 px-6 font-jost text-sm text-espresso outline-none focus:border-dusty-rose transition-colors mb-4"
                  />
                  <label className="flex items-center gap-3 font-jost text-xs text-taupe cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 border border-soft-blush accent-dusty-rose"
                    />
                    Email me with news and offers
                  </label>
                </div>

                {/* Shipping */}
                <div className="mb-10">
                  <h2 className="font-playfair text-xl text-espresso mb-6">Shipping</h2>
                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="First name"
                        required
                        className="w-full bg-ivory border border-soft-blush py-4 px-6 font-jost text-sm text-espresso outline-none focus:border-dusty-rose transition-colors"
                      />
                      <input
                        type="text"
                        placeholder="Last name"
                        required
                        className="w-full bg-ivory border border-soft-blush py-4 px-6 font-jost text-sm text-espresso outline-none focus:border-dusty-rose transition-colors"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Address"
                      required
                      className="w-full bg-ivory border border-soft-blush py-4 px-6 font-jost text-sm text-espresso outline-none focus:border-dusty-rose transition-colors"
                    />
                    <input
                      type="text"
                      placeholder="Apartment, suite, etc. (optional)"
                      className="w-full bg-ivory border border-soft-blush py-4 px-6 font-jost text-sm text-espresso outline-none focus:border-dusty-rose transition-colors"
                    />
                    <div className="grid sm:grid-cols-3 gap-4">
                      <input
                        type="text"
                        placeholder="City"
                        required
                        className="w-full bg-ivory border border-soft-blush py-4 px-6 font-jost text-sm text-espresso outline-none focus:border-dusty-rose transition-colors"
                      />
                      <input
                        type="text"
                        placeholder="State"
                        required
                        className="w-full bg-ivory border border-soft-blush py-4 px-6 font-jost text-sm text-espresso outline-none focus:border-dusty-rose transition-colors"
                      />
                      <input
                        type="text"
                        placeholder="ZIP code"
                        required
                        className="w-full bg-ivory border border-soft-blush py-4 px-6 font-jost text-sm text-espresso outline-none focus:border-dusty-rose transition-colors"
                      />
                    </div>
                    <input
                      type="tel"
                      placeholder="Phone (for delivery updates)"
                      className="w-full bg-ivory border border-soft-blush py-4 px-6 font-jost text-sm text-espresso outline-none focus:border-dusty-rose transition-colors"
                    />
                  </div>
                </div>

                {/* Payment */}
                <div className="mb-10">
                  <h2 className="font-playfair text-xl text-espresso mb-6">Payment</h2>
                  <div className="bg-ivory border border-soft-blush p-6 mb-4">
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Card number"
                        required
                        maxLength={19}
                        className="w-full bg-transparent border-b border-soft-blush py-3 px-0 font-jost text-sm text-espresso outline-none focus:border-dusty-rose transition-colors"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="MM / YY"
                          required
                          maxLength={7}
                          className="w-full bg-transparent border-b border-soft-blush py-3 px-0 font-jost text-sm text-espresso outline-none focus:border-dusty-rose transition-colors"
                        />
                        <input
                          type="text"
                          placeholder="CVV"
                          required
                          maxLength={4}
                          className="w-full bg-transparent border-b border-soft-blush py-3 px-0 font-jost text-sm text-espresso outline-none focus:border-dusty-rose transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                  <p className="font-jost text-xs text-taupe text-center">
                    All transactions are secure and encrypted.
                  </p>
                </div>

                {/* Submit */}
                <button
  type="submit"
  className="w-full bg-gold text-ivory font-jost text-xs tracking-[0.25em] uppercase py-5 hover:bg-gold/90 transition-colors"
>
  Pay {formatPrice(currentTotal, currency)}
</button>
              </motion.form>

              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-ivory p-8 border border-soft-blush lg:sticky lg:top-24 lg:self-start"
              >
                <h3 className="font-playfair text-lg text-espresso mb-6">
                  Order Summary
                </h3>

                {/* Cart Items */}
                <div className="space-y-4 mb-6 pb-6 border-b border-soft-blush">
                  {cartItems.map((item) => (
                    <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4">
                      <div className="w-20 h-24 bg-blush overflow-hidden relative flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute -top-2 -right-2 w-6 h-6 bg-espresso text-ivory rounded-full flex items-center justify-center font-jost text-xs">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-playfair text-sm text-espresso">{item.name}</p>
                        <p className="font-jost text-xs text-taupe">
                          {item.size} / {item.color}
                        </p>
                      </div>
                      <p className="font-cormorant text-dusty-rose">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-3 pb-6 border-b border-soft-blush">
                  <div className="flex justify-between font-jost text-sm">
                    <span className="text-taupe">Subtotal</span>
                    <span className="text-espresso">${currentTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-jost text-sm">
                    <span className="text-taupe">Shipping</span>
                    <span className="text-espresso">
                      {currentTotal >= 150 ? 'FREE' : 'Calculated next'}
                    </span>
                  </div>
                  <div className="flex justify-between font-jost text-sm">
                    <span className="text-taupe">Tax</span>
                    <span className="text-espresso">Calculated next</span>
                  </div>
                </div>

                <div className="flex justify-between pt-6">
                  <span className="font-jost text-base text-espresso">Total</span>
                  <span className="font-cormorant text-2xl text-espresso">
                    ${currentTotal.toFixed(2)}
                  </span>
                </div>
              </motion.div>

            </div>
          )}
        </div>
      </section>
    </>
  )
}