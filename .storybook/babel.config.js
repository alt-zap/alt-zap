const presets = [
  '@babel/preset-env',
  ['@babel/preset-typescript', { jsxPragma: 'h' }],
  'linaria/babel',
]
const plugins = [['@babel/transform-react-jsx', { pragma: 'h' }]]

module.exports = {
  presets,
  plugins,
}
