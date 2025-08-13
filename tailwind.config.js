/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f50538',
        secondary: '#000000',
        danger: '#e3342f',
        // Legacy ICN Australia colors
        'icn-green': '#004225',
        'icn-gold': '#FFB000',
      },
    },
  },
  plugins: [],
}