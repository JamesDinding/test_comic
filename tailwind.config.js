module.exports = {
  content: ["src/**/*.{html,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        watercolor: "url('../img/watercolor.png')",
        userSection: "url('../img/bg-user.png')",
      },
    },
  },
  plugins: [
    require("tailwindcss-safe-area"),
    require("@tailwindcss/line-clamp"),
  ],
};
