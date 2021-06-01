import React from 'react';
import { render, screen } from '@testing-library/react';
import 'jest-styled-components';

import { useActivity } from 'lib/apollo/hooks/state/activity';
import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';
import activitiesMock from '__tests__/mocks/activitiesMock';

import ActivityPage from '.';

jest.mock('components/templates/DefaultTemplate', () => 'div');
jest.mock('lib/apollo/hooks/state/activity');
jest.mock('lib/apollo/hooks/actions/auth', () => ({
  useSignIn: jest.fn(() => []),
  useUpdateUser: jest.fn(() => []),
}));

describe('Activity page', () => {
  test('should render correctly', () => {
    // Arrange
    const mockUseActivity = jest.fn(() => ({
      loading: undefined,
      error: undefined,
      activities: activitiesMock,
    }));
    useActivity.mockImplementation(mockUseActivity);

    // Act
    render(renderWithTheme(renderWithApolloClient(<ActivityPage />)));
    const pageContent = screen.getByTestId('activity-table');

    // Assert
    expect(pageContent).toMatchSnapshot();
  });

  test('should show loader while loading', () => {
    // Arrange
    const mockUseActivity = jest.fn(() => ({
      loading: true,
      error: undefined,
      activities: undefined,
    }));
    useActivity.mockImplementation(mockUseActivity);

    // Act
    render(renderWithTheme(renderWithApolloClient(<ActivityPage />)));
    const loadingContent = screen.getByTestId('activity-loading');

    // Assert
    expect(loadingContent).toMatchSnapshot();
  });

  test('should show error on error', () => {
    // Arrange
    const error = {
      graphQLErrors: [
        {
          message:
            'Variable $events of type [ActivityEvent!] was provided invalid value for 0 (Expected "USER_LOGGED_IN1" to be one of: USER_LOGGED_IN, USER_REGISTERED, USER_RESET_PASSWORD, RESET_PASSWORD_REQUESTED, USER_UPDATED)',
          locations: [{ line: 1, column: 18 }],
        },
      ],
    };
    const mockUseActivityErrorData = jest.fn(() => ({
      loading: false,
      error,
      activities: undefined,
    }));
    useActivity.mockImplementation(mockUseActivityErrorData);

    // Act
    render(renderWithTheme(renderWithApolloClient(<ActivityPage />)));
    const errorContent = screen.getByTestId('activity-error');

    // Assert
    expect(errorContent).toMatchSnapshot();
  });
});
