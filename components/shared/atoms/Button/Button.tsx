import React from 'react';
import styled from 'styled-components';

type ButtonProps = {
  type: 'button' | 'submit' | 'reset' | undefined;
  children: string | undefined;
};

const ButtonHtml = styled.button`
  background-color: ${({ theme }) => theme.colors.grey};
  height: 3rem;
  width: 100%;
  font-size: 1rem;
  border-radius: 0.3rem;
  border: 1px solid rgb(179, 179, 179);
`;

const Button = ({ type, children }: ButtonProps) => {
  return <ButtonHtml type={type}>{children}</ButtonHtml>;
};

export default Button;
