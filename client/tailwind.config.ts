import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    colors: {
      ...colors,
      primary: colors.slate,
      secondary: colors.red,
    },
  },
  plugins: [],
};
export default config;
