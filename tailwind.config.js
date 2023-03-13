/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7DBCBC',
        secondary: '#dd9458'
      },
      fontFamily:{
        ptsans: ['PTSans']
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'spin-super-slow': 'spin 30s linear infinite',
      }
    },
  },
  plugins: [],
}
