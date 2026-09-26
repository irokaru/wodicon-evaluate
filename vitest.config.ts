import { mergeConfig } from "vite";

import { defineConfig } from "vitest/config";

import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: "happy-dom",
      reporters: process.env.GITHUB_ACTIONS ? ["github-actions"] : ["default"],
      coverage: {
        provider: "v8",
        reporter: ["text", "lcov", "clover"],
        include: ["src/**/*"],
        exclude: ["**/*.scss", "**/*.css", "**/*.svg", "src/vite-env.d.ts"],
      },
    },
  }),
);
