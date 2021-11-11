import { useRouter } from 'next/router';

import { renderHook, act } from '@testing-library/react-hooks';
import { MockedProvider } from '@apollo/client/testing';

import UpdatePassword from 'graphql/mutations/updatePassword.graphql';

import { useNotifier } from 'contexts/NotifierContext';

import useUpdatePassword from './useUpdatePassword';

jest.mock('contexts/NotifierContext');
jest.mock('next/router');

describe('useUpdatePassword', () => {
  const mockSetSuccess = jest.fn();
  useNotifier.mockImplementation(jest.fn(() => ({ setSuccess: mockSetSuccess })));

  const mockPush = jest.fn();
  const mockUseRouter = jest.fn(() => ({ push: mockPush }));
  useRouter.mockImplementation(mockUseRouter);

  test('should mutate state & call setSuccess', async () => {
    // Arrange
    const data = {
      password: 'qwertY1!',
      resetToken: 'reset_token_string',
    };

    const mockResponse = {
      accessToken: 'access_token_string',
    };

    const mocks = [
      {
        request: {
          query: UpdatePassword,
          variables: {
            input: data,
          },
        },
        result: {
          data: mockResponse,
        },
      },
    ];

    // Act
    const { result, waitForNextUpdate } = renderHook(() => useUpdatePassword(), {
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
    expect(result.current[1].data).toEqual(mockResponse);
    expect(mockSetSuccess).toHaveBeenCalled();
  });
});
