import React from 'react';
import mapKeys from 'lodash/mapKeys';
import mapValues from 'lodash/mapValues';
import * as Yup from 'yup';
import { Form as FormikForm, Formik } from 'formik';
import { FormFieldConfig, FormFieldType, FormType } from 'config/types';
import { ErrorWrapper, FormContainer, FormWrapper } from './styled-components';
import DefaultFieldWrapper from './DefaultFieldWrapper';
import SelectFormField from './SelectFormField';
import CheckboxFormField from './CheckboxFormField';

const Form = ({ form }: { form: FormType }) => {
  const { fields, submit } = form;
  const formByName = mapKeys(fields, 'name');
  const initialValues = mapValues(formByName, 'initialValue');

  // @ts-ignore
  const validationSchema = Yup.object().shape(mapValues(formByName, 'validationSchema'));
  // todo custom components to the fields, strict types
  return (
    <FormWrapper data-cy="profile-update-form">
      <Formik enableReinitialize initialValues={initialValues} onSubmit={submit} validationSchema={validationSchema}>
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
                    return <CheckboxFormField {...field} />;
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
