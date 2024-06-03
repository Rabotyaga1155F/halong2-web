import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      red: "#C21121",
      "red-hover": "#67040d",
      transparent: "transparent",
      yellow: "#FFBE00",
      "yellow-hover": "rgba(248,195,0,0.76)",
      black: "#000000",
      white: "#FFFFFF",
    },
  },
  plugins: [],
};
export default config;
