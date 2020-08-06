import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { act, render, cleanup, wait, waitForElement } from '@testing-library/react';
import 'jest-styled-components';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import Profile from 'pages/profile';
import CurrentUser from 'graphql/queries/currentUser.graphql';

describe('Homepage', () => {
  let container;

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    cleanup();
  });

  test('should show loader while loading', async () => {
    // Arrange
    const mocks = [
      {
        request: {
          query: CurrentUser,
        },
        result: {
          loading: true,
        },
      },
    ];

    const { getByTestId } = render(
      renderWithTheme(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Profile />
        </MockedProvider>,
      ),
    );

    // Act
    await act(async () => {
      container = getByTestId('test-profile-loading');
    });

    // Assert
    expect(container).toMatchSnapshot();
  });

  test('should render correctly', async () => {
    // Arrange
    const mocks = [
      {
        request: {
          query: CurrentUser,
        },
        result: {
          data: {
            me: {},
          },
        },
      },
    ];

    // Act

    const { getByTestId } = render(
      renderWithTheme(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Profile />
        </MockedProvider>,
      ),
    );
    await act(wait);
    container = getByTestId('test-profile-page');

    // Assert
    expect(container).toMatchSnapshot();
  });
});
