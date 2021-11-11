import React from 'react';
import { DefaultTheme, FlattenSimpleInterpolation } from 'styled-components';

import { StyledLink } from './styled';

interface Props {
  onClick?: () => void;
  children: React.ReactNode;
  customStyles?: (theme: DefaultTheme) => FlattenSimpleInterpolation;
  href?: string;
  testId?: string;
}

const ButtonedLink = React.forwardRef(
  ({ children, customStyles, onClick, testId, href }: Props, ref: any): JSX.Element => {
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
