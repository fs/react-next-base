import React from 'react';
import { render, screen } from '@testing-library/react';
import 'jest-styled-components';

import renderWithTheme from '__tests__/helpers/renderWithTheme';

import ActivityPagination from 'components/molecules/ActivityPagination';

describe('ActivityPagination', () => {
  test('should render correctly', () => {
    // Arrange
    const mockTestId = 'test-activity-pagination';
    const mockPageInfo = 1;

    // Act
    render(
      renderWithTheme(
        <ActivityPagination
          pageInfo={mockPageInfo}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          testId={mockTestId}
        />,
      ),
    );

    // Assert
  });
});
