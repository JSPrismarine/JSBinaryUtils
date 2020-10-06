let ignore = [
    '<rootDir>/node_modules/'
];

module.exports = {
    testEnvironment: 'node',
    moduleFileExtensions: [
        'ts',
        'js'
    ],
    reporters: [
        'default'
    ],
    testLocationInResults: true,
    testMatch: [
        '**/*.(test|spec).(ts|js)'
    ],
    modulePathIgnorePatterns: ignore,
    coverageReporters: [
        'json',
        'lcov',
        'text',
        'text-summary'
    ]
};
