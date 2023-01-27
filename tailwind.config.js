module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'image': "url('./assets/leaves.jpg')"
      })
    },
  },
  plugins: [],
};
