import React from 'react';
import { render, screen } from '@testing-library/react';
import 'jest-styled-components';

import renderWithTheme from '__tests__/helpers/renderWithTheme';
import activityPageSizes from 'config/activityPageSizes';

import ActivityDropdown from 'components/atoms/ActivityDropdown';

describe('ActivityDropdown', () => {
  const mockLabel = "ActivityDropdown's label";
  const mockValues = activityPageSizes.map(item => ({ value: item, name: item }));
  const mockTestId = 'test-activity-dropdown';

  test('should render correctly', () => {
    // Arrange

    // Act
    render(renderWithTheme(<ActivityDropdown label={mockLabel} values={mockValues} testId={mockTestId} />));

    const dropdown = screen.getByTestId(mockTestId);

    // Assert
    expect(dropdown).toMatchSnapshot();
  });

  test('should render empty option', () => {
    // Arrange
    const mockEmptyOptionLabel = 'Choose option';
    const expectedValuesCount = activityPageSizes.length + 1;

    // Act
    render(
      renderWithTheme(
        <ActivityDropdown
          label={mockLabel}
          values={mockValues}
          hasEmptyOption
          emptyOptionLabel={mockEmptyOptionLabel}
        />,
      ),
    );

    const emptyOption = screen.getByText(mockEmptyOptionLabel);
    const options = screen.getAllByRole('option');

    // Assert
    expect(emptyOption).toBeDefined();
    expect(options.length).toEqual(expectedValuesCount);
  });
});
