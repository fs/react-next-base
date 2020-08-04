import React from 'react';
import styled from 'styled-components';

import WithAuth from 'lib/auth/withAuth';
import { withApolloClient } from 'lib/withApolloClient';

import DefaultTemplate from 'components/templates/DefaultTemplate';
import { ErrorProvider } from 'contexts/ErrorContext';

const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
`;

const PageContent = styled.div``;

const Home = () => {
  return (
    <ErrorProvider>
      <DefaultTemplate>
        <PageContent>
          <Title className="capitalize">Welcome to React Next Base</Title>
        </PageContent>
      </DefaultTemplate>
    </ErrorProvider>
  );
};

export default withApolloClient(WithAuth(Home));
