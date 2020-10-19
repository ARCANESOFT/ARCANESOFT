module.exports = {
    preset: 'ts-jest',
    clearMocks: true,
    testEnvironment: 'node',
    testMatch: [
        "**/tests/**/?(*.)+(spec|test).[jt]s?(x)"
    ],
};
