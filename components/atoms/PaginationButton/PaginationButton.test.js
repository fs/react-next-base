import React from 'react';
import { render, screen } from '@testing-library/react';
import 'jest-styled-components';

import renderWithTheme from '__tests__/helpers/renderWithTheme';

import PaginationButton from 'components/atoms/PaginationButton';

describe('PaginationButton', () => {
  const mockContent = "PaginationButton's content";

  test('should render correctly', () => {
    // Arrange

    // Act
    render(renderWithTheme(<PaginationButton>{mockContent}</PaginationButton>));

    const button = screen.getByRole('button');

    // Assert
    expect(button).toMatchSnapshot();
  });

  test('should has transparent background when disabled', () => {
    // Arrange

    // Act
    render(renderWithTheme(<PaginationButton disabled>{mockContent}</PaginationButton>));

    const button = screen.getByRole('button');

    // Assert
    expect(button).toHaveStyleRule('background-color', 'transparent');
  });
});
