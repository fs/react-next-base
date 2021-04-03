import React from 'react';
import { Form as FormikForm, Formik } from 'formik';
import { FormFieldConfig, FormFieldType, FormType } from 'config/types';
import SelectFormField from 'components/atoms/formFields/SelectFormField';
import CheckboxFormField from 'components/atoms/formFields/CheckboxFormField';
import TextFormField from 'components/atoms/formFields/TextFormField';
import PasswordFormField from 'components/atoms/formFields/PasswordFormField';
import TextareaFormField from 'components/atoms/formFields/TextareaFormField';
import FileFormField from 'components/atoms/formFields/FileFormField';
import SubmitButton from 'components/atoms/formFields/SubmitButton';
import EmailFormField from 'components/atoms/formFields/EmailFormField';
import { object } from 'yup';
import DefaultFieldWrapper from './DefaultFieldWrapper';
import { ErrorWrapper, FormContainer, FormWrapper, FieldWrapper } from './styled-components';
import { collectFormikProps } from './utils';

const Form = ({ form }: { form: FormType }) => {
  const { fields, submit } = form;
  const { initialValues, validationSchema } = collectFormikProps(fields);
  const formValidationSchema = object().shape(validationSchema);
  return (
    <FormWrapper data-cy="profile-update-form">
      <Formik
        enableReinitialize
        onSubmit={submit}
        initialValues={initialValues}
        validationSchema={formValidationSchema}
      >
        {({ isSubmitting, status }) => (
          <FormikForm>
            <FormContainer>
              {fields.map((fieldConfig: FormFieldConfig) => {
                const { name, title } = fieldConfig;
                const disabled = isSubmitting ? true : fieldConfig.disabled;
                switch (fieldConfig.type) {
                  case FormFieldType.select:
                    return (
                      <DefaultFieldWrapper key={name} name={name} title={title}>
                        <SelectFormField {...fieldConfig} disabled={disabled} />
                      </DefaultFieldWrapper>
                    );
                  case FormFieldType.checkbox:
                    return <CheckboxFormField key={name} {...fieldConfig} disabled={disabled} />;
                  case FormFieldType.text:
                    return (
                      <DefaultFieldWrapper key={name} name={name} title={title}>
                        <TextFormField {...fieldConfig} disabled={disabled} />
                      </DefaultFieldWrapper>
                    );
                  case FormFieldType.password:
                    return (
                      <DefaultFieldWrapper key={name} name={name} title={title}>
                        <PasswordFormField {...fieldConfig} disabled={disabled} />
                      </DefaultFieldWrapper>
                    );
                  case FormFieldType.textarea:
                    return (
                      <DefaultFieldWrapper key={name} name={name} title={title}>
                        <TextareaFormField {...fieldConfig} disabled={disabled} />
                      </DefaultFieldWrapper>
                    );
                  case FormFieldType.file:
                    return (
                      <DefaultFieldWrapper key={name} name={name} title={title}>
                        <FileFormField {...fieldConfig} disabled={disabled} />
                      </DefaultFieldWrapper>
                    );
                  case FormFieldType.email:
                    return (
                      <DefaultFieldWrapper key={name} name={name} title={title}>
                        <EmailFormField {...fieldConfig} disabled={disabled} />
                      </DefaultFieldWrapper>
                    );
                  case FormFieldType.submit:
                    return (
                      <FieldWrapper key={name}>
                        <SubmitButton {...fieldConfig} disabled={disabled} />
                      </FieldWrapper>
                    );
                  default:
                    return null;
                }
              })}
            </FormContainer>
            {!!status && <ErrorWrapper>{status}</ErrorWrapper>}
          </FormikForm>
        )}
      </Formik>
    </FormWrapper>
  );
};

export default Form;
