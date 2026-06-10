'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star } from 'lucide-react'

interface Review {
  id: string
  name: string
  date: string
  rating: number
  text: string
  verified: boolean
  helpful: number
  size?: string
  color?: string
}

const initialReviews: Review[] = [
  {
    id: '1',
    name: 'Emma L.',
    date: 'June 12, 2025',
    rating: 5,
    text: 'Absolutely beautiful quality. The linen is so soft and the fit is perfect. I receive compliments every time I wear it.',
    verified: true,
    helpful: 12,
    size: 'S',
    color: 'Stone Beige',
  },
  {
    id: '2',
    name: 'Sarah M.',
    date: 'June 8, 2025',
    rating: 5,
    text: 'Exceeded my expectations. The attention to detail is remarkable. Worth every penny.',
    verified: true,
    helpful: 8,
    size: 'M',
    color: 'Ivory',
  },
  {
    id: '3',
    name: 'Mia K.',
    date: 'May 28, 2025',
    rating: 4,
    text: 'Stunning piece. The color is exactly as shown. Shipping was quick too.',
    verified: true,
    helpful: 5,
    size: 'S',
    color: 'Sage',
  },
]

function StarRating({ 
  rating, 
  onRate, 
  size = 16 
}: { 
  rating: number
  onRate?: (rating: number) => void
  size?: number 
}) {
  const [hovered, setHovered] = useState(0)

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRate?.(star)}
          onMouseEnter={() => onRate && setHovered(star)}
          onMouseLeave={() => onRate && setHovered(0)}
          className={onRate ? 'cursor-pointer' : 'cursor-default'}
          aria-label={`${star} star${star !== 1 ? 's' : ''}`}
        >
          <Star
            size={size}
            strokeWidth={1.5}
            className={`transition-colors duration-150 ${
              star <= (hovered || rating)
                ? 'text-gold fill-gold'
                : 'text-soft-blush'
            }`}
          />
        </button>
      ))}
    </div>
  )
}

