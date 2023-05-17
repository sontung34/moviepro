/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor:{
        'custom-color': '#f1faee',
      },
      colors:{
        customColor: '#1d3557'
      }
    },
    fontFamily: {
      display: ["Ubuntu", "sans-serif"],
    },
  },
  plugins: [],
}