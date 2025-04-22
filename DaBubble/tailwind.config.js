/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "bg-main": "var(--bg-main)",
        "bg-component": "var(--bg-component)",
        "bg-button": "var(--bg-button)",
        "fc-purple": "var(--font-color-purple)",
      },
      fontSize: {
        24: "var(--font-size-bold)",
        fontSizeChat: "var(--font-size-chat)",
      },
      borderRadius: {
        standard: "var(--border-radius)",
      },
    },
  },
  plugins: [],
};
