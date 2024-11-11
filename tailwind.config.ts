import * as defaultTheme from "tailwindcss/defaultTheme"
const plugin = require('tailwindcss/plugin')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./component-library/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '475px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        'nru': {
          DEFAULT: '#005b8c',
          'light': '#67aed5',
        },	
        'ultramarinblau': {
          DEFAULT:'#00387B',
          dark:'#263652'
        },
        'türkis': {
          'button':'#56BDBE',
          DEFAULT: '#21FEFE',
          50: '#F6FAFA',
          100: '#E9F4F4',
          200: '#CEE6E6',
          300: '#B3D8D8',
          400: '#98CACA',
          500: '#7DBCBC',
          600: '#58A9A9',
          700: '#448585',
          800: '#315F5F',
          900: '#1E3A3A',
          950: '#152828'
        },
        'blau': {
          'button':'#064EA1',
          DEFAULT: '#556DB0',
          50: '#D2D9EA',
          100: '#C4CDE4',
          200: '#A9B5D7',
          300: '#8D9DCA',
          400: '#7185BD',
          500: '#556DB0',
          600: '#41558C',
          700: '#2F3E66',
          800: '#1D263F',
          900: '#0C0F19',
          950: '#030406'
        },
        'violett': {
          DEFAULT: '#39287F',
          50: '#9686D9',
          100: '#8976D4',
          200: '#6E57CA',
          300: '#553CBD',
          400: '#47329E',
          500: '#39287F',
          600: '#261B54',
          700: '#130D2A',
          800: '#000000',
          900: '#000000',
          950: '#000000'
        },
        'orange': {
          DEFAULT: '#DD9458',
          50: '#FCF6F1',
          100: '#F9EBE0',
          200: '#F2D5BE',
          300: '#EBBF9C',
          400: '#E4AA7A',
          500: '#DD9458',
          600: '#D2762B',
          700: '#A45C21',
          800: '#754218',
          900: '#46280E',
          950: '#2F1A0A'
        },
        grau:{
          hell2:"#D7E2FC",
          hell:"#AEB8D1",
          text:"#545e75",
          header:"#060021",
          50:"#D7E2FC",
          100:"#C9D4EE",
          200:"#BCC6DF",
          300:"#AEB8D1",
          400:"#909AB2",
          500:"#727C94",
          600:"#545e75",
          700:"#3A3F59",
          800:"#201F3D",
          900:"#060021"
        }
      },
      fontFamily:{
        ptsans: ['PTSans']
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'spin-super-slow': 'spin 30s linear infinite',
      },
      boxShadow:{
        'border':'0px 0px 0px 3px rgba(0, 0, 0, 1)',
        'inner-border':'inset 0px 0px 0px 3px rgba(0, 0, 0, 1)',
        'card':'0px 1px 5px 2px rgba(0, 0, 0, 0.2)',
        'inner-xl':'inset 1px 2px 5px 2px rgb(0 0 0 / 0.05)',
        'button-primary':       '0px 1px 3px 1px rgba(0,0,0,0.3) , inset 0px 0px 0px 0px rgba(0,0,0,0)',
        'button-inner-primary': '0px 0px 0px 0px rgba(0,0,0,0) , inset 0px 0px 4px 2px rgba(0,0,0,0.4)',
        'button-secondary':       '0px 0px 3px 1px rgba(0,0,0,0.3) , inset 0px 0px 0px 0px rgba(0,0,0,0)',
        'button-inner-secondary': '0px 0px 0px 0px rgba(0,0,0,0) , inset 0px 0px 3px 1px rgba(0,0,0,0.3)',
        'glow':'0 0px 20px rgba(255,255, 255, 0.35), 0 0px 65px rgba(255, 255,255, 0.2)',
        'table':'-5px 0px 10px 3px rgba(0, 0, 0, 0.1)',
      },
      textShadow: {
        'button-tertiary': '0 0px 3px rgba(0,0,0,0.2)',
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }: { matchUtilities: any, theme: any }) {
      matchUtilities(
        {
          'text-shadow': (value: any) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
}