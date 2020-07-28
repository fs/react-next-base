import React from 'react';

import WithAuth from 'lib/auth/withAuth';
import { ErrorProvider } from 'contexts/ErrorContext';
import { withApolloClient } from 'lib/withApolloClient';
import DefaultTemplate from 'components/templates/DefaultTemplate';
import LoginForm from 'components/organisms/LoginForm';
import ErrorNotifier from 'components/atoms/ErrorNotifier/ErrorNotifier';

const Login = () => {
  return (
    <ErrorProvider>
      <DefaultTemplate>
        <LoginForm />
        <ErrorNotifier />
      </DefaultTemplate>
    </ErrorProvider>
  );
};

export default withApolloClient(WithAuth(Login));
