'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { currencies, Currency } from '@/lib/currency'
import { ChevronDown } from 'lucide-react'

export default function CurrencySwitcher() {
  const { currency, setCurrency } = useStore()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 font-jost text-[11px] tracking-[0.15em] uppercase text-espresso/70 hover:text-espresso transition-colors"
        aria-label="Switch currency"
      >
        {currencies[currency].symbol} {currency}
        <ChevronDown
          size={12}
          strokeWidth={1.5}
          className={`transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 bg-ivory border border-soft-blush shadow-lg z-20 min-w-[120px]"
            >
              {Object.entries(currencies).map(([code, { symbol, label }]) => (
                <button
                  key={code}
                  onClick={() => {
                    setCurrency(code as Currency)
                    setIsOpen(false)
                  }}
                  className={`w-full px-4 py-3 text-left font-jost text-xs tracking-wide transition-colors flex items-center gap-2 ${
                    currency === code
                      ? 'text-dusty-rose bg-blush/50'
                      : 'text-taupe hover:text-espresso hover:bg-blush/30'
                  }`}
                >
                  <span className="w-4">{symbol}</span>
                  <span>{label}</span>
                  {currency === code && (
                    <span className="ml-auto text-dusty-rose">✓</span>
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}