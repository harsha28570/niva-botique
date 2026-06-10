export interface Product {
  id: string
  name: string
  category: 'tops' | 'dresses' | 'outerwear' | 'accessories' | 'trousers'
  price: number
  originalPrice?: number
  images: string[]
  colors: { name: string; hex: string }[]
  sizes: string[]
  description: string
  shortDescription: string
  details: string[]
  care: string[]
  badge?: 'new' | 'low-stock' | 'sale'
  isFeatured?: boolean
}

export interface BlogPost {
  id: string
  title: string
  category: string
  excerpt: string
  image: string
  date: string
  author: string
}

export interface Category {
  id: string
  name: string
  image: string
}

export interface FeaturedCollection {
  name: string
  description: string
  tag: string
}

export const products: Product[] = [
  {
    id: '1',
name: 'The Linen Slip Dress',
category: 'dresses',
    price: 185,
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80',    ],
    colors: [
      { name: 'Stone Beige', hex: '#D4C4B0' },
      { name: 'Ivory', hex: '#FFFEF9' },
      { name: 'Sage', hex: '#B8C4B0' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Effortless and understated. Cut in premium 100% French linen with a bias slip silhouette that moves beautifully with the body. Features delicate adjustable straps and a soft V-neckline.',
    shortDescription: 'Effortless and understated. Cut in premium 100% French linen with a bias slip silhouette.',
    details: [
      '100% French linen',
      'Bias cut silhouette',
      'Adjustable spaghetti straps',
      'Soft V-neckline',
      'Midi length',
      'Hand-finished seams',
    ],
    care: [
      'Machine wash cold, gentle cycle',
      'Hang to dry',
      'Iron on low heat while slightly damp',
      'Do not bleach',
    ],
    badge: 'new',
    isFeatured: true,
  },
  {
    id: '2',
    name: 'Silk Camisole Top',
    category: 'tops',
    price: 145,
    images: [
      'https://images.unsplash.com/photo-1562572159-4efc207f5aff?w=800&q=80',
      'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800&q=80',
    ],
    colors: [
      { name: 'Champagne', hex: '#F5E6D3' },
      { name: 'Blush', hex: '#E8D4C4' },
      { name: 'Noir', hex: '#1A1A1A' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Pure silk charmeuse in a relaxed, feminine silhouette. The delicate straps and subtle cowl neck create an effortlessly elegant look for any occasion.',
    shortDescription: 'Pure silk charmeuse in a relaxed, feminine silhouette.',
    details: [
      '100% Mulberry silk',
      'Silk charmeuse weave',
      'Cowl neckline',
      'Adjustable straps',
      'Relaxed fit',
    ],
    care: [
      'Dry clean recommended',
      'If hand washing: cold water, gentle detergent',
      'Do not wring',
      'Lay flat to dry',
    ],
    badge: 'new',
  },
  {
    id: '3',
    name: 'Oversized Wool Coat',
    category: 'outerwear',
    price: 425,
    originalPrice: 520,
    images: [
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80',
      'https://images.unsplash.com/photo-1608234808654-2a8875faa7fd?w=800&q=80',
    ],
    colors: [
      { name: 'Camel', hex: '#C4A77D' },
      { name: 'Charcoal', hex: '#4A4A4A' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'A timeless investment piece. This oversized wool coat is crafted from Italian double-faced wool in a relaxed, architectural silhouette. Features a notched lapel and hidden front closure.',
    shortDescription: 'A timeless investment piece crafted from Italian double-faced wool.',
    details: [
      '100% Italian double-faced wool',
      'Oversized silhouette',
      'Notched lapel',
      'Hidden button closure',
      'Side pockets',
      'Fully lined',
    ],
    care: [
      'Dry clean only',
      'Store on padded hanger',
      'Brush with clothes brush',
      'Steam to remove wrinkles',
    ],
    badge: 'sale',
    isFeatured: true,
  },
  {
    id: '4',
    name: 'Cashmere Ribbed Sweater',
    category: 'tops',
    price: 195,
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80',
    ],
    colors: [
      { name: 'Oatmeal', hex: '#E8DFD0' },
      { name: 'Dusty Rose', hex: '#D4B8A8' },
      { name: 'Slate', hex: '#6B7280' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Luxuriously soft cashmere in a relaxed ribbed knit. This sweater features a relaxed fit, subtle dropped shoulders, and a cozy crew neck. Perfect for layering or worn alone.',
    shortDescription: 'Luxuriously soft cashmere in a relaxed ribbed knit.',
    details: [
      '100% Grade-A cashmere',
      'Ribbed knit texture',
      'Crew neckline',
      'Dropped shoulders',
      'Relaxed fit',
    ],
    care: [
      'Hand wash cold or dry clean',
      'Lay flat to dry',
      'Fold and store, do not hang',
      'Use cashmere comb for pilling',
    ],
    badge: 'new',
  },
  {
    id: '5',
    name: 'High-Waisted Linen Trousers',
    category: 'trousers',
    price: 165,
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80',
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80',
    ],
    colors: [
      { name: 'Sand', hex: '#D4C4A8' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Terracotta', hex: '#C9967A' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Fluid high-waisted trousers in premium linen. Features a flattering high rise, wide leg silhouette, and side zip closure. Effortlessly elegant for any setting.',
    shortDescription: 'Fluid high-waisted trousers in premium linen.',
    details: [
      '100% European linen',
      'High-waisted fit',
      'Wide leg silhouette',
      'Side zip closure',
      'Side pockets',
      'Midi length',
    ],
    care: [
      'Machine wash cold',
      'Tumble dry low or hang to dry',
      'Iron on medium heat',
      'Natural wrinkles add to the aesthetic',
    ],
    badge: 'low-stock',
  },
  {
    id: '6',
    name: 'Linen Blazer',
    category: 'outerwear',
    price: 285,
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
      'https://images.unsplash.com/photo-1507680434567-5739c80be1ac?w=800&q=80',
    ],
    colors: [
      { name: 'Natural', hex: '#E8E0D4' },
      { name: 'Navy', hex: '#1E3A5F' },
    ],
    sizes: ['S', 'M', 'L'],
    description: 'An unstructured linen blazer that bridges relaxed and refined. Features a soft shoulder, single button closure, and patch pockets. The perfect layering piece.',
    shortDescription: 'An unstructured linen blazer that bridges relaxed and refined.',
    details: [
      '55% linen, 45% cotton',
      'Unstructured silhouette',
      'Soft shoulder',
      'Single button closure',
      'Patch pockets',
      'Back vent',
    ],
    care: [
      'Machine wash cold',
      'Tumble dry low',
      'Iron on medium heat',
      'Dry clean optional',
    ],
  },
  {
    id: '7',
    name: 'Leather Belt Bag',
    category: 'accessories',
    price: 225,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80',
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80',
    ],
    colors: [
      { name: 'Tan', hex: '#B8956B' },
      { name: 'Black', hex: '#1A1A1A' },
    ],
    sizes: ['One Size'],
    description: 'Handcrafted in Italy from butter-soft calfskin leather. This belt bag features an adjustable strap, magnetic closure, and interior pocket. Wears as a belt or crossbody.',
    shortDescription: 'Handcrafted in Italy from butter-soft calfskin leather.',
    details: [
      '100% Italian calfskin leather',
      'Adjustable strap 28"-46"',
      'Magnetic closure',
      'Interior zip pocket',
      'Handcrafted in Italy',
    ],
    care: [
      'Store in dust bag',
      'Clean with soft dry cloth',
      'Condition leather periodically',
      'Avoid moisture',
    ],
    badge: 'new',
  },
  {
    id: '8',
    name: 'Silk Scarf',
    category: 'accessories',
    price: 95,
    images: [
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80',
      'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&q=80',
    ],
    colors: [
      { name: 'Floral Print', hex: '#E8D4C4' },
      { name: 'Solid Blush', hex: '#F5E0D6' },
    ],
    sizes: ['One Size'],
    description: 'A luxurious silk twill scarf with hand-rolled edges. Features an exclusive botanical print designed in collaboration with local artists. Versatile enough to wear as a headscarf, neck tie, or bag accessory.',
    shortDescription: 'A luxurious silk twill scarf with hand-rolled edges.',
    details: [
      '100% silk twill',
      'Hand-rolled edges',
      'Exclusive botanical print',
      '90cm x 90cm',
      'Made in Como, Italy',
    ],
    care: [
      'Dry clean only',
      'Iron on silk setting',
      'Store flat or rolled',
    ],
  },
  {
    id: '9',
    name: 'Midi Wrap Dress',
    category: 'dresses',
    price: 225,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80',
      'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=800&q=80',
    ],
    colors: [
      { name: 'Terracotta', hex: '#C9967A' },
      { name: 'Forest', hex: '#4A5D4A' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'A romantic wrap dress in flowing crepe. Features a flattering V-neckline, adjustable tie waist, and graceful midi length. Transitions seamlessly from day to evening.',
    shortDescription: 'A romantic wrap dress in flowing crepe.',
    details: [
      'Viscose crepe blend',
      'Wrap silhouette',
      'Adjustable tie waist',
      'V-neckline',
      'Midi length',
      'Side slit',
    ],
    care: [
      'Machine wash cold',
      'Hang to dry',
      'Iron on low heat',
      'Do not bleach',
    ],
    badge: 'low-stock',
    isFeatured: true,
  },
  {
    id: '10',
    name: 'Satin Wrap Blouse',
    category: 'tops',
    price: 155,
    images: [
      'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=800&q=80',
      'https://images.unsplash.com/photo-1518622358385-8ea7d0794bf6?w=800&q=80',
    ],
    colors: [
      { name: 'Pearl', hex: '#F5F0E6' },
      { name: 'Blush', hex: '#E8D4C4' },
      { name: 'Noir', hex: '#1A1A1A' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description:
      'A feminine wrap blouse in lustrous satin with a softly draped neckline. Features self-tie closure, bell sleeves, and a flattering wrap silhouette that suits every body type beautifully.',
    shortDescription: 'A feminine wrap blouse in lustrous satin with a softly draped neckline.',
    details: [
      '100% silk-blend satin',
      'Wrap silhouette',
      'Self-tie closure',
      'Bell sleeves',
      'Draped neckline',
      'Relaxed fit',
    ],
    care: [
      'Dry clean recommended',
      'Iron on silk setting',
      'Store on padded hanger',
      'Avoid direct sunlight',
    ],
    badge: 'new',
    isFeatured: true,
  },
  {
    id: '11',
    name: 'Quilted Tote Bag',
    category: 'accessories',
    price: 185,
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80',
      'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800&q=80',
    ],
    colors: [
      { name: 'Cream', hex: '#F5F0E6' },
      { name: 'Black', hex: '#1A1A1A' },
    ],
    sizes: ['One Size'],
    description: 'A substantial yet elegant tote in soft quilted leather. Features an interior zip pocket, magnetic closure, and adjustable shoulder strap. Perfect for everyday elegance.',
    shortDescription: 'A substantial yet elegant tote in soft quilted leather.',
    details: [
      'Quilted leather exterior',
      'Soft suede interior',
      'Interior zip pocket',
      'Magnetic closure',
      'Adjustable shoulder strap',
      'Handcrafted in Spain',
    ],
    care: [
      'Wipe with soft cloth',
      'Store stuffed to maintain shape',
      'Keep in dust bag when not in use',
    ],
  },
  {
    id: '12',
    name: 'Trench Coat',
    category: 'outerwear',
    price: 395,
    images: [
      'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800&q=80',
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80',
    ],
    colors: [
      { name: 'Camel', hex: '#C4A77D' },
      { name: 'Black', hex: '#1A1A1A' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'A modern take on the classic trench. Crafted from water-resistant cotton gabardine with a relaxed silhouette, storm flap, and signature belt. Timeless and functional.',
    shortDescription: 'A modern take on the classic trench.',
    details: [
      'Cotton gabardine',
      'Water-resistant',
      'Storm flap',
      'Belted waist',
      'Deep pockets',
      'Back vent',
    ],
    care: [
      'Dry clean recommended',
      'Water-resistant finish refreshes with iron',
      'Hang to air after wearing',
    ],
    badge: 'new',
  },
]

export const categories: Category[] = [
  {
    id: 'tops',
    name: 'Tops & Blouses',
    image: 'https://images.unsplash.com/photo-1562572159-4efc207f5aff?w=800&q=80',
  },
  {
    id: 'dresses',
    name: 'Dresses & Sets',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80',
  },
  {
    id: 'trousers',
    name: 'Trousers',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80',
  },
  {
    id: 'outerwear',
    name: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80',
  },
]

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Art of Slow Fashion',
    category: 'STYLE NOTES',
    excerpt: 'Why investing in fewer, better pieces is the most sustainable choice you can make for your wardrobe and the planet.',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80',
    date: 'June 15, 2025',
    author: 'Sofia Martinez',
  },
  {
    id: '2',
    title: 'Behind the Seams: Our Italian Atelier',
    category: 'BEHIND NIVA',
    excerpt: 'A rare glimpse into the family-run workshop where our finest pieces are handcrafted with generations of expertise.',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80',
    date: 'June 8, 2025',
    author: 'Elena Bianchi',
  },
  {
    id: '3',
    title: 'Summer Linen: A Care Guide',
    category: 'STYLE NOTES',
    excerpt: 'Everything you need to know about caring for your linen pieces so they last a lifetime and age beautifully.',
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80',
    date: 'May 28, 2025',
    author: 'Sofia Martinez',
  },
]

export const instagramImages: string[] = [
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80',
  'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&q=80',
  'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80',
  'https://images.unsplash.com/photo-1562572159-4efc207f5aff?w=600&q=80',
  'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80',
  'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
]

export const featuredCollection = {
  name: 'The Soft Hour Collection',
  description: 'Pieces designed for the in-between moments. When the day softens and you finally exhale.',
  tag: 'THIS SEASON',
}