// eslint.config.js
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactNative from 'eslint-plugin-react-native';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginTs from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: [
      'node_modules',
      'android',
      'ios',
      'build',
      'dist',
      '*.config.js',
      '**/*.json',
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    plugins: {
      react: eslintPluginReact,
      'react-native': eslintPluginReactNative,
      import: eslintPluginImport,
      '@typescript-eslint': eslintPluginTs,
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': ['error'],
      'react-native/no-inline-styles': 'off',
      'react-native/sort-styles': 'off',
      'react-native/no-color-literals': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
