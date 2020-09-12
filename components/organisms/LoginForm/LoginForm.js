import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useSignIn, useSignUp, usePasswordRecovery } from 'lib/apollo/hooks/actions';
import Tabs from 'components/molecules/Tabs';
import LoginFormContent from './LoginFormContent';

import { SIGN_IN_FORM, SIGN_UP_FORM, PASSWORD_RECOVERY_FORM } from './constants';

const StyledFormWrapper = styled.div`
  text-align: center;
  max-width: 40.625rem;
  margin: auto;
`;

const StyledFormActions = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  margin-bottom: 3rem;
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

  const toggleForm = form => {
    setActiveForm(form);
    setMessage('');
  };

  const FORMS = [
    {
      id: 'sign_in',
      name: 'Sign in',
      component: SIGN_IN_FORM,
      onClick: () => toggleForm(SIGN_IN_FORM),
    },
    {
      id: 'sign_up',
      name: 'Create an account',
      component: SIGN_UP_FORM,
      onClick: () => toggleForm(SIGN_UP_FORM),
    },
    {
      id: 'password_recovery',
      name: 'Forgot your password',
      component: PASSWORD_RECOVERY_FORM,
      onClick: () => toggleForm(PASSWORD_RECOVERY_FORM),
    },
  ];

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
        <Tabs tabs={FORMS} activeForm={activeForm} />
      </StyledFormActions>
      <LoginFormContent onSubmit={onSubmit} activeForm={activeForm} />
      <StyledMessage>{message}</StyledMessage>
    </StyledFormWrapper>
  );
};

export default LoginForm;
