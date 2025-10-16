module.exports = {
    testEnvironment: 'node',
    preset: 'ts-jest',
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
    collectCoverageFrom: ['src/**/*.ts', '!src/**/*.test.ts'],
    coverageReporters: ['json', 'lcov', 'text', 'text-summary']
};
