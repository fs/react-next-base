import React, { useState, useMemo } from 'react';
import styled from 'styled-components';

import { useSignIn, useSignUp, usePasswordRecovery } from 'lib/apollo/hooks/actions';
import LoginFormContent from './LoginFormContent';

import { SIGN_IN_FORM, SIGN_UP_FORM, PASSWORD_RECOVERY_FORM } from './constants';

export const StyledFormWrapper = styled.div`
  text-align: center;
  max-width: 40.625rem;
  margin: auto;
`;

export const StyledToggleForm = styled.div`
  display: inline-block;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.link};
  margin: 1rem 1rem 1rem 0;
`;

const StyledFormActions = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  margin-bottom: 2rem;
`;

const LoginForm = () => {
  const [signIn, signInContext] = useSignIn();
  const [signUp, signUpContext] = useSignUp();
  const [recoverPassword, recoverPasswordContext] = usePasswordRecovery();

  const [activeForm, setActiveForm] = useState(SIGN_IN_FORM);

  const formActions = [
    {
      to: SIGN_IN_FORM,
      text: 'Sign In',
    },
    {
      to: SIGN_UP_FORM,
      text: 'Create an account',
    },
    {
      to: PASSWORD_RECOVERY_FORM,
      text: 'Forgot your password?',
    },
  ];

  const onSubmit = async (values, { setSubmitting }) => {
    const action = {
      [SIGN_IN_FORM]: signIn,
      [SIGN_UP_FORM]: signUp,
      [PASSWORD_RECOVERY_FORM]: recoverPassword,
    }[activeForm];

    setSubmitting(true);

    await action(values);

    setSubmitting(false);

    console.warn('INSIDE ONSUBMIT', recoverPasswordContext);
  };

  console.warn('IN COMPONENT', recoverPasswordContext);

  return (
    <StyledFormWrapper>
      <StyledFormActions>
        {formActions.map(({ text, to }) => (
          <StyledToggleForm key={to} onClick={() => setActiveForm(to)}>
            {text}
          </StyledToggleForm>
        ))}
      </StyledFormActions>
      <LoginFormContent onSubmit={onSubmit} activeForm={activeForm} />
    </StyledFormWrapper>
  );
};

export default LoginForm;
