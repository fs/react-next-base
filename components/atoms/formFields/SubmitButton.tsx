import React from 'react';
import { BaseFormFieldConfig, FormFieldType } from 'config/types';

export interface SubmitButtonFieldConfig extends BaseFormFieldConfig {
  type: FormFieldType.submit;
}

const SubmitButton = ({ name, label, testID, disabled }: SubmitButtonFieldConfig) => {
  return (
    <button type="submit" id={name} name={name} data-testid={testID} data-cy={testID} disabled={disabled}>
      {label}
    </button>
  );
};

export default SubmitButton;
