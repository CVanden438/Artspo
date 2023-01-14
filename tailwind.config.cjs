/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.hrml', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        main: {
          1: '#090328',
          2: '#1A1052',
          3: '#34277B',
          4: '#5749A4',
          5: '#8275CD',
          6: '#B6ABF6',
        },
      },
    },
  },
  plugins: [],
}
