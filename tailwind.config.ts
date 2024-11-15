import type { Config } from 'tailwindcss';

import { colors } from './src/tokens/colors';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors,
    extend: {}
  },
  plugins: []
};
export default config;
