import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#D0B49F",
        secondary: "#2C3E50",
        background: "#F5F5F5",
      },
    },
    fontSize: { small: "0.5rem", medium: "1rem", large: "1.5rem" },
    padding: {
      xAxis: "120px",
      yAxis: "60px",
      mobileXAxis: "30px",
      mobileYAxis: "30px",
    },
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
    },
    animation: { fadeInOut: "transition-opacity duration-500 ease-in-out" },
  },
  plugins: [],
} satisfies Config;
