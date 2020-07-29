import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { act, cleanup, render } from '@testing-library/react';
import 'jest-styled-components';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import Homepage from 'pages/index';
import CurrentUser from 'graphql/queries/currentUser.graphql';

// hotfix https://github.com/vercel/next.js/issues/15543
jest.mock('next/link', () => 'div');

describe('Homepage', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    cleanup();
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
            me: { id: '1', email: 'user@mail.ru' },
          },
        },
      },
    ];

    let container;

    // Act
    await act(async () => {
      const rendered = render(
        renderWithTheme(
          <MockedProvider mocks={mocks} addTypename={false}>
            <Homepage />
          </MockedProvider>,
        ),
      );

      container = rendered.container;
    });

    // Assert
    expect(container).toMatchSnapshot();
  });
});
