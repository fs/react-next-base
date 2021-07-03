import React from 'react';
import { render, screen } from '@testing-library/react';
import 'jest-styled-components';

import renderWithTheme from '__tests__/helpers/renderWithTheme';
import pageInfoMock from '__tests__/mocks/pageInfoMock';
import ActivityPagination from 'components/pages/activity/components/ActivityPagination';

describe('ActivityPagination', () => {
  const mockTestId = 'activity-pagination';
  const mockPageNumber = 1;
  const mockSetPageNumber = jest.fn();

  test('should render correctly', () => {
    // Arrange

    // Act
    render(
      renderWithTheme(
        <ActivityPagination pageInfo={pageInfoMock} pageNumber={mockPageNumber} setPageNumber={mockSetPageNumber} />,
      ),
    );

    const pagination = screen.getByTestId(mockTestId);

    // Assert
    expect(pagination).toMatchSnapshot();
  });

  test('should disable buttons if no other pages except current', () => {
    // Arrange
    const mockPageInfo = { ...pageInfoMock, hasNextPage: false };

    // Act
    render(
      renderWithTheme(
        <ActivityPagination pageInfo={mockPageInfo} pageNumber={mockPageNumber} setPageNumber={mockSetPageNumber} />,
      ),
    );

    const buttons = screen.getAllByRole('button');

    // Assert
    buttons.forEach(btn => {
      expect(btn).toBeDisabled();
    });
  });
});
