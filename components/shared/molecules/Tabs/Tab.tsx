import { MouseEvent } from 'react';
import Test from 'types/testType';

import { StyledTab } from './styled';

type Props = Test & {
  active: boolean;
  name: string;
  onClick: (event: MouseEvent<HTMLLIElement>) => void;
};

const Tab = ({ active, name, testId, onClick }: Props): JSX.Element => (
  <StyledTab role="tab" active={active} onClick={onClick} data-testid={testId} data-cy={testId}>
    {name}
  </StyledTab>
);

export default Tab;
