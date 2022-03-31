module.exports = {
  content: [
    "dist_electron/index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 6s linear infinite',
      }
    },
  },
  plugins: [],
}