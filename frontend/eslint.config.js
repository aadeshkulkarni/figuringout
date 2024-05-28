import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
  {
    languageOptions: { globals: globals.browser },
    rules: {
      'react/react-in-jsx-scope': 0,
      'react/no-unescaped-entities': 0,
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
