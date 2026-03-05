import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          50: '#fdf2f5',
          100: '#fce4ec',
          200: '#f9c7d4',
          300: '#f4a0bb',
          400: '#ec7499',
          500: '#e04f7a',
          600: '#cc2f5e',
          700: '#a82249',
          800: '#8c1e3d',
          900: '#751d35',
        },
        ivory: '#fdf6ec',
        gold: {
          300: '#e8d080',
          400: '#d4b96a',
          500: '#c9a84c',
          600: '#b08d34',
        },
        sage: {
          300: '#b5c9a8',
          400: '#9cba8d',
          500: '#8fa882',
          600: '#6d8a61',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-lato)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out',
        'fade-up': 'fadeUp 0.8s ease-out',
        'fade-up-delay': 'fadeUp 0.8s ease-out 0.3s both',
        'fade-up-delay-2': 'fadeUp 0.8s ease-out 0.6s both',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
