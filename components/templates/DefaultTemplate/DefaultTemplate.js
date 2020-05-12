import React from 'react';
import styled from 'styled-components';

import Header from 'components/organisms/Header';

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 80px auto;
  min-height: 100vh;
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
