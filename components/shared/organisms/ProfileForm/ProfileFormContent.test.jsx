import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import ProfileFormContent from './ProfileFormContent';

describe('ProfileFormContent', () => {
  test('should render correctly', async () => {
    // Arrange
    const expectedProfile = {
      email: 'test@test.com',
      firstName: 'Test firstName',
      lastName: 'Test LastName',
    };

    const mockOnSubmit = jest.fn();

    // Act
    const { container } = render(
      renderWithTheme(<ProfileFormContent profile={expectedProfile} onSubmit={mockOnSubmit} />),
    );

    // Assert
    expect(container).toMatchSnapshot();
  });
});
