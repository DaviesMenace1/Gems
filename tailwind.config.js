/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: '#0D0D0D',
        ivory: '#F5F1EB',
        gold: {
          DEFAULT: '#C8A66A',
          hover: '#B59359',
        },
        taupe: '#8B7D6B',
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        playfair: ['Playfair Display', 'serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      letterSpacing: {
        editorial: '0.15em',
        monumental: '0.25em',
      },
    },
  },
  plugins: [],
}
