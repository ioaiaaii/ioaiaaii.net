import js from '@eslint/js'
import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'
import pluginVitest from '@vitest/eslint-plugin'
import pluginCypress from 'eslint-plugin-cypress'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],

  {
    rules: {
      // Left ON deliberately. It is a Priority A rule in Vue's style guide — single
      // word names risk colliding with current or future HTML elements — and it was
      // switched off to accommodate Info/Works/Live/NotFound, which are now
      // InfoView/WorksView/LiveView/NotFoundView under src/views/. App is exempt by
      // the rule itself.
      'vue/multi-word-component-names': 'error',
    },
  },

  {
    ...pluginVitest.configs.recommended,
    // Tests sit next to their subject as src/lib/*.test.js — they are not in a
    // __tests__/ directory, which the old glob assumed, so these rules matched
    // nothing at all.
    files: ['src/**/*.test.js'],
  },

  {
    ...pluginCypress.configs.recommended,
    files: [
      'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}',
      'cypress/support/**/*.{js,ts,jsx,tsx}'
    ],
  },
  skipFormatting,
]
