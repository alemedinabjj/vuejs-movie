/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'home': '200px minmax(900px, 1fr) 100px',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in forwards',
      }
    },
  },
  plugins: [],
}

