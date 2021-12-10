import React from 'react';

import { ButtonHtml } from './styled';

type ButtonProps = {
  type: 'button' | 'submit' | 'reset' | undefined;
  children: string | undefined;
  testID: string | undefined;
  disabled: boolean;
};

const Button = ({ type, children, testID, disabled }: ButtonProps) => {
  return (
    <ButtonHtml type={type} data-testid={testID} data-cy={testID} disabled={disabled}>
      {children}
    </ButtonHtml>
  );
};

export default Button;
