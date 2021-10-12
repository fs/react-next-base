import { renderHook, act } from '@testing-library/react-hooks';
import { MockedProvider } from '@apollo/client/testing';

import SignOut from 'graphql/mutations/signOut.graphql';

import useNotifier from 'hooks/useNotifier';

import useSignOut from './useSignOut';

jest.mock('hooks/useNotifier');

describe('useSignOut', () => {
  useNotifier.mockImplementation(jest.fn(() => ({ setError: jest.fn(), setSuccess: jest.fn() })));

  test('should mutate state & call localStorage.setItem', async () => {
    // Arrange
    const data = {
      everywhere: false,
    };

    const mocks = [
      {
        request: {
          query: SignOut,
          variables: {
            input: data,
          },
        },
        result: {
          data: { signOut: 'success' },
        },
      },
    ];

    // Act
    const { result, waitForNextUpdate } = renderHook(() => useSignOut(), {
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
    expect(result.current[1].data.signOut).toEqual('success');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
});
