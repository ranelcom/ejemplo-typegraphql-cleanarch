module.exports = {
  preset: 'ts-jest',
  rootDir: '.',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  collectCoverage: true,
};
