/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors:{
      transparent: 'transparent',
      current: 'currentColor',
      'Cyan50': '#ecfeff',
      'cyan300':'#a5f3fc',
      'cyan400':'#22d3ee',
      "cardbackground":'#D9D9D9',
      'red-600':'#b91c1c'
    },
  },
  plugins: [],
  variants:{
    extend:{
      display:["focus-group"]
    }
  }
}