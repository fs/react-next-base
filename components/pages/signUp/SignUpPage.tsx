import React from 'react';
import styled from 'styled-components';

import { NotifierProvider } from 'contexts/NotifierContext';
import DefaultTemplate from 'components/shared/templates/DefaultTemplate';
import Notifier from 'components/shared/atoms/Notifier';
import SignUpForm from 'components/shared/molecules/Form/forms/SignUpForm';
import { withApolloClient } from 'lib/withApolloClient';
import WithAuth from 'lib/auth/withAuth';

const PageContentWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

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
