import { renderHook, act } from '@testing-library/react-hooks';
import { MockedProvider } from '@apollo/client/testing';

import SignUp from 'graphql/mutations/signUp.graphql';

import { mockCurrentUser } from '__tests__/mocks/mockCurrentUser';
import useNotifier from 'hooks/useNotifier';

import useSignUp from './useSignUp';

jest.mock('hooks/useNotifier');

describe('useSignUp', () => {
  useNotifier.mockImplementation(jest.fn(() => ({ setError: jest.fn(), setSuccess: jest.fn() })));

  test('should mutate state & call localStorage.setItem', async () => {
    // Arrange
    const data = {
      avatarUrl: null,
      email: 'test',
      password: null,
      firstName: 'test',
      lastName: 'test',
    };

    const mockResponse = { me: { ...mockCurrentUser }, AuthTokens: null };
    const mocks = [
      {
        request: {
          query: SignUp,
          variables: {
            input: data,
          },
        },
        result: {
          data: { signup: mockResponse },
        },
      },
    ];

    // Act
    const { result, waitForNextUpdate } = renderHook(() => useSignUp(), {
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
    expect(result.current[1].data.signup).toEqual(mockResponse);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
});
