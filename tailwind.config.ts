import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B35',
          hover: '#E85A25',
          light: '#FFF0EB',
        },
        background: '#FAFAF8',
        surface: {
          DEFAULT: '#FFFFFF',
          2: '#F5F5F0',
        },
        foreground: '#1A1A1A',
        muted: '#6B6B6B',
        subtle: '#9B9B9B',
        border: {
          DEFAULT: '#E8E8E4',
          strong: '#D0D0C8',
        },
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',
        info: '#3B82F6',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
    },
  },
  plugins: [],
}

export default config
