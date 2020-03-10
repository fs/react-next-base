import React from 'react';
import styled from 'styled-components';
import DefaultTemplate from 'components/templates/DefaultTemplate';

const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
`;

const Home = () => (
  <DefaultTemplate>
    <Title>Welcome to React Next Base</Title>
  </DefaultTemplate>
);

export default Home;
