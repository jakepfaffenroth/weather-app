module.exports = {
  purge: [],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 14 column grid
        '14': 'repeat(14, minmax(0, 1fr))',
        // Simple 15 column grid
        '15': 'repeat(15, minmax(0, 1fr))',
      },
    },
  },
  variants: {},
  plugins: [],
};
