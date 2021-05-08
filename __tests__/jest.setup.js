import '@testing-library/jest-dom';

// fix https://github.com/testing-library/dom-testing-library/releases/tag/v7.0.0
import MutationObserver from '@sheerun/mutationobserver-shim';

window.MutationObserver = MutationObserver;

jest.setTimeout(30000);

// hotfix https://github.com/vercel/next.js/issues/15543
jest.mock('next/link', () => 'div');
global.URL.createObjectURL = jest.fn();
