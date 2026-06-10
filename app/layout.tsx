import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'
import MobileMenu from '@/components/MobileMenu'
import SearchOverlay from '@/components/SearchOverlay'
import ToastNotifications from '@/components/ToastNotifications'
import PageLoader from '@/components/PageLoader'
import ClientOnly from '@/components/ClientOnly'
import StoreHydration from '@/components/StoreHydration'
import { Cormorant_Garamond, Playfair_Display, Jost } from 'next/font/google'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-playfair',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-jost',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'NIVA — Quiet Luxury Fashion',
  description:
    'Curated pieces for the woman who finds beauty in simplicity. NIVA — where every stitch tells a story.',
  openGraph: {
    title: 'NIVA — Quiet Luxury Fashion',
    description:
      'Curated pieces for the woman who finds beauty in simplicity.',
    type: 'website',
    url: 'https://niva-botique.vercel.app',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'NIVA Boutique',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NIVA — Quiet Luxury Fashion',
    description:
      'Curated pieces for the woman who finds beauty in simplicity.',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FAF7F2',
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${playfair.variable} ${jost.variable}`}
    >
      <body className="font-jost bg-ivory text-espresso antialiased">
  <StoreHydration />
<PageLoader />
<Navigation />
  <main>{children}</main>
  <Footer />
  <ClientOnly>
    <CartDrawer />
    <MobileMenu />
    <SearchOverlay />
    <ToastNotifications />
  </ClientOnly>
</body>
    </html>
  )
}