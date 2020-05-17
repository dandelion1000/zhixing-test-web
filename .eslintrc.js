module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-var': 2,
    'no-undef': 1,
    'camelcase': 0,
    'eol-last': 0,
    'block-scoped-var': 0,
    'eqeqeq': 2,
    'max-params': [1, 6],
    'max-depth': [1, 6],
    'max-nested-callbacks': [1, 3],
    'comma-spacing': [2, { before: false, after: true }],
    'arrow-spacing': [2],
    'max-len': [2, 300, 4, { ignoreUrls: true, ignoreComments: true }],
    'key-spacing': [2, { beforeColon: false, afterColon: true }],
    'space-before-function-paren': [2, { anonymous: 'always', named: 'never' }],
    'space-in-parens': [0, 'never'],
    'space-before-blocks': 0,
    'keyword-spacing': 0,
    'semi': [2, 'always'],
    'complexity': [2, 20],
    'curly': [2, 'all'],
    'no-unneeded-ternary': 2,
    'quotes': [2, 'single'],
    'no-unused-vars': [2, { 'vars': 'all', 'args': 'after-used', 'ignoreRestSiblings': false }],
    'vue/attribute-hyphenation': [2, 'always'],
    indent: ['error', 4, {SwitchCase: 1}],
    'vue/html-indent': [1, 4],
    'vue/html-quotes': [2, 'double'],
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    'vue/order-in-components': 2
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
