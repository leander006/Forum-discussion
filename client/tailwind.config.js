/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {

    extend: {
      colors:{
        "main":'#7858A6',
        "primary":"#5B4B8A",
        "secondary":"#4C3575",
        "navbar":"#371B58"
      }
    },
  },
  plugins: [],
}
