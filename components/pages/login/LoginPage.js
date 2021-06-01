import React from 'react';

import WithAuth from 'lib/auth/withAuth';
import { withApolloClient } from 'lib/withApolloClient';
import { NotifierProvider } from 'contexts/NotifierContext';

import DefaultTemplate from 'components/shared/templates/DefaultTemplate';
import Notifier from 'components/shared/atoms/Notifier';

import LoginForm from './components/LoginForm';

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
