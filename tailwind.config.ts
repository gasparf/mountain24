import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/App.{js,ts,jsx,tsx,mdx}',
    './src/Pages/*.{js,ts,jsx,tsx,mdx}',
    './src/Components/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    
  },
  plugins: [],
}
export default config
