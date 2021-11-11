import React from 'react';

import { Formik, Form as FormikForm } from 'formik';
import Button from 'components/shared/atoms/Button';
import Input from 'components/shared/atoms/Input';

import { FormWrapper, ErrorWrapper, customButtonStyles } from './styled';

const ResetForm = ({ form }) => {
  const { fields, initialValues, validationSchema, onSubmit } = form;

  return (
    <FormWrapper data-cy="new-password-form">
      <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting, status, errors, touched }) => (
          <FormikForm>
            {fields.map(({ type, name, testId, placeholder }) => {
              return (
                <Input
                  type={type}
                  name={name}
                  testId={testId}
                  placeholder={placeholder}
                  disabled={isSubmitting}
                  errors={errors}
                  touched={touched}
                  key={name}
                />
              );
            })}
            <Button type="submit" testId="submit-button" disabled={isSubmitting} customStyles={customButtonStyles}>
              Подтвердить
            </Button>
            {!!status && <ErrorWrapper>{status}</ErrorWrapper>}
          </FormikForm>
        )}
      </Formik>
    </FormWrapper>
  );
};
export default ResetForm;
