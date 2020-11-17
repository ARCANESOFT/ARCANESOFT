import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    verbose: true,
    preset: 'ts-jest',
    clearMocks: true,
    testEnvironment: 'node',
    collectCoverageFrom: [
        "<rootDir>/src/**/*.ts",
    ],
    moduleFileExtensions: [
        'ts', 'js',
    ],
}

export default config
