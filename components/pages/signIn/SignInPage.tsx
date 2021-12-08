import React from 'react';

import { NotifierProvider } from 'contexts/NotifierContext';
import DefaultTemplate from 'components/shared/templates/DefaultTemplate';
import Notifier from 'components/shared/atoms/Notifier';
import SignInForm from 'components/shared/molecules/Form/SignInForm';
import { withApolloClient } from 'lib/withApolloClient';
import WithAuth from 'lib/auth/withAuth';
import WithAuthSecurity from 'lib/auth/withAuthSecurity';

const SignInPage = () => {
  return (
    <NotifierProvider>
      <DefaultTemplate data-testid="signin-page">
        <SignInForm />
        <Notifier />
      </DefaultTemplate>
    </NotifierProvider>
  );
};

export default withApolloClient(WithAuth(WithAuthSecurity(SignInPage)));
