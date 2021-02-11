import React from 'react';
import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import { render, screen } from '@testing-library/react';
import 'jest-styled-components';
import renderWithTheme from '__tests__/helpers/renderWithTheme';
import { useCurrentUser } from 'lib/apollo/hooks/state';

import Homepage from 'pages/index';

jest.mock('lib/apollo/hooks/state.js');

describe('Homepage', () => {
  test('should render correctly', async () => {
    // Arrange
    const mockUseCurrentUser = jest.fn(() => ({
      loading: undefined,
      error: undefined,
      user: { id: '1', email: 'user@mail.ru' },
    }));
    useCurrentUser.mockImplementation(mockUseCurrentUser);

    // Act
    render(renderWithTheme(renderWithApolloClient(<Homepage />)));
    const container = await screen.getByTestId('page-content');

    // Assert
    expect(container).toMatchSnapshot();
  });
});
