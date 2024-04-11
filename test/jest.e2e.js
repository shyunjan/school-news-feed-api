const baseConfig = require('./jest.config');

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  ...baseConfig,
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleDirectories: ['node_modules', '<rootDir>'],
  // preset: 'ts-jest',
  testMatch: ['<rootDir>/test/**/*.e2e-spec.ts'],
  // transformIgnorePatterns: ['node_modules/(?!axios)'],
  verbose: true,
  silent: false,
};
