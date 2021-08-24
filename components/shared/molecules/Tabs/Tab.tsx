import React from 'react';
import ITest from 'interfaces/testType';

import { StyledTab } from './styled';

interface Props extends ITest {
  active: boolean;
  name: string;
  onClick: (event: React.MouseEvent<HTMLLIElement>) => void;
}

const Tab = ({ active, name, testId, onClick }: Props): JSX.Element => (
  <StyledTab role="tab" active={active} onClick={onClick} data-testid={testId} data-cy={testId}>
    {name}
  </StyledTab>
);

export default Tab;
