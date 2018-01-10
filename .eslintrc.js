module.exports = {
  "extends": [
    "standard",
    "plugin:react/recommended"
  ],
  "parser": "babel-eslint",
  "parserOptions": { "ecmaVersion": 6 },
  "env": {
    "es6": true,
    "browser": true,
    "node": true,
    "jquery": true,
    "shared-node-browser": true
  },
  "globals": {
    "jQuery": true,
    "$": true,
    "LN": true,
    "moment": true,
    "assets": true,
    "path": true,
    "swal": true,
    "dataLayer": true
  },
  "rules": {
    "allowShortCircuit": true,
    "allowTernary": true,
    "react/no-find-dom-node": false,
    "react/prop-types": 0
  }
}
