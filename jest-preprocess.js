const babelOptions = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
}

module.exports = require('babel-jest').createTransformer(babelOptions)
