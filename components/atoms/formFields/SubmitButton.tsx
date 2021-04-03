import React from 'react';
import { BaseFormFieldConfig, FormFieldType } from 'config/types';

export interface SubmitButtonFieldConfig extends BaseFormFieldConfig {
  type: FormFieldType.submit;
}

const SubmitButton = ({ label, testID }: SubmitButtonFieldConfig) => {
  return (
    <button type="submit" data-testid={testID} data-cy={testID}>
      {label}
    </button>
  );
};

export default SubmitButton;
