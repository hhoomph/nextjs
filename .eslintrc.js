module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
    commonjs: true
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    React: "writable"
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
      modules: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react", "react-hooks"],
  rules: {
    indent: [2, 2],
    "linebreak-style": ["warn", "windows"],
    "no-unused-vars": 0,
    "no-unreachable": 1,
    quotes: ["warn", "double"],
    semi: ["warn", "always"],
    "react/react-in-jsx-scope": "off",
    "react/prop-types": 0,
    "react/prefer-stateless-function": 0,
    "linebreak-style": 0,
    "jsx-a11y/heading-has-content": 0,
    "jsx-a11y/href-no-hash": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "no-underscore-dangle": 0,
    "react/no-find-dom-node": 0,
    "react/display-name": [0, { ignoreTranspilerName: true }]
  }
};