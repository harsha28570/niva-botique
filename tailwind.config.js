import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#FAF7F2',
        blush: '#F2E8E4',
        'warm-white': '#FFFDF9',
        espresso: '#1C0F0A',
        taupe: '#7A6248',
        'dusty-rose': '#C4846A',
        gold: '#B8924E',
        'soft-blush': '#DFC4B0',
        sand: '#C9A882',
        mocha: '#1A0F0A',
      },
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'serif'],
        playfair: ['var(--font-playfair)', 'serif'],
        jost: ['var(--font-jost)', 'sans-serif'],
      },
      fontSize: {
        hero: [
          'clamp(48px,8vw,90px)',
          { lineHeight: '1.1', letterSpacing: '-0.02em' },
        ],
        'section-title': [
          'clamp(36px,5vw,56px)',
          { lineHeight: '1.2' },
        ],
        display: [
          'clamp(52px,6vw,64px)',
          { lineHeight: '1.3' },
        ],
      },
      spacing: {
        section: 'clamp(60px, 10vw, 120px)',
        'card-gap': 'clamp(24px, 4vw, 48px)',
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.3s ease-out forwards',
        shimmer: 'shimmer 1.5s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config