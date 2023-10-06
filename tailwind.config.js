/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/utils/withMT");
module.exports = withMT ({
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@material-tailwind/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily:{
        Cinzel: ['Cinzel', 'sans-serif'],
        Quato: ['Quattrocento', 'serif-serif']
      }
    },
  },
  plugins: [],
})

 
