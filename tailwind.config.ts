import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          ivory: "#F8F3E9",
          creamy: "#FAF6EF",
          card: "#F3EDE2",
          border: "#E7DCBC",
          dark: "#2A1D18",
        },
        rose: {
          dusty: "#D9A5A5",
          blush: "#EBCBC7",
          soft: "#F4DFDC",
          deep: "#C48585",
        },
        wine: {
          muted: "#7C3349",
          deep: "#5C2434",
          light: "#9A455E",
        },
        chocolate: {
          DEFAULT: "#34251F",
          muted: "#5A443B",
          dark: "#221713",
        },
        sage: {
          soft: "#A5B59A",
          light: "#C3CEC0",
          dark: "#7E8E73",
        },
        gold: {
          champagne: "#C7A66A",
          light: "#DFCA9C",
          shimmer: "#F0DFBC",
          dark: "#A3824A",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        display: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-dmsans)", "sans-serif"],
        hand: ["var(--font-caveat)", "cursive"],
      },
      boxShadow: {
        romantic: "0 10px 30px -10px rgba(124, 51, 73, 0.12)",
        paper: "0 4px 20px -2px rgba(52, 37, 31, 0.08), 0 2px 6px -1px rgba(52, 37, 31, 0.04)",
        ticket: "0 15px 35px -5px rgba(52, 37, 31, 0.18), 0 0 0 1px rgba(199, 166, 106, 0.25)",
        glow: "0 0 25px rgba(217, 165, 165, 0.45)",
        "glow-gold": "0 0 25px rgba(199, 166, 106, 0.5)",
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "sway-slow": "sway 6s ease-in-out infinite",
        "shimmer-slow": "shimmer 3s ease-in-out infinite",
        "pulse-subtle": "pulseSubtle 4s ease-in-out infinite",
        "spin-slow": "spin 25s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(2deg)" },
        },
        sway: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.9" },
        },
        pulseSubtle: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.025)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
