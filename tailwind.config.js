/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        customText: "#F2F6D0",
        customHover: " rgb(68, 54, 39)",
        color1: "#443627",
        color11: "#4c3c2c",
        color2: "#D98324",
      },
    },
  },
  plugins: [],
};
export default {
  corePlugins: {
    preflight: false,
  },
};
