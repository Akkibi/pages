/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  // purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, //or 'media' or 'class'
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      // keyframes: {
      //   movy: {
      //     "0%": { transform: "translateY(0%)" },
      //     "100%": { transform: "translateY(50%)" },
      //   },
      //   movx: {
      //     "0%": { transform: "translateX(0%)" },
      //     "100%": { transform: "translateX(50%)" },
      //   },
      // },
      // animation: {
      //   slidex: "movx 10s infinite",
      //   slidey: "movy 10s infinite",
      // },
      colors: {
        blue: {
          1000: "#001382",
        },
      },
    },
  },
  plugins: [],
};