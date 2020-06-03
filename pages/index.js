import React from 'react';
import styled from 'styled-components';
import { withApolloClient } from 'lib/withApolloClient';

import DefaultTemplate from 'components/templates/DefaultTemplate';

const Title = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 2rem;
  text-align: center;
`;

const Home = () => {
  return (
    <DefaultTemplate>
      <Title className="capitalize">Welcome to React Next Base</Title>
    </DefaultTemplate>
  );
};

export default withApolloClient(Home);
