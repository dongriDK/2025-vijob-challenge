/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./util/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./stories/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        Background: "#FCFCFC",
        BackgroundDark: "#1E1E1E",
        Primary: "#5835ed",
        PrimaryDark: "#2A2744",
        PrimaryLight: "#f5f4fe",
        SubText: "#808080",
        DarkSubText: "#AB98FF",
        Placeholder: "#bbbbbb",
        Language: "#4d4d4d",
        Border: "#e8e8e8",
        BorderDark: "#AFAFAF",
        CardDark: "#2A2A2A",
      },
    },
  },
  plugins: [],
};
