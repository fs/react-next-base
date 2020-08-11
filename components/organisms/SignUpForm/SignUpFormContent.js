import React from 'react';
import * as Yup from 'yup';
import styled from 'styled-components';
import Input from 'components/atoms/Input';
import Form from '../../molecules/Form';

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
const SignUpFormContent = ({ onSubmit, activeForm }) => {
  const SignUpForm = {
    fields: [
      {
        type: 'text',
        name: 'firstName',
        title: 'First Name',
        placeholder: 'First Name',
        initialValue: '',
        validationSchema: Yup.string().required('This field is required'),
      },
      {
        type: 'text',
        name: 'lastName',
        title: 'Last Name',
        placeholder: 'Last Name',
        initialValue: '',
        validationSchema: Yup.string().required('This field is required'),
      },
      {
        type: 'email',
        name: 'email',
        title: 'Email',
        placeholder: 'Email',
        initialValue: '',
        validationSchema: Yup.string()
          .email('The email must be valid!!')
          .required('This field is required'),
      },
      {
        type: 'password',
        name: 'password',
        title: 'Password',
        placeholder: '',
        initialValue: '',
      },
      {
        type: 'submit',
        name: 'sign_up',
        initialValue: 'Sign Up',
      },
    ],
    submit: values => onSubmit(values),
  };

  const SignInForm = {
    fields: [
      {
        type: 'email',
        name: 'email',
        title: 'Email',
        placeholder: 'Email',
        initialValue: '',
        validationSchema: Yup.string()
          .email('The email must be valid!!')
          .required('This field is required'),
      },
      {
        type: 'password',
        name: 'password',
        title: 'Password',
        placeholder: '',
        initialValue: '',
      },
      {
        type: 'submit',
        name: 'sign_in',
        initialValue: 'Sign In',
      },
    ],
    submit: values => onSubmit(values),
  };
  return (
    <>
      <StyledTitle>{activeForm === 'signUp' ? 'Create an account' : 'Log in'}</StyledTitle>
      {activeForm === 'signUp' ? <Form form={SignUpForm} /> : <Form form={SignInForm} />}
    </>
  );
};

export default SignUpFormContent;
