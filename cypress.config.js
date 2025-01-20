const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "q56pho",
  e2e: {
    specPattern: "cypress/tests/**.cy.js",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
