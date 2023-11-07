/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      "def-orange": {
        100: '#F2A599',
        200: '#F88F7E',
        300: '#EF6D58'
      },
      "def-purple": {
        100: '#D193F9',
        200: '#C06BF9',
        300: '#B550F8'
      },
      "def-yellow": {
        100: '#F9E4A2',
        200: '#F9D76C',
        300: '#F7CC47'
      },
      "def-white": {
        100: '#b1b2b9',
        200: '#FFF',
      },
      "bg": {
        100: '#28293e',
        200: '#fdf0e9',
      },
      ...colors,
    },
  },
  plugins: [],
}