import React, { useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';

import LoginFormContent from './LoginFormContent';

import { useSignIn, useSignUp } from 'lib/apollo/hooks/actions';
import { SIGN_IN_FORM, SIGN_UP_FORM } from './constants';

export const StyledFormWrapper = styled.div`
  text-align: center;
`;

export const StyledToggleForm = styled.div`
  display: inline-block;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.link};
  margin-top: 1rem;
`;

const LoginForm = () => {
  const [signIn] = useSignIn();
  const [signUp] = useSignUp();

  const [activeForm, setActiveForm] = useState(SIGN_UP_FORM);

  const isSignUp = useMemo(() => activeForm === SIGN_UP_FORM, [activeForm]);

  const toggleForm = useCallback(() => {
    setActiveForm(isSignUp ? SIGN_IN_FORM : SIGN_UP_FORM);
  }, [isSignUp]);

  const onSubmit = useCallback(
    values => {
      isSignUp ? signUp(values) : signIn(values);
    },
    [isSignUp],
  );

  const toggleButtonText = activeForm === SIGN_UP_FORM ? 'Already signed up' : 'Sign up';

  return (
    <StyledFormWrapper>
      <LoginFormContent onSubmit={onSubmit} activeForm={activeForm} />
      <StyledToggleForm onClick={toggleForm}>{toggleButtonText}</StyledToggleForm>
    </StyledFormWrapper>
  );
};

export default LoginForm;
