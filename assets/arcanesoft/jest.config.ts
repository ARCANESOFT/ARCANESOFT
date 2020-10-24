import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    verbose: true,
    preset: 'ts-jest',
    clearMocks: true,
    testEnvironment: 'node',
    collectCoverageFrom: [
        "<rootDir>/src/**/*.{ts,tsx}",
    ],
    testMatch: [
        "**/tests/**/?(*.)+(spec|test).[jt]s?(x)",
    ],
    moduleFileExtensions: [
        'ts', 'tsx', 'js',
    ],
}

export default config;
