import { renderHook, act } from '@testing-library/react-hooks';
import { MockedProvider } from '@apollo/client/testing';

import SignIn from 'graphql/mutations/signIn.graphql';

import { mockCurrentUser, mockCurrentUserData } from '__tests__/mocks/mockCurrentUser';

import { useNotifier } from 'contexts/NotifierContext';

import useSignIn from './useSignIn';

jest.mock('contexts/NotifierContext');

describe('useSignIn', () => {
  useNotifier.mockImplementation(jest.fn(() => ({ setError: jest.fn(), setSuccess: jest.fn() })));

  test('should mutate state & call localStorage.setItem', async () => {
    // Arrange
    const data = { email: 'test', password: null };

    const mocks = [
      {
        request: {
          query: SignIn,
          variables: {
            input: data,
          },
        },
        result: {
          data: { signin: { me: { ...mockCurrentUser } } },
        },
      },
    ];

    // Act
    const { result, waitForNextUpdate } = renderHook(() => useSignIn(), {
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
    expect(result.current[1].data.signin).toEqual(mockCurrentUserData);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
});
