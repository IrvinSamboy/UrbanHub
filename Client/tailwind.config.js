/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'customMax': {'max': '1280px'}
      },
      maxHeight: {
        'custMaxH': '600px'
      },
      gridTemplateColumns: {
        'custom2': 'repeat(2, 1fr)'
      }
    },
  },
  plugins: [],
}