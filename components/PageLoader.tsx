'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Show loader for 2.5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[999] bg-ivory flex flex-col items-center justify-center"
        >
          {/* NIVA Text */}
          <motion.div className="relative">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-cormorant italic font-light text-[clamp(48px,8vw,80px)] text-espresso tracking-[0.3em]"
            >
              NIVA
            </motion.h1>

            {/* Underline animation */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: 'easeInOut' }}
              style={{ originX: 0 }}
              className="h-px bg-dusty-rose mt-2 w-full"
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="font-jost text-[10px] tracking-[0.4em] uppercase text-taupe mt-4"
          >
            Quiet Luxury
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}