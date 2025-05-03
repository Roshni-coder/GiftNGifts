module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:import/errors',
      'plugin:import/warnings'
    ],
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: [
      'react',
      'import'
    ],
    rules: {
      'import/no-unresolved': 'error',
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/no-duplicates': 'warn',
      'import/no-deprecated': 'warn',
      'import/no-mutable-exports': 'warn',
      'import/no-cycle': 'warn',
      'import/no-useless-path-segments': 'warn',
      'import/no-internal-modules': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  }
  