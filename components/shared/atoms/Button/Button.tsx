import React from 'react';
import styled from 'styled-components';

type ButtonProps = {
  type: 'button' | 'submit' | 'reset' | undefined;
  children: string | undefined;
  testID: string | undefined;
  disabled: boolean;
};

const ButtonHtml = styled.button`
  background-color: ${({ theme }) => theme.colors.lightGrey};
  height: 3rem;
  width: 100%;
  font-size: 1rem;
  border-radius: 0.3rem;
  border: 1px solid rgb(179, 179, 179);

  &:hover {
    background-color: ${({ theme }) => theme.colors.grey};
  }
`;

const Button = ({ type, children, testID, disabled }: ButtonProps) => {
  return (
    <ButtonHtml type={type} data-testid={testID} data-cy={testID} disabled={disabled}>
      {children}
    </ButtonHtml>
  );
};

export default Button;
