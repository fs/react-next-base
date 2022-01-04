import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import renderWithTheme from '__tests__/helpers/renderWithTheme';

import useSignUp from 'lib/apollo/hooks/actions/useSignUp';

import SignUpForm from './SignUpForm';

jest.mock('lib/apollo/hooks/actions/useSignUp');

describe('SignInForm', () => {
  let signUp;
  let signUpState;

  beforeEach(() => {
    signUp = jest.fn();
    signUpState = {
      error: undefined,
      loading: null,
      data: {
        signIn: {},
      },
    };
    useSignUp.mockImplementation(() => [signUp, signUpState]);
  });

  test('should call SignIn fn after click "Submit" button', async () => {
    // Arrange
    const inputFirstNameValue = 'Name';
    const inputLastNameValue = 'LastName';
    const inputEmailValue = 'email@gmail.com';
    const inputPasswordValue = 'Password1';

    // Act
    render(renderWithTheme(<SignUpForm />));

    const inputFirstName = screen.getByTestId('input-firstName');
    const inputLastName = screen.getByTestId('input-lastName');
    const inputEmail = screen.getByTestId('input-email');
    const inputPassword = screen.getByTestId('input-password');

    fireEvent.change(inputFirstName, { target: { value: inputFirstNameValue } });
    fireEvent.change(inputLastName, { target: { value: inputLastNameValue } });
    fireEvent.change(inputEmail, { target: { value: inputEmailValue } });
    fireEvent.change(inputPassword, { target: { value: inputPasswordValue } });

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(signUp).toHaveBeenCalled();
    });
  });

  test('should show loader if is loading', () => {
    // Arrange
    signUpState = {
      error: undefined,
      loading: true,
      data: null,
    };

    useSignUp.mockImplementation(() => [signUp, signUpState]);
    render(renderWithTheme(<SignUpForm />));

    const inputFirstNameValue = 'Name';
    const inputLastNameValue = 'LastName';
    const inputEmailValue = 'email@gmail.com';
    const inputPasswordValue = 'password';

    const inputFirstName = screen.getByTestId('input-firstName');
    const inputLastName = screen.getByTestId('input-lastName');
    const inputEmail = screen.getByTestId('input-email');
    const inputPassword = screen.getByTestId('input-password');

    // Act
    fireEvent.change(inputFirstName, { target: { value: inputFirstNameValue } });
    fireEvent.change(inputLastName, { target: { value: inputLastNameValue } });
    fireEvent.change(inputEmail, { target: { value: inputEmailValue } });
    fireEvent.change(inputPassword, { target: { value: inputPasswordValue } });
    fireEvent.click(screen.getByTestId('submit-button'));

    // Assert
    expect(screen.getByTestId('signin-loader')).toBeInTheDocument();
  });
});
