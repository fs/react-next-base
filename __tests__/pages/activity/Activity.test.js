import React from 'react';
import { render, screen } from '@testing-library/react';
import 'jest-styled-components';

import { useActivity } from 'lib/apollo/hooks/activity';
import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';
import activitiesMock from '__tests__/mocks/activitiesMock';

import Activity from 'pages/activity';

jest.mock('components/templates/DefaultTemplate', () => 'div');
jest.mock('lib/apollo/hooks/activity.js');
jest.mock('lib/apollo/hooks/actions.js', () => ({
  useSignIn: jest.fn(() => []),
  useUpdateUser: jest.fn(() => []),
}));

describe('Activity page', () => {
  test('should render correctly', async () => {
    // Arrange
    const mockUseActivity = jest.fn(() => ({
      loading: undefined,
      error: undefined,
      activities: activitiesMock,
    }));
    useActivity.mockImplementation(mockUseActivity);

    // Act
    render(renderWithTheme(renderWithApolloClient(<Activity />)));
    const pageContent = await screen.getByTestId('test-activity-table');

    // Assert
    expect(pageContent).toMatchSnapshot();
  });

  test('should show loader while loading', async () => {
    // Arrange
    const mockUseActivity = jest.fn(() => ({
      loading: true,
      error: undefined,
      activities: undefined,
    }));
    useActivity.mockImplementation(mockUseActivity);

    // Act
    render(renderWithTheme(renderWithApolloClient(<Activity />)));
    const loadingContent = await screen.getByTestId('test-activity-loading');

    // Assert
    expect(loadingContent).toMatchSnapshot();
  });

  test('should show error on error', async () => {
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
    render(renderWithTheme(renderWithApolloClient(<Activity />)));
    const errorContent = await screen.getByTestId('test-activity-error');

    // Assert
    expect(errorContent).toMatchSnapshot();
  });
});
