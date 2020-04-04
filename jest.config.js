module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  moduleFileExtensions: [
    'js',
    'json',
    'vue',
  ],
  transformIgnorePatterns: [
    '/node_modules/',
  ],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': 'vue-jest',
  },
};
