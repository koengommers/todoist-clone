/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: '-apple-system, system-ui, "Segoe UI", Roboto, Noto, Oxygen-Sans, Ubuntu, Cantrell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    },
    extend: {
      colors: {
        neutral: {
          100: "#EEEEEE",
          500: "#484848",
          600: "#363636",
          700: "#282828",
          800: "#242424",
          900: "#202020",
        },
        red: {
          500: "#DE4C4A",
          600: "#C53828",
        },
      },
    },
  },
  plugins: [],
};
