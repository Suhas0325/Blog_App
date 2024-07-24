/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
      colors: {
        customGray: '#757575',
      },
      fontFamily: {
        poppins: ['poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

