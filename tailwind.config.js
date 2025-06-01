/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B5CF6',
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
          950: '#2E1065',
          foreground: '#FFFFFF'
        },
        secondary: {
          DEFAULT: '#EC4899',
          50: '#FCE7F3',
          100: '#FBCFE8',
          200: '#F9A8D4',
          300: '#F472B6',
          400: '#EC4899',
          500: '#DB2777',
          600: '#BE185D',
          700: '#9D174D',
          800: '#831843',
          900: '#500724',
          950: '#3B021A',
          foreground: '#FFFFFF'
        },
        accent: {
          DEFAULT: '#14B8A6',
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
          950: '#042F2E',
          foreground: '#FFFFFF'
        },
        success: {
          DEFAULT: '#22C55E',
          foreground: '#FFFFFF'
        },
        warning: {
          DEFAULT: '#F59E0B',
          foreground: '#FFFFFF'
        },
        destructive: {
          DEFAULT: '#EF4444',
          foreground: '#FFFFFF'
        },
        background: {
          DEFAULT: 'hsl(var(--background))',
        },
        foreground: {
          DEFAULT: 'hsl(var(--foreground))',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};