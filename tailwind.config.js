/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Gabarito', 'sans-serif'],
    },
    extend: {
      fontFamily: {
        brand: 'Lilita One, sans-serif',
      },
      colors: {
        org: '#ffbf69',
        green1: ' #cbf3f0',
        green2: '#2ec4b6',
      },
      borderWidth: {
        1: '1.5px',
      },
      boxShadow: {
        sp: '#020617 2px 2px 0 0',
      },
      gridTemplateColumns: {
        profile: '5rem repeat(4, 1fr)',
        chat: '1fr 3rem',
      },
      scrollSnapType: {
        yMandatory: 'y mandatory',
      },
      scrollSnapAlign: {
        center: 'center',
      },
    },
  },
  plugins: [],
};
