/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      screens: {
        xs: '480px',
      },
      fontFamily: {
        
        poppins: ['Poppins', 'sans-serif'],
        vina: ['Lobster', 'cursive'],

      },
      boxShadow: {
        card: '0 0 1px 0 rgba(189,192,207,0.06),0 10px 16px -1px rgba(189,192,207,0.2)',
        cardhover: '0 0 1px 0 rgba(189,192,207,0.06),0 10px 16px -1px rgba(189,192,207,0.4)',
      },
      colors: {
        "red-1": "var(--red-variant)",
        "vbg-1": "var(--background-1)",
        "vbg-2": "var(--background-2)"
        ,
      },
    },
  },
  plugins: [],
};