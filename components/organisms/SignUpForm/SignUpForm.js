import React, { useState } from 'react';
import styled from 'styled-components';

import SignUpFormContent from './SignUpFormContent';
import useSignUp from './useSignUp';

export const SIGN_IN_FORM = 'signIn';
export const SIGN_UP_FORM = 'signUp';
export const StyledFormWrapper = styled.div`
  text-align: center;
`;

export const StyledToggleForm = styled.div`
  display: inline-block;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.link};
  margin-top: 1rem;
`;

const SignUpForm = ({ onSuccess }) => {
  // todo remove callbacks from mutation hooks
  const {
    signUp,
    mutationResult: { error, loading },
  } = useSignUp({ onSuccess });
  const [activeForm, toggleSignForm] = useState(SIGN_UP_FORM);
  const handleActiveFormChoose = () => {
    activeForm === SIGN_UP_FORM ? toggleSignForm(SIGN_IN_FORM) : toggleSignForm(SIGN_UP_FORM);
  };
  const toggleButtonText = activeForm === SIGN_UP_FORM ? 'Already signed up' : 'Sign up';
  return (
    <StyledFormWrapper>
      <SignUpFormContent error={error} loading={loading} onSubmit={signUp} activeForm={activeForm} />
      <StyledToggleForm onClick={handleActiveFormChoose}>{toggleButtonText}</StyledToggleForm>
    </StyledFormWrapper>
  );
};

export default SignUpForm;
