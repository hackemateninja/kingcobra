module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es6: true,
  },
  parserOptions: { 
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  }, // to enable features such as async/await
  ignorePatterns: ['node_modules/*', '.next/*', '.out/*', '!.prettierrc.js'], // We don't want to lint generated files nor node_modules, but we want to lint .prettierrc.js (ignored by default by eslint)
  extends: ['eslint:recommended'],
  overrides: [
    // This configuration will apply only to TypeScript files
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      settings: { 
        'import/resolver': {
          node: {
            extensions: ['.js', '.jsx', '.ts', '.tsx']
          }
        },
        react: { version: 'detect' }
      },
      env: {
        browser: true,
        node: true,
        es6: true,
      },
      extends: [
        // 'airbnb',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended', // TypeScript rules
        'plugin:import/errors',
        'plugin:import/typescript',
        'plugin:import/warnings',
        'plugin:react/recommended', // React rules
        'plugin:react-hooks/recommended', // React hooks rules
        'plugin:jsx-a11y/recommended', // Accessibility rules
        'plugin:prettier/recommended'
      ],
      rules: {
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
        '@typescript-eslint/no-unused-vars': ['warn'], // TODO: Fix this
        // I suggest this setting for requiring return types on functions only where useful
        '@typescript-eslint/explicit-function-return-type': [
          'off',
          {
            allowExpressions: true,
            allowConciseArrowFunctionExpressionsStartingWithVoid: true,
          },
        ],
        'prettier/prettier': ['error', {}, { usePrettierrc: true } ],
        '@typescript-eslint/explicit-module-boundary-types': 'warn',
        'import/no-unresolved': 'warn',
        'react/no-unescaped-entities': 'warn',
        '@typescript-eslint/ban-types': 'warn',
        'no-useless-escape': 'warn',
        'jsx-a11y/no-autofocus': 'warn',
        'jsx-a11y/img-redundant-alt': 'warn',
        'react-hooks/rules-of-hooks': 'warn',
        'jsx-a11y/click-events-have-key-events': 'warn',
        'jsx-a11y/no-static-element-interactions': 'warn'
      },
    },
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  plugins: ['@typescript-eslint'],
  /*
,
          alias: {
            map: [
              ['@/comp/*', 'src/components/*'],
              ['@/util/*', 'src/utilities/*'],
              ['@/def/*', 'src/definitions/*'],
              ['@/redux/*', 'src/redux/*'],
              ['@/theme/*', 'src/themes/*'],
              ['@/layout/*', 'src/layouts/*'],
              ['@/data/*', 'src/data/*'],
              ['@/src/*', 'src/*']
            ],
            extensions: ['.ts', '.js', '.jsx', '.tsx', '.json']
          }

  */
  // rules: {
  //   'prettier/prettier': [
  //     'error',
  //     {
  //       endOfLine: 'auto'
  //     }
  //   ],
  //   'linebreak-style': ['error', 'windows'],
  //   'react/jsx-filename-extension': [2, { extensions: ['.jsx', '.tsx'] }],
  //   'import/extensions': [
  //     'error',
  //     'ignorePackages',
  //     {
  //       js: 'never',
  //       jsx: 'never',
  //       ts: 'never',
  //       tsx: 'never'
  //     }
  //   ]
  // }
}
