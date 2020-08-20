import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useSignIn, useSignUp, usePasswordRecovery } from 'lib/apollo/hooks/actions';
import LoginFormContent from './LoginFormContent';

import { SIGN_IN_FORM, SIGN_UP_FORM, PASSWORD_RECOVERY_FORM } from './constants';

const StyledFormWrapper = styled.div`
  text-align: center;
  max-width: 40.625rem;
  margin: auto;
`;

const StyledToggleForm = styled.div`
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

const StyledMessage = styled.div`
  color: green;
  margin-top: 2rem;
`;

const FORM_ACTIONS = [
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

const LoginForm = () => {
  const [signIn] = useSignIn();
  const [signUp] = useSignUp();
  const [recoverPassword, recoverPasswordContext] = usePasswordRecovery();

  const [activeForm, setActiveForm] = useState(SIGN_IN_FORM);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const detail = recoverPasswordContext?.data?.requestPasswordRecovery?.detail;

    if (detail) setMessage(detail);
  }, [recoverPasswordContext]);

  const toggleForm = form => {
    setActiveForm(form);
    setMessage('');
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const action = {
        [SIGN_IN_FORM]: signIn,
        [SIGN_UP_FORM]: signUp,
        [PASSWORD_RECOVERY_FORM]: recoverPassword,
      }[activeForm];

      if (!action) throw new Error(`Action for ${activeForm} form is not exists`);

      setSubmitting(true);

      await action(values);

      setSubmitting(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StyledFormWrapper>
      <StyledFormActions>
        {FORM_ACTIONS.map(({ text, to }) => (
          <StyledToggleForm className="formToggler" key={to} onClick={() => toggleForm(to)}>
            {text}
          </StyledToggleForm>
        ))}
      </StyledFormActions>
      <LoginFormContent onSubmit={onSubmit} activeForm={activeForm} />
      <StyledMessage id="recoverPasswordMessage">{message}</StyledMessage>
    </StyledFormWrapper>
  );
};

export default LoginForm;
