import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    fixturesFolder: "cypress/fixtures",
    supportFile: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  experimentalStudio: true,
});
