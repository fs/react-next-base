import { renderHook } from '@testing-library/react-hooks';
import { MockedProvider } from '@apollo/client/testing';

import CurrentUser from 'graphql/queries/currentUser.graphql';

import { useCurrentUser } from './currentUser';

describe('useCurrentUser', () => {
  test('should return current user data', async () => {
    // Arrange
    const expectedDataProfileMock = {
      __typename: 'CurrentUser',
      avatarUrl: 'url',
      id: 1,
      email: 'email',
      firstName: 'Name',
      lastName: 'Name',
    };

    const mocks = [
      {
        request: {
          query: CurrentUser,
        },
        result: {
          data: { me: expectedDataProfileMock },
        },
      },
    ];

    // Act
    const { result, waitForNextUpdate } = renderHook(() => useCurrentUser(), {
      wrapper: MockedProvider,
      initialProps: {
        mocks,
      },
    });

    await waitForNextUpdate();

    // Assert
    expect(result.current.user).toEqual(expectedDataProfileMock);
  });

  test('should return error', async () => {
    // Arrange
    const error = new Error();
    const mocks = [
      {
        request: {
          query: CurrentUser,
        },
        error,
      },
    ];

    // Act
    const { result, waitForNextUpdate } = renderHook(() => useCurrentUser(), {
      wrapper: MockedProvider,
      initialProps: {
        mocks,
      },
    });

    await waitForNextUpdate();

    // Assert
    expect(result.current.error).toBeDefined();
  });
});
