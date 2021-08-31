const colors = require('tailwindcss/colors');

module.exports = {
  // purge: [],
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      gray: colors.trueGray,
      red: colors.red,
      blue: colors.sky,
      yellow: colors.amber,
      green: colors.lime,
      white: colors.white,
      black: colors.black,
    },
    extend: {
      backgroundImage: (theme) => ({
        'hero-pattern': "url('/images/hero-image.png')",
      }),
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      theme: {
        spacing: {},
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
