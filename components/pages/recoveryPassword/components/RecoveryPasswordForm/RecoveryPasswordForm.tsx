import React, { useEffect } from 'react';
import { Form, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';

import { useNotifier } from 'contexts/NotifierContext';
import usePasswordRecovery from 'lib/apollo/hooks/actions/usePasswordRecovery';

import Button from 'components/shared/atoms/Button';
import FormFieldInput from 'components/shared/atoms/FormField';
import Loader from 'components/shared/atoms/Loader';
import { FormFieldType } from 'types/formsType';

import { FieldWrapper, FormContentWrapper, SubmitButtonWrapper } from './styled';

const initialValues = {
  email: '',
};

const SignInValidationSchema = Yup.object().shape({
  email: Yup.string().email('Must be a valid email').max(255).required('This field is required'),
});

type ValuesFromFormik = Parameters<ReturnType<typeof usePasswordRecovery>[0]>[0];

const RecoveryPasswordFormContent = ({ isSubmitting }: FormikProps<ValuesFromFormik>) => (
  <FormContentWrapper>
    <Form>
      <FieldWrapper>
        <FormFieldInput name="email" type={FormFieldType.email} label="Email" />
      </FieldWrapper>
      <SubmitButtonWrapper>
        <Button type={FormFieldType.submit} testID="submit-button" disabled={isSubmitting}>
          Submit
        </Button>
      </SubmitButtonWrapper>
    </Form>
  </FormContentWrapper>
);

const RecoveryPasswordForm = () => {
  const [recoveryPassword, detailMessage, loading] = usePasswordRecovery();

  const { setInfo } = useNotifier();

  useEffect(() => {
    if (detailMessage) setInfo(detailMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailMessage]);

  const onSubmit = async (values: ValuesFromFormik) => {
    await recoveryPassword(values);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        component={RecoveryPasswordFormContent}
        validationSchema={SignInValidationSchema}
      />
      {loading && <Loader testId="recovery-password-loader">Loading...</Loader>}
    </>
  );
};

export default RecoveryPasswordForm;
