/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'roboto': ['Roboto', 'sans-serif'],
      },
      lineHeight:{
        '32px': '2rem',
        '41.02px':'2.5638rem',
        '68.38px':'4.2737rem'
      },
      letterSpacing:{
        '2%':'.0625rem'
      },
      boxShadow: {
        'custom': '0px 4px 20px 0px rgba(0, 0, 0, 0.25)', // 0.25 is equivalent to #00000040
      },
    },
  },
  plugins: [],
}

