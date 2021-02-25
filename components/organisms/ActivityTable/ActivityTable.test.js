import React from 'react';
import { render, screen } from '@testing-library/react';
import 'jest-styled-components';

import renderWithTheme from '__tests__/helpers/renderWithTheme';
import activitiesMock from '__tests__/mocks/activitiesMock';
import ActivityTable from 'components/organisms/ActivityTable';

describe('ActivityTable', () => {
  test('should render correctly', () => {
    // Arrange
    const mockData = activitiesMock;
    const mockTestId = 'activity-table';

    // Act
    render(renderWithTheme(<ActivityTable data={mockData} />));

    const table = screen.getByTestId(mockTestId);

    // Assert
    expect(table).toMatchSnapshot();
  });

  test('should render correctly if no data', () => {
    // Arrange
    const mockData = [];
    const mockTestId = 'activity-table-empty';

    // Act
    render(renderWithTheme(<ActivityTable data={mockData} />));

    const emptyText = screen.getByTestId(mockTestId);

    // Assert
    expect(emptyText).toBeInTheDocument();
  });
});
