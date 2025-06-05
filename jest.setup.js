// Learn more: https://github.com/testing-library/jest-dom
require("@testing-library/jest-dom");

// Mock fetch globally
global.fetch = jest.fn();

// Reset all mocks after each test
afterEach(() => {
  jest.resetAllMocks();
});

// Mock next/navigation
jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            push: jest.fn(),
            prefetch: jest.fn(),
            route: '/'
        };
    }
}));

// Increase timeout for async operations
jest.setTimeout(10000);
