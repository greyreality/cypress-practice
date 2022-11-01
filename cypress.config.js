const { defineConfig } = require('cypress')

module.exports = defineConfig({
  watchForFileChanges: false,
  defaultCommandTimout: 4000,
  execTimeout: 60000,
  taskTimeout: 60000,
  pageLoadTimeout: 10000,
  requestTimeout: 5000,
  responseTimeout: 30000,
  projectId: 'm49jk9',
  retries: {
    runMode: 1,
    openMode: 1,
  },
  experimentalStudio: true,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'https://jb-app-frontend-staging.herokuapp.com',
    excludeSpecPattern: '**/examples/more_examples/*.spec.js',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
})
