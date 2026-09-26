import eslint from "@eslint/js";
import globals from "globals";
import typescriptEslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import prettierConfig from "@vue/eslint-config-prettier";
import vitest from "@vitest/eslint-plugin";

export default typescriptEslint.config(
  {
    ignores: ["node_modules/**/*", "dist/**/*", "coverage/**/*"],
  },
  {
    extends: [
      eslint.configs.recommended,
      ...typescriptEslint.configs.recommended,
      ...pluginVue.configs["flat/recommended"],
      prettierConfig,
    ],
    files: ["**/*.{ts,mts,js,mjs,vue}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        parser: typescriptEslint.parser,
      },
    },
  },
  {
    extends: [vitest.configs.recommended],
    files: ["tests/**/*.ts"],
  },
  prettierConfig,
);
