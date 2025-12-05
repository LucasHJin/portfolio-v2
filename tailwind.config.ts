import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        garamond: ['var(--font-garamond)'],
        dm: ['var(--font-dm)'],
      },
    },
  },
  plugins: [],
};
export default config;