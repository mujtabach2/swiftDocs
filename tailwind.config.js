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
          primary: "#fff",
          secondary: "#fff",
          accent: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#ffffff",
          "gray-800": "#9CA3AF",
        },
      },
      "dark",
      "cupcake",
      "lofi"

    ],
  },
  plugins: [require("daisyui")],
};
