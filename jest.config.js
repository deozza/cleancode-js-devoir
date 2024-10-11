export default {
	transform: {
		'^.+\\.svelte$': 'svelte-jester',
		'^.+\\.ts$': [
			'ts-jest',
			{
				useESM: true
			}
		]
	},
	moduleFileExtensions: ['js', 'ts', 'svelte'],
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
	testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
	moduleNameMapper: {
		'^\\$lib(.*)$': '<rootDir>/src/lib$1',
		'^\\$app(.*)$': [
			'<rootDir>/.svelte-kit/dev/runtime/app$1',
			'<rootDir>/.svelte-kit/build/runtime/app$1'
		]
	},
	extensionsToTreatAsEsm: ['.ts']
};
