import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Sora', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      colors: {
        accent: {
          DEFAULT: '#4f46e5',
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#4f46e5',
          600: '#4338ca',
          700: '#3730a3',
          800: '#312e81',
          900: '#1e1b4b',
        },
        electric: {
          DEFAULT: '#818cf8',
          400: '#a5b4fc',
          500: '#818cf8',
          600: '#4f46e5',
        },
      },
      fontSize: {
        'caption': ['10px', { lineHeight: '1.4' }],
        'display': ['clamp(3.5rem, 9vw, 8rem)', { lineHeight: '0.9', letterSpacing: '-0.03em' }],
        'heading': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'subheading': ['clamp(1.25rem, 2vw, 1.75rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
      animation: {
        'reveal': 'reveal 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'reveal-delay-1': 'reveal 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.1s forwards',
        'reveal-delay-2': 'reveal 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.2s forwards',
        'reveal-delay-3': 'reveal 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.3s forwards',
        'reveal-delay-4': 'reveal 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.4s forwards',
      },
      keyframes: {
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [typography],
};
