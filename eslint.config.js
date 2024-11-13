/**
 * This file configures ESLint — which is a tool we use to enforce consistent
 * code style across the TypeScript code in this repository.
 */

const eslint = require('@eslint/js');
const globals = require('globals');
const tseslint = require('typescript-eslint');

module.exports = tseslint.config(
  {
    ignores: [
      'build/', // This folder contains the JavaScript files compiled (from our TypeScript).
      '*.js', // Write TypeScript when possible. Applying ESLint on eslint.config.js is overkill.
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    files: [
      '**/*.ts',
    ],
    rules: {
    },
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.node,
      }
    },
  },
);
