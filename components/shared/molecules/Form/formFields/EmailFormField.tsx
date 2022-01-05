import React from 'react';
import { Field } from 'formik';
import { BaseFormFieldConfig, FormFieldType } from 'types/formsType';

export type EmailFormFieldConfig = BaseFormFieldConfig & {
  type: FormFieldType.email;
  placeholder?: string;
};

const EmailFormField = ({ name, testID, disabled, placeholder }: EmailFormFieldConfig) => {
  return (
    <Field
      type="email"
      name={name}
      id={name}
      data-testid={testID}
      data-cy={testID}
      disabled={disabled}
      placeholder={placeholder}
    />
  );
};

export default EmailFormField;
