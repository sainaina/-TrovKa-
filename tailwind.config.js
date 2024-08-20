/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

export default {
  content: [
    "./index.html",
     "./src/**/*.{js,ts,jsx,tsx}",
      flowbite.content(), 
      "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ], darkMode: 'class',
  
  theme: {
    fontFamily: {
      'sans': ['Kantumruy Pro', 'sans-serif'],
    },
    extend: {
      colors: {
        Primary: "#022278",
        Secondary: "#FFB600",
        Action:"#98caf9"
      }
    },
    
  },
  plugins: [
    flowbite.plugin(),
    require('flowbite/plugin'),
  ],
};
