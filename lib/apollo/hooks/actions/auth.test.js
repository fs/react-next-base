import { useMutation } from '@apollo/client';
import { renderHook } from '@testing-library/react-hooks';

import SignIn from 'graphql/mutations/signIn.graphql';
import SignUp from 'graphql/mutations/signUp.graphql';
import SignOut from 'graphql/mutations/signOut.graphql';
import RequestPasswordRecovery from 'graphql/mutations/requestPasswordRecovery.graphql';

import useNotifier from 'hooks/useNotifier';

import { useSignIn, useSignUp, useSignOut, usePasswordRecovery } from './auth';

jest.mock('@apollo/client');
jest.mock('hooks/useNotifier');

describe('Auth actions', () => {
  useNotifier.mockImplementation(jest.fn(() => ({ setError: jest.fn(), setSuccess: jest.fn() })));

  describe('useSignIn', () => {
    test('should call useMutation', () => {
      // Arrange
      const mockMutation = jest.fn();
      const mockMutationState = {};

      const mockUseMutation = jest.fn(() => [mockMutation, mockMutationState]);
      useMutation.mockImplementation(mockUseMutation);

      // Act
      const {
        result: {
          current: [mutateFunction, state],
        },
      } = renderHook(useSignIn);

      // Assert
      expect(mockUseMutation).toHaveBeenCalledWith(SignIn, { update: expect.any(Function) });
      expect(state).toBe(mockMutationState);
      expect(mutateFunction).toEqual(expect.any(Function));
    });
  });

  describe('useSignUp', () => {
    test('should call useMutation', () => {
      // Arrange
      const mockMutation = jest.fn();
      const mockMutationState = {};

      const mockUseMutation = jest.fn(() => [mockMutation, mockMutationState]);
      useMutation.mockImplementation(mockUseMutation);

      // Act
      const {
        result: {
          current: [mutateFunction, state],
        },
      } = renderHook(useSignUp);

      // Assert
      expect(mockUseMutation).toHaveBeenCalledWith(SignUp, { update: expect.any(Function) });
      expect(state).toBe(mockMutationState);
      expect(mutateFunction).toEqual(expect.any(Function));
    });
  });

  describe('useSignOut', () => {
    test('should call useMutation', () => {
      // Arrange
      const mockMutation = jest.fn();
      const mockMutationState = {};

      const mockUseMutation = jest.fn(() => [mockMutation, mockMutationState]);
      useMutation.mockImplementation(mockUseMutation);

      // Act
      const {
        result: {
          current: [mutateFunction, state],
        },
      } = renderHook(useSignOut);

      // Assert
      expect(mockUseMutation).toHaveBeenCalledWith(SignOut, { update: expect.any(Function) });
      expect(state).toBe(mockMutationState);
      expect(mutateFunction).toEqual(expect.any(Function));
    });
  });

  describe('usePasswordRecovery', () => {
    test('should call useMutation', () => {
      // Arrange
      const mockMutation = jest.fn();
      const expectedErrorMassage = undefined;
      const expectedDetail = 'Инструкции по восстановлению пароля были высланы, если аккаунт существует.';
      const mockMutationState = {
        data: {
          requestPasswordRecovery: {
            detail: expectedDetail,
            message: 'Instructions sent',
            __typename: 'DetailedMessage',
          },
        },
      };

      const mockUseMutation = jest.fn(() => [mockMutation, mockMutationState]);
      useMutation.mockImplementation(mockUseMutation);

      // Act
      const {
        result: {
          current: [mutateFunction, detail, error],
        },
      } = renderHook(usePasswordRecovery);

      // Assert
      expect(mockUseMutation).toHaveBeenCalledWith(RequestPasswordRecovery);
      expect(detail).toBe(expectedDetail);
      expect(error).toBe(expectedErrorMassage);
      expect(mutateFunction).toEqual(expect.any(Function));
    });

    test('should return errors on invalid email', () => {
      // Arrange
      const mockMutation = jest.fn();
      const expectedDetail = undefined;
      const expectedErrorMassage = 'Запись не найдена.';
      const mockMutationState = {
        data: undefined,
        error: 'Запись не найдена.',
      };

      const mockUseMutation = jest.fn(() => [mockMutation, mockMutationState]);
      useMutation.mockImplementation(mockUseMutation);

      // Act
      const {
        result: {
          current: [mutateFunction, detail, error],
        },
      } = renderHook(usePasswordRecovery);

      // Assert
      expect(detail).toBe(expectedDetail);
      expect(error).toBe(expectedErrorMassage);
      expect(mutateFunction).toEqual(expect.any(Function));
    });
  });
});
