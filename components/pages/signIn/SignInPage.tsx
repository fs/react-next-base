import React from 'react';

import { withApolloClient } from 'lib/withApolloClient';
import WithAuth from 'lib/auth/withAuth';

import { NotifierProvider } from 'contexts/NotifierContext';

import DefaultTemplate from 'components/shared/templates/DefaultTemplate';
import Notifier from 'components/shared/atoms/Notifier';
import SignInForm from 'components/pages/signIn/components/SignInForm';

import { PageContentWrapper } from './styled';

const SignInPage = () => {
  return (
    <NotifierProvider>
      <DefaultTemplate testId="signin-page">
        <PageContentWrapper>
          <SignInForm />
        </PageContentWrapper>
        <Notifier />
      </DefaultTemplate>
    </NotifierProvider>
  );
};

export default withApolloClient(WithAuth(SignInPage));
