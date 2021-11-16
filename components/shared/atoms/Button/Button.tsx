import React from 'react';
import type { PropsWithChildren } from 'react';
import { DefaultTheme, FlattenSimpleInterpolation } from 'styled-components';

import { StyledButton } from './styled';

type TButton = {
  type?: 'button' | 'submit' | 'reset' | undefined;
  testId?: string;
  disabled?: boolean;
  customStyles?: (theme: DefaultTheme) => FlattenSimpleInterpolation;
};

const Button = ({
  children,
  type = 'button',
  testId,
  disabled,
  customStyles,
}: PropsWithChildren<TButton>): JSX.Element => {
  return (
    <StyledButton type={type} data-testid={testId} data-cy={testId} disabled={disabled} customStyles={customStyles}>
      {children}
    </StyledButton>
  );
};

export default Button;
