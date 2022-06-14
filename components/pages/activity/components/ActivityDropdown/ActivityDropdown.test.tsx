import { render, screen } from '@testing-library/react';
import 'jest-styled-components';

import renderWithTheme from '__tests__/helpers/renderWithTheme';
import activityPageSizes from 'config/activityPageSizes';

import ActivityDropdown from '.';

describe('ActivityDropdown', () => {
  const mockLabel = "ActivityDropdown's label";
  const mockValues = activityPageSizes.map((item) => ({ value: item, name: item }));
  const mockOnChange = jest.fn;

  test('should render correctly', () => {
    // Arrange

    // Act
    const { container } = render(
      renderWithTheme(<ActivityDropdown label={mockLabel} values={mockValues} onChange={mockOnChange} />),
    );

    // Assert
    expect(container).toMatchSnapshot();
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
          onChange={mockOnChange}
        />,
      ),
    );

    const emptyOption = screen.getByText(mockEmptyOptionLabel);
    const options = screen.getAllByRole('option');

    // Assert
    expect(emptyOption).toBeInTheDocument();
    expect(options.length).toEqual(expectedValuesCount);
  });
});
