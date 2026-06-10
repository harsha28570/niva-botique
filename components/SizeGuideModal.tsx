'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface SizeGuideModalProps {
  isOpen: boolean
  onClose: () => void
  category?: string
}

export default function SizeGuideModal({ isOpen, onClose, category = 'tops' }: SizeGuideModalProps) {

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  const sizeData: Record<string, { headers: string[]; rows: string[][] }> = {
    tops: {
      headers: ['Size', 'Bust', 'Waist', 'Length'],
      rows: [
        ['XS', '31-32"', '24-25"', '24"'],
        ['S', '33-34"', '26-27"', '25"'],
        ['M', '35-36"', '28-29"', '25.5"'],
        ['L', '37-39"', '30-32"', '26"'],
        ['XL', '40-42"', '33-35"', '26.5"'],
      ],
    },
    dresses: {
      headers: ['Size', 'Bust', 'Waist', 'Hip', 'Length'],
      rows: [
        ['XS', '31-32"', '24-25"', '34-35"', '42"'],
        ['S', '33-34"', '26-27"', '36-37"', '43"'],
        ['M', '35-36"', '28-29"', '38-39"', '44"'],
        ['L', '37-39"', '30-32"', '40-42"', '45"'],
        ['XL', '40-42"', '33-35"', '43-45"', '46"'],
      ],
    },
    trousers: {
      headers: ['Size', 'Waist', 'Hip', 'Inseam', 'Rise'],
      rows: [
        ['XS', '24-25"', '34-35"', '28"', '10"'],
        ['S', '26-27"', '36-37"', '28.5"', '10.5"'],
        ['M', '28-29"', '38-39"', '29"', '11"'],
        ['L', '30-32"', '40-42"', '29"', '11.5"'],
        ['XL', '33-35"', '43-45"', '29.5"', '12"'],
      ],
    },
    outerwear: {
      headers: ['Size', 'Bust', 'Shoulder', 'Sleeve', 'Length'],
      rows: [
        ['S', '36-37"', '15.5"', '23"', '34"'],
        ['M', '38-39"', '16"', '23.5"', '35"'],
        ['L', '40-42"', '16.5"', '24"', '36"'],
        ['XL', '43-45"', '17"', '24.5"', '37"'],
      ],
    },
    accessories: {
      headers: ['Size', 'Dimensions'],
      rows: [
        ['One Size', 'Varies by product'],
      ],
    },
  }

  const data = sizeData[category] || sizeData.tops

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-espresso/30 backdrop-blur-sm z-[80]"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="fixed inset-0 z-[90] flex items-center justify-center p-6"
            role="dialog"
            aria-modal="true"
            aria-label="Size guide"
          >
            <div
              className="bg-ivory w-full max-w-lg max-h-[80vh] overflow-y-auto border border-soft-blush"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-soft-blush sticky top-0 bg-ivory z-10">
                <h2 className="font-playfair text-xl text-espresso">
                  Size Guide
                </h2>
                <button
                  onClick={onClose}
                  className="text-taupe hover:text-espresso transition-colors"
                  aria-label="Close size guide"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">

                {/* Measuring tips */}
                <div className="mb-8">
                  <h3 className="font-playfair text-base text-espresso mb-3">
                    How to Measure
                  </h3>
                  <ul className="space-y-2">
                    <li className="font-jost text-xs text-taupe flex items-start gap-2">
                      <span className="text-dusty-rose mt-0.5">✦</span>
                      <span><strong>Bust:</strong> Measure around the fullest part of your chest</span>
                    </li>
                    <li className="font-jost text-xs text-taupe flex items-start gap-2">
                      <span className="text-dusty-rose mt-0.5">✦</span>
                      <span><strong>Waist:</strong> Measure around your natural waistline</span>
                    </li>
                    <li className="font-jost text-xs text-taupe flex items-start gap-2">
                      <span className="text-dusty-rose mt-0.5">✦</span>
                      <span><strong>Hip:</strong> Measure around the widest part of your hips</span>
                    </li>
                  </ul>
                </div>

                {/* Size Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-soft-blush">
                        {data.headers.map((header) => (
                          <th
                            key={header}
                            className="py-3 px-3 text-left font-jost text-[10px] tracking-[0.15em] uppercase text-dusty-rose"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data.rows.map((row, index) => (
                        <tr
                          key={index}
                          className="border-b border-soft-blush/50 last:border-0"
                        >
                          {row.map((cell, cellIndex) => (
                            <td
                              key={cellIndex}
                              className={`py-3 px-3 font-jost text-sm ${
                                cellIndex === 0
                                  ? 'text-espresso font-medium'
                                  : 'text-taupe'
                              }`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Model info */}
                <div className="mt-8 p-4 bg-blush/50">
                  <p className="font-jost text-xs text-taupe leading-relaxed">
                    <strong className="text-espresso">Model info:</strong> Our model
                    is 5&apos;10&quot; / 178cm and wears size S. All measurements are
                    approximate. If you&apos;re between sizes, we recommend sizing up
                    for a relaxed fit.
                  </p>
                </div>

                {/* Help link */}
                <p className="mt-6 text-center font-jost text-xs text-taupe">
                  Still unsure?{' '}
                  <a
                    href="/contact"
                    className="text-dusty-rose hover:text-espresso transition-colors underline underline-offset-4"
                  >
                    Contact us for help
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}