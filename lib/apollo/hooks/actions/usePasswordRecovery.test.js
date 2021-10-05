import { renderHook, act } from '@testing-library/react-hooks';
import { MockedProvider } from '@apollo/client/testing';

import RequestPasswordRecovery from 'graphql/mutations/requestPasswordRecovery.graphql';

import useNotifier from 'hooks/useNotifier';

import usePasswordRecovery from './usePasswordRecovery';

jest.mock('hooks/useNotifier');

describe('usePasswordRecovery', () => {
  useNotifier.mockImplementation(jest.fn(() => ({ setError: jest.fn(), setSuccess: jest.fn() })));

  test('should mutate state & return detail with correct email', async () => {
    // Arrange
    const data = {
      email: 'test@test.test',
    };

    const mockResponse = { detail: 'test', message: 'message' };
    const mocks = [
      {
        request: {
          query: RequestPasswordRecovery,
          variables: {
            input: data,
          },
        },
        result: {
          data: { requestPasswordRecovery: mockResponse },
        },
      },
    ];
    const expectedErrorMassage = undefined;

    // Act
    const { result, waitForNextUpdate } = renderHook(() => usePasswordRecovery(), {
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
    expect(result.current[1]).toEqual(mockResponse.detail);
    expect(result.current[2]).toEqual(expectedErrorMassage);
  });

  test('should mutate state & return error with incorrect email', async () => {
    // Arrange
    const data = {
      email: undefined,
    };

    const errorMessage = 'An error occurred';
    const error = new Error(errorMessage);

    const mocks = [
      {
        request: {
          query: RequestPasswordRecovery,
          variables: {
            input: data,
          },
        },
        error,
      },
    ];

    // Act
    const { result, waitForNextUpdate } = renderHook(() => usePasswordRecovery(), {
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
    expect(result.current[1]).toEqual(undefined);
    expect(result.current[2].message).toEqual(errorMessage);
  });
});
