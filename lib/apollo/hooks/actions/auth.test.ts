import { renderHook, act } from '@testing-library/react-hooks';
import { MockedProvider } from '@apollo/client/testing';

import SignIn from 'graphql/mutations/signIn.graphql';
import SignUp from 'graphql/mutations/signUp.graphql';
import SignOut from 'graphql/mutations/signOut.graphql';
import RequestPasswordRecovery from 'graphql/mutations/requestPasswordRecovery.graphql';
import UpdateUser from 'graphql/mutations/updateUser.graphql';
import PresignData from 'graphql/mutations/presignData.graphql';

import { mockCurrentUser } from '__tests__/mocks/mockCurrentUser';
import presignDataMock from '__tests__/mocks/presignDataMock';

import useNotifier from 'hooks/useNotifier';

import { useSignIn, useSignUp, useSignOut, usePasswordRecovery, useUpdateUser, usePresignFile } from './auth';

jest.mock('hooks/useNotifier');

describe('Auth actions', () => {
  useNotifier.mockImplementation(jest.fn(() => ({ setError: jest.fn(), setSuccess: jest.fn() })));

  describe('useSignIn', () => {
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
      expect(result.current[1].data.signin).toEqual({ me: { ...mockCurrentUser } });
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });
  });

  describe('useSignUp', () => {
    test('should mutate state & call localStorage.setItem', async () => {
      // Arrange
      const data = {
        avatar: null,
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

  describe('useSignOut', () => {
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

  describe('usePasswordRecovery', () => {
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

  describe('useUpdateUser', () => {
    test('should mutate state', async () => {
      // Arrange
      const data = {
        email: 'test.test@test.com',
        firstName: 'Test',
        lastName: 'Test',
        password: null,
        currentPassword: null,
        avatar: null,
      };
      const mocks = [
        {
          request: {
            query: UpdateUser,
            variables: { input: data },
          },
          result: {
            data: { updateUser: mockCurrentUser },
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
      expect(result.current[1].data.updateUser).toEqual(mockCurrentUser);
    });
  });
});
