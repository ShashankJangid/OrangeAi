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
          cyan: '#00F0FF',
          cyanGlow: '#00E5FF',
          orange: '#FF5500',
          gold: '#FFD700',
          darkBg: '#030712',
          cardBg: 'rgba(10, 15, 26, 0.95)',
          borderCyan: 'rgba(0, 240, 255, 0.4)',
          borderOrange: 'rgba(255, 85, 0, 0.4)',
        }
      },
      animation: {
        'pulse-glow': 'pulseGlow 1.8s infinite ease-in-out',
        'wave-bar': 'waveBar 1s infinite ease-in-out',
        'hologram-scan': 'hologramScan 2.5s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.7', filter: 'drop-shadow(0 0 15px rgba(0,240,255,0.6))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 30px rgba(0,240,255,1))' },
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
