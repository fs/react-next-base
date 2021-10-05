import { renderHook, act } from '@testing-library/react-hooks';
import { MockedProvider } from '@apollo/client/testing';

import UpdateUser from 'graphql/mutations/updateUser.graphql';

import { mockCurrentUserData } from '__tests__/mocks/mockCurrentUser';
import useNotifier from 'hooks/useNotifier';

import useUpdateUser from './useUpdateUser';

jest.mock('hooks/useNotifier');

describe('useUpdateUser', () => {
  useNotifier.mockImplementation(jest.fn(() => ({ setError: jest.fn(), setSuccess: jest.fn() })));

  test('should mutate state', async () => {
    // Arrange
    const data = {
      avatarUrl: 'url',
      email: 'test@email.test',
      firstName: 'FirstName',
      lastName: 'LastName',
      password: 'password',
      currentPassword: 'currentPassword',
    };
    const mocks = [
      {
        request: {
          query: UpdateUser,
          variables: { input: data },
        },
        result: {
          data: { updateUser: mockCurrentUserData },
        },
      },
    ];

    // Act
    const { result, waitForNextUpdate } = renderHook(() => useUpdateUser(), {
      wrapper: MockedProvider,
      initialProps: {
        mocks,
      },
    });
    act(() => {
      result.current[0](data);
    });
    await waitForNextUpdate();

    // Assert
    expect(result.current[1].data.updateUser).toEqual(mockCurrentUserData);
  });
});
