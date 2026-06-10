'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import { blogPosts } from '@/lib/data'

export default function JournalPostPage() {
  const params = useParams()
  const post = blogPosts.find(p => p.id === params.id)

  // Post not found
  if (!post) {
    return (
      <div className="pt-[70px] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-cormorant italic text-3xl text-espresso mb-4">
            Story not found
          </p>
          <Link
            href="/journal"
            className="font-jost text-sm text-dusty-rose hover:text-espresso transition-colors"
          >
            Back to Journal
          </Link>
        </div>
      </div>
    )
  }

  // Other posts excluding current
  const otherPosts = blogPosts.filter(p => p.id !== post.id)

  return (
    <>
      {/* Hero Image */}
      <section className="pt-[70px] relative min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={post.image}
            alt={post.title}
            loading="eager"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/30 to-transparent" />
        </div>
        <div className="container-wide relative z-10 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-jost text-[10px] tracking-[0.25em] uppercase text-dusty-rose mb-4">
              {post.category}
            </p>
            <h1 className="font-cormorant italic font-light text-[clamp(36px,6vw,64px)] text-ivory leading-[1.2] max-w-3xl">
              {post.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="section-spacing">
        <div className="container-wide max-w-3xl">

          {/* Meta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-6 mb-12 pb-12 border-b border-soft-blush"
          >
            <span className="flex items-center gap-2 font-jost text-xs text-taupe">
              <User size={12} strokeWidth={1.5} />
              {post.author}
            </span>
            <span className="flex items-center gap-2 font-jost text-xs text-taupe">
              <Calendar size={12} strokeWidth={1.5} />
              {post.date}
            </span>
          </motion.div>

          {/* Body */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="prose-niva"
          >
            <p className="font-cormorant italic text-2xl text-espresso leading-[1.6] mb-8">
              {post.excerpt}
            </p>
            <div className="space-y-6 font-jost font-light text-[15px] text-taupe leading-[2]">
              <p>
                At NIVA, we believe that fashion should be a deliberate choice — not a 
                reaction to trends, but a reflection of who you are. Every piece we create 
                is designed to outlast the season it was made in.
              </p>
              <p>
                The process begins long before the first stitch. Our designers spend months 
                sourcing the finest materials, working with mills that have been weaving 
                fabric for generations. When you wear a NIVA piece, you are wearing the 
                accumulated knowledge of artisans who have dedicated their lives to their craft.
              </p>
              <p>
                Slow fashion is not about wearing less — it is about wearing better. It is 
                about choosing a linen dress that will still feel beautiful in ten years. 
                It is about investing in a wool coat that improves with age. It is about 
                building a wardrobe that tells your story.
              </p>
              <p>
                We invite you to slow down, to feel the weight of a well-made garment, 
                to appreciate the quiet luxury of something crafted with intention. That 
                is what NIVA is about. That is what we believe fashion should always be.
              </p>
            </div>
          </motion.div>

          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 pt-12 border-t border-soft-blush"
          >
            <Link
              href="/journal"
              className="inline-flex items-center font-jost text-sm text-taupe hover:text-dusty-rose transition-colors group"
            >
              <ArrowLeft
                size={14}
                className="mr-2 group-hover:-translate-x-1 transition-transform"
              />
              Back to Journal
            </Link>
          </motion.div>
        </div>
      </section>

      {/* More Stories */}
      {otherPosts.length > 0 && (
        <section className="section-spacing bg-blush/30">
          <div className="container-wide">
            <h2 className="font-cormorant italic font-light text-[clamp(28px,4vw,40px)] text-espresso mb-12">
              More Stories
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherPosts.map((other, index) => (
                <motion.div
                  key={other.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={`/journal/${other.id}`} className="group block">
                    <div className="aspect-[3/2] overflow-hidden bg-blush mb-6">
                      <img
                        src={other.image}
                        alt={other.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <p className="font-jost text-[10px] tracking-[0.25em] uppercase text-dusty-rose mb-3">
                      {other.category}
                    </p>
                    <h3 className="font-playfair text-xl text-espresso mb-2 group-hover:text-dusty-rose transition-colors">
                      {other.title}
                    </h3>
                    <p className="font-jost font-light text-sm text-taupe leading-relaxed">
                      {other.excerpt}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}