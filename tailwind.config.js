/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "light-1": "rgba(25, 25, 25, 1)",
        "light-2": "rgba(35, 35, 35, 1)",
        "stack": "rgba(255, 255, 255, 0.25)",
        "accent": "rgb(0, 150, 0)",
        "white": "#ffffff",
        "black": "#000000",
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
