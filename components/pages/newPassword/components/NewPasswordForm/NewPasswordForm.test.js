import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import useUpdatePassword from 'lib/apollo/hooks/actions/useUpdatePassword';

import NewPasswordForm from '.';

jest.mock('lib/apollo/hooks/actions/useUpdatePassword');

describe('NewPasswordForm', () => {
  const mockUpdatePassword = jest.fn(() => Promise.resolve());
  const mockUseUpdatePassword = jest.fn(() => [mockUpdatePassword]);
  useUpdatePassword.mockImplementation(mockUseUpdatePassword);

  test('should call updatePassword mutation on submit', async () => {
    // Arrange
    const expectedPassword = 'Test123456';
    const expectedResetToken = 'expected-reset-token';
    const query = { reset_token: expectedResetToken };

    render(renderWithTheme(<NewPasswordForm query={query} />));
    const passwordField = screen.getByTestId('password');
    const passwordConfirmationField = screen.getByTestId('passwordConfirmation');
    const form = screen.getByTestId('submit-button');

    fireEvent.change(passwordField, { target: { value: expectedPassword } });
    fireEvent.change(passwordConfirmationField, { target: { value: expectedPassword } });

    // Act
    fireEvent.click(form);

    // Assert
    await waitFor(() => {
      expect(mockUpdatePassword).toHaveBeenCalledWith({ password: expectedPassword, resetToken: expectedResetToken });
    });
  });
});