import React from 'react';
import styled from 'styled-components';

import WithAuth from 'lib/auth/WithAuth';
import { withApolloClient } from 'lib/withApolloClient';

import DefaultTemplate from 'components/templates/DefaultTemplate';

const Title = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 2rem;
  text-align: center;
`;

const PageContent = styled.div``;

const Home = props => {
  return (
    <DefaultTemplate>
      <PageContent>
        <Title className="capitalize">Welcome to React Next Base</Title>
      </PageContent>
    </DefaultTemplate>
  );
};

export default withApolloClient(WithAuth(Home));
