/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': "ts-jest",
  },
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleNameMapper: {
    
    // '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
    // "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
    // "<rootDir>/tests/unit/__mocks__/fileMock.js",
    // '^.+\\.(svg)$': '<rootDir>/__mocks__/svg.js',
    '^@images/(.*)$': '<rootDir>/assets/images/$1',
    '^@icons/(.*)$': '<rootDir>/assets/icons/$1',
    '^@component-library/(.*)$': '<rootDir>/component-library/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};