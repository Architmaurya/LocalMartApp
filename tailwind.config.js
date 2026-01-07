const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.js",                    // ✅ REQUIRED
    "./App.{js,jsx,ts,tsx}",
      "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        col1: "#FF0080",
        col2: "#00FFFF",
        col3: "#6C63FF",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".border-purpleGlow": {
          borderWidth: 2,
          borderColor: "#6C63FF",
        },
        ".shadow-purpleGlow": {
          shadowColor: "#6C63FFCC",
          shadowOpacity: 0.8,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 4 },
          elevation: 10,
        },
        ".glow-purpleBox": {
          borderWidth: 2,
          borderColor: "#6C63FF",
          shadowColor: "#6C63FFCC",
          shadowOpacity: 0.8,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 4 },
          elevation: 10,
        },
      });
    }),
  ],
};
