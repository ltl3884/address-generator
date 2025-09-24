import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#14b8a6", // teal-500 - 主要青绿色
          50: "#f0fdfa",
          100: "#ccfbf1", 
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6", // 主色
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
        },
        background: {
          light: "#f8fafc", // 浅灰色背景
          dark: "#0f172a", // 深色玻璃拟态背景
        },
        surface: {
          light: "#ffffff", // 白色卡片背景
          dark: "rgba(30, 41, 59, 0.7)", // 半透明深色卡片背景
          glass: "rgba(30, 41, 59, 0.4)", // 玻璃拟态表面
        },
        text: {
          light: "#1e293b", // 深色文字
          dark: "#ffffff", // 白色文字
        },
        subtle: {
          light: "#64748b", // 次要文字颜色
          dark: "#e2e8f0", // 浅灰色次要文字
        },
        border: {
          light: "#e2e8f0", // 边框颜色
          dark: "rgba(148, 163, 184, 0.3)", // 半透明边框
          glass: "rgba(255, 255, 255, 0.2)", // 玻璃拟态边框
        }
      },
      fontFamily: {
        sans: ['Roboto', 'ui-sans-serif', 'system-ui'],
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px', 
        'lg': '12px',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'glass-lg': '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
      },
      backdropBlur: {
        'glass': '16px',
        'glass-lg': '20px',
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        'glass-orb': `
          radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.1) 0%, transparent 50%)
        `,
      }
    },
  },
  plugins: [],
};

export default config;