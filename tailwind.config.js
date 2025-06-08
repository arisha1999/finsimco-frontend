/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        finsim: {
          dark: '#005f73',
          light: '#0a9396',
          ok:    '#52b788',
          warn:  '#ee9b00',
        },
      },
    },
  },
  plugins: [],
}
