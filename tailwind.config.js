/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        arabic: ["var(--font-arabic)", "serif"],
      },
      colors: {
        night: "#0b0716",
        plum: "#1b0f2e",
        gold: { DEFAULT: "#f2c879", 100: "#fff4d6", 200: "#f8dfa6", 400: "#f2c879", 600: "#c9993f" },
        rose: { glow: "#ff8fb1" },
      },
    },
  },
  plugins: [],
};
