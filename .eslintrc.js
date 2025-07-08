module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier', // disable ESLint rules that conflict with Prettier
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'unused-imports', 'simple-import-sort'],
  rules: {
    // Auto remove unused imports
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      { vars: 'all', varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
    ],

    // Auto sort imports
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',

    // Optional: React specific
    'react/react-in-jsx-scope': 'off', // not needed with React 17+
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
