# NIVA - Luxury Boutique Fashion Store

## Concept & Vision

NIVA is not just an e-commerce website—it's a digital editorial experience that evokes the feeling of walking into a high-end fashion magazine combined with a curated art gallery. Every element whispers luxury, intentionality, and poetic simplicity. The site should feel like Sunday morning light streaming through linen curtains, golden hour captured in pixels, quiet luxury that speaks volumes through restraint.

## Design Language

### Aesthetic Direction
- **Reference Points**: Pinterest editorial meets high fashion Vogue layouts, soft film photography, linen textures, dried flowers aesthetic, coffee table book photography
- **Mood**: Slow, intentional, breathable, romantic, artisanal
- **Philosophy**: Less is more, every pixel earns its space

### Color Palette
- **Primary Background**: Warm Ivory `#FAF7F2`
- **Secondary Background**: Soft Blush Rose `#F5EDE8`
- **Card Background**: Warm White `#FFFDF9`
- **Primary Text**: Deep Espresso Brown `#2C1810`
- **Secondary Text**: Warm Taupe `#8B7355`
- **Accent Color**: Dusty Rose `#C9967A`
- **Highlight/CTA**: Antique Gold `#B8965A`
- **Border/Divider**: Soft Blush `#E8D5C4`
- **Hover States**: Warm Sand `#D4B896`
- **Dark Section BG**: Deep Mocha `#1A0F0A`

### Typography
- **Display/Hero Font**: Cormorant Garamond (Italic, Light 300)
  - Used for: Hero headlines, section titles, quotes, romantic elements
- **Secondary Heading**: Playfair Display (Regular/Semibold)
  - Used for: Product names, card titles, sub-headings
- **Body Text**: Jost (Light 300, Regular 400)
  - Used for: Descriptions, prices, navigation, buttons
- **Accent/Label**: Cormorant Garamond Italic
  - Used for: Small labels, category tags, badges

### Spatial System
- Extreme whitespace between sections (80px-120px)
- Large gaps between product cards (40px-60px)
- Generous padding inside content areas
- Asymmetric layouts for editorial feel

### Motion Philosophy
- Subtle, graceful animations that enhance without distracting
- Fade-in-up on scroll entry
- Crossfade on product image hover
- Smooth slide transitions
- Under 1 second page load animation

### Visual Assets
- Portrait/tall image ratios (3:4) for products
- Soft natural light photography feel
- Full-bleed editorial images
- Overlapping collage layouts

## Layout & Structure

### Pages
1. **Homepage**: Full editorial experience with hero, collections, categories, journal, newsletter
2. **Shop/Collection**: Filterable product grid with editorial breaks
3. **Product Detail**: Split gallery + info layout with recommendations
4. **About**: Brand story with editorial layout
5. **Cart**: Two-column checkout flow

### Navigation
- Transparent on hero, cream on scroll
- Logo (Cormorant Italic) left, nav center, icons right
- Mobile: Hamburger with full-screen overlay

### Responsive Strategy
- Desktop: Full editorial layouts with asymmetric grids
- Tablet: Simplified 2-column grids
- Mobile: Single column, stacked sections, horizontal scroll for products

## Features & Interactions

### Core Features
- Product browsing with filtering and sorting
- Product detail with image gallery
- Cart management with quantity controls
- Wishlist functionality
- Newsletter signup
- Search overlay
- Size guide modal

### Interaction Details
- **Product Hover**: Crossfade to second image, wishlist heart appears
- **Button Hover**: Fill animation from bottom
- **Nav Links**: Underline slides from left
- **Cart Add**: Toast notification appears
- **Quick Add**: Modal with size selector

### States
- Loading: Skeleton screens with cream placeholders
- Empty: Poetic empty state messages
- Error: Subtle inline validation

## Component Inventory

### Navigation
- Transparent/cream states
- Active link underline
- Mobile hamburger overlay
- Cart badge count

### Product Card
- Portrait image with hover crossfade
- Wishlist heart overlay
- Badge for "New" or "Low Stock"
- Minimal info below (name, category, price)
- Quick Add button on hover

### Hero Section
- Split layout with editorial image
- Large Cormorant Italic headline
- Outlined + text CTA buttons
- Scroll indicator

### Announcement Marquee
- Continuous scroll animation
- Dark background, ivory text

### Category Tiles
- Large portrait images
- Overlay text
- Hover warm tint

### Newsletter Section
- Blush background
- Minimal email input
- Decorative elements

### Footer
- Dark mocha background
- Large watermark NIVA
- 4-column layout
- Social icons

### Mini Cart Drawer
- Slide from right
- Backdrop blur
- Item list with images
- Total and checkout button

## Technical Approach

### Framework
- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Framer Motion for animations
- Zustand for state management

### Key Libraries
- Lucide React for thin line icons
- Next/Image for optimized images
- Google Fonts for typography

### Architecture
- `/app` directory with route-based pages
- `/components` for reusable UI elements
- `/store` for Zustand state
- `/lib` for utilities and data

### State Management
- Cart items with quantities
- Wishlist items
- UI states (cart open, search open, etc.)

### Data Model
- Products: id, name, category, price, images[], colors[], sizes[], description
- Cart: productId, quantity, selectedSize, selectedColor
- Wishlist: productId[]

### Performance
- Lazy loading images
- Font preloading
- Skeleton loading states
- Target: 95+ Lighthouse score