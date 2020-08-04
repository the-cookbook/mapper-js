module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          debug: process.env.NODE_ENV === 'development',
        },
      ],
      '@babel/preset-typescript',
      '@babel/preset-react',
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
        },
      ],
      '@babel/plugin-transform-react-jsx',
      ['@babel/plugin-proposal-class-properties', { loose: false }],
      '@babel/plugin-proposal-export-default-from',
    ],
    env: {
      test: {
        plugins: ['dynamic-import-node'],
      },
      production: {
        comments: false,
        plugins: [
          [
            'transform-remove-console',
            {
              exclude: ['error', 'warn'],
            },
          ],
          [
            'transform-react-remove-prop-types',
            {
              mode: 'remove',
              removeImport: true,
              additionalLibraries: [/\/prop-types$/u],
            },
          ],
        ],
      },
    },
  };
};
