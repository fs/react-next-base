import React from 'react';
import type { PropsWithChildren } from 'react';
import { DefaultTheme } from 'styled-components';
import type ITest from 'interfaces/testType';
import Wrapper from './styled';

interface Props extends ITest {
  customStyles?: (theme: DefaultTheme) => string;
}

const Loader = ({ children, testId, customStyles }: PropsWithChildren<Props>): JSX.Element => (
  <Wrapper customStyles={customStyles} data-testid={testId} data-cy={testId}>
    <span>{children}</span>
  </Wrapper>
);

export default Loader;
