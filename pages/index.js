import React from 'react';
import styled from 'styled-components';

import WithAuth from 'lib/auth/withAuth';
import { withApolloClient } from 'lib/withApolloClient';

import DefaultTemplate from 'components/templates/DefaultTemplate';
import { NotifierProvider } from 'contexts/NotifierContext';

const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
`;

const PageContent = styled.div``;

const Home = () => {
  return (
    <NotifierProvider>
      <DefaultTemplate>
        <PageContent>
          <Title className="capitalize">Welcome to React Next Base</Title>
        </PageContent>
      </DefaultTemplate>
    </NotifierProvider>
  );
};

export default withApolloClient(WithAuth(Home));
