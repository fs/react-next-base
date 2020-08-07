import React from 'react';
import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import { act, cleanup, render } from '@testing-library/react';
import 'jest-styled-components';
import renderWithTheme from '__tests__/helpers/renderWithTheme';
import useCurrentUser from 'lib/apollo/hooks/state/useCurrentUser';

import Homepage from 'pages/index';

jest.mock('lib/apollo/hooks/state/useCurrentUser');

describe('Homepage', () => {
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
      user: { id: '1', email: 'user@mail.ru' },
    }));
    useCurrentUser.mockImplementation(mockUseCurrentUserData);
    // Act
    const { container } = render(renderWithTheme(renderWithApolloClient(<Homepage />)));

    // Assert
    await act(async () => {
      expect(container).toMatchSnapshot();
    });
  });
});
