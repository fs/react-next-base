import React from 'react';
import styled from 'styled-components';

import { NotifierProvider } from 'contexts/NotifierContext';
import DefaultTemplate from 'components/shared/templates/DefaultTemplate';
import Notifier from 'components/shared/atoms/Notifier';
import SignInForm from 'components/shared/molecules/Form/SignInForm';
import { withApolloClient } from 'lib/withApolloClient';
import WithAuth from 'lib/auth/withAuth';

const PageContentWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const SignInPage = () => {
  return (
    <NotifierProvider>
      <DefaultTemplate data-testid="signin-page">
        <PageContentWrapper>
          <SignInForm />
        </PageContentWrapper>
        <Notifier />
      </DefaultTemplate>
    </NotifierProvider>
  );
};

export default withApolloClient(WithAuth(SignInPage));
