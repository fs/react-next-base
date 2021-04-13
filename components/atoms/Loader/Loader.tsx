import React from 'react';
import type { PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

import type ITest from 'types/test';

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

type Props = ITest;

const Loader = ({ children, testId }: PropsWithChildren<Props>): JSX.Element => (
  <Wrapper data-testid={testId} data-cy={testId}>
    <Title>{children}</Title>
  </Wrapper>
);

export default Loader;
