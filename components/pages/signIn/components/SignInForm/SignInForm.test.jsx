import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import renderWithTheme from '__tests__/helpers/renderWithTheme';

import useSignIn from 'lib/apollo/hooks/actions/useSignIn';
import SignInForm from './SignInForm';

jest.mock('lib/apollo/hooks/actions/useSignIn');

describe('SignInForm', () => {
  let signIn;
  let signInState;

  beforeEach(() => {
    signIn = jest.fn();
    signInState = {
      error: undefined,
      loading: null,
      data: {
        signIn: {},
      },
    };
    useSignIn.mockImplementation(() => [signIn, signInState]);
  });

  test('should call SignIn fn after click "Submit" button', async () => {
    // Arrange
    const inputEmailValue = 'email@gmail.com';
    const inputPasswordValue = 'password';

    render(renderWithTheme(<SignInForm />));

    const inputEmail = screen.getByTestId('input-email');
    const inputPassword = screen.getByTestId('input-password');

    fireEvent.change(inputEmail, { target: { value: inputEmailValue } });
    fireEvent.change(inputPassword, { target: { value: inputPasswordValue } });

    // Act
    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalled();
    });
  });

  test('should show loader if is loading', () => {
    // Arrange
    signInState = {
      error: undefined,
      loading: true,
      data: null,
    };

    useSignIn.mockImplementation(() => [signIn, signInState]);

    render(renderWithTheme(<SignInForm />));

    const inputEmailValue = 'email@gmail.com';
    const inputPasswordValue = 'password';

    const inputEmail = screen.getByTestId('input-email');
    const inputPassword = screen.getByTestId('input-password');

    // Act
    fireEvent.change(inputEmail, { target: { value: inputEmailValue } });
    fireEvent.change(inputPassword, { target: { value: inputPasswordValue } });
    fireEvent.click(screen.getByTestId('submit-button'));

    // Assert
    expect(screen.getByTestId('signin-loader')).toBeInTheDocument();
  });
});
