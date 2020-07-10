import React from 'react';
import SignUpForm from 'components/organisms/SignUpForm';
import DefaultTemplate from 'components/templates/DefaultTemplate';

import WithAuth from 'lib/auth/withAuth';
import { withApolloClient } from 'lib/withApolloClient';

const Login = () => {
  return (
    <DefaultTemplate>
      <SignUpForm />
    </DefaultTemplate>
  );
};

export default withApolloClient(WithAuth(Login));
