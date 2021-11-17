import React from 'react';
import { DefaultTheme, FlattenSimpleInterpolation } from 'styled-components';

import { StyledLink } from './styled';

type TButtonedLink = {
  onClick?: () => void;
  children: React.ReactNode;
  customStyles?: (theme: DefaultTheme) => FlattenSimpleInterpolation;
  href?: string;
  testId?: string;
};

const ButtonedLink = React.forwardRef<HTMLAnchorElement, TButtonedLink>(
  ({ children, customStyles, onClick, testId, href }, ref): JSX.Element => {
    return (
      <StyledLink
        href={href}
        onClick={onClick}
        ref={ref}
        data-testid={testId}
        data-cy={testId}
        customStyles={customStyles}
      >
        {children}
      </StyledLink>
    );
  },
);

export default ButtonedLink;