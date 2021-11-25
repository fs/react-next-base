import React, { ChangeEvent } from 'react';
import type { PropsWithChildren } from 'react';
import { DefaultTheme, FlattenSimpleInterpolation } from 'styled-components';

import { StyledButton } from './styled';

export type TButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  testId?: string;
  disabled?: boolean;
  customStyles?: (theme: DefaultTheme) => FlattenSimpleInterpolation;
  onChange?: (event: ChangeEvent<HTMLButtonElement>) => void;
  // onClick?: (event: ChangeEvent<HTMLButtonElement>) => void;
};

const Button = ({
  children,
  type = 'button',
  testId,
  disabled,
  customStyles,
  onChange,
}: PropsWithChildren<TButtonProps>): JSX.Element => {
  return (
    <StyledButton
      type={type}
      data-testid={testId}
      data-cy={testId}
      disabled={disabled}
      customStyles={customStyles}
      onChange={onChange}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
