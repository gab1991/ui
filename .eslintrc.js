module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true,
    },
    project: 'tsconfig.json',
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
    es2022: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  plugins: ['react', '@typescript-eslint', 'simple-import-sort', 'sort-keys-fix', 'typescript-sort-keys'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:sonarjs/recommended',
    'plugin:promise/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  rules: {
    //@ESLINT RULES
    'import/no-default-export': 'error',
    // 'no-restricted-syntax': ['error', 'ExportAllDeclaration'], // block batch export "*"
    'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
    // disable standart rules to enable simple-sort-plugins rules
    'sort-imports': 'off',
    'import/order': 'off',
    //@simple-sort-pligins rules
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^react', '^@?\\w'],
          ['^redux', '^@?\\w'],
          ['vendors', '^\\u0000'],
          ['types', '^types'],
          ['exit', '../'],
          ['deeper', './'],
          ['styles', '.css'],
        ],
      },
    ],
    //@sort-keys-fix
    'sort-keys-fix/sort-keys-fix': 'warn',
    //@typescript-sort-keys
    'typescript-sort-keys/interface': 'warn',
    'typescript-sort-keys/string-enum': 'warn',
    // TYPESCRIPT
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: true,
        },
      },
      {
        selector: 'typeAlias',
        format: ['PascalCase'],
        custom: {
          regex: '^T[A-Z]',
          match: true,
        },
      },
    ],
    '@typescript-eslint/no-magic-numbers': [
      'error',
      {
        ignoreNumericLiteralTypes: true,
        ignoreEnums: true,
        enforceConst: true,
        ignoreReadonlyClassProperties: true,
        ignore: [-1, 0, 1, 2],
      },
    ],
    // SONAR
    'sonarjs/cognitive-complexity': ['warn', 20],
  },
  ignorePatterns: ['.eslintrc.js'],
};
