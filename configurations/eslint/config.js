const path = require('path');

module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  globals: {
    VERSION: false,
    ENVIRONMENT: false,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: path.resolve(__dirname, '../../', 'tsconfig.test.json'),
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    '@typescript-eslint',
    'prettier',
    'filenames',
    'jest',
    'optimize-regex',
    'no-only-tests',
    'testing-library',
  ],
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:eslint-comments/recommended',
    'plugin:import/errors',
    'plugin:import/typescript',
    'plugin:import/warnings',
    'plugin:jest/recommended',
    'plugin:no-unsanitized/DOM',
    'plugin:optimize-regex/all',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'eslint-config-prettier',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      { allowExpressions: true, allowTypedFunctionExpressions: true },
    ],
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/member-ordering': [
      'error',
      {
        default: [
          'field',
          'private-static-field',
          'public-static-field',
          'constructor',
          'private-instance-method',
          'protected-instance-method',
          'public-instance-method',
        ],
      },
    ],
    '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }],
    '@typescript-eslint/no-floating-promises': ['error', { ignoreVoid: true }],
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-useless-constructor': 'error',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/restrict-template-expressions': [
      'error',
      {
        allowNumber: true,
        allowBoolean: true,
        allowAny: false,
        allowNullish: false,
      },
    ],
    'array-callback-return': 'error',
    'block-scoped-var': 'error',
    camelcase: ['error', { properties: 'always' }],
    'consistent-return': 'off',
    'default-case': 'error',
    'filenames/match-regex': ['error', '^[a-z0-9-]+(.test|.spec|.d)?$', true],
    'filenames/match-exported': ['error', 'kebab', null, false],
    'filenames/no-index': 'off',
    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules
    'import/default': 'error',
    'import/export': 'error',
    'import/exports-last': 'off',
    'import/extensions': ['error', 'never', { json: 'always', scss: 'always', graphql: 'always', mapping: 'always' }],
    'import/first': 'error',
    'import/max-dependencies': ['error', { max: 30 }],
    'import/named': 'error',
    'import/namespace': ['error', { allowComputed: true }],
    'import/newline-after-import': 'error',
    'import/no-absolute-path': 'error',
    'import/no-amd': 'error',
    'import/no-anonymous-default-export': 'off',
    'import/no-commonjs': 'error',
    'import/no-default-export': 'off',
    'import/no-duplicates': 'error',
    'import/no-dynamic-require': 'error',
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: true, optionalDependencies: true, peerDependencies: false },
    ],
    'import/no-internal-modules': 'off',
    'import/no-mutable-exports': 'error',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'error',
    'import/no-named-default': 'error',
    'import/no-namespace': 'off',
    'import/no-nodejs-modules': 'off',
    'import/no-unassigned-import': ['error', { allow: ['**/*.scss'] }],
    'import/no-unresolved': 'off',
    'import/no-useless-path-segments': 'off',
    'import/no-webpack-loader-syntax': 'error',
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external'],
          ['internal', 'parent'],
          ['sibling', 'index'],
        ],
        'newlines-between': 'always',
      },
    ],
    'import/prefer-default-export': 'off',
    'import/unambiguous': 'off',
    'max-depth': ['error', 4],
    'max-len': ['error', { code: 120, tabWidth: 2, comments: 120 }],
    'no-cond-assign': ['error', 'except-parens'],
    'no-continue': 'off',
    'no-duplicate-imports': 'error',
    'no-only-tests/no-only-tests': 'error',
    'no-plusplus': 'error',
    'no-shadow': 'off',
    'no-template-curly-in-string': 'error',
    'no-use-before-define': 'off',
    'no-unused-vars': 'off',
    'no-unsanitized/method': 'error',
    'no-unsanitized/property': 'error',
    'no-void': ['error', { allowAsStatement: true }],
    'prefer-rest-params': 'error',
    'prettier/prettier': ['error'],
    'react/display-name': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'react/jsx-fragments': ['error', 'element'],
    'react/jsx-handler-names': 'off',
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-max-depth': ['error', { max: 6 }],
    'react/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }],
    'react/jsx-no-bind': ['error', { ignoreRefs: true, allowArrowFunctions: true }],
    'react/jsx-no-literals': ['error', { ignoreProps: true }],
    'react/jsx-pascal-case': 'off',
    'react/jsx-props-no-spreading': ['error', { exceptions: ['Component'] }],
    'react/no-multi-comp': 'off',
    'react/prefer-stateless-function': 'error',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'testing-library/consistent-data-testid': [
      'error',
      {
        testIdAttribute: ['data-testid'],
        testIdPattern: '^([a-z-]+)$',
      },
    ],
    'optimize-regex/optimize-regex': 'error',
  },
  overrides: [
    {
      files: ['src/**/**.test.ts', 'src/**/**.test.tsx'],
      rules: {
        'react/jsx-props-no-spreading': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
