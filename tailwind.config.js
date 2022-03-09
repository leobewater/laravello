module.exports = {
  content: ['./index.html', './resources/js/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        card: '0 1px 0 rgba(9, 30, 66, 0.25)',
      },
      keyframes: {
        'fade-in-down': {
          from: {
            transform: 'translateY(-0.75rem)',
            opacity: '0',
          },
          to: {
            transform: 'translateY(0rem)',
            opacity: '1',
          },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.2s ease-in-out both',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
