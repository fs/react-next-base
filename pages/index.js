import React from 'react';
import styled from 'styled-components';

import DefaultTemplate from 'components/templates/DefaultTemplate';

const Title = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 2rem;
  text-align: center;
`;

const PageContent = styled.div``;

const Home = () => {
  return (
    <DefaultTemplate>
      <PageContent>
        <Title className="capitalize">Welcome to React Next Base</Title>
      </PageContent>
    </DefaultTemplate>
  );
};

export default Home;
