import React from 'react';
import { cleanup, render } from '@testing-library/react';
import 'jest-styled-components';

import Homepage from '.';

describe('Homepage', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    cleanup();
  });

  test('should render correctly', () => {
    // Arrange

    // Act
    const { container } = render(<Homepage />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
