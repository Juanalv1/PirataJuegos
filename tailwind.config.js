const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/flowbite-react/**/*.js',
    './src/components/**/*/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*/*.{js,ts,jsx,tsx,mdx}',
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
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
  plugins: [
            flowbite.plugin(),
            require('@shrutibalasa/tailwind-grid-auto-fit'),]
  ,
}
