import type { Config } from 'tailwindcss';
import animatePlugin from 'tailwindcss-animate';

const config: Config = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'base-white': '#FFFFFF',
        'base-black': '#000000',
        neutral: {
          25: '#FDFDFD',
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E9EAEB',
          300: '#D5D7DA',
          400: '#A4A7AE',
          500: '#717680',
          600: '#535862',
          700: '#414651',
          800: '#252B37',
          900: '#181D27',
          950: '#0A0D12',
        },
        primary: {
          100: '#C12116',
        },
        red: '#D9206E',
        green: '#079455',
        yellow: '#FDB022',
      },
      borderRadius: {
        xxs: '0.125rem',
        sm: '0.375rem',
        lg: '0.625rem',
        '4xl': '1.5rem',
      },
    },
  },
  plugins: [animatePlugin],
};

export default config;
