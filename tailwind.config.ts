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
        surface: "rgb(var(--surface) / <alpha-value>)",
        "surface-muted": "rgb(var(--surface-muted) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        "muted-foreground": "rgb(var(--muted-foreground) / <alpha-value>)",
        accent: {
          orange: "rgb(var(--accent-orange) / <alpha-value>)",
          amber: "rgb(var(--accent-amber) / <alpha-value>)",
          yellow: "rgb(var(--accent-yellow) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-geist-mono)", ...defaultTheme.fontFamily.mono],
      },
      backgroundImage: {
        "accent-gradient":
          "linear-gradient(135deg, rgb(var(--accent-orange)), rgb(var(--accent-amber)), rgb(var(--accent-yellow)))",
      },
      boxShadow: {
        glow: "0 25px 50px -12px rgb(var(--accent-orange) / 0.35)",
        card: "0 1px 2px rgb(28 25 23 / 0.04), 0 4px 12px -4px rgb(28 25 23 / 0.06)",
        "card-hover":
          "0 2px 4px rgb(28 25 23 / 0.05), 0 12px 28px -8px rgb(28 25 23 / 0.12)",
      },
      letterSpacing: {
        tightest: "-0.035em",
      },
    },
  },
  plugins: [],
};

export default config;
