import React from 'react';

import { StyledButton, BUTTON_HEIGHT_TYPES } from './styled';

const Button = ({ children, type = 'button', testId, heightType, ...rest }) => {
  return (
    <StyledButton type={type} data-testid={testId} data-cy={testId} heightType={heightType} {...rest}>
      {children}
    </StyledButton>
  );
};

export { BUTTON_HEIGHT_TYPES };
export default Button;
