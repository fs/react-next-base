import React from 'react';

import { withApolloClient } from 'lib/withApolloClient';
import WithAuth from 'lib/auth/withAuth';

import { NotifierProvider } from 'contexts/NotifierContext';

import DefaultTemplate from 'components/shared/templates/DefaultTemplate';
import Notifier from 'components/shared/atoms/Notifier';
import SignUpForm from './components/SignUpForm';

import { PageContentWrapper } from './styled';

const SignUpPage = () => {
  return (
    <NotifierProvider>
      <DefaultTemplate testId="signup-page">
        <PageContentWrapper>
          <SignUpForm />
        </PageContentWrapper>
        <Notifier />
      </DefaultTemplate>
    </NotifierProvider>
  );
};

export default withApolloClient(WithAuth(SignUpPage));
