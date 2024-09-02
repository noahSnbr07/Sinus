/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "light-1": "rgba(20, 20, 20, 1)",
        "light-2": "rgba(30, 30, 30, 1)",
        "stack": "rgba(255, 255, 255, 0.25)",
        "accent": "rgb(0, 150, 0)",
        "white": "#ccccccff",
        "black": "#050505",
      },
      fontFamily: {
        'regular': ['Inter-Regular', 'sans-serif'],
        'bold': ['Inter-Bold', 'sans-serif'],
        'italic': ['Inter-Italic', 'sans-serif'],
        'black': ['Inter-Black', 'sans-serif'],
      }
    },
  },
  plugins: [],
}