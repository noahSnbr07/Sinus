/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "light-1": "rgba(25, 25, 25, 1)",
      "light-2": "rgba(35, 35, 35, 1)",
      "stack": "rgba(255, 255, 255, 0.25)",
      "accent": "rgb(0, 150, 0)",
      "white": "#ffffff",
      "black": "#000000",
    }
  },
  plugins: [],
}