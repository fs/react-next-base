import React from 'react';
import { Formik, Form as FormikForm, FormikValues } from 'formik';

import { collectFormikProps } from 'components/shared/molecules/Form/utils';
import Button from 'components/shared/atoms/Button';
import Input from 'components/shared/atoms/Input';

import { FormType, FormFieldConfig } from 'components/shared/molecules/Form/forms.types';

import { FormWrapper, ErrorWrapper, customButtonStyles } from './styled';

const ResetForm = <FormValues extends FormikValues = FormikValues>({ form }: { form: FormType<FormValues> }) => {
  const { fields, submit } = form;
  const { initialValues, validationSchema } = collectFormikProps<FormValues>(fields);

  return (
    <FormWrapper data-cy="new-password-form">
      <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema} onSubmit={submit}>
        {({ isSubmitting, status, errors, touched }) => (
          <FormikForm>
            {fields.map(({ type, name, testId, placeholder }: FormFieldConfig) => {
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
