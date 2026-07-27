/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#FF6B00',
          orangeDark: '#E05300',
          cyan: '#00B4D8',
          slateDark: '#0F172A',
          glassWhite: 'rgba(255, 255, 255, 0.85)',
          borderLight: 'rgba(0, 0, 0, 0.08)',
        }
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s infinite ease-in-out',
        'wave-bar': 'waveBar 1s infinite ease-in-out',
        'hologram-scan': 'hologramScan 3s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.8', filter: 'drop-shadow(0 0 12px rgba(255,107,0,0.3))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 24px rgba(255,107,0,0.6))' },
        },
        waveBar: {
          '0%, 100%': { height: '15%' },
          '50%': { height: '100%' },
        },
        hologramScan: {
          '0%': { top: '0%' },
          '100%': { top: '100%' },
        }
      }
    },
  },
  plugins: [],
}
