/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 仙境蓝 (Celestial Blue)
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#4A90E2', // 主要蓝色
          600: '#2563eb',
          700: '#2E5A87', // 深蓝色
          800: '#1e40af',
          900: '#1e3a8a',
        },
        // 灵气紫 (Spiritual Purple)
        secondary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#8E44AD', // 主要紫色
          600: '#9333ea',
          700: '#5B2C6F', // 深紫色
          800: '#6b21a8',
          900: '#581c87',
        },
        // 功能色彩
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#27AE60', // 生机绿
          600: '#16a34a',
          700: '#1E8449', // 深绿
          800: '#166534',
          900: '#14532d',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#F39C12', // 金丹黄
          600: '#d97706',
          700: '#B7950B', // 深黄
          800: '#92400e',
          900: '#78350f',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#E74C3C', // 心魔红
          600: '#dc2626',
          700: '#A93226', // 深红
          800: '#991b1b',
          900: '#7f1d1d',
        },
        // 中性色彩
        text: {
          primary: '#2C3E50',
          secondary: '#7F8C8D',
          disabled: '#BDC3C7',
          inverse: '#FFFFFF',
        },
        bg: {
          primary: '#FFFFFF',
          secondary: '#F8F9FA',
          tertiary: '#E9ECEF',
          dark: '#2C3E50',
        },
        border: {
          light: '#E9ECEF',
          medium: '#DEE2E6',
          dark: '#ADB5BD',
        }
      },
      fontFamily: {
        'zh': ['PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', 'SimSun', '宋体', 'sans-serif'],
        'en': ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'mono': ['Fira Code', 'Monaco', 'Consolas', 'Courier New', 'monospace'],
      },
      fontSize: {
        'h1': ['2.5rem', { lineHeight: '1.2' }],
        'h2': ['2rem', { lineHeight: '1.2' }],
        'h3': ['1.5rem', { lineHeight: '1.2' }],
        'h4': ['1.25rem', { lineHeight: '1.2' }],
        'h5': ['1.125rem', { lineHeight: '1.2' }],
        'h6': ['1rem', { lineHeight: '1.2' }],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(74, 144, 226, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(74, 144, 226, 0.8)' },
        }
      },
      backgroundImage: {
        'gradient-cultivation': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-common': 'linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%)',
        'gradient-uncommon': 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)',
        'gradient-rare': 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
        'gradient-epic': 'linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)',
        'gradient-legendary': 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)',
        'gradient-mythic': 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
      }
    },
  },
  plugins: [],
}