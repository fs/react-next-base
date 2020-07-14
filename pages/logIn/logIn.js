import React from 'react';
import { withApolloClient } from 'lib/withApolloClient';
import SignUpForm from 'components/organisms/SignUpForm';
import DefaultTemplate from 'components/templates/DefaultTemplate';

const Signup = () => {
  const onSuccess = data => {
    console.log(data);
  };

  return (
    <DefaultTemplate>
      <SignUpForm onSuccess={onSuccess} />
    </DefaultTemplate>
  );
};

export default withApolloClient(Signup);
