import React from 'react';
import type { PropsWithChildren } from 'react';

import type Props from 'interfaces/testType';

import { Wrapper, Title } from './styled';

const Loader = ({ children, testId }: PropsWithChildren<Props>): JSX.Element => (
  <Wrapper data-testid={testId} data-cy={testId}>
    <Title>{children}</Title>
  </Wrapper>
);

export default Loader;
