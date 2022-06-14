import { MouseEvent } from 'react';
import type { PropsWithChildren } from 'react';
import { FlattenSimpleInterpolation } from 'styled-components';

import Test from 'types/testType';
import { StyledButton } from './styled';

type Props = Test & {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  customStyles?: FlattenSimpleInterpolation | string;
};

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
