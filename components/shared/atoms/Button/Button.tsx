import React from 'react';
import type { PropsWithChildren } from 'react';

import { StyledButton } from './styled';

type TButton = {
  type?: 'button' | 'submit' | 'reset' | undefined;
  testId?: string;
};

const Button = ({ children, type = 'button', testId, ...rest }: PropsWithChildren<TButton>): JSX.Element => {
  return (
    <StyledButton type={type} data-testid={testId} data-cy={testId} {...rest}>
      {children}
    </StyledButton>
  );
};

export default Button;
