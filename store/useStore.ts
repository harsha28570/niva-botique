import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  color: string
  size: string
  quantity: number
}

export interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
  category: string
}

// Updated: added 'success' toast type
export type ToastType = 'cart' | 'wishlist' | 'success'

export interface Toast {
  id: string
  message: string
  type: ToastType
}

interface StoreState {
  // Cart
  cartItems: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  cartTotal: () => number
  cartCount: () => number

  // Wishlist
  wishlistItems: WishlistItem[]
  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (id: string) => void
  isInWishlist: (id: string) => boolean
  toggleWishlist: (item: WishlistItem) => void

  // Currency
currency: 'USD' | 'EUR' | 'GBP' | 'INR'
setCurrency: (currency: 'USD' | 'EUR' | 'GBP' | 'INR') => void

// Recently Viewed
recentlyViewed: string[]
addToRecentlyViewed: (id: string) => void
clearRecentlyViewed: () => void

// UI State
isCartOpen: boolean
setCartOpen: (open: boolean) => void
isSearchOpen: boolean
setSearchOpen: (open: boolean) => void
isMenuOpen: boolean
setMenuOpen: (open: boolean) => void

  // Toasts
  toasts: Toast[]
  addToast: (message: string, type: ToastType) => void
  removeToast: (id: string) => void
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({

      // =====================
      // Cart
      // =====================
      cartItems: [],

      addToCart: (item) => {
        const existing = get().cartItems.find(
          (cartItem) =>
            cartItem.id === item.id &&
            cartItem.size === item.size &&
            cartItem.color === item.color
        )

        if (existing) {
          set({
            cartItems: get().cartItems.map((cartItem) =>
              cartItem.id === item.id &&
              cartItem.size === item.size &&
              cartItem.color === item.color
                ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                : cartItem
            ),
          })
        } else {
          set({ cartItems: [...get().cartItems, item] })
        }

        get().addToast(`${item.name} added to bag`, 'cart')
      },

      removeFromCart: (id) => {
        set({
          cartItems: get().cartItems.filter((item) => item.id !== id),
        })
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(id)
        } else {
          set({
            cartItems: get().cartItems.map((item) =>
              item.id === id ? { ...item, quantity } : item
            ),
          })
        }
      },

      clearCart: () => set({ cartItems: [] }),

      cartTotal: () => {
        return get().cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )
      },

      cartCount: () => {
        return get().cartItems.reduce(
          (count, item) => count + item.quantity,
          0
        )
      },

      // =====================
      // Wishlist
      // =====================
      wishlistItems: [],

      addToWishlist: (item) => {
        if (!get().isInWishlist(item.id)) {
          set({ wishlistItems: [...get().wishlistItems, item] })
          get().addToast(`${item.name} saved to wishlist`, 'wishlist')
        }
      },

      removeFromWishlist: (id) => {
        set({
          wishlistItems: get().wishlistItems.filter((item) => item.id !== id),
        })
      },

      isInWishlist: (id) => {
        return get().wishlistItems.some((item) => item.id === id)
      },

      toggleWishlist: (item) => {
        if (get().isInWishlist(item.id)) {
          get().removeFromWishlist(item.id)
        } else {
          get().addToWishlist(item)
        }
      },

      // =====================
      // Currency
currency: 'USD',
setCurrency: (currency) => set({ currency }),

// Recently Viewed
recentlyViewed: [],

addToRecentlyViewed: (id) => {
  const current = get().recentlyViewed
  // Remove if already exists
  const filtered = current.filter((item) => item !== id)
  // Add to front, keep max 6
  set({ recentlyViewed: [id, ...filtered].slice(0, 6) })
},

clearRecentlyViewed: () => set({ recentlyViewed: [] }),

// UI State
isCartOpen: false,
setCartOpen: (open) => set({ isCartOpen: open }),

      isSearchOpen: false,
      setSearchOpen: (open) => set({ isSearchOpen: open }),

      isMenuOpen: false,
      setMenuOpen: (open) => set({ isMenuOpen: open }),

      // =====================
      // Toasts
      // =====================
      toasts: [],

      addToast: (message, type) => {
        // Fixed: substring instead of deprecated substr
        const id = Math.random().toString(36).substring(2, 11)
        set({ toasts: [...get().toasts, { id, message, type }] })

        // Auto remove after 3 seconds
        setTimeout(() => {
          get().removeToast(id)
        }, 3000)
      },

      removeToast: (id) => {
        set({
          toasts: get().toasts.filter((toast) => toast.id !== id),
        })
      },
    }),

    {
      name: 'niva-storage',
      partialize: (state) => ({
        cartItems: state.cartItems,
        wishlistItems: state.wishlistItems,
        recentlyViewed: state.recentlyViewed,
        currency: state.currency,
      }),
      skipHydration: true,
    }
  )
)