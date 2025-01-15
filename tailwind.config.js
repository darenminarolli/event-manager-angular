/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        main: "#bd52eb",
        mainAccent: "#a81be4",
        overlay: "rgba(0,0,0,0.8)",
        textDanger: "#FF0800",

        bg: "#1D1F27",
        lightBg: "#c4a1ff",
        text: "#eeefe9",
        darkText: "#000",
        border: "#000",
        secondaryBlack: "#1b1b1b",
      },
      borderRadius: {
        base: "9px",
      },
      boxShadow: {
        light: "3px 4px 0px 0px #000",
        dark: "3px 4px 0px 0px #000",
      },
      translate: {
        boxShadowX: "3px",
        boxShadowY: "4px",
        reverseBoxShadowX: "-3px",
        reverseBoxShadowY: "-4px",
      },
      fontWeight: {
        base: "600",
        heading: "900",
      },
    },
  },
  plugins: [],
};
