'use client'

import { Heart, ShoppingBag, Check, X } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { motion, AnimatePresence } from 'framer-motion'

export default function ToastNotifications() {
  const { toasts, removeToast } = useStore()

  return (
    <div className="fixed bottom-6 left-6 z-[80] flex flex-col-reverse gap-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="bg-warm-white border border-soft-blush px-5 py-4 flex items-center gap-3 shadow-lg min-w-[240px] max-w-sm cursor-pointer"
            onClick={() => removeToast?.(toast.id)}
            role="alert"
            aria-live="polite"
          >
            {/* Icon based on type */}
            {toast.type === 'cart' && (
              <ShoppingBag
                size={18}
                strokeWidth={1.5}
                className="text-dusty-rose flex-shrink-0"
              />
            )}
            {toast.type === 'wishlist' && (
              <Heart
                size={18}
                strokeWidth={1.5}
                className="text-dusty-rose flex-shrink-0"
                fill="currentColor"
              />
            )}
            {toast.type === 'success' && (
              <Check
                size={18}
                strokeWidth={1.5}
                className="text-dusty-rose flex-shrink-0"
              />
            )}

            {/* Message */}
            <span className="font-jost text-sm text-espresso flex-1">
              {toast.message}
            </span>

            {/* Dismiss */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                removeToast?.(toast.id)
              }}
              className="text-taupe/50 hover:text-espresso transition-colors ml-2"
              aria-label="Dismiss notification"
            >
              <X size={14} strokeWidth={1.5} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}