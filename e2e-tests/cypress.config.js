const { defineConfig } = require('cypress');
const { allureCypress } = require('allure-cypress/reporter');

module.exports = defineConfig({
  allowCypressEnv: true,
  experimentalRunAllSpecs: true,
  viewportWidth: 1200,
  viewportHeight: 1500,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      allureCypress(on, config, {
        resultsDir: 'allure-results',
      });
    },
  },
});
