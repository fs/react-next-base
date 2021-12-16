import React from 'react';
import { Form, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';

import useSignUp from 'lib/apollo/hooks/actions/useSignUp';

import Button from 'components/shared/atoms/Button';
import FormFieldInput from 'components/shared/atoms/FormField';
import Loader from 'components/shared/atoms/Loader';
import { FormFieldType } from '../../forms.types';

import { FieldWrapper, FormContentWrapper, SubmitButtonWrapper } from '../styled-components';

const passwordRegularExp = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])([0-9A-Za-z#$@&!?.*^{}<>;,)(~'"=_%+-]+)$/;

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

const SignUpValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('This field is required'),
  lastName: Yup.string().required('This field is required'),
  email: Yup.string().email('Must be a valid email').max(255).required('This field is required'),
  password: Yup.string()
    .required('This field is required')
    .trim()
    .min(6, 'The minimum password length is 6 characters')
    .matches(passwordRegularExp, 'Password must contain upper and lower case characters and numbers'),
});

type ValuesFromFormik = Parameters<ReturnType<typeof useSignUp>[0]>[0];

const SignUpFormContent = ({ isSubmitting }: FormikProps<ValuesFromFormik>) => (
  <FormContentWrapper>
    <Form>
      <FieldWrapper>
        <FormFieldInput name="firstName" type={FormFieldType.text} label="First Name" />
      </FieldWrapper>
      <FieldWrapper>
        <FormFieldInput name="lastName" type={FormFieldType.text} label="Last Name" />
      </FieldWrapper>
      <FieldWrapper>
        <FormFieldInput name="email" type={FormFieldType.email} label="Email" />
      </FieldWrapper>
      <FieldWrapper>
        <FormFieldInput name="password" type={FormFieldType.password} label="Password" />
      </FieldWrapper>
      <SubmitButtonWrapper>
        <Button type={FormFieldType.submit} testID="submit-button" disabled={isSubmitting}>
          Submit
        </Button>
      </SubmitButtonWrapper>
    </Form>
  </FormContentWrapper>
);

const SignUpForm = () => {
  const [signUp, signUpState] = useSignUp();

  const onSubmit = async (values: ValuesFromFormik) => {
    try {
      await signUp(values);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        component={SignUpFormContent}
        validationSchema={SignUpValidationSchema}
      />
      {signUpState.loading && <Loader testId="signin-loader">Loading...</Loader>}
    </>
  );
};

export default SignUpForm;
