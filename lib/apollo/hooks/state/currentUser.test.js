import { useQuery } from '@apollo/client';

import { mockCurrentUserData, mockCurrentUser } from '__tests__/mocks/mockCurrentUser';
import mockError from '__tests__/mocks/mockError';

import CurrentUser from 'graphql/queries/currentUser.graphql';

import { useCurrentUser } from './currentUser';

jest.mock('@apollo/client');

describe('useCurrentUser', () => {
  test('should return current user data', () => {
    // Arrange
    const expectedData = {
      user: mockCurrentUser,
      loading: false,
      error: undefined,
    };

    const mockUseQuery = jest.fn(() => ({
      loading: false,
      error: undefined,
      data: mockCurrentUserData,
    }));
    useQuery.mockImplementation(mockUseQuery);

    // Act
    const actualData = useCurrentUser();

    // Assert
    expect(actualData).toEqual(expectedData);
    expect(mockUseQuery).toHaveBeenCalledWith(CurrentUser, {
      fetchPolicy: 'cache-first',
    });
  });

  test('should return error', () => {
    const expectedData = {
      user: undefined,
      loading: false,
      error: mockError,
    };

    const mockUseQuery = jest.fn(() => ({
      loading: false,
      error: mockError,
      data: null,
    }));
    useQuery.mockImplementation(mockUseQuery);

    // Act
    const actualData = useCurrentUser();

    // Assert
    expect(actualData).toEqual(expectedData);
  });
});
