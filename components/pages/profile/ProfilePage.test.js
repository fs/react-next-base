import React from 'react';
import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import { render, screen } from '@testing-library/react';
import 'jest-styled-components';
import renderWithTheme from '__tests__/helpers/renderWithTheme';
import { useCurrentUser } from 'lib/apollo/hooks/state/currentUser';

import ProfilePage from '.';

jest.mock('components/shared/templates/DefaultTemplate', () => 'div');
jest.mock('lib/apollo/hooks/state/currentUser');
jest.mock('lib/apollo/hooks/actions/useSignIn', () => jest.fn(() => []));
jest.mock('lib/apollo/hooks/actions/useUpdateUser', () => jest.fn(() => []));
jest.mock('lib/apollo/hooks/actions/usePresignFile', () => jest.fn(() => []));

describe('Profile page', () => {
  test('should render correctly', async () => {
    // Arrange
    const mockUseCurrentUser = jest.fn(() => ({
      loading: undefined,
      error: undefined,
      user: { id: '1', email: 'user@mail.ru', firstName: 'First Name' },
    }));
    useCurrentUser.mockImplementation(mockUseCurrentUser);

    // Act
    render(renderWithTheme(renderWithApolloClient(<ProfilePage />)));
    const pageContent = screen.getByTestId('profile-page');

    // Assert
    expect(pageContent).toMatchSnapshot();
  });

  test('should show loader while loading', async () => {
    // Arrange
    const mockUseCurrentUser = jest.fn(() => ({
      loading: true,
      error: undefined,
      user: undefined,
    }));
    useCurrentUser.mockImplementation(mockUseCurrentUser);

    // Act
    render(renderWithTheme(renderWithApolloClient(<ProfilePage />)));
    const loadingContent = screen.getByTestId('profile-loading');

    // Assert
    expect(loadingContent).toMatchSnapshot();
  });

  test('should show error on error', async () => {
    // Arrange
    const error = {
      graphQLErrors: [
        {
          message: 'Current User not found or accessible',
          locations: [{ line: 11, column: 5 }],
        },
      ],
      networkError: null,
      message: 'GraphQL error: Current User not found or accessible',
    };
    const mockUseCurrentUserErrorData = jest.fn(() => ({
      loading: false,
      error,
      user: undefined,
    }));
    useCurrentUser.mockImplementation(mockUseCurrentUserErrorData);

    // Act
    render(renderWithTheme(renderWithApolloClient(<ProfilePage />)));
    const errorContent = screen.getByTestId('profile-error');

    // Assert
    expect(errorContent).toMatchSnapshot();
  });
});
