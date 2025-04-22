/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "bg-main": "#eceefe",
        "bg-component": "#ffffff",
        "bg-button": "#444df2",
      },
      fontSize: {
        24: "24px",
        fontSizeChat: "18px",
      },
      borderRadius: {
        standard: "1.875rem",
      },
    },
  },
  plugins: [],
};
