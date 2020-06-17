import React from 'react';
import SignUpForm from 'components/organisms/SignUpForm';
import DefaultTemplate from 'components/templates/DefaultTemplate';

const Login = () => {
  const onSuccess = data => {
    console.log('success', data);
  };

  return (
    <DefaultTemplate>
      <SignUpForm onSuccess={onSuccess} />
    </DefaultTemplate>
  );
};

export default Login;
