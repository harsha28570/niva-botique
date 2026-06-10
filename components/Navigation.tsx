'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Heart, ShoppingBag, Menu } from 'lucide-react'
import CurrencySwitcher from '@/components/CurrencySwitcher'
import { useStore } from '@/store/useStore'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { cartCount, setCartOpen, setSearchOpen, setMenuOpen, wishlistItems } = useStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-ivory/95 backdrop-blur-sm border-b border-soft-blush'
          : 'bg-transparent'
      }`}
    >
      <nav className="h-[70px] flex items-center justify-between px-6 md:px-12">

        {/* Logo */}
        <Link
          href="/"
          className="font-cormorant italic text-2xl font-light tracking-wide text-espresso hover:text-dusty-rose transition-colors"
        >
          NIVA
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          <NavLink href="/shop" active={pathname === '/shop'}>
            Shop
          </NavLink>
          <NavLink href="/shop?collection=new" active={pathname === '/shop'}>
            Collections
          </NavLink>
          <NavLink href="/about" active={pathname === '/about'}>
            About
          </NavLink>
          <NavLink href="/journal" active={pathname === '/journal'}>
            Journal
          </NavLink>
          <NavLink href="/contact" active={pathname === '/contact'}>
            Contact
          </NavLink>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-6">

          {/* Currency Switcher - Desktop */}
<div className="hidden md:block">
  <CurrencySwitcher />
</div>

{/* Search */}
<button
  onClick={() => setSearchOpen(true)}
  className="hidden md:flex text-espresso/70 hover:text-espresso transition-colors"
  aria-label="Search"
>
  <Search size={18} strokeWidth={1.5} />
</button>

          {/* Wishlist */}
          <Link
  href="/wishlist"
  className="hidden md:flex text-espresso/70 hover:text-espresso transition-colors relative"
  aria-label="Wishlist"
  suppressHydrationWarning
>
  <Heart size={18} strokeWidth={1.5} />
  {mounted && wishlistItems.length > 0 && (
  <span className="absolute -top-2 -right-2 w-4 h-4 bg-dusty-rose text-ivory text-[9px] font-jost rounded-full flex items-center justify-center">
    {wishlistItems.length}
  </span>
)}
</Link>

          {/* Cart */}
          <button
  onClick={() => setCartOpen(true)}
  className="text-espresso/70 hover:text-espresso transition-colors relative"
  aria-label="Cart"
  suppressHydrationWarning
>
  <ShoppingBag size={18} strokeWidth={1.5} />
  {mounted && cartCount() > 0 && (
  <span className="absolute -top-2 -right-2 w-4 h-4 bg-dusty-rose text-ivory text-[9px] font-jost rounded-full flex items-center justify-center">
    {cartCount()}
  </span>
)}
</button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-espresso/70 hover:text-espresso transition-colors"
            aria-label="Open menu"
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>

        </div>
      </nav>
    </header>
  )
}

function NavLink({
  href,
  children,
  active = false,
}: {
  href: string
  children: React.ReactNode
  active?: boolean
}) {
  return (
    <Link
      href={href}
      className={`font-jost text-[11px] tracking-[0.25em] uppercase transition-colors relative nav-link ${
        active
          ? 'text-espresso'
          : 'text-espresso/70 hover:text-espresso'
      }`}
    >
      {children}
      {/* Active underline */}
      {active && (
        <span className="absolute -bottom-1 left-0 right-0 h-px bg-dusty-rose" />
      )}
    </Link>
  )
}