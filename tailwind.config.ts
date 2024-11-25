import { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  experimental: {
    applyComplexClasses: true,
  },
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    transparent: "transparent",
    current: "currentColor",
    extend: {
      colors: {},
    },
  },

  plugins: [
    nextui(),
  ],
};

export default config;