export default function ReviewSystem({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [showForm, setShowForm] = useState(false)
  const [helpfulClicked, setHelpfulClicked] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<'newest' | 'highest' | 'lowest' | 'helpful'>('newest')

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    rating: 0,
    text: '',
    size: '',
    color: '',
  })
  const [submitted, setSubmitted] = useState(false)

  // Rating summary
  const averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
  const ratingCounts = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
    percentage: (reviews.filter(r => r.rating === star).length / reviews.length) * 100,
  }))

  // Sort reviews
  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case 'highest': return b.rating - a.rating
      case 'lowest': return a.rating - b.rating
      case 'helpful': return b.helpful - a.helpful
      default: return b.id.localeCompare(a.id)
    }
  })

  const handleHelpful = (reviewId: string) => {
    if (helpfulClicked.includes(reviewId)) return
    setHelpfulClicked([...helpfulClicked, reviewId])
    setReviews(reviews.map(r =>
      r.id === reviewId ? { ...r, helpful: r.helpful + 1 } : r
    ))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.rating === 0) return

    const newReview: Review = {
      id: Date.now().toString(),
      name: formData.name,
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      rating: formData.rating,
      text: formData.text,
      verified: false,
      helpful: 0,
      size: formData.size,
      color: formData.color,
    }

    setReviews([newReview, ...reviews])
    setSubmitted(true)
    setShowForm(false)
    setFormData({ name: '', rating: 0, text: '', size: '', color: '' })
  }

  return (
    <section className="section-spacing border-t border-soft-blush">
      <div className="container-wide">

        <div className="grid lg:grid-cols-[300px_1fr] gap-16">

          {/* Left - Rating Summary */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-cormorant italic text-sm text-dusty-rose mb-2">
                Reviews
              </p>
              <h2 className="font-cormorant italic font-light text-[clamp(28px,4vw,40px)] text-espresso mb-8">
                What they say
              </h2>

              {/* Average Rating */}
              <div className="mb-8">
                <div className="flex items-end gap-3 mb-2">
                  <span className="font-cormorant text-6xl text-espresso leading-none">
                    {averageRating.toFixed(1)}
                  </span>
                  <span className="font-cormorant text-xl text-taupe mb-2">
                    / 5
                  </span>
                </div>
                <StarRating rating={Math.round(averageRating)} size={18} />
                <p className="font-jost text-xs text-taupe mt-2">
                  Based on {reviews.length} reviews
                </p>
              </div>

              {/* Rating Breakdown */}
              <div className="space-y-3 mb-8">
                {ratingCounts.map(({ star, count, percentage }) => (
                  <div key={star} className="flex items-center gap-3">
                    <span className="font-jost text-xs text-taupe w-4">
                      {star}
                    </span>
                    <Star
                      size={12}
                      strokeWidth={1.5}
                      className="text-gold fill-gold flex-shrink-0"
                    />
                    <div className="flex-1 h-1 bg-soft-blush/50 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-full bg-dusty-rose"
                      />
                    </div>
                    <span className="font-jost text-xs text-taupe w-4">
                      {count}
                    </span>
                  </div>
                ))}
              </div>

              {/* Write Review Button */}
              <button
                onClick={() => setShowForm(!showForm)}
                className="w-full py-3 border border-gold text-gold font-jost text-xs tracking-[0.25em] uppercase hover:bg-gold hover:text-ivory transition-all duration-300"
              >
                Write a Review
              </button>
            </motion.div>
          </div>

          {/* Right - Reviews List */}
          <div>

            {/* Write Review Form */}
            <AnimatePresence>
              {showForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden mb-10"
                >
                  <div className="bg-blush/30 p-8 mb-8">
                    <h3 className="font-playfair text-xl text-espresso mb-6">
                      Your Review
                    </h3>

                    {submitted ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-8"
                      >
                        <p className="font-cormorant italic text-2xl text-espresso mb-2">
                          Thank you ✦
                        </p>
                        <p className="font-jost text-sm text-taupe">
                          Your review has been submitted
                        </p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Rating */}
                        <div>
                          <label className="block font-jost text-xs tracking-wide text-taupe mb-3">
                            Your Rating *
                          </label>
                          <StarRating
                            rating={formData.rating}
                            onRate={(r) => setFormData({ ...formData, rating: r })}
                            size={24}
                          />
                          {formData.rating === 0 && (
                            <p className="font-jost text-xs text-dusty-rose mt-2">
                              Please select a rating
                            </p>
                          )}
                        </div>

                        {/* Name */}
                        <div>
                          <label className="block font-jost text-xs tracking-wide text-taupe mb-2">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="First name and last initial"
                            className="w-full bg-transparent border-b border-soft-blush py-3 px-0 font-jost text-sm text-espresso outline-none focus:border-dusty-rose transition-colors"
                          />
                        </div>

                        {/* Size and Color */}
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <label className="block font-jost text-xs tracking-wide text-taupe mb-2">
                              Size Purchased
                            </label>
                            <input
                              type="text"
                              value={formData.size}
                              onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                              placeholder="e.g. S, M, L"
                              className="w-full bg-transparent border-b border-soft-blush py-3 px-0 font-jost text-sm text-espresso outline-none focus:border-dusty-rose transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block font-jost text-xs tracking-wide text-taupe mb-2">
                              Color
                            </label>
                            <input
                              type="text"
                              value={formData.color}
                              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                              placeholder="e.g. Ivory"
                              className="w-full bg-transparent border-b border-soft-blush py-3 px-0 font-jost text-sm text-espresso outline-none focus:border-dusty-rose transition-colors"
                            />
                          </div>
                        </div>

                        {/* Review Text */}
                        <div>
                          <label className="block font-jost text-xs tracking-wide text-taupe mb-2">
                            Your Review *
                          </label>
                          <textarea
                            required
                            rows={4}
                            value={formData.text}
                            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                            placeholder="Tell us about your experience..."
                            className="w-full bg-transparent border-b border-soft-blush py-3 px-0 font-jost text-sm text-espresso outline-none focus:border-dusty-rose transition-colors resize-none"
                          />
                        </div>

                        {/* Submit */}
                        <div className="flex gap-4">
                          <button
                            type="submit"
                            className="px-8 py-3 bg-gold text-ivory font-jost text-xs tracking-[0.25em] uppercase hover:bg-gold/90 transition-colors"
                          >
                            Submit Review
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="px-8 py-3 border border-soft-blush text-taupe font-jost text-xs tracking-[0.25em] uppercase hover:border-dusty-rose hover:text-dusty-rose transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Sort */}
            <div className="flex items-center justify-between mb-8">
              <p className="font-jost text-xs text-taupe">
                {reviews.length} reviews
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="bg-transparent font-jost text-xs text-taupe border border-soft-blush px-3 py-2 outline-none hover:border-dusty-rose transition-colors cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="highest">Highest Rated</option>
                <option value="lowest">Lowest Rated</option>
                <option value="helpful">Most Helpful</option>
              </select>
            </div>

            {/* Reviews */}
            <div className="space-y-8">
              {sortedReviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="pb-8 border-b border-soft-blush last:border-0"
                >
                  {/* Review Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-playfair text-base text-espresso">
                          {review.name}
                        </span>
                        {review.verified && (
                          <span className="font-jost text-[9px] tracking-wide uppercase text-dusty-rose bg-dusty-rose/10 px-2 py-0.5">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <StarRating rating={review.rating} size={13} />
                    </div>
                    <span className="font-jost text-xs text-taupe">
                      {review.date}
                    </span>
                  </div>

                  {/* Size and Color */}
                  {(review.size || review.color) && (
                    <p className="font-jost text-xs text-taupe mb-3">
                      {review.size && `Size: ${review.size}`}
                      {review.size && review.color && ' · '}
                      {review.color && `Color: ${review.color}`}
                    </p>
                  )}

                  {/* Review Text */}
                  <p className="font-jost font-light text-sm text-taupe leading-relaxed mb-4">
                    {review.text}
                  </p>

                  {/* Helpful */}
                  <div className="flex items-center gap-3">
                    <span className="font-jost text-xs text-taupe">
                      Helpful?
                    </span>
                    <button
                      onClick={() => handleHelpful(review.id)}
                      disabled={helpfulClicked.includes(review.id)}
                      className={`font-jost text-xs transition-colors ${
                        helpfulClicked.includes(review.id)
                          ? 'text-dusty-rose cursor-default'
                          : 'text-taupe hover:text-dusty-rose'
                      }`}
                    >
                      Yes ({review.helpful})
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}