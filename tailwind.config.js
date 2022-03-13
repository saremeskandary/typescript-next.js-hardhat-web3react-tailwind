module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // consola: ["consola"],
      },
      backgroundImage: (theme) => ({
        // header: "url('/assets/ELEMENTS-PC/bkgnd-header-stroke-PC.png')",
      }),
      colors: {
        // night: "#0f1f3a",
      },
      spacing: {
        // 100: "27rem",
      },
    },
  },
  plugins: [],
};
