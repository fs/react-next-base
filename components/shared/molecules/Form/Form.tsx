import React from 'react';
import type { FormikValues } from 'formik';
import { Form as FormikForm, Formik } from 'formik';
import { object } from 'yup';

import {
  SelectFormField,
  CheckboxFormField,
  TextFormField,
  PasswordFormField,
  TextareaFormField,
  FileFormField,
  SubmitButton,
  EmailFormField,
} from './formFields';
import { FormFieldConfig, FormFieldType, FormType } from './forms.types';
import DefaultFieldWrapper from './DefaultFieldWrapper';
import FormLoader from './FormLoader';
import { collectFormikProps } from './utils';
import { ErrorWrapper, FormContainer, FormWrapper, FieldWrapper } from './styled-components';

const Form = <FormValues extends FormikValues = FormikValues>({ form }: { form: FormType<FormValues> }) => {
  const { fields, submit } = form;
  const { initialValues, validationSchema } = collectFormikProps<FormValues>(fields);
  const formValidationSchema = object().shape(validationSchema);

  return (
    <FormWrapper data-cy="profile-update-form">
      <Formik<FormValues>
        enableReinitialize
        onSubmit={submit}
        initialValues={initialValues}
        validationSchema={formValidationSchema}
      >
        {(props) => {
          const { isSubmitting, status } = props;
          return (
            <FormikForm>
              <FormContainer>
                {isSubmitting && <FormLoader />}

                {fields.map((fieldConfig: FormFieldConfig) => {
                  const { name, title } = fieldConfig;
                  switch (fieldConfig.type) {
                    case FormFieldType.select:
                      return (
                        <DefaultFieldWrapper key={name} name={name} title={title}>
                          <SelectFormField {...fieldConfig} />
                        </DefaultFieldWrapper>
                      );
                    case FormFieldType.checkbox:
                      return <CheckboxFormField key={name} {...fieldConfig} />;
                    case FormFieldType.text:
                      return (
                        <DefaultFieldWrapper key={name} name={name} title={title}>
                          <TextFormField {...fieldConfig} />
                        </DefaultFieldWrapper>
                      );
                    case FormFieldType.password:
                      return (
                        <DefaultFieldWrapper key={name} name={name} title={title}>
                          <PasswordFormField {...fieldConfig} />
                        </DefaultFieldWrapper>
                      );
                    case FormFieldType.textarea:
                      return (
                        <DefaultFieldWrapper key={name} name={name} title={title}>
                          <TextareaFormField {...fieldConfig} />
                        </DefaultFieldWrapper>
                      );
                    case FormFieldType.file:
                      return (
                        <DefaultFieldWrapper key={name} name={name} title={title}>
                          <FileFormField {...fieldConfig} />
                        </DefaultFieldWrapper>
                      );
                    case FormFieldType.email:
                      return (
                        <DefaultFieldWrapper key={name} name={name} title={title}>
                          <EmailFormField {...fieldConfig} />
                        </DefaultFieldWrapper>
                      );
                    case FormFieldType.submit:
                      return (
                        <FieldWrapper key={name}>
                          <SubmitButton {...fieldConfig} />
                        </FieldWrapper>
                      );
                    default:
                      return null;
                  }
                })}
              </FormContainer>
              {!!status && <ErrorWrapper>{status}</ErrorWrapper>}
            </FormikForm>
          );
        }}
      </Formik>
    </FormWrapper>
  );
};

export default Form;
