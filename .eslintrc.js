module.exports = {
  extends: 'axway/env-alloy',
  globals: {
    $model: true
  },
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    indent: [
      'error',
      2
    ],
    quotes: [
      'error',
      'single'
    ],
    semi: [
      'error',
      'never'
    ],
    'max-statements-per-line': [
      'error',
      { max: 2 }
    ],
    curly: [
      'error',
      'multi'
    ],
    'space-before-function-paren': [
      'error',
      'never'
    ],
    'security/detect-non-literal-require': 'off'
  }
}
