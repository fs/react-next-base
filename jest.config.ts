// jest.config.ts
import type { InitialOptionsTsJest } from 'ts-jest/dist/types';

const config: InitialOptionsTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/__tests__/jest.setup.js', '<rootDir>/__tests__/jest.setEnvVars.js', 'jest-extended'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__tests__/mocks/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__tests__/mocks/styleMock.js',
    '\\.svg': '<rootDir>/__tests__/mocks/svgrMock.js',
  },
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    '\\.(gql|graphql)$': 'jest-transform-graphql',
  },
  moduleDirectories: ['node_modules', '<rootDir>/node_modules', '.'],
  testRegex: '(/__tests__/.*|(\\.|/)(test))\\.[jt]sx?$',
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/__tests__/helpers',
    '<rootDir>/__tests__/mocks',
    '<rootDir>/__tests__/jest.setEnvVars.js',
    '<rootDir>/__tests__/jest.setup.js',
  ],
};
export default config;
