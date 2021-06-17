import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import WithAuth from 'lib/auth/withAuth';
import { withApolloClient } from 'lib/withApolloClient';
import DefaultTemplate from 'components/templates/DefaultTemplate';
import { NotifierProvider } from 'contexts/NotifierContext';
import { firebaseCloudMessaging } from '../worker';

const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
`;

const PageContent = styled.div``;

const HomePage = () => {
  // need to get a token for messaging
  useEffect(() => {
    const tokenTest = firebaseCloudMessaging.init();
    tokenTest.then(payload => {
      console.log(payload);
      // maybe send it to backend
    });
  });

  return (
    <NotifierProvider>
      <DefaultTemplate>
        <PageContent data-testid="page-content">
          <Title className="capitalize" data-cy="welcome-page">
            Welcome to React Next Base
          </Title>
        </PageContent>
      </DefaultTemplate>
    </NotifierProvider>
  );
};

export default withApolloClient(WithAuth(HomePage));
