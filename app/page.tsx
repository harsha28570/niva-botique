'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import ProductCard from '@/components/ProductCard'
import { products, categories, blogPosts, instagramImages, featuredCollection } from '@/lib/data'
import { ArrowRight, Truck, Gem, RotateCcw, Heart, Star } from 'lucide-react'

function FadeInSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function HomePage() {
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4)
  const newArrivals = products.slice(0, 6)
  const [subscribed, setSubscribed] = useState(false)

  return (
    <>
      {/* Announcement Bar */}
<div className="pt-[70px]">
  <div className="bg-ivory border-b border-soft-blush py-3">
    <div className="container-wide flex items-center justify-center gap-8">
      <span className="hidden md:inline-block w-12 h-px bg-soft-blush" />
      <p className="font-jost text-[11px] tracking-[0.25em] uppercase text-taupe text-center">
        Complimentary shipping on orders over $150
        <span className="mx-3 text-dusty-rose/60">✦</span>
        <span className="hidden sm:inline">
          Free returns within 30 days
        </span>
      </p>
      <span className="hidden md:inline-block w-12 h-px bg-soft-blush" />
    </div>
  </div>
</div>

      {/* Hero Section */}
      <section className="min-h-screen flex">
        {/* Left - Editorial Image - Desktop Only */}
<div className="hidden md:block w-[55%] relative overflow-hidden">
  <motion.img
    initial={{ scale: 1.1, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 1.2, ease: 'easeOut' }}
    src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=1200&q=80"
    alt="Model in elegant linen dress"
    loading="eager"
    className="w-full h-full object-cover"
  />
</div>

        {/* Right - Content */}
<div
  className="w-full md:w-[45%] flex items-center px-8 md:px-16 lg:px-20 pt-20 relative"
>
  {/* Mobile background image */}
  <div className="absolute inset-0 md:hidden">
    <img
      src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=800&q=80"
      alt=""
      className="w-full h-full object-cover"
      loading="eager"
    />
    <div className="absolute inset-0 bg-ivory/80" />
  </div>

  {/* Desktop white background */}
  <div className="absolute inset-0 hidden md:block bg-ivory" />

          <div className="max-w-lg py-20 relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-jost text-[11px] tracking-[0.3em] uppercase text-dusty-rose mb-6"
            >
              New Collection 2025
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="font-cormorant italic font-light text-[clamp(48px,6vw,90px)] leading-[1.05] text-espresso mb-8 tracking-[-0.02em]"
            >
              Dressed in<br />
              Quiet<br />
              Luxury.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="font-jost font-light text-[15px] text-taupe leading-[2] mb-10 max-w-sm"
            >
              Curated pieces for the woman who finds beauty in simplicity. 
              NIVA — where every stitch tells a story.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-wrap items-center gap-8"
            >
              <Link
                href="/shop"
                className="inline-block px-8 py-3 border border-gold text-gold font-jost text-xs tracking-[0.25em] uppercase hover:bg-gold hover:text-ivory transition-all duration-300"
              >
                Explore Collection
              </Link>
              <Link
                href="/about"
                className="font-jost text-sm text-taupe hover:text-dusty-rose transition-colors group flex items-center"
              >
                Our Story
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* As Seen In */}
      <section className="py-12 border-b border-soft-blush">
        <div className="container-wide text-center">
          <p className="font-cormorant italic text-sm text-taupe mb-6">As Seen In</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {['VOGUE', 'ELLE', 'BAZAAR', 'REFINERY29', 'WHO WHAT WEAR'].map((pub) => (
              <span
                key={pub}
                className="font-jost text-xs tracking-[0.3em] uppercase text-espresso/40 hover:text-espresso/70 transition-colors duration-300 cursor-default"
              >
                {pub}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="section-spacing">
        <div className="container-wide">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 mb-16">
            {/* Heading */}
            <FadeInSection>
              <p className="font-jost text-[11px] tracking-[0.3em] uppercase text-dusty-rose mb-4">
                {featuredCollection.tag}
              </p>
              <h2 className="font-cormorant italic font-light text-[clamp(36px,5vw,56px)] text-espresso leading-[1.2] mb-6">
                {featuredCollection.name}
              </h2>
              <p className="font-jost font-light text-[15px] text-taupe leading-relaxed mb-8 max-w-sm">
                {featuredCollection.description}
              </p>
              <Link
                href="/shop"
                className="font-jost text-sm text-taupe hover:text-dusty-rose transition-colors group inline-flex items-center"
              >
                View All
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
            </FadeInSection>

            {/* Large Featured Image */}
            <FadeInSection delay={0.2}>
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1000&q=80"
                  alt="Featured collection"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </FadeInSection>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {featuredProducts.map((product, index) => (
              <FadeInSection key={product.id} delay={index * 0.1}>
                <ProductCard product={product} />
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Philosophy / Editorial Break */}
      <section className="min-h-[80vh] flex flex-col lg:flex-row">
        {/* Left - Quote */}
        <div className="lg:w-[40%] bg-ivory p-12 lg:p-20 flex items-center">
          <FadeInSection>
            <blockquote className="mb-10">
              <p className="font-cormorant italic font-light text-[clamp(36px,4vw,64px)] text-espresso leading-[1.2]">
                &ldquo;We believe in<br />
                less, but always<br />
                better.&rdquo;
              </p>
            </blockquote>
            <p className="font-jost font-light text-[15px] text-taupe leading-relaxed mb-8 max-w-sm">
              NIVA is not just fashion. It is a feeling. A quiet statement. An everyday ritual.
            </p>
            <Link
              href="/about"
              className="inline-block px-8 py-3 border border-gold text-gold font-jost text-xs tracking-[0.25em] uppercase hover:bg-gold hover:text-ivory transition-all duration-300"
            >
              Discover Our Story
            </Link>
          </FadeInSection>
        </div>

        {/* Right - Image Collage */}
<div className="lg:w-[60%] relative bg-blush overflow-hidden">
  <div className="absolute inset-0 grid grid-cols-2 gap-4 p-8">
    <div className="relative -rotate-2 translate-y-8">
      <img
        src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80"
        alt="Hands stitching fabric in atelier"
        loading="lazy"
        className="w-full h-full object-cover aspect-[3/4]"
      />
    </div>
    <div className="relative rotate-1 -translate-y-4">
    <img
  src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1000&q=80"
  alt="Featured collection"
  loading="lazy"
  className="w-full h-full object-cover"
/>
    </div>
  </div>
</div>
      </section>

      {/* Shop by Category */}
      <section className="section-spacing bg-warm-white">
        <div className="container-wide">
          <FadeInSection className="text-center mb-16">
            <p className="font-cormorant italic text-sm text-taupe mb-2">Explore</p>
            <h2 className="font-cormorant italic font-light text-[clamp(36px,5vw,52px)] text-espresso">
              Each category, a world of its own
            </h2>
          </FadeInSection>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {categories.map((category, index) => (
              <FadeInSection key={category.id} delay={index * 0.1}>
                <Link
                  href={`/shop?category=${category.id}`}
                  className="group relative aspect-[4/5] overflow-hidden block"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-cormorant italic text-2xl lg:text-3xl text-ivory group-hover:scale-105 transition-transform duration-300">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Strip */}
      <section className="section-spacing">
        <div className="container-wide">
          <div className="flex items-end justify-between mb-12">
            <FadeInSection>
              <h2 className="font-cormorant italic font-light text-[clamp(32px,4vw,44px)] text-espresso">
                Just Arrived
              </h2>
            </FadeInSection>
            <FadeInSection delay={0.1}>
              <Link
                href="/shop?sort=newest"
                className="font-jost text-sm text-taupe hover:text-dusty-rose transition-colors group items-center hidden sm:inline-flex"
              >
                View All
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
            </FadeInSection>
          </div>

          <div className="horizontal-scroll flex gap-6 pb-4 -mx-6 px-6">
            {newArrivals.map((product, index) => (
              <FadeInSection key={product.id} delay={index * 0.05} className="flex-shrink-0 w-[280px] sm:w-[320px]">
                <ProductCard product={product} showQuickAdd={false} />
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* The NIVA Journal */}
      <section className="section-spacing bg-blush/50">
        <div className="container-wide">
          <FadeInSection className="text-center mb-16">
            <p className="font-cormorant italic text-sm text-taupe mb-2">The Journal</p>
            <h2 className="font-cormorant italic font-light text-[clamp(36px,5vw,52px)] text-espresso mb-4">
              Style notes, behind the scenes & slow fashion stories
            </h2>
          </FadeInSection>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {blogPosts.map((post, index) => (
              <FadeInSection key={post.id} delay={index * 0.1}>
                <Link href={`/journal/${post.id}`} className="group block">
                  <div className="aspect-[3/2] overflow-hidden mb-6 bg-ivory">
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="font-jost text-[10px] tracking-[0.2em] uppercase text-dusty-rose mb-3">
                    {post.category}
                  </p>
                  <h3 className="font-playfair text-xl lg:text-2xl text-espresso mb-3 group-hover:text-dusty-rose transition-colors">
                    {post.title}
                  </h3>
                  <p className="font-jost font-light text-sm text-taupe leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <span className="font-jost text-xs text-taupe group-hover:text-dusty-rose transition-colors">
                    Read More →
                  </span>
                </Link>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="section-spacing">
        <div className="container-wide">
          <FadeInSection className="text-center mb-12">
            <h2 className="font-cormorant italic font-light text-[clamp(28px,4vw,36px)] text-espresso mb-2">
              @niva.boutique
            </h2>
            <p className="font-jost text-sm text-taupe">Wear it. Live it. Share it.</p>
          </FadeInSection>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-1">
            {instagramImages.map((image, index) => (
              <FadeInSection key={index} delay={index * 0.05}>
                <a href="#" className="group relative aspect-square overflow-hidden block">
                  <img
                    src={image}
                    alt={`Instagram post ${index + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-dusty-rose/0 group-hover:bg-dusty-rose/20 transition-colors duration-300 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-ivory opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </div>
                </a>
              </FadeInSection>
            ))}
          </div>

          <FadeInSection className="text-center mt-10">
            <a href="#" className="font-jost text-xs tracking-[0.2em] uppercase text-taupe hover:text-dusty-rose transition-colors">
              Follow us on Instagram
            </a>
          </FadeInSection>
        </div>
      </section>

      {/* Trust & Features */}
      <section className="py-16 border-t border-soft-blush">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {[
              { icon: Truck, title: 'Free Shipping', desc: 'On orders over $150' },
              { icon: Gem, title: 'Handcrafted Quality', desc: 'Every piece, curated' },
              { icon: RotateCcw, title: 'Easy Returns', desc: '30-day hassle free' },
              { icon: Heart, title: 'Members First', desc: 'Exclusive early access' },
            ].map((feature, index) => (
              <FadeInSection key={feature.title} delay={index * 0.1} className="text-center">
                <feature.icon size={24} strokeWidth={1} className="mx-auto mb-4 text-dusty-rose" />
                <h3 className="font-playfair text-base text-espresso mb-1">{feature.title}</h3>
                <p className="font-jost font-light text-xs text-taupe">{feature.desc}</p>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-spacing bg-blush relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
          <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-dusty-rose">
            <path d="M100,10 Q150,50 120,100 T100,190 Q50,150 80,100 T100,10" />
          </svg>
        </div>

        <div className="container-wide relative">
          <FadeInSection className="max-w-2xl mx-auto text-center">
            <p className="font-jost text-[11px] tracking-[0.3em] uppercase text-dusty-rose mb-4">
              Join the NIVA Circle
            </p>
            <h2 className="font-cormorant italic font-light text-[clamp(36px,5vw,52px)] text-espresso mb-6">
  Join a community of<br />women who choose better.
</h2>
<p className="font-jost font-light text-[15px] text-taupe leading-relaxed mb-10">
  New arrivals, styling notes, and quiet moments of inspiration — 
  delivered softly to your inbox.
</p>

            <form
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              onSubmit={(e) => {
                e.preventDefault()
                setSubscribed(true)
              }}
            >
              {subscribed ? (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-jost text-sm text-dusty-rose tracking-widest w-full text-center"
                >
                  ✓ Welcome to the NIVA Circle
                </motion.p>
              ) : (
                <>
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-1 bg-transparent border-b border-espresso/20 py-3 px-0 font-jost text-sm text-espresso outline-none focus:border-dusty-rose transition-colors"
                    required
                  />
                  <button
                    type="submit"
                    className="font-jost text-xs tracking-[0.2em] uppercase text-dusty-rose hover:text-espresso transition-colors py-3"
                  >
                    Subscribe →
                  </button>
                </>
              )}
            </form>
          </FadeInSection>
        </div>
      </section>
    </>
  )
}