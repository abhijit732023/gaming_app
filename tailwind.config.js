module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'], // path to YOUR index.html
  theme: {
    extend: {
      keyframes: {
        bulletMove: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(600px)' },
        },
        muzzleFlash: {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        bulletMove: 'bulletMove 0.5s linear forwards',
        muzzleFlash: 'muzzleFlash 0.2s ease-in-out',
      },
    
      
      fontFamily: {
        drawliner: ['Drawliner', 'sans-serif'],
        valentino: ['TheValentino', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
