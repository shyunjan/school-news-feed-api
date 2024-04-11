module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '..',
  testEnvironment: 'node',
  // testMatch: ['<rootDir>/test/**/*spec.ts'],
  transform: {
    '^.+\\.(t|j)s$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.json',
        ignoreCodes: ['TS151001'],
      },
    ],
  },
  // collectCoverage: true,
};
