import withNuxt from './.nuxt/eslint.config.mjs';
import pluginVue from 'eslint-plugin-vue';
import vueTsConfig from '@vue/eslint-config-typescript';
import prettierConfig from 'eslint-config-prettier';

export default withNuxt(
  {
    ignores: ['.nuxt/**'],
  },
  ...pluginVue.configs['flat/recommended'],
  ...vueTsConfig(),
  prettierConfig,
  {
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  }
);
