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
      'cyan-50': '#ecfeff',
      'cyan300':'#a5f3fc',
      'cyan400':'#22d3ee',
      "cardbackground":'#D9D9D9',
      'red-600':'#b91c1c',
      "slate200":'#e2e8f0',
      "blue-800":'#1e40af',
      "green-500":"#10B981",
      "blue-400":"#60A5FA",
      "indigo":"#4338CA"
    },
  },
  plugins: [],
  variants:{
    extend:{
      display:["focus-group"]
    }
  }
}