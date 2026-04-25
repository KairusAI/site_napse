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
          DEFAULT: 'hsl(var(--nat-green) / <alpha-value>)',
          foreground: 'hsl(0 0% 100% / <alpha-value>)',
        },
        'nat-yellow': {
          DEFAULT: 'hsl(var(--nat-yellow) / <alpha-value>)',
          foreground: 'hsl(0 0% 9% / <alpha-value>)',
        },
        'nat-blue': {
          DEFAULT: 'hsl(var(--nat-blue) / <alpha-value>)',
          foreground: 'hsl(0 0% 100% / <alpha-value>)',
        },
        'nat-purple': {
          DEFAULT: 'hsl(var(--nat-purple) / <alpha-value>)',
          foreground: 'hsl(0 0% 100% / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'slide-up': 'slide-up 0.5s ease-out forwards',
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
      maxWidth: {
        /** Largura única da landing: alinha header, seções e rodapé */
        site: 'min(100rem, calc(100vw - 2rem))',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
} satisfies Config
