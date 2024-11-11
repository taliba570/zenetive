/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-light': '#f3f4f6',
        'primary-dark': '#1a202c',
        'secondary-light': '#4fd1c5',
        'secondary-dark': '#2b6cb0'
      },
      screens: {
        'xxs': { max: '540px' },
      },
    },
  },
  plugins: [],
};