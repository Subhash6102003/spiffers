/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#111111',
          light: '#ffffff',
          muted: '#888888',
          secondary: '#555555',
          bgLight: '#f6f6f6',
          border: '#e2e2e2'
        }
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Outfit', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.2em',
      },
      animation: {
        'scroll-wheel': 'scrollWheel 1.5s infinite',
      }
    },
  },
  plugins: [],
}
