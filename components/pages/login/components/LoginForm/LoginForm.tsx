import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useNotifier } from 'contexts/NotifierContext';

import useSignIn, { SignInProps } from 'lib/apollo/hooks/actions/useSignIn';
import useSignUp, { SignUpProps } from 'lib/apollo/hooks/actions/useSignUp';
import usePasswordRecovery, { PasswordRecoveryProps } from 'lib/apollo/hooks/actions/usePasswordRecovery';

import LoginFormContent from './LoginFormContent';

import { FormAction } from './constants';

const { PASSWORD_RECOVERY_FORM, SIGN_IN_FORM, SIGN_UP_FORM } = FormAction;

const StyledFormWrapper = styled.div`
  text-align: center;
  max-width: 40.625rem;
  margin: auto;
`;

const StyledMessage = styled.div`
  color: ${({ theme: { colors } }) => colors.green};
  margin-top: 2rem;
`;
export type TOnSubmit = (
  // TODO: тип должен выбираться от Action
  values: SignUpProps,
  { setSubmitting }: { setSubmitting: (value: boolean) => void },
) => void;

const LoginForm = () => {
  const [signIn] = useSignIn();
  const [signUp] = useSignUp();
  const [recoverPassword, detailMessage, errorMessage] = usePasswordRecovery();

  const [activeForm, setActiveForm] = useState(SIGN_IN_FORM);
  const [message, setMessage] = useState('');

  const { setSuccess, setError } = useNotifier();

  useEffect(() => {
    if (detailMessage) setSuccess(detailMessage);
  }, [detailMessage]);

  useEffect(() => {
    if (errorMessage) setError(errorMessage);
  }, [errorMessage]);

  const toggleForm = (form: FormAction) => {
    setActiveForm(form);
    setMessage('');
  };

  const onSubmit: TOnSubmit = async (values, { setSubmitting }) => {
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
