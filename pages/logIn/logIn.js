import React from 'react';
import DefaultTemplate from 'components/templates/DefaultTemplate';

import WithAuth from 'lib/auth/withAuth';
import { withApolloClient } from 'lib/withApolloClient';
import LoginForm from '../../components/organisms/LoginForm';

const Login = () => {
  return (
    <DefaultTemplate>
      <LoginForm />
    </DefaultTemplate>
  );
};

export default withApolloClient(WithAuth(Login));
