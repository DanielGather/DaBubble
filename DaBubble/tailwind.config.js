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
        "fc-dark-purple": "var(--font-color-dark-purple)",
        "color-border": "var(--color-border)",
      },
      fontSize: {
        24: "var(--font-size-bold)",
        fontSizeChat: "var(--font-size-chat)",
        fontSizeAuthTitle: "var(--font-size-auth-title)",
      },
      borderRadius: {
        standard: "var(--border-radius)",
      },
    },
  },
  plugins: [],
};
