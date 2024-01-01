import { PrismaClient } from "@prisma/client";
import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  e2e: {
    retries: {
      runMode: 1,
      openMode: 0,
    },
    supportFile: "cypress/support/e2e.ts",
    baseUrl: "http://localhost:3000",
    chromeWebSecurity: false,
    watchForFileChanges: false,
    env: {
      AUTH0_ISSUER: process.env.AUTH0_ISSUER,
    },
    setupNodeEvents(on, config) {
      // to avoid some UI libraries (MUI) detect the mobile mode because the lack of pointer
      on("before:browser:launch", (browser, launchOptions) => {
        if (browser.family === "chromium" && browser.name !== "electron") {
          launchOptions.args.push("--blink-settings=primaryPointerType=4");
          return launchOptions;
        }
      });
      tasks(on);
      return config;
    },
  },
  component: {
    retries: {
      runMode: 1,
      openMode: 0,
    },
    watchForFileChanges: false,
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});

const prisma = new PrismaClient();

function tasks(on: Cypress.PluginEvents) {
  on("task", {
    "db:clearTasks"() {
      return prisma.task.deleteMany();
    },
  });
}
