import React from 'react';
import styled from 'styled-components';
import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import * as Yup from 'yup';

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

const SignInValidationSchema = Yup.object().shape({
  email: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

type ValuesFromFormik = Parameters<ReturnType<typeof useSignIn>[0]>[0];

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

const SignInForm = () => {
  const [signIn] = useSignIn();

  const onSubmit = async (values: ValuesFromFormik, { setSubmitting }: FormikHelpers<ValuesFromFormik>) => {
    try {
      setSubmitting(true);
      await signIn(values);
      setSubmitting(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      component={SignInFormContent}
      validationSchema={SignInValidationSchema}
    />
  );
};

export default SignInForm;
