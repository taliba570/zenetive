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
      boxShadow: {
        custom: '10px -10px 25px 0 rgba(143, 64, 248, 0.5), -10px 10px 25px 0 rgba(39, 200, 255, 0.5)',
      },
      translate: {
        '-6': '-6px',
      },
    },
  },
  plugins: [],
};