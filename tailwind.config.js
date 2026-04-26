// NOTE: This Tailwind config is not used by web components (styles are inline Shadow DOM).
// It exists for reference if Tailwind is adopted in the future.
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#333333",
        secondary: "#666666",
        accent: "#999999",
      },
      borderWidth: {
        '1': '1px',
      }
    },
  },
  plugins: [],
}
