import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        blush: '#f9eff0',
        'blush-mid': '#f2dde0',
        rose: '#c4727e',
        'rose-dk': '#a85560',
        'rose-lt': '#e8a0aa',
        petal: '#fde8eb',
        warm: '#fdf6f0',
        sand: '#f5ede4',
        taupe: '#8a7068',
        brown: '#4a2e28',
        'hero-dk': '#3d1c22',
        'hero-mid': '#6b2d38',
        'slot-green': '#4caf7d',
        'slot-green-lt': '#e8f7ef',
        'slot-red': '#e05c6a',
        'slot-red-lt': '#fdecea',
      },
      fontFamily: {
        serif: ['var(--font-dm-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
