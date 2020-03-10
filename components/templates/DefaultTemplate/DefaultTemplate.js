import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const DefaultTemplate = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default DefaultTemplate;
