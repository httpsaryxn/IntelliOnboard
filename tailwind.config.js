/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(217, 33%, 17%)',
        accent: 'hsl(180, 25%, 50%)',
      },
    },
  },
  plugins: [],
}
