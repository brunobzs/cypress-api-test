const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "q56pho",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
