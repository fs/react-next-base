import React from 'react';
import styled from 'styled-components';

import Header from 'components/organisms/Header';

const Wrapper = styled.div`
  min-height: 100vh;
  padding: 1rem 2rem;
`;

const DefaultTemplate = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      {children}
    </Wrapper>
  );
};

export default DefaultTemplate;
