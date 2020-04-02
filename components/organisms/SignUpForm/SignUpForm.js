import React, { useState } from 'react';

import SignUpFormContent from './SignUpFormContent';
import useSignUp from './useSignUp';

const SignUpForm = ({ onSuccess }) => {
  const {
    signUp,
    mutationResult: { error, loading },
  } = useSignUp({ onSuccess });

  return <SignUpFormContent error={error} loading={loading} onSubmit={signUp} />;
};

export default SignUpForm;
