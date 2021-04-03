import React from 'react';
import { BaseFormFieldConfig, FormFieldType } from 'config/types';

export interface SubmitButtonFieldConfig extends BaseFormFieldConfig {
  type: FormFieldType.submit;
}

const SubmitButton = ({ label, testID, disabled }: SubmitButtonFieldConfig) => {
  return (
    <button type="submit" data-testid={testID} data-cy={testID} disabled={disabled}>
      {label}
    </button>
  );
};

export default SubmitButton;
