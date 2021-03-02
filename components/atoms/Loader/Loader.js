import React from 'react';
import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

const Wrapper = styled.div(
  ({ theme: { colors } }) => css`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: ${transparentize(0.1, colors.white)};
    opacity: 0.7;
  `,
);

const Title = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
`;

const Loader = ({ children, testId }) => (
  <Wrapper data-testid={testId} data-cy={testId}>
    <Title>{children}</Title>
  </Wrapper>
);

export default Loader;
