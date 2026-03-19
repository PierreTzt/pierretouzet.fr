import eslintPluginAstro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

export default [
  // TypeScript recommended rules
  ...tseslint.configs.recommended,
  // Astro recommended rules
  ...eslintPluginAstro.configs.recommended,
  {
    rules: {
      // Pragmatic overrides for a solo portfolio project
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
  {
    ignores: [
      'dist/',
      '.astro/',
      'node_modules/',
      'public/sw.js',
      '.vercel/',
    ],
  },
];
