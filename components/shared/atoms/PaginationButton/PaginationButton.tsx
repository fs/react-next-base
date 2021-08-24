import React from 'react';
import type { PropsWithChildren } from 'react';

import ITest from 'interfaces/testType';
import { StyledButton } from './styled';

interface Props extends ITest {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  customStyles?: string;
}

const PaginationButton = ({
  testId,
  disabled,
  onClick,
  customStyles,
  children,
}: PropsWithChildren<Props>): JSX.Element => {
  return (
    <StyledButton
      type="button"
      data-cy={testId}
      data-testid={testId}
      disabled={disabled}
      onClick={onClick}
      customStyles={customStyles}
    >
      {children}
    </StyledButton>
  );
};

export default PaginationButton;
