module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['airbnb-base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  rules: {
    strict: 0,
    'import/prefer-default-export': 0,
    'implicit-arrow-linebreak': 0,
    'no-extra-parens': 0,
    'no-nested-ternary': 0,
    'no-confusing-arrow': 0
  },
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
};
