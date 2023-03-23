/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        türkis: '#7DBCBC',
        blau: '#556DB0',
        violett:"#39287F",
        orange:"#DD9458",
        grau:{
          100:"#D7E2FC",
          200:"#AEB8D1",
          300:"#545e75",
          400:"#060021",
        }

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