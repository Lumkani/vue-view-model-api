module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
        "jest/globals": true
    },
    "plugins": ["jest"],
    "extends": [
        "airbnb-base"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module",
         ecmaFeatures: {
            jsx: true
         }
    },
    "rules": {
        'semi': 'off',
        'import/prefer-default-export': 'off',
        'no-param-reassign': ["error", { "props": true, "ignorePropertyModificationsFor": ["vm", "ctx"] }],
        'no-restricted-syntax': 'off',
        'no-underscore-dangle': ["error", { "allow": ["_uid"] }]
    },
    "overrides": [
        {
            "files": [
                "*.spec.js"
            ],
            rules: {
              "no-shadow": "off"
            }
        }
    ]
};