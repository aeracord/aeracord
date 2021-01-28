module.exports = {
    preset: "ts-jest",
    collectCoverage: true,
    coverageDirectory: "coverage",
    collectCoverageFrom: [
        "**/src/**/*.{ts,tsx}"
    ],
    coveragePathIgnorePatterns: [
        "node_modules/",
        "src/index.ts",
        "src/(.*).d.ts"
    ],
    testEnvironment: "node"
};