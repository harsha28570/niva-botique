'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-[70px] relative min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1600&q=80"
            alt="NIVA atelier"
            loading="eager"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/40 to-transparent" />
        </div>
        <div className="container-wide relative z-10 pb-16 md:pb-24">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-cormorant italic font-light text-[clamp(48px,8vw,80px)] text-ivory leading-[1.1]"
          >
            This is NIVA
          </motion.h1>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-spacing">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">

            {/* Left - Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-cormorant italic text-sm text-dusty-rose mb-6">
                Our Story
              </p>
              <h2 className="font-cormorant italic font-light text-[clamp(32px,4vw,48px)] text-espresso leading-[1.3] mb-8">
                Fashion that feels like a feeling, not just what you wear.
              </h2>
              <div className="space-y-6 font-jost font-light text-[15px] text-taupe leading-[2]">
                <p>
                  NIVA was born in a small atelier in Florence in 2020, from a simple belief:
                  that the clothes we wear should make us feel something. Not just confident or
                  put-together, but genuinely connected to ourselves.
                </p>
                <p>
                  We started with a question: what if fashion could be slower, more intentional,
                  more beautiful? What if every piece was designed to be worn a hundred times,
                  washed a thousand ways, and still feel like the first day?
                </p>
                <p>
                  Today, NIVA is a small team of passionate craftspeople, designers, and dreamers
                  working from studios in Florence and New York. We partner with family-owned
                  workshops across Italy and Portugal, where skilled artisans bring our designs
                  to life using techniques passed down through generations.
                </p>
              </div>
            </motion.div>

            {/* Right - Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1000&q=80"
                  alt="Artisan at work"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-blush/50 -z-10" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* Pull Quote */}
      <section className="py-24 bg-blush/30">
        <div className="container-wide">
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="font-cormorant italic font-light text-[clamp(28px,4vw,48px)] text-espresso leading-[1.4] mb-8">
              &ldquo;We don&apos;t make clothes. We make moments. The morning light through
              linen curtains. The feeling of something well-made against your skin.
              The quiet confidence of choosing quality over quantity.&rdquo;
            </p>
            <cite className="font-jost text-xs tracking-[0.2em] uppercase text-taupe not-italic">
              — Sofia Martinez, Founder
            </cite>
          </motion.blockquote>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-spacing">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="font-cormorant italic text-sm text-dusty-rose mb-4">
              What We Believe
            </p>
            <h2 className="font-cormorant italic font-light text-[clamp(32px,4vw,48px)] text-espresso">
              Our Values
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              {
                title: 'Slow Fashion',
                description: 'We believe in making less, but making it better. Every piece is designed to last, not to be replaced.',
              },
              {
                title: 'Quality First',
                description: 'We source the finest materials and work with artisans who share our commitment to excellence.',
              },
              {
                title: 'Sustainable Sourcing',
                description: 'From our fabrics to our packaging, sustainability is woven into every decision we make.',
              },
              {
                title: 'Made to Last',
                description: 'We design for longevity, not trends. Our pieces are meant to be worn for years, not seasons.',
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 mx-auto mb-6 border border-dusty-rose rounded-full flex items-center justify-center">
                  <span className="font-cormorant italic text-dusty-rose">✦</span>
                </div>
                <h3 className="font-playfair text-lg text-espresso mb-3">
                  {value.title}
                </h3>
                <p className="font-jost font-light text-sm text-taupe leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="section-spacing bg-espresso">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Founder Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
                  alt="Sofia Martinez, Founder"
                  loading="lazy"
                  className="w-full h-full object-cover grayscale"
                />
              </div>
            </motion.div>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-ivory/90"
            >
              <p className="font-jost text-xs tracking-[0.2em] uppercase text-ivory/40 mb-6">
                The Founder
              </p>
              <h3 className="font-cormorant italic text-3xl text-ivory mb-6">
                Sofia Martinez
              </h3>
              <blockquote className="font-cormorant italic font-light text-xl lg:text-2xl text-ivory/80 leading-[1.6] mb-8">
                &ldquo;I started NIVA because I was tired of fast fashion. Tired of clothes that
                fell apart after a few wears. Tired of feeling disconnected from what I put on
                my body. I wanted to create something different—fashion that slows you down,
                that makes you present, that feels like home.&rdquo;
              </blockquote>
              <p className="font-jost font-light text-sm text-ivory/60 leading-relaxed mb-8">
                Before founding NIVA, Sofia spent a decade working with luxury fashion houses
                in Milan and Paris. She holds a degree in textile design from the Politecnico
                di Milano and has been featured in Vogue, Elle, and Harper&apos;s Bazaar.
              </p>
              <Link
                href="/journal"
                className="inline-flex items-center font-jost text-sm text-dusty-rose hover:text-ivory transition-colors group"
              >
                Read her story
                <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-blush/50">
        <div className="container-wide text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-cormorant italic text-sm text-dusty-rose mb-4">
              Join the Journey
            </p>
            <h2 className="font-cormorant italic font-light text-[clamp(32px,4vw,48px)] text-espresso mb-6">
              Discover the Collection
            </h2>
            <p className="font-jost font-light text-sm text-taupe mb-10 max-w-md mx-auto">
              Every piece in our collection is made with intention. Find yours today.
            </p>
            <Link
              href="/shop"
              className="inline-block px-12 py-4 bg-gold text-ivory font-jost text-xs tracking-[0.25em] uppercase hover:bg-gold/90 transition-colors"
            >
              Shop Now
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}