import React from 'react';
import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import { render, cleanup, wait } from '@testing-library/react';
import 'jest-styled-components';
import renderWithTheme from '__tests__/helpers/renderWithTheme';
import useCurrentUser from 'lib/apollo/hooks/state/useCurrentUser';

import Profile from 'pages/profile';

jest.mock('components/templates/DefaultTemplate', () => 'div');
jest.mock('lib/apollo/hooks/state/useCurrentUser');
jest.mock('lib/apollo/hooks/actions/actions', () => ({
  useSignIn: jest.fn(() => []),
  useUpdateUser: jest.fn(() => []),
}));

describe('Profile page', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    cleanup();
  });

  test('should render correctly', async () => {
    // Arrange
    const mockUseCurrentUserData = jest.fn(() => ({
      loading: undefined,
      error: undefined,
      user: { id: '1', email: 'user@mail.ru', firstName: 'First Name' },
    }));
    useCurrentUser.mockImplementation(mockUseCurrentUserData);

    // Act
    const { getByTestId } = render(renderWithTheme(renderWithApolloClient(<Profile />)));

    // Assert
    await wait(() => {
      expect(getByTestId('test-profile-page')).toMatchSnapshot();
    });
  });

  test('should show loader while loading', async () => {
    // Arrange
    const mockUseCurrentUserData = jest.fn(() => ({
      loading: true,
      error: undefined,
      user: undefined,
    }));
    useCurrentUser.mockImplementation(mockUseCurrentUserData);

    // Act
    const { getByTestId } = render(renderWithTheme(renderWithApolloClient(<Profile />)));

    // Assert
    await wait(() => {
      expect(getByTestId('test-profile-loading')).toMatchSnapshot();
    });
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
    const { getByTestId } = render(renderWithTheme(renderWithApolloClient(<Profile />)));

    // Assert
    await wait(() => {
      expect(getByTestId('test-profile-error')).toMatchSnapshot();
    });
  });
});
