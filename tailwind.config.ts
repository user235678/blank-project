import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#f8f5ef",
        gold: "#c1a45a",
        ink: "#0b0b0c"
      }
    }
  },
  plugins: []
} satisfies Config;