import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          // DEFAULT: "hsl(var(--primary))",
          // foreground: "hsl(var(--primary-foreground))",
          DEFAULT: "#060a0b",
          foreground: "#dadada",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          // DEFAULT: "#8e8e8c",
          // foreground: "#dadada",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
          // DEFAULT: "#dadada",
          // foreground: "#060a0b",
        },
        accent: {
          // DEFAULT: "hsl(var(--accent))",
          // foreground: "hsl(var(--accent-foreground))",
          DEFAULT: "#d6e3d2",
          foreground: "#060a0b",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        gold: {
          light: "#d4af37",
          DEFAULT: "#b8860b",
          dark: "#85630b",
        },
        earth: {
          light: "#a98467",
          DEFAULT: "#6c584c",
          dark: "#483c32",
        },
      },
      fontFamily: {
        playfair: ["var(--font-playfair)"],
        montserrat: ["var(--font-montserrat)"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "draw-line": {
          from: { strokeDashoffset: "1000" },
          to: { strokeDashoffset: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "draw-line": "draw-line 2s ease-in-out forwards",
        "fade-in": "fade-in 1s ease-in-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
