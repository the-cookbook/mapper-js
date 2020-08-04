module.exports = {
  verbose: true,
  roots: ['<rootDir>/src'],
  transform: {
    '.*': 'babel-jest',
  },
  testPathIgnorePatterns: ['/node_modules/'],
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'md'],
  moduleNameMapper: {
    '^.+\\.(jpg|jpeg|png|gif||otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      './configurations/jest/__mocks__/file.js',
    '^configurations(.*)$': '<rootDir>/configurations$1',
  },
  collectCoverageFrom: [
    'src/**/*.{tsx,ts,js,jsx}',
    '!src/**/__test__/**/*.{tsx,ts,js,jsx}',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!configurations/**',
  ],
  coverageReporters: ['json', 'lcov', 'text-summary', 'html'],
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.test.json',
    },
  },
};
