import React from 'react';
import { Form, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';

import useUpdatePassword from 'lib/apollo/hooks/actions/useUpdatePassword';

import Button from 'components/shared/atoms/Button';
import FormFieldInput from 'components/shared/atoms/FormField';
import Loader from 'components/shared/atoms/Loader';
import { FormFieldType } from '../../forms.types';

import { FieldWrapper, FormContentWrapper, SubmitButtonWrapper } from '../syled-components';

const passwordRegularExp = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])([0-9A-Za-z#$@&!?.*^{}<>;,)(~'"=_%+-]+)$/;

const initialValues = {
  password: '',
  passwordConfirmation: '',
};

const SignInValidationSchema = Yup.object().shape({
  password: Yup.string()
    .required('This field is required')
    .trim()
    .min(6, 'The minimum password length is 6 characters')
    .matches(passwordRegularExp, 'Password must contain upper and lower case characters and numbers'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password')], 'Password does not match')
    .required('This field is required'),
});

type ValuesFromFormik = {
  password: string;
  passwordConfirmation: string;
};

const SignInFormContent = ({ isSubmitting }: FormikProps<ValuesFromFormik>) => (
  <FormContentWrapper>
    <Form>
      <FieldWrapper>
        <FormFieldInput name="password" type={FormFieldType.password} label="New Password" />
      </FieldWrapper>
      <FieldWrapper>
        <FormFieldInput name="passwordConfirmation" type={FormFieldType.password} label="New Password Confirmation" />
      </FieldWrapper>
      <SubmitButtonWrapper>
        <Button type={FormFieldType.submit} testID="submit-button" disabled={isSubmitting}>
          Submit
        </Button>
      </SubmitButtonWrapper>
    </Form>
  </FormContentWrapper>
);

// @ts-ignore
const NewPasswordForm = ({ query }) => {
  const [updatePassword, updatePasswordState] = useUpdatePassword();
  // const { reset_token: resetToken } = query;

  const onSubmit = async ({ password }: { password: string }) => {
    try {
      // await updatePassword(password, resetToken);
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
      {updatePasswordState.loading && <Loader testId="form-loader">Loading...</Loader>}
    </>
  );
};

export default NewPasswordForm;
