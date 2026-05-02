/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366F1',
        accent: '#10B981',
        dark: '#111827',
        'dark-lighter': '#1F2937',
        'dark-border': '#374151'
      }
    },
  },
  plugins: [],
}
