import React from 'react';
import { BaseFormFieldConfig, FormFieldType } from 'config/types';
import { Field } from 'formik';

export interface EmailFormFieldConfig extends BaseFormFieldConfig {
  type: FormFieldType.email;
  placeholder?: string;
}

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
