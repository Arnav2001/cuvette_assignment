/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      placeholderColor: {
        'custom-gray': '#888', // Custom placeholder color if needed
      },
      placeholderOpacity: {
        'custom-opacity': '1', // Custom placeholder opacity if needed
      },
      fontFamily:{
        'roboto': ['Roboto', 'sans-serif'],
      },
      lineHeight:{
        '32px': '2rem',
        '41.02px':'2.5638rem',
        '68.38px':'4.2737rem',
        '28.13px':'1.7581rem',
        '28.83px':'1.8019rem',
        '17.58px':'1.0987rem',
        '34.94px':'2.1837rem',
        '46.45px':'2.9031rem',
        '43.75px':'2.7344rem',
        '32.04px':'2.0025rem'
      },
      letterSpacing:{
        '2%':'0.03125rem',
        '3.5%':'0.0546875rem'
      },
      boxShadow: {
        'custom': '0px 4px 20px 0px rgba(0, 0, 0, 0.25)', // 0.25 is equivalent to #00000040
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

