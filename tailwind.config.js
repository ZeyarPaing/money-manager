const plugin = require('tailwindcss/plugin')
module.exports = {
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [
    plugin(function({ addUtilities }) {
      const newUtilities = {
        '.text-color-green': {
          color: 'green',
        },
        '.color-primary': {
          color: '#4c5cb3',
        },
        '.bg-primary': {
          backgroundColor: '#4c5cb3',
        },
        '.bg-primary-light': {
          backgroundColor: '#5968b8',
        },
        '.bg-primary-dark': {
          backgroundColor: '#4554a3',
        },
        '.bg-secondary': {
          backgroundColor: '#4cb36f',
        },
        '.bg-teal': {
          backgroundColor: 'rgb(3, 186, 129)',
          background:
            'linear-gradient(213deg, rgb(3, 187, 129) 0%,rgb(0, 153, 153) 100%)',
        },
        '.gradient-btn': {
          border: '1px solid rgba(27, 31, 35, 0.2)',
          backgroundColor: '#eff3f6',
          backgroundImage: 'linear-gradient(-180deg, #fafbfc, #eff3f6 90%)',
        },
        '.gradient-btn-hov': {
          backgroundColor: '#e6ebf1',
          backgroundImage: 'linear-gradient(-180deg,#f0f3f6,#e6ebf1 90%)',
          backgroundPosition: '-.5em',
          borderColor: 'rgba(27,31,35,.35)',
        },
      }
      addUtilities(newUtilities)
    }),
  ],
}
