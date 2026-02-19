import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        terracotta: {
          dark: '#8B4A2B',
          DEFAULT: '#C4714A',
          light: '#D4845A',
        },
        cream: '#F5EDE0',
        'warm-beige': '#EDD9BC',
        'deep-brown': '#3D2314',
        'gold-accent': '#C9A84C',
        'warm-white': '#FAF7F2',
        charcoal: '#2C2C2C',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-dm-sans)', 'sans-serif'],
        tagline: ['var(--font-cormorant)', 'serif'],
      },
      backgroundImage: {
        'gradient-terracotta': 'linear-gradient(135deg, #8B4A2B 0%, #C4714A 100%)',
        'grain': "url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22 opacity=%220.04%22/%3E%3C/svg%3E')",
      },
      animation: {
        'fade-down': 'fadeDown 2s ease-in-out infinite',
        'scroll-down': 'scrollDown 1.5s ease-in-out infinite',
      },
      keyframes: {
        fadeDown: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
        scrollDown: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.3' },
          '50%': { transform: 'translateY(8px)', opacity: '1' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
};

export default config;
