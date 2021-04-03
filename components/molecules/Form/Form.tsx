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
import DefaultFieldWrapper from './DefaultFieldWrapper';
import { ErrorWrapper, FormContainer, FormWrapper } from './styled-components';
import { collectFormikProps } from './utils';

const Form = ({ form }: { form: FormType }) => {
  const { fields, submit } = form;
  const formikProps = collectFormikProps(fields);

  return (
    <FormWrapper data-cy="profile-update-form">
      <Formik enableReinitialize onSubmit={submit} {...formikProps}>
        {({ isSubmitting, status }) => (
          <FormikForm>
            <FormContainer>
              {fields.map((field: FormFieldConfig) => {
                const { name, title } = field;
                switch (field.type) {
                  case FormFieldType.select:
                    return (
                      <DefaultFieldWrapper key={name} name={name} title={title}>
                        <SelectFormField {...field} />
                      </DefaultFieldWrapper>
                    );
                  case FormFieldType.checkbox:
                    return <CheckboxFormField key={name} {...field} />;
                  case FormFieldType.text:
                    return (
                      <DefaultFieldWrapper key={name} name={name} title={title}>
                        <TextFormField {...field} />
                      </DefaultFieldWrapper>
                    );
                  case FormFieldType.password:
                    return (
                      <DefaultFieldWrapper key={name} name={name} title={title}>
                        <PasswordFormField {...field} />
                      </DefaultFieldWrapper>
                    );
                  case FormFieldType.textarea:
                    return (
                      <DefaultFieldWrapper key={name} name={name} title={title}>
                        <TextareaFormField {...field} />
                      </DefaultFieldWrapper>
                    );
                  case FormFieldType.file:
                    return (
                      <DefaultFieldWrapper key={name} name={name} title={title}>
                        <FileFormField {...field} />
                      </DefaultFieldWrapper>
                    );
                  case FormFieldType.email:
                    return (
                      <DefaultFieldWrapper key={name} name={name} title={title}>
                        <EmailFormField {...field} />
                      </DefaultFieldWrapper>
                    );
                  case FormFieldType.submit:
                    return <SubmitButton key={name} {...field} />;
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
