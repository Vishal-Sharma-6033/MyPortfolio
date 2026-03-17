/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg: '#121212',
        accent: '#7c3aed',
        'accent-light': '#a78bfa',
        'accent-blue': '#3b82f6',
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)',
      },
    },
  },
  plugins: [],
}

