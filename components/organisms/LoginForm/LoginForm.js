import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useSignIn, useSignUp, usePasswordRecovery } from 'lib/apollo/hooks/actions/auth';
import LoginFormContent from './LoginFormContent';

import { SIGN_IN_FORM, SIGN_UP_FORM, PASSWORD_RECOVERY_FORM } from './constants';

const StyledFormWrapper = styled.div`
  text-align: center;
  max-width: 40.625rem;
  margin: auto;
`;

const StyledMessage = styled.div`
  color: ${({ theme: { colors } }) => colors.green};
  margin-top: 2rem;
`;

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

  const toggleForm = (form) => {
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

      if (!action) {
        console.error(`Action for ${activeForm} form is not exists`);
      }

      setSubmitting(true);

      await action(values);

      setSubmitting(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StyledFormWrapper>
      <LoginFormContent onSubmit={onSubmit} toggleForm={toggleForm} activeForm={activeForm} />
      <StyledMessage data-cy="password-recovery-message">{message}</StyledMessage>
    </StyledFormWrapper>
  );
};

export default LoginForm;
