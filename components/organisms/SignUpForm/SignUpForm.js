import React from 'react';

import { useSignIn } from 'lib/apollo/hooks/actions';
import SignUpFormContent from './SignUpFormContent';

const SignUpForm = () => {
  const [signIn, { error, loading }] = useSignIn();

  return <SignUpFormContent error={error} loading={loading} onSubmit={signIn} />;
};

export default SignUpForm;
