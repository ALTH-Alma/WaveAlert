/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'mountain': "url('./src/assets/mountain.png')",
        'skiing': "url('./src/assets/skiing.png')",
        
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif']
      },
      blur : {
        md: '1000px'
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
}

