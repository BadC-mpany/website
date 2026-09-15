import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './sections/**/*.{js,ts,jsx,tsx,mdx}',
    './ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        mast: '#182338',
        brass: '#b08d57',
        desk: '#b7b1a3',
        sheet: '#f4f1e8',
        ink: {
          DEFAULT: '#1a1a18',
          dim: '#5c5850',
        },
        paper: '#f4f1e8',
      },
      fontFamily: {
        sans: ['Tahoma', 'Verdana', 'Geneva', 'sans-serif'],
        serif: ['Georgia', 'Times New Roman', 'Times', 'serif'],
        mono: ['Courier New', 'Courier', 'monospace'],
      },
      borderRadius: {
        none: '0px',
        sm: '0px',
        DEFAULT: '0px',
        md: '0px',
        lg: '0px',
        xl: '0px',
        '2xl': '0px',
        '3xl': '0px',
        full: '9999px',
      },
    },
  },
  plugins: [],
}

export default config
