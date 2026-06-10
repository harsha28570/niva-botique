'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Calendar, User } from 'lucide-react'
import { blogPosts } from '@/lib/data'

export default function JournalPage() {
  const [subscribed, setSubscribed] = useState(false)

  const featured = blogPosts[0]
  const rest = blogPosts.slice(1)

  // Safety check — if no blog posts exist yet
  if (!featured) {
    return (
      <div className="pt-[70px] min-h-screen flex items-center justify-center">
        <p className="font-cormorant italic text-2xl text-taupe">
          No stories yet. Check back soon.
        </p>
      </div>
    )
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
            The Journal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-jost font-light text-[15px] text-taupe max-w-lg mx-auto"
          >
            Style notes, behind the scenes & slow fashion stories from the NIVA world.
          </motion.p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="section-spacing">
        <div className="container-wide">
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center"
          >
            {/* Featured Image */}
            <div className="relative aspect-[4/5] overflow-hidden bg-blush">
              <img
                src={featured.image}
                alt={featured.title}
                loading="eager"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Featured Content */}
            <div>
              <p className="font-jost text-[10px] tracking-[0.25em] uppercase text-dusty-rose mb-4">
                {featured.category}
              </p>
              <h2 className="font-playfair text-2xl lg:text-3xl text-espresso mb-4">
                {featured.title}
              </h2>
              <div className="flex items-center gap-4 mb-6 text-taupe">
                <span className="flex items-center gap-2 font-jost text-xs">
                  <User size={12} strokeWidth={1.5} />
                  {featured.author}
                </span>
                <span className="flex items-center gap-2 font-jost text-xs">
                  <Calendar size={12} strokeWidth={1.5} />
                  {featured.date}
                </span>
              </div>
              <p className="font-jost font-light text-[15px] text-taupe leading-[1.9] mb-8">
                {featured.excerpt}
              </p>
              <Link
                href={`/journal/${featured.id}`}
                className="inline-flex items-center font-jost text-sm text-dusty-rose hover:text-espresso transition-colors group"
              >
                Read the full story
                <ArrowRight
                  size={14}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </motion.article>
        </div>
      </section>

      {/* More Posts */}
      {rest.length > 0 && (
        <section className="section-spacing bg-blush/30">
          <div className="container-wide">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-cormorant italic font-light text-[clamp(28px,4vw,40px)] text-espresso mb-12"
            >
              More Stories
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {rest.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={`/journal/${post.id}`} className="group block">

                    {/* Post Image */}
                    <div className="aspect-[3/2] overflow-hidden bg-blush mb-6">
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <p className="font-jost text-[10px] tracking-[0.25em] uppercase text-dusty-rose mb-3">
                      {post.category}
                    </p>
                    <h3 className="font-playfair text-xl text-espresso mb-3 group-hover:text-dusty-rose transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-4 mb-4 text-taupe">
                      <span className="flex items-center gap-2 font-jost text-xs">
                        <User size={12} strokeWidth={1.5} />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-2 font-jost text-xs">
                        <Calendar size={12} strokeWidth={1.5} />
                        {post.date}
                      </span>
                    </div>
                    <p className="font-jost font-light text-sm text-taupe leading-relaxed">
                      {post.excerpt}
                    </p>

                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="section-spacing bg-ivory">
        <div className="container-wide max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-cormorant italic text-sm text-dusty-rose mb-4">
              Stay Connected
            </p>
            <h2 className="font-cormorant italic font-light text-[clamp(28px,4vw,40px)] text-espresso mb-6">
              Subscribe to the Journal
            </h2>
            <p className="font-jost font-light text-sm text-taupe mb-8">
              Receive new stories, styling inspiration, and behind-the-scenes glimpses
              directly to your inbox.
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
                  ✓ You are now subscribed to the Journal
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

          </motion.div>
        </div>
      </section>
    </>
  )
}