// Flat ESLint config — added in S15 (Wave C1, infra parity with the database +
// Node-js guides). Makes the long-standing "ESLint clean" convention (§10) real
// and enforceable; wired into `verify` + the deploy CI. Build fails on errors.
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    // dist/dist-* = builds; scripts/_* + scripts/ssr + _ci = gitignored scratch
    // (sandbox verify artifacts); *.mjs = hand-run captures, not linted.
    ignores: [
      'dist',
      'dist-*',
      'node_modules',
      'scripts/ssr',
      'scripts/_*',
      'scripts/**/*.mjs',
      '_ci',
    ],
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // Classic two hooks rules only (matches the database + Node-js guides). Do NOT
      // spread react-hooks' v7 'recommended' — its `set-state-in-effect` flags the
      // legitimate sim play/pause loops. Revisit in a later wave.
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },
  {
    // Node-run scripts (genMeta · checkMeta · check-data · vite/eslint config) use Node globals.
    files: ['scripts/**/*.ts', 'vite.config.ts', 'eslint.config.js'],
    languageOptions: { globals: { ...globals.node } },
  },
);
