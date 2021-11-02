module.exports = {
  preset: 'react-native',
  bail: 1,
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  collectCoverage: true,
  notify: true,
  coverageReporters: ['lcov', 'text', 'json', 'text-summary'],
  forceCoverageMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  coverageDirectory: '<rootDir>/coverage',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleNameMapper: {
    '^~/(.*)': '<rootDir>/src/$1',
  },
  moduleDirectories: ['node_modules', 'src'],
  collectCoverageFrom: ['src/hooks/**/*.{js,jsx,ts,tsx}', 'src/components/**/*.{js,jsx,ts,tsx}'],
  testMatch: ['<rootDir>/src/**/*.test.(ts|tsx)'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|react-navigation|@react-native-community)|@react-navigation/(.*)|react-native-safe-area-view/|@react-native-firebase/(.*))',
  ],
};
