import React from 'react';

import SignUpFormContent from './SignUpFormContent';
import useSignUp from './useSignUp';

const SignUpForm = () => {
  // todo remove callbacks from mutation hooks
  const {
    signUp,
    mutationResult: { error, loading },
  } = useSignUp();

  return <SignUpFormContent error={error} loading={loading} onSubmit={signUp} />;
};

export default SignUpForm;
