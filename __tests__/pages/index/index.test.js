import React from 'react';
import { cleanup, render } from '@testing-library/react';
import 'jest-styled-components';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import Homepage from 'pages/index';

describe('Homepage', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    cleanup();
  });

  test('should render correctly', () => {
    // Arrange

    // Act
    const { container } = render(renderWithTheme(<Homepage />));

    // Assert
    expect(container).toMatchSnapshot();
  });
});
