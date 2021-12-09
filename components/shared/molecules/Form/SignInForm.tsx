import React from 'react';
import styled from 'styled-components';
import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import * as Yup from 'yup';

import useSignIn from 'lib/apollo/hooks/actions/useSignIn';
import { SubmitButton } from 'components/shared/molecules/Form/formFields';
import { FormFieldType } from './forms.types';
import FormField from '../../atoms/FormField';

const FormContentWrapper = styled.div`
  width: 40rem;
`;

const FieldWrapper = styled.div`
  margin-top: 1rem;
`;

const SubmitButtonWrapper = styled.div`
  margin-top: 2rem;
`;

const initialValues = {
  email: '',
  password: '',
};

const SignInValidationSchema = Yup.object().shape({
  email: Yup.string().email('Must be a valid email').max(255).required('This field is required'),
  password: Yup.string().required('This field is required'),
});

type ValuesFromFormik = Parameters<ReturnType<typeof useSignIn>[0]>[0];

const SignInFormContent = ({ isSubmitting }: FormikProps<ValuesFromFormik>) => (
  <FormContentWrapper>
    <Form>
      <FieldWrapper>
        <FormField name="email" type={FormFieldType.email} label="Email" />
      </FieldWrapper>
      <FieldWrapper>
        <FormField name="password" type={FormFieldType.password} label="Password" />
      </FieldWrapper>
      <SubmitButtonWrapper>
        <SubmitButton type={FormFieldType.submit} name="signIn" isFormSubmitting={isSubmitting} />
      </SubmitButtonWrapper>
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
