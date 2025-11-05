import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    watch: false,
    coverage: {
      enabled: true,
      provider: "v8",
    },
    silent: "passed-only",
    sequence: {
      concurrent: true,
    },
    typecheck: {
      enabled: process.env.CI ? true : false,
    },
    bail: process.env.CI ? 3 : undefined,
    retry: process.env.CI ? 3 : 0,
    printConsoleTrace: process.env.CI ? true : false,
    reporters: process.env.GITHUB_ACTIONS
      ? ["dot", "github-actions"]
      : "default",
  },
  cacheDir: process.env.VITEST ? "./.vitest" : undefined,
});
