const flowbite = require("flowbite-react/tailwind");


/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class'
  ,
  content: [


    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors:{
        "main":"#0aad0a",
        "color":"#374151"
      },
      container:{
        center:true
      }
    },
  },
  plugins: [
    flowbite.plugin(),

  ],
}

