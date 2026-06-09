/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#4E56C0",
          secondary: "#9B5DE0",
          accent: "#D78FEE",
          light: "#FDCFFA",
        },
      },
    },
  },
  plugins: [],
};
