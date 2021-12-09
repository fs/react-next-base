import React from 'react';
import styled from 'styled-components';
import { Form, Formik, FormikHelpers, FormikProps } from 'formik';

import useSignIn from 'lib/apollo/hooks/actions/useSignIn';
import { SubmitButton } from 'components/shared/molecules/Form/formFields';
import { FormFieldType } from './forms.types';
import FormField from '../../atoms/FormField';

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
        <FormField name="email" type={FormFieldType.email} label="Email" />
        <FormField name="password" type={FormFieldType.password} label="Password" />
        <SubmitButton type={FormFieldType.submit} name="signIn" isFormSubmitting={isSubmitting}>
          Submit
        </SubmitButton>
      </Form>
    </FormContentWrapper>
  );

  return <Formik initialValues={initialValues} onSubmit={onSubmit} component={SignInFormContent} />;
};

export default SignInForm;
