import React, { forwardRef } from 'react';

import { StyledLink } from './styled';

const ButtonedLink = forwardRef((props, ref) => {
  const { children, customStyles, testId, disabled, onClick, ...restProps } = props;

  return (
    <StyledLink
      onClick={onClick}
      disabled={disabled}
      customStyles={customStyles}
      data-testid={testId}
      data-cy={testId}
      ref={ref}
      {...restProps}
    >
      {children}
    </StyledLink>
  );
});

export default ButtonedLink;
