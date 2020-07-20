import React from 'react';
import LoginForm from '../../components/organisms/LoginForm';
import DefaultTemplate from 'components/templates/DefaultTemplate';

import WithAuth from 'lib/auth/withAuth';
import { withApolloClient } from 'lib/withApolloClient';

const Login = () => {
  return (
    <DefaultTemplate>
      <LoginForm />
    </DefaultTemplate>
  );
};

export default withApolloClient(WithAuth(Login));
