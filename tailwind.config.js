/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'Inter', 'sans-serif'],
      },
      colors: {
        game: {
          teal: {
            light: '#4fd1c5',
            DEFAULT: '#1EB5B0',
            dark: '#138c89',
          },
          yellow: {
            light: '#ffe066',
            DEFAULT: '#FFC107',
            dark: '#cc9a06',
          },
          white: '#ffffff',
          dark: '#1e293b',
          danger: '#ef4444',
        }
      },
      dropShadow: {
        'title': '0 4px 0px rgba(0, 0, 0, 0.2)',
        'card': '0 10px 20px rgba(0,0,0,0.1)',
        'btn': '0 4px 0px rgba(204, 154, 6, 1)',
      }
    },
  },
  plugins: [],
}
