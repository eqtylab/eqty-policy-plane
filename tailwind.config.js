// File Path: tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "tw-", // Add 'tw-' as the prefix
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brandblue: "rgb(93, 176, 200)",

        brandred: "rgba(163, 84, 86, 1)",
        brandreddark: "rgba(81, 45, 45, 1)",
        brandgray: "rgba(91, 91, 97, 1)",
        brandalert: "rgba(208, 86, 89, 1)",
        brandalertblue: "rgba(0,157,255,1)",
        brandbordergray: "rgba(161, 161, 170, 0.75)",
        branddialogbg: "rgba(45, 41, 59, 0.8)",
        branddialogbg_full: "rgba(45, 41, 59, 1)",
        nvidiagreen: "#76B900",
        sidebar: "rgba(70, 70, 70, 0.4)",
        "card-1": "rgba(26, 28, 30, 1)",
        "card-2": "rgba(127, 127, 127, 0.46)",

        "btn-blue": "#72aec6",
        "btn-red": "#995758",
        "btn-grey": "#6e758f",
      },

      backgroundImage: {
        "permission-gradient":
          "linear-gradient(90deg, rgba(247, 114, 117, 0.4) 0%, rgba(145, 67, 69, 0.4) 100%)",
        "override-gradient":
          "linear-gradient(89.99deg, rgba(0, 157, 255, 0.9) 0.01%, rgba(0, 157, 255, 0.54) 79.49%, rgba(0, 157, 255, 0.27) 99.99%)",
        "cancel-gradient":
          "linear-gradient(90deg, rgba(83, 78, 96, 0.2) 0%, rgba(172, 161, 198, 0.2) 67%, rgba(203, 197, 220, 0.2) 99%)",
      },
    },
  },
  plugins: [],
};
