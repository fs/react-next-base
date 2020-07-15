import React, { useState } from 'react';
import styled from 'styled-components';

import SignUpFormContent from './SignUpFormContent';
import useSignUp from './useSignUp';

export const StyledFormWrapper = styled.div`
  text-align: center;
`;

export const StyledToggleForm = styled.div`
  display: inline-block;
  cursor: pointer;
  color: #00f;
  margin-top: 1rem;
`;

const SignUpForm = ({ onSuccess }) => {
  // todo remove callbacks from mutation hooks
  const {
    signUp,
    mutationResult: { error, loading },
  } = useSignUp({ onSuccess });

  const [activeForm, toggleSignForm] = useState('signUp');
  const handleActiveFormChoose = () => {
    activeForm === 'signUp' ? toggleSignForm('signIn') : toggleSignForm('signUp');
  };
  const toggleButtonText = activeForm === 'signUp' ? 'Already signed up' : 'Sign up';
  return (
    <StyledFormWrapper>
      <SignUpFormContent error={error} loading={loading} onSubmit={signUp} activeForm={activeForm} />
      <StyledToggleForm onClick={() => handleActiveFormChoose()}>{toggleButtonText}</StyledToggleForm>
    </StyledFormWrapper>
  );
};

export default SignUpForm;
