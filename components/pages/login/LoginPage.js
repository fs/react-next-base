import React from 'react';

import { Router } from 'routes';
import WithAuth from 'lib/auth/withAuth';
import { withApolloClient } from 'lib/withApolloClient';
import { NotifierProvider } from 'contexts/NotifierContext';
import { HOME } from 'config/routes';

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

LoginPage.getInitialProps = ({ res, accessTokenManager }) => {
  if (accessTokenManager.accessToken) {
    res ? res.redirect(302, HOME.pattern) : Router.pushRoute(HOME.pattern);
  }
  return {};
};

export default withApolloClient(WithAuth(LoginPage));
