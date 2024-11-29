/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}",
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/login/**/*.{js,jsx,ts,tsx}",
    "./app/password/**/*.{js,jsx,ts,tsx}",
    "./app/store/**/*.{js,jsx,ts,tsx}",
    "./app/password/**/*.{js,jsx,ts,tsx}",
    "./app/payment/**/*.{js,jsx,ts,tsx}",
    "./app/user/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}