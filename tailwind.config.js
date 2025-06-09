/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#020617',
        'finsimco-orange': '#fe7d08',
        'finsimco-grey': '#d1d5db',
        'purple-dark': '#100032',
        'purple-light': '#200065',
        'ok':    '#52b788',
        'warn':  '#ee9b00',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}
