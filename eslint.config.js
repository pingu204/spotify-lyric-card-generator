import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import unusedImports from 'eslint-plugin-unused-imports' // 1. Import the plugin
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    // 2. Register the plugin
    plugins: {
      'unused-imports': unusedImports,
    },
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      // 3. Turn off the standard unused vars rules entirely
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',

      // 4. Let the plugin handle reporting and fixing
      'unused-imports/no-unused-imports': 'error', // This does the autofix magic!
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
])