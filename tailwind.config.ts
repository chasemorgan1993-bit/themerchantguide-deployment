import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        golden: {
          50: '#FAF5E5',
          100: '#F4E4BC',
          200: '#E8B866',
          500: '#DCA54A',
          600: '#C4923D',
          700: '#B8833A',
        },
        olive: {
          400: '#7A7A55',
          500: '#6B6B47',
          600: '#5A5A3F',
          700: '#4A4A32',
        },
        cream: {
          50: '#FAF5E5', // Light cream text
          100: '#F4E4BC', // Card backgrounds
          200: '#F5F5DC', // Alternative light background
        },
        dark: {
          500: '#1B1B1B', // Dark text on light backgrounds
          600: '#4A4A32', // Muted dark text
        },
      },
      backgroundImage: {
        'golden-gradient': 'linear-gradient(135deg, #DCA54A, #C4923D)',
        'card-gradient': 'linear-gradient(135deg, #F4E4BC 0%, #FAF5E5 100%)',
        'olive-gradient': 'linear-gradient(135deg, #5A5A3F 0%, #7A7A55 50%, #5A5A3F 100%)',
      },
      boxShadow: {
        golden: '0 8px 25px rgba(220, 165, 74, 0.4)',
        'golden-hover': '0 12px 35px rgba(220, 165, 74, 0.6)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        fadeIn: 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
