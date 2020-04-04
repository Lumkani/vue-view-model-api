module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "airbnb-base"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        'semi': 'off',
        'import/prefer-default-export': 'off',
        'no-param-reassign': ["error", { "props": true, "ignorePropertyModificationsFor": ["vm"] }],
        'no-restricted-syntax': 'off'
    }
};