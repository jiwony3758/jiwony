/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "background-rgb": "var(--background-rgb)",
        "background-tag-rgb": "var(--background-tag-rgb)",
        "background-tag-hover-rgb": "var(--background-tag-hover-rgb)",
        "text-basic": "var(--text-basic)",
        "text-primary": "var(--text-primary)",
        "text-description": "var(--text-description)",
        "text-description2": "var(--text-description2)",
        "text-link": "var(--text-link)",
        "border-primary": "var(--border-primary)",
      },
    },
  },
  plugins: [],
};
