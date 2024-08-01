/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'media',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'clock': ['Rubik Mono One', 'monospace'],
        'primary': ['Rubik', 'sans-serif'],
      },
      colors: {
        'lbg': '#F8FFE5',
        'lpm': '#22252C',
        'lsc': '#44FF4E',

        'dbg': '#22252C',
        'dpm': '#44FF4E',
        'dsc': '#F8FFE5',
      }
    },
  },
  plugins: [],
}