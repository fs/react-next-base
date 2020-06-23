import React, { useState } from 'react';

import styled from 'styled-components';
import Input from 'components/atoms/Input';

export const StyledTitle = styled.h3`
  max-width: 40.625rem;
  margin: 0 auto;
  line-height: 1.25;
  letter-spacing: -0.035em;
`;

export const StyledSubTitle = styled.p`
  padding-top: 1rem;
  font-size: 1rem;
`;

export const StyledInput = styled(Input)`
  padding: 1.25rem;
  border-radius: 0;
  border-right: 0;
  background-color: transparent;
  font-size: 1.375rem;
  font-weight: 400;
  height: 3.75rem;
  width: 100%;
  outline: none;

  &:not(:first-child) {
    border-top: 0;
  }
`;

export const StyledLink = styled.a(
  ({ theme: { up, breakpoints } }) => `
  text-align: center;
  display: inline-block;
  margin-top: 1.25rem;
  text-decoration-line: underline;
  font-size: 0.875rem;

  ${up(breakpoints.lg)} {
    text-align: left;
  }

  &:not(:first-child) {
    ${up(breakpoints.lg)} {
      margin-left: 1.25rem;
    }
  }
`,
);

export const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 2.5rem;

  p {
    margin-top: 1.125rem;
  }

  ${({ theme: { up, breakpoints } }) => up(breakpoints.lg)} {
    flex-direction: row;
  }
`;

const Form = styled.form``;

const SignUpFormContent = ({ onSubmit, error, loading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    onSubmit({ email, password });
  };

  return (
    <>
      <StyledTitle>Create an account</StyledTitle>

      <Form onSubmit={handleSubmit}>
        <StyledInput
          aria-label="Login"
          name="login"
          type="text"
          placeholder="Email"
          onChange={setEmail}
          value={email}
          required
          autoComplete="new-login"
        />
        <StyledInput
          aria-label="Password"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={setPassword}
          required
          autoComplete="new-password"
        />
        <input type="submit" value="Sign up" />
      </Form>
    </>
  );
};

export default SignUpFormContent;
