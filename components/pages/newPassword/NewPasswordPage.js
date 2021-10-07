import React from 'react';

import { useRouter } from 'next/router';
import WithAuth from 'lib/auth/withAuth';
import { withApolloClient } from 'lib/withApolloClient';
import { NotifierProvider } from 'contexts/NotifierContext';
import { HOME } from 'config/routes';

import DefaultTemplate from 'components/shared/templates/DefaultTemplate';
import Notifier from 'components/shared/atoms/Notifier';

import NewPasswordForm from './components/NewPasswordForm';

import { PageContainer } from './styled';

const NewPasswordPage = ({ query }) => {
  const router = useRouter();

  return (
    <NotifierProvider>
      <DefaultTemplate>
        <PageContainer>
          <NewPasswordForm query={query} />
        </PageContainer>
      </DefaultTemplate>
      <Notifier />
    </NotifierProvider>
  );
};

NewPasswordPage.getInitialProps = ({ res, accessTokenManager }) => {
  if (accessTokenManager.accessToken) {
    res ? res.redirect(302, HOME) : router.push(HOME);
  }
  return {};
};

export default withApolloClient(WithAuth(NewPasswordPage));
