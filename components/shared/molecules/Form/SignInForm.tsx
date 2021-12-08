import React from 'react';
import styled from 'styled-components';
import { Form, Formik, FormikHelpers, Field, FormikProps } from 'formik';

import useSignIn from 'lib/apollo/hooks/actions/useSignIn';
import { SubmitButton } from 'components/shared/molecules/Form/formFields';
import { Input } from 'components/shared/atoms/Input/Input';
import { FormFieldType } from './forms.types';

const FormContentWrapper = styled.div`
  max-width: 40rem;
`;

const initialValues = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [signIn] = useSignIn();

  type ValuesFromFormik = Parameters<typeof signIn>[0];

  const onSubmit = async (values: ValuesFromFormik, { setSubmitting }: FormikHelpers<ValuesFromFormik>) => {
    try {
      setSubmitting(true);
      await signIn(values);
      setSubmitting(false);
    } catch (error) {
      console.error(error);
    }
  };

  const SignInFormContent = ({ isSubmitting }: FormikProps<ValuesFromFormik>) => (
    <FormContentWrapper>
      <Form>
        <label htmlFor="email">Email</label>
        <Field as={Input} id="email" name="email" placeholder="Email" type="text" />
        <label htmlFor="password">Password</label>
        <Field as={Input} id="password" name="password" placeholder="Password" type="password" />
        <SubmitButton type={FormFieldType.submit} name="signIn" isFormSubmitting={isSubmitting} />
      </Form>
    </FormContentWrapper>
  );

  return <Formik initialValues={initialValues} onSubmit={onSubmit} component={SignInFormContent} />;
};

export default SignInForm;
