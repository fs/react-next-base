import React from 'react';

import WithAuth from 'lib/auth/withAuth';
import { NotifierProvider } from 'contexts/NotifierContext';
import { withApolloClient } from 'lib/withApolloClient';
import DefaultTemplate from 'components/shared/templates/DefaultTemplate';
import LoginForm from 'components/shared/organisms/LoginForm';
import Notifier from 'components/shared/atoms/Notifier';

const LoginPage = () => {
  return (
    <NotifierProvider>
      <DefaultTemplate>
        <LoginForm />
        <Notifier />
      </DefaultTemplate>
    </NotifierProvider>
  );
};

export default withApolloClient(WithAuth(LoginPage));
