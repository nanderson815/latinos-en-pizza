module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    backgroundImage: {
      'home-hero': "url(/images/homeHero.jpg)",
      'vanilla': "url(/images/backgroundVanilla.jpg)",
      'pints': "url(/images/backgroundPints.jpg)"
    },
    extend: {
      colors: {
        lightBlue: "#6999D1",
        lemon: "#F6871F"
      },
    },
  },
  plugins: [],
};
