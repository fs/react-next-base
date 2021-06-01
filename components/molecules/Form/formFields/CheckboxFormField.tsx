import { Field } from 'formik';
import React from 'react';
import { BaseFormFieldConfig, FormFieldType } from '../forms.types';

export interface CheckboxFormFieldConfig extends BaseFormFieldConfig {
  type: FormFieldType.checkbox;
}

const CheckboxFormField = ({ name, label, testID, disabled }: CheckboxFormFieldConfig) => {
  return (
    <label htmlFor={name}>
      <Field as="checkbox" name={name} id={name} data-testid={testID} data-cy={testID} disabled={disabled} />
      {label}
    </label>
  );
};

export default CheckboxFormField;
