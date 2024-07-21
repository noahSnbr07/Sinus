/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "stack-light": "rgba(255, 255, 255, 0.075)",
      "stack-neutral": "rgba(127, 127, 127, 0.5)",
      "accent": "rgb(0, 185, 0)",
      "background": "#101010",
      "white": "#ffffff",
      "black": "#000000",
    }
  },
  plugins: [],
}