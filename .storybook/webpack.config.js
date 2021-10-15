const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin')

module.exports = ({ config }) => {
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: 'styles-linaria.css',
    })
  )

  config.module.rules.push({
    test: /\styles.css$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          hmr: process.env.NODE_ENV !== 'production',
        },
      },
      {
        loader: 'css-loader',
        options: {
          sourceMap: process.env.NODE_ENV !== 'production',
        },
      },
    ],
  })

  // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
  config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/]
  // use installed babel-loader which is v8.0-beta (which is meant to work with @babel/core@7)
  config.module.rules[0].use[0].loader = require.resolve('babel-loader')
  // use @babel/preset-react for JSX and env (instead of staged presets)
  config.module.rules[0].use[0].options.presets = [
    require.resolve('@babel/preset-react'),
    require.resolve('@babel/preset-env'),
    require.resolve('linaria/babel'),
  ]
  config.module.rules[0].use[0].options.plugins = [
    // use @babel/plugin-proposal-class-properties for class arrow functions
    require.resolve('@babel/plugin-proposal-class-properties'),
    // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
    require.resolve('babel-plugin-remove-graphql-queries'),
  ]

  // Prefer Gatsby ES6 entrypoint (module) over commonjs (main) entrypoint
  config.resolve.mainFields = ['browser', 'module', 'main']
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          presets: [['react-app', { flow: false, typescript: true }]],
          plugins: [
            require.resolve('@babel/plugin-proposal-class-properties'),
            // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
            require.resolve('babel-plugin-remove-graphql-queries'),
          ],
        },
      },
      {
        loader: 'linaria/loader',
        options: {
          sourceMap: true,
          babelOptions: { presets: ['@babel/preset-typescript'] },
        },
      },
    ],
  })
  config.module.rules.push({
    test: /gatsby\/cache-dir.*\.js$/,
    loader: require.resolve('babel-loader'),
  })

  config.resolve.extensions.push('.ts', '.tsx')

  config.resolve.plugins = [
    ...(config.resolve.plugins || []),
    new TsconfigPathsPlugin(),
  ];
  return config
}
