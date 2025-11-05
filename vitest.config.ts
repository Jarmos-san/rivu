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
  },
});
