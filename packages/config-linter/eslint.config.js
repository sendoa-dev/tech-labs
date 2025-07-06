import vue from 'eslint-plugin-vue'
import vueA11y from 'eslint-plugin-vuejs-accessibility'
import vitest from 'eslint-plugin-vitest-globals'
import playwright from 'eslint-plugin-playwright'
import importPlugin from 'eslint-plugin-import'
import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import vueParser from 'vue-eslint-parser'

export default [
  {
    ignores: ['node_modules/', '**/dist/', '**/ios/', '**/android/', '**/*.d.ts'],
  },
  {
    files: ['**/*.{js,ts,vue}'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        ...vitest.environments.env.globals,
      },
    },
    plugins: {
      vue,
      'vuejs-accessibility': vueA11y,
      'vitest-globals': vitest,
      import: importPlugin,
    },
    settings: {
      'import/resolver': {
        alias: {
          map: [['@', './src']],
          extensions: ['.js', '.ts', '.vue'],
        },
        node: {
          extensions: ['.js', '.ts', '.vue'],
        },
      },
    },
    rules: {
      ...vue.configs['flat/strongly-recommended'].rules,
      ...vueA11y.configs.recommended.rules,
      ...vitest.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,

      'space-before-function-paren': ['error', 'always'],
      'no-undef': 'error',
      'comma-dangle': ['error', 'always-multiline'],
      'semi': ['error', 'never'],
      'quotes': ['error', 'single'],
      'import/order': [
        'error',
        {
          alphabetize: { order: 'asc', caseInsensitive: true },
          'newlines-between': 'always',
          groups: [
            'builtin',
            'external',
            'index',
            'parent',
            'sibling',
            'internal',
          ],
        },
      ],
      'vuejs-accessibility/label-has-for': ['error', { allowChildren: true }],
      'vuejs-accessibility/form-control-has-label': [
        'error',
        { labelComponents: ['CoreInputTemplate'] },
      ],
    },
  },
  {
    files: ['**/*.e2e.{js,ts}'],
    plugins: {
      playwright,
    },
    rules: {
      ...playwright.configs.recommended.rules,
    },
  },
]
