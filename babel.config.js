module.exports = {
  presets: ['next/babel'],
  plugins: ['@babel/plugin-proposal-do-expressions', ['styled-components', { ssr: true }], 'inline-react-svg', '@babel/plugin-transform-flow-strip-types']
};