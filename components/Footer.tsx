'use client'

import Link from 'next/link'
import { Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-espresso text-ivory/90 pt-20 pb-10">
      <div className="container-wide">

        {/* Large Watermark */}
        <div className="text-center mb-20">
          <span className="font-cormorant italic font-light text-[clamp(60px,10vw,120px)] text-ivory/10 tracking-wide">
            NIVA
          </span>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-16 border-b border-ivory/10">

          {/* Brand */}
          <div>
            <h3 className="font-cormorant italic text-2xl text-ivory mb-4">NIVA</h3>
            <p className="font-jost font-light text-sm text-ivory/60 leading-relaxed mb-6">
              A quiet statement. An everyday ritual. Fashion that feels like a
              feeling, not just what you wear.
            </p>
            <div className="flex gap-4">

              {/* Instagram */}
              <a
                href="#"
                aria-label="Follow us on Instagram"
                className="w-10 h-10 border border-ivory/20 flex items-center justify-center hover:border-dusty-rose hover:text-dusty-rose transition-colors"
              >
                <Instagram size={18} strokeWidth={1.5} />
              </a>

              {/* Pinterest */}
              <a
                href="#"
                aria-label="Follow us on Pinterest"
                className="w-10 h-10 border border-ivory/20 flex items-center justify-center hover:border-dusty-rose hover:text-dusty-rose transition-colors"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6c-3.5 0-6 2.5-6 6 0 2 1 4 3 5l1-4" />
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="#"
                aria-label="Follow us on TikTok"
                className="w-10 h-10 border border-ivory/20 flex items-center justify-center hover:border-dusty-rose hover:text-dusty-rose transition-colors"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path d="M9 12a4 4 0 1 0 4 4V8a5 5 0 0 0 5 5" />
                </svg>
              </a>

            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-jost text-xs tracking-[0.2em] uppercase text-ivory/40 mb-6">
              Shop
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'New Arrivals', href: '/shop?sort=newest' },
                { label: 'Tops', href: '/shop?category=tops' },
                { label: 'Dresses', href: '/shop?category=dresses' },
                { label: 'Outerwear', href: '/shop?category=outerwear' },
                { label: 'Accessories', href: '/shop?category=accessories' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="font-jost font-light text-sm text-ivory/70 hover:text-dusty-rose transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-jost text-xs tracking-[0.2em] uppercase text-ivory/40 mb-6">
              Help
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Contact Us', href: '/contact' },
                { label: 'Shipping Info', href: '/contact' },
                { label: 'Returns & Exchanges', href: '/contact' },
                { label: 'FAQs', href: '/contact' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="font-jost font-light text-sm text-ivory/70 hover:text-dusty-rose transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* The Brand */}
          <div>
            <h4 className="font-jost text-xs tracking-[0.2em] uppercase text-ivory/40 mb-6">
              The Brand
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Our Story', href: '/about' },
                { label: 'Journal', href: '/journal' },
                { label: 'Sustainability', href: '/about' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="font-jost font-light text-sm text-ivory/70 hover:text-dusty-rose transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6">

          <p className="font-jost text-xs text-ivory/40">
            © 2025 NIVA. All rights reserved. Made with intention.
          </p>

          {/* Payment Icons */}
          <div className="flex items-center gap-3">
            {['VISA', 'MC', 'AMEX', 'PayPal'].map((label) => (
              <div
                key={label}
                aria-label={label}
                className="px-2 py-1 border border-ivory/20 rounded"
              >
                <span className="font-jost text-[9px] text-ivory/40">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Legal Links */}
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="font-jost text-xs text-ivory/40 hover:text-dusty-rose transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="font-jost text-xs text-ivory/40 hover:text-dusty-rose transition-colors"
            >
              Terms
            </Link>
          </div>

        </div>
      </div>
    </footer>
  )
}