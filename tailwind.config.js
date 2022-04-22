module.exports = {
  content: [
    './src/popup/index.html',
    './src/options/index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      boxShadow: {
        site: '0 0 2px 0 rgba(0, 0, 0, 0.06), 0 1px 1px 0 rgba(0, 0, 0, 0.08), 0 3px 7px 0 rgba(0, 0, 0, 0.09)',
        'site-md':
          '0 0 2px 0 rgba(0, 0, 0, 0.06), 0 1px 1px 0 rgba(0, 0, 0, 0.1), 0 6px 17px 0 rgba(0, 0, 0, 0.23)',
        select:
          '0 0 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.08), 0 3px 7px 0 rgba(0, 0, 0, 0.09)',
        'select-md':
          '0 0 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.1), 0 4px 7px 0 rgba(0, 0, 0, 0.14)'
      }
    }
  },
  plugins: []
}
