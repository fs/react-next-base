import React from 'react';
import { BaseFormFieldConfig, FormFieldType } from 'config/types';
import { useField } from 'formik';

export interface SubmitButtonFieldConfig extends BaseFormFieldConfig {
  type: FormFieldType.submit;
}

const SubmitButton = ({ name, label, testID, disabled }: SubmitButtonFieldConfig) => {
  const [fieldProps] = useField(name);
  return (
    <button type="submit" id={name} data-testid={testID} data-cy={testID} disabled={disabled} {...fieldProps}>
      {label}
    </button>
  );
};

export default SubmitButton;
