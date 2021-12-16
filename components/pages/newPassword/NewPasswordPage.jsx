import React from 'react';
import Router from 'next/router';

import WithAuth from 'lib/auth/withAuth';
import { withApolloClient } from 'lib/withApolloClient';
import { NotifierProvider } from 'contexts/NotifierContext';

import DefaultTemplate from 'components/shared/templates/DefaultTemplate';
import Notifier from 'components/shared/atoms/Notifier';

import NewPasswordForm from 'components/shared/molecules/Form/forms/NewPasswordForm';
import styled from 'styled-components';
import WithAuthSecurity from 'lib/auth/withAuthSecurity';

const PageContentWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const NewPasswordPage = ({ query }) => {
  return (
    <NotifierProvider>
      <DefaultTemplate>
        <PageContentWrapper>
          <NewPasswordForm query={query} />
        </PageContentWrapper>
      </DefaultTemplate>
      <Notifier />
    </NotifierProvider>
  );
};

export default withApolloClient(WithAuth(WithAuthSecurity(NewPasswordPage)));
