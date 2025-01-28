const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "q56pho",
  e2e: {
    specPattern: "cypress/tests/**.cy.js",
    baseUrl: "https://serverest.dev",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  }
});
