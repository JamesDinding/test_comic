module.exports = {
  content: ["src/**/*.{html,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "watercolor": "url('../img/watercolor.png')",
      }
    },
  },
  plugins: [require('tailwindcss-safe-area')],
}
