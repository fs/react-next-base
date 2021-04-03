import React from 'react';
import * as Yup from 'yup';
import styled from 'styled-components';
import Tabs from 'components/molecules/Tabs';
import Form from '../../molecules/Form';
import { SIGN_IN_FORM, SIGN_UP_FORM, PASSWORD_RECOVERY_FORM } from './constants';

const StyledFormTitle = styled.h3`
  margin: 0 auto 2rem;
  line-height: 1.25;
  letter-spacing: -0.035rem;
`;

const LoginFormContent = ({ onSubmit, toggleForm, activeForm }) => {
  const isSignIn = activeForm === SIGN_IN_FORM;
  const isSignUp = activeForm === SIGN_UP_FORM;
  const isRecovery = activeForm === PASSWORD_RECOVERY_FORM;

  const submitButtonText =
    {
      [SIGN_IN_FORM]: 'Sign In',
      [SIGN_UP_FORM]: 'Sign Up',
      [PASSWORD_RECOVERY_FORM]: 'Recover Password',
    }[activeForm] ?? '';

  const formTitle =
    {
      [SIGN_IN_FORM]: 'Sign In',
      [SIGN_UP_FORM]: 'Create an account',
      [PASSWORD_RECOVERY_FORM]: 'Recover my password',
    }[activeForm] ?? '';

  const fields = [
    isSignUp && {
      type: 'text',
      name: 'firstName',
      title: 'First Name',
      placeholder: 'First Name',
      testID: 'first-name',
      initialValue: '',
      validationSchema: Yup.string(),
    },
    isSignUp && {
      type: 'text',
      name: 'lastName',
      title: 'Last Name',
      placeholder: 'Last Name',
      testID: 'last-name',
      initialValue: '',
      validationSchema: Yup.string(),
    },
    {
      type: 'email',
      name: 'email',
      title: 'Email',
      placeholder: 'Email',
      testID: 'email',
      initialValue: '',
      validationSchema: Yup.string()
        .email('The email must be valid!!')
        .required('This field is required'),
    },
    !isRecovery && {
      type: 'password',
      name: 'password',
      title: 'Password',
      testID: 'password',
      placeholder: '',
      initialValue: '',
      validationSchema: Yup.string().required('This field is required'),
    },
    {
      type: 'submit',
      name: activeForm,
      testID: 'submit-button',
      label: submitButtonText,
    },
  ].filter(Boolean);

  const form = {
    fields,
    submit: onSubmit,
  };

  const Content = () => (
    <>
      <StyledFormTitle data-cy="login-form-title">{formTitle}</StyledFormTitle>
      <Form form={form} />
    </>
  );

  const TABS = [
    {
      id: 'signin',
      name: 'Sign in',
      active: isSignIn,
      action: () => toggleForm(SIGN_IN_FORM),
      content: <Content />,
    },
    {
      id: 'signup',
      name: 'Create an account',
      action: () => toggleForm(SIGN_UP_FORM),
      content: <Content />,
    },
    {
      id: 'password-recovery',
      name: 'Forgot your password',
      active: isRecovery,
      action: () => toggleForm(PASSWORD_RECOVERY_FORM),
      content: <Content />,
    },
  ];

  return <Tabs tabs={TABS} />;
};

export default LoginFormContent;
