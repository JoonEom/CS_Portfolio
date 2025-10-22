import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        border: "rgb(var(--muted) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        "muted-foreground": "rgb(var(--muted-foreground) / <alpha-value>)",
        accent: {
          indigo: "rgb(var(--accent-indigo) / <alpha-value>)",
          teal: "rgb(var(--accent-teal) / <alpha-value>)",
          lavender: "rgb(var(--accent-lavender) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-geist-mono)", ...defaultTheme.fontFamily.mono],
      },
      backgroundImage: {
        "accent-gradient":
          "linear-gradient(135deg, rgb(var(--accent-indigo)), rgb(var(--accent-teal)), rgb(var(--accent-lavender)))",
      },
      boxShadow: {
        glow: "0 25px 50px -12px rgb(var(--accent-indigo) / 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
