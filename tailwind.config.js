/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/sections/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors - Vighnaharta Steel Corporation
        'steel-blue': {
          DEFAULT: '#2E3A59',
          50: '#e8eaf0',
          100: '#c5c9d4',
          200: '#9ea4b5',
          300: '#777f96',
          400: '#5a637a',
          500: '#2E3A59', // Primary brand color
          600: '#262f47',
          700: '#1e2535',
          800: '#161b23',
          900: '#0e1111',
          'dark': '#1e2535', // For hover states
        },
        'silver-gray': {
          DEFAULT: '#B0BEC5',
          50: '#f5f7f8',
          100: '#e8ecef',
          200: '#d0d9de',
          300: '#B0BEC5', // Primary brand color
          400: '#90a4ae',
          500: '#78909c',
          600: '#607d8b',
          700: '#546e7a',
          800: '#455a64',
          900: '#37474f',
          'light': '#e8ecef', // For subtle backgrounds
          'dark': '#78909c', // For borders
        },
        'accent-orange': {
          DEFAULT: '#FF6F00',
          50: '#fff4e6',
          100: '#ffe0b3',
          200: '#ffcc80',
          300: '#ffb84d',
          400: '#ffa31a',
          500: '#FF6F00', // Primary accent color
          600: '#cc5900',
          700: '#994300',
          800: '#662d00',
          900: '#331700',
          'dark': '#cc5900', // For hover states
          'light': '#ffa31a', // For lighter accents
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'Monaco', 'monospace'],
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1536px',
        },
      },
    },
  },
  plugins: [],
}