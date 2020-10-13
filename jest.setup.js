jest.setTimeout(30000);

// hotfix https://github.com/vercel/next.js/issues/15543
jest.mock('next/link', () => 'div');
global.URL.createObjectURL = jest.fn();
