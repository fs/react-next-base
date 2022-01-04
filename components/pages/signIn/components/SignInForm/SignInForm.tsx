import React from 'react';
import { Form, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';

import useSignIn from 'lib/apollo/hooks/actions/useSignIn';

import Button from 'components/shared/atoms/Button';
import FormFieldInput from 'components/shared/atoms/FormField';
import Loader from 'components/shared/atoms/Loader';
import { FormFieldType } from 'types/formsType';

import { FieldWrapper, FormContentWrapper, SubmitButtonWrapper } from './styled';

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

const SignInForm = () => {
  const [signIn, signInState] = useSignIn();

  const onSubmit = async (values: ValuesFromFormik) => {
    try {
      await signIn(values);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        component={SignInFormContent}
        validationSchema={SignInValidationSchema}
      />
      {signInState.loading && <Loader testId="signin-loader">Loading...</Loader>}
    </>
  );
};

export default SignInForm;
