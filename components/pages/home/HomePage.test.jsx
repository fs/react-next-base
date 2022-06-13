import { render } from '@testing-library/react';
import 'jest-styled-components';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import { useCurrentUser } from 'lib/apollo/hooks/state/currentUser';

import Homepage from 'pages/index';

jest.mock('lib/apollo/hooks/state/currentUser');

describe('HomePage', () => {
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

    // Assert
    expect(mockUseCurrentUser).toHaveBeenCalled();
  });
});
