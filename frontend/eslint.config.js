import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // dist = build output; src/lib = vendored 3D engine + web component (kept verbatim)
  globalIgnores(['dist', 'src/lib/**']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      // The automatic JSX runtime makes the `React` import unused-but-harmless
      // in the verbatim design components; ignore that and underscore-prefixed args.
      'no-unused-vars': ['error', { varsIgnorePattern: '^React$', argsIgnorePattern: '^_' }],
    },
  },
  // Node-context config files (vite.config.js, etc.)
  {
    files: ['*.config.{js,cjs,mjs}', 'vite.config.{js,ts}'],
    languageOptions: { globals: globals.node },
  },
])
