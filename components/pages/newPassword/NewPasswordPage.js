import React from 'react';
import Router from 'next/router';

import WithAuth from 'lib/auth/withAuth';
import { withApolloClient } from 'lib/withApolloClient';
import { NotifierProvider } from 'contexts/NotifierContext';
import { HOME } from 'config/routes';

import DefaultTemplate from 'components/shared/templates/DefaultTemplate';
import Notifier from 'components/shared/atoms/Notifier';

import NewPasswordForm from './components/NewPasswordForm';

const NewPasswordPage = ({ query }) => {
  return (
    <NotifierProvider>
      <DefaultTemplate>
        <NewPasswordForm query={query} />
      </DefaultTemplate>
      <Notifier />
    </NotifierProvider>
  );
};

NewPasswordPage.getInitialProps = ({ res, accessTokenManager }) => {
  if (accessTokenManager.accessToken) {
    res ? res.redirect(302, HOME) : Router.push(HOME);
  }
  return {};
};

export default withApolloClient(WithAuth(NewPasswordPage));
