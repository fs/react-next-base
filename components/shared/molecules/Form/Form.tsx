import type { FormikValues } from 'formik';
import { Form as FormikForm, Formik } from 'formik';
import { object } from 'yup';

import { FormFieldConfig, FormFieldType, FormType } from 'types/formsType';

import { collectFormikProps } from './utils';

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
import DefaultFieldWrapper from './DefaultFieldWrapper';
import { ErrorWrapper, FormContainer, FormWrapper, FieldWrapper } from './styled';

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
                {fields.map((fieldConfig: FormFieldConfig) => {
                  const { name, title } = fieldConfig;
                  switch (fieldConfig.type) {
                    case FormFieldType.select:
                      return (
                        <DefaultFieldWrapper key={name} name={name} title={title}>
                          <SelectFormField {...fieldConfig} isFormSubmitting={isSubmitting} />
                        </DefaultFieldWrapper>
                      );
                    case FormFieldType.checkbox:
                      return <CheckboxFormField key={name} {...fieldConfig} isFormSubmitting={isSubmitting} />;
                    case FormFieldType.text:
                      return (
                        <DefaultFieldWrapper key={name} name={name} title={title}>
                          <TextFormField {...fieldConfig} isFormSubmitting={isSubmitting} />
                        </DefaultFieldWrapper>
                      );
                    case FormFieldType.password:
                      return (
                        <DefaultFieldWrapper key={name} name={name} title={title}>
                          <PasswordFormField {...fieldConfig} isFormSubmitting={isSubmitting} />
                        </DefaultFieldWrapper>
                      );
                    case FormFieldType.textarea:
                      return (
                        <DefaultFieldWrapper key={name} name={name} title={title}>
                          <TextareaFormField {...fieldConfig} isFormSubmitting={isSubmitting} />
                        </DefaultFieldWrapper>
                      );
                    case FormFieldType.file:
                      return (
                        <DefaultFieldWrapper key={name} name={name} title={title}>
                          <FileFormField {...fieldConfig} isFormSubmitting={isSubmitting} />
                        </DefaultFieldWrapper>
                      );
                    case FormFieldType.email:
                      return (
                        <DefaultFieldWrapper key={name} name={name} title={title}>
                          <EmailFormField {...fieldConfig} isFormSubmitting={isSubmitting} />
                        </DefaultFieldWrapper>
                      );
                    case FormFieldType.submit:
                      return (
                        <FieldWrapper key={name}>
                          <SubmitButton {...fieldConfig} isFormSubmitting={isSubmitting} />
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
