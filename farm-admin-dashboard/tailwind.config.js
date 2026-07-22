/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Poppins', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#00C853',
          light: '#33D676',
          dark: '#00A544',
          50: '#E8F9EF',
          100: '#C6F0D9',
        },
        neon: {
          DEFAULT: '#00E5FF',
          soft: '#5CF0FF',
        },
        'neon-green': '#39FF14',
        surface: '#F3FFF9',
        mint: '#D6FFE8',
        ink: {
          DEFAULT: '#06231A',
          soft: '#4A6B5A',
          muted: '#7A9488',
        },
        danger: { DEFAULT: '#EF4444', light: '#F87171' },
        warning: { DEFAULT: '#F59E0B', light: '#FBBF24' },
        card: '#FFFFFF',
        border: { DEFAULT: '#E5E7EB', light: '#F3F4F6' },
      },
      boxShadow: {
        card: '0 10px 30px -15px rgba(6,35,26,0.1)',
        'card-hover': '0 20px 40px -20px rgba(6,35,26,0.15), 0 0 30px rgba(0,229,255,0.12)',
        neon: '0 0 20px rgba(0,229,255,0.55)',
        'neon-lg': '0 0 40px rgba(0,229,255,0.6)',
        'neon-green': '0 0 20px rgba(0,200,83,0.5)',
        'neon-green-lg': '0 0 40px rgba(57,255,20,0.55)',
        warm: '0 0 20px rgba(0,229,255,0.55)',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0', transform: 'translateY(8px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        'glow-pulse': { '0%, 100%': { boxShadow: '0 0 20px rgba(0,229,255,0.55)' }, '50%': { boxShadow: '0 0 40px rgba(0,229,255,0.3)' } },
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-20px)' } },
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        shimmer: 'shimmer 1.5s infinite',
        'glow-pulse': 'glow-pulse 2.5s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
