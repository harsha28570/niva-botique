'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Clock, Instagram, Facebook } from 'lucide-react'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      {/* Header */}
      <section className="pt-[70px] bg-blush/30 py-16 md:py-24">
        <div className="container-wide text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-cormorant italic font-light text-[clamp(40px,6vw,64px)] text-espresso mb-4"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-jost font-light text-[15px] text-taupe max-w-lg mx-auto"
          >
            We&apos;d love to hear from you. Whether you have a question about our pieces,
            need styling advice, or just want to say hello.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="section-spacing">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16">

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-cormorant italic text-2xl text-espresso mb-8">
                Send us a message
              </h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-blush/50 p-10 text-center"
                >
                  <p className="font-cormorant italic text-2xl text-espresso mb-3">
                    Thank you for reaching out ✦
                  </p>
                  <p className="font-jost font-light text-sm text-taupe">
                    We typically respond within 24 hours. Talk soon!
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-jost text-xs tracking-wide text-taupe mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full bg-transparent border-b border-soft-blush py-3 px-0 font-jost text-sm text-espresso outline-none focus:border-dusty-rose transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block font-jost text-xs tracking-wide text-taupe mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full bg-transparent border-b border-soft-blush py-3 px-0 font-jost text-sm text-espresso outline-none focus:border-dusty-rose transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-jost text-xs tracking-wide text-taupe mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full bg-transparent border-b border-soft-blush py-3 px-0 font-jost text-sm text-espresso outline-none focus:border-dusty-rose transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-jost text-xs tracking-wide text-taupe mb-2">
                      Subject
                    </label>
                    <select className="w-full bg-transparent border-b border-soft-blush py-3 px-0 font-jost text-sm text-espresso outline-none focus:border-dusty-rose transition-colors cursor-pointer">
                      <option>General Inquiry</option>
                      <option>Order Support</option>
                      <option>Returns & Exchanges</option>
                      <option>Wholesale</option>
                      <option>Press</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-jost text-xs tracking-wide text-taupe mb-2">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      required
                      className="w-full bg-transparent border-b border-soft-blush py-3 px-0 font-jost text-sm text-espresso outline-none focus:border-dusty-rose transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-12 py-4 bg-gold text-ivory font-jost text-xs tracking-[0.25em] uppercase hover:bg-gold/90 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-12"
            >
              <div>
                <h3 className="font-cormorant italic text-xl text-espresso mb-6">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Mail size={18} strokeWidth={1.5} className="text-dusty-rose mt-1 flex-shrink-0" />
                    <p className="font-jost text-sm text-espresso">hello@niva.com</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone size={18} strokeWidth={1.5} className="text-dusty-rose mt-1 flex-shrink-0" />
                    <p className="font-jost text-sm text-espresso">+1 (555) 123-4567</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin size={18} strokeWidth={1.5} className="text-dusty-rose mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-jost text-sm text-espresso">123 Via della Moda</p>
                      <p className="font-jost text-sm text-taupe">Florence, Italy 50122</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock size={18} strokeWidth={1.5} className="text-dusty-rose mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-jost text-sm text-espresso">Monday - Friday: 9am - 6pm CET</p>
                      <p className="font-jost text-sm text-taupe">Saturday: 10am - 4pm CET</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-cormorant italic text-xl text-espresso mb-6">
                  Follow Us
                </h3>
                <div className="flex gap-4">
                  <a
                    href="#"
                    aria-label="Follow us on Instagram"
                    className="w-12 h-12 border border-soft-blush flex items-center justify-center text-taupe hover:border-dusty-rose hover:text-dusty-rose transition-colors"
                  >
                    <Instagram size={18} strokeWidth={1.5} />
                  </a>
                  <a
                    href="#"
                    aria-label="Follow us on Facebook"
                    className="w-12 h-12 border border-soft-blush flex items-center justify-center text-taupe hover:border-dusty-rose hover:text-dusty-rose transition-colors"
                  >
                    <Facebook size={18} strokeWidth={1.5} />
                  </a>
                </div>
              </div>

              <div className="p-8 bg-blush/50">
                <p className="font-cormorant italic text-lg text-espresso mb-4">
                  &ldquo;We typically respond within 24 hours. For urgent orders, please call us.&rdquo;
                </p>
                <p className="font-jost text-xs text-taupe">— The NIVA Team</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  )
}