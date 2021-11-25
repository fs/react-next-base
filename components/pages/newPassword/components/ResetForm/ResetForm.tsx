import React, { useCallback } from 'react';
import { Formik, Form as FormikForm } from 'formik';
import { StringSchema } from 'yup';

import Button from 'components/shared/atoms/Button';
import Input from 'components/shared/atoms/Input';

import { DistributiveOmit, FieldsUnionPropsTypes } from 'components/shared/molecules/Form/forms.types';

import * as Yup from 'yup';
import { FormWrapper, ErrorWrapper, customButtonStyles } from './styled';
import styled from 'styled-components';

type InputConfig = DistributiveOmit<FieldsUnionPropsTypes, 'isFormSubmitting'>;

type InputConfigFormik = InputConfig & { validationSchema?: StringSchema; placeholder?: string };

type FormSchema<T extends InputConfigFormik[]> = {
  fields: T;
  initialValues: { [keys in T[number]['name']]: unknown };
  button: (formValues: { [keys in T[number]['name']]: unknown }) => void;
};

type ValidationSchema = {
  [key: string]: StringSchema;
};

function ResetForm<T extends InputConfigFormik[]>({ form }: { form: FormSchema<T> }) {
  const { fields, initialValues, submit } = form;

  const validationSchema = useCallback(
    () =>
      Yup.object().shape(
        fields.reduce((acc, item) => {
          if (item.validationSchema) {
            acc[item.name] = item.validationSchema;
          }
          return acc;
        }, {} as ValidationSchema),
      ),
    [fields],
  );

  return (
    <FormWrapper data-cy="new-password-form">
      <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema} onSubmit={submit}>
        {({ isSubmitting, status, errors, touched }) => (
          <FormikForm>
            {fields.map(({ type, name, testID, placeholder }) => {
              return (
                <Input
                  type={type}
                  name={name}
                  testId={testID}
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
}

export default ResetForm;
