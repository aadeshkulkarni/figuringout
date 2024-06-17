import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'noto-serif': ['"Noto Serif Georgian"', ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
