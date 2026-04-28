/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandGold: '#C5A059', // اللون الذهبي بتاعنا
      },
    },
  },
  plugins: [],
}