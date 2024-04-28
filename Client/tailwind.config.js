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
        'custom2': 'repeat(2, 1fr)',
        '35/65': '35% 65%',
        '60/40': '60% 40%',
        '30/70': '30% 70%',
      },
      height: {
        'custH200': '200px',
        'custH': '600px',
        'full': '100%',
      },
      borderWidth: {
        DEFAULT: '1px'
      },
    },

  },
  plugins: [],
}