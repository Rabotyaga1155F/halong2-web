import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",

      black: "#000000",
      white: "#FFFFFF",

      red: "#C21121",
      "red-hover": "#67040d",
      "red-light": "#fda4af",
      "red-dark": "#7f1d1d",

      yellow: "#FFBE00",
      "yellow-hover": "rgba(248,195,0,0.76)",
      "yellow-light": "#fef08a",
      "yellow-dark": "#92400e",

      blue: "#3B82F6",
      "blue-light": "#93c5fd",
      "blue-dark": "#1e3a8a",

      green: "#10B981",
      "green-light": "#6ee7b7",
      "green-dark": "#064e3b",

      gray: {
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
      },

      purple: {
        100: "#f3e8ff",
        300: "#c084fc",
        500: "#9333ea",
        700: "#6b21a8",
      },

      orange: {
        100: "#ffedd5",
        300: "#fdba74",
        500: "#f97316",
        700: "#c2410c",
      },
    },
    extend: {},
  },
  plugins: [],
};

export default config;
