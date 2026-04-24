import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './sections/**/*.{js,ts,jsx,tsx,mdx}',
    './ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          black: '#0a0a0a',
          red:   '#ff0055',
          pink:  '#ff2a6d',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      // Sharp corners — no rounded rectangles anywhere
      borderRadius: {
        none:    '0px',
        sm:      '0px',
        DEFAULT: '0px',
        md:      '0px',
        lg:      '0px',
        xl:      '0px',
        '2xl':   '0px',
        '3xl':   '0px',
        full:    '9999px',
      },
      transitionDuration: {
        fast: '150ms',
        base: '200ms',
        slow: '400ms',
      },
      boxShadow: {
        'glow-red':    '0 0 40px rgba(255, 0, 85, 0.08)',
        'glow-red-sm': '0 0 16px rgba(255, 0, 85, 0.12)',
      },
      animation: {
        'star-movement-bottom': 'star-movement-bottom linear infinite alternate',
        'star-movement-top':    'star-movement-top linear infinite alternate',
      },
      keyframes: {
        'star-movement-bottom': {
          '0%':   { transform: 'translate(0%, 0%)',    opacity: '1' },
          '100%': { transform: 'translate(-100%, 0%)', opacity: '0' },
        },
        'star-movement-top': {
          '0%':   { transform: 'translate(0%, 0%)',   opacity: '1' },
          '100%': { transform: 'translate(100%, 0%)', opacity: '0' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
