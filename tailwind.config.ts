import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'DM Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Pilares Napse - mascotes
        'nat-green': {
          DEFAULT: 'hsl(142, 76%, 36%)',
          foreground: 'hsl(0, 0%, 100%)',
          light: 'hsl(142, 45%, 92%)',
          muted: 'hsl(142, 30%, 96%)',
        },
        'nat-yellow': {
          DEFAULT: 'hsl(42, 96%, 50%)',
          foreground: 'hsl(0, 0%, 9%)',
          light: 'hsl(42, 90%, 92%)',
          muted: 'hsl(42, 40%, 96%)',
        },
        'nat-blue': {
          DEFAULT: 'hsl(239, 84%, 67%)',
          foreground: 'hsl(0, 0%, 100%)',
          light: 'hsl(239, 86%, 93%)',
          muted: 'hsl(239, 42%, 96%)',
        },
        'nat-purple': {
          DEFAULT: 'hsl(262, 83%, 52%)',
          foreground: 'hsl(0, 0%, 100%)',
          light: 'hsl(262, 60%, 92%)',
          muted: 'hsl(262, 35%, 96%)',
        },
        primary: {
          DEFAULT: 'hsl(239, 84%, 67%)',
          foreground: 'hsl(0, 0%, 100%)',
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'slide-up': 'slide-up 0.5s ease-out forwards',
      },
      boxShadow: {
        soft: '0 12px 36px rgba(15, 23, 42, 0.08)',
        lift: '0 24px 68px rgba(15, 23, 42, 0.14)',
        brand: '0 20px 52px rgba(99, 102, 241, 0.34)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(112deg, rgb(147 197 253), rgb(99 102 241))',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config
