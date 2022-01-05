import React from 'react';
import { Field } from 'formik';
import { BaseFormFieldConfig, FormFieldType } from 'types/formsType';

export type TextFormFieldConfig = BaseFormFieldConfig & {
  type: FormFieldType.text;
  placeholder?: string;
};

const TextFormField = ({ placeholder, disabled, name, testID }: TextFormFieldConfig) => {
  return (
    <Field
      type="text"
      placeholder={placeholder}
      disabled={disabled}
      name={name}
      id={name}
      data-testid={testID}
      data-cy={testID}
    />
  );
};

export default TextFormField;
