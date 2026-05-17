import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        gray: {
          750: "#2a3142",
          850: "#161d2e",
          950: "#070d1a",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
