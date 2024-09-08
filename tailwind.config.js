const { isWhiteSpaceLike } = require("typescript");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#3B82F6", // Blue
          secondary: "#10B981", // Green
          accent: "#8B5CF6", // Purple
          neutral: "#1F2937", // Dark gray
          "base-100": "#FFFFFF", // Pure white
          "base-200": "#F9FAFB", // Very light gray
          "base-300": "#F3F4F6", // Light gray
          "base-content": "#1F2937", // Dark gray for text
          info: "#3ABFF8", // Light blue
          success: "#36D399", // Light green
          warning: "#FBBD23", // Yellow
          error: "#F87272", // Red
        },
      },
      "dark",
      "cupcake",
      "lofi",
    ],
  },
  plugins: [require("daisyui")],
  theme: {
    extend: {
      animation: {
        roll: "roll 20s linear infinite",
      },
    },
  },
};
