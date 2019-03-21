module.exports = {
  "presets": [
  "@babel/preset-env"
  ],
  "plugins": [
    "@babel/plugin-syntax-dynamic-import",
    [require('@babel/plugin-proposal-decorators'), { decoratorsBeforeExport: false }],
    "@babel/plugin-proposal-class-properties"
  ]
  }
