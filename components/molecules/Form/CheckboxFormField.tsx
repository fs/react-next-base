import { BaseFormFieldConfig, FormFieldType } from 'config/types';
import { Field } from 'formik';
import React from 'react';

export interface CheckboxFormFieldConfig extends BaseFormFieldConfig {
  type: FormFieldType.checkbox;
}

const CheckboxFormField = ({ name, title, testID, disabled }: CheckboxFormFieldConfig) => {
  return (
    <label htmlFor={name}>
      <Field as="checkbox" name={name} data-testid={testID} data-cy={testID} disabled={disabled} />
      {title}
    </label>
  );
};

export default CheckboxFormField;
