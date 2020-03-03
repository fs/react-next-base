import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 2rem;
`;

const Home = () => (
  <Wrapper>
    <Title>Welcome to React Next Base</Title>
  </Wrapper>
);

export default Home;
