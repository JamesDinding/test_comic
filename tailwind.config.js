module.exports = {
  content: ["src/**/*.{html,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        watercolor: "url('../img/watercolor.png')",
        userSection: "url('../img/bg-user.png')",
        cartoon: "url('../img/bg-cartoon.png')",
      },
    },
  },
  plugins: [
    require("tailwindcss-safe-area"),
    require("@tailwindcss/line-clamp"),
  ],
};
