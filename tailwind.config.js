/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brandblue: "rgb(93, 176, 200)",
        brandred: "rgba(163, 84, 86, 1)",
        brandreddark: "rgba(81, 45, 45, 1)",
        brandgray: "rgba(91, 91, 97, 1)",
        brandalert: "rgba(208, 86, 89, 1)",
        brandbordergray: "rgba(161, 161, 170, 0.75)",
        branddialogbg: "rgba(45, 41, 59, 0.8)",
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
