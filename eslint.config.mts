import eslint from "@eslint/js";
import globals from 'globals'
import typescriptEslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import prettierConfig from "@vue/eslint-config-prettier";

export default typescriptEslint.config(
  {
    ignores: ["**/.*", "node_modules/**/*", "dist/**/*"],
  },
  {
    extends: [
      eslint.configs.recommended,
      ...typescriptEslint.configs.recommended,
      ...pluginVue.configs["flat/recommended"],
      prettierConfig,
    ],
    files: ["**/*.{ts,vue"],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        parser: typescriptEslint.parser,
      },
    },
  },
  prettierConfig,
);
