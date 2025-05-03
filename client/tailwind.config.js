/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ffe5eb',
          100: '#ffccd7',
          200: '#ff99af',
          300: '#ff6687',
          400: '#ff335f',
          500: '#ff0037',
          600: '#cc002c',
          700: '#990021',
          800: '#660016',
          900: '#33000b',
        },
        dark: {
          50: '#f3f3f3',
          100: '#e6e6e6',
          200: '#cccccc',
          300: '#b3b3b3',
          400: '#999999',
          500: '#808080',
          600: '#666666',
          700: '#4d4d4d',
          800: '#333333',
          900: '#1a1a1a',
          950: '#000000',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 