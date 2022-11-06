/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        neutral: {
          50: "#FFFFFF",
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
