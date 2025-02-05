import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    fixturesFolder: "cypress/fixtures",
    supportFile: "cypress/support/e2e.ts",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    NODE_ENV: "test",
  },
  experimentalStudio: true,
});
