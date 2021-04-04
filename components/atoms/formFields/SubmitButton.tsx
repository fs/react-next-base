import React from 'react';
import { BaseFormFieldConfig, FormFieldType } from 'config/types';
import { Field } from 'formik';

export interface SubmitButtonFieldConfig extends BaseFormFieldConfig {
  type: FormFieldType.submit;
}

const SubmitButton = ({ name, testID, disabled }: SubmitButtonFieldConfig) => {
  return <Field type="submit" id={name} name={name} data-testid={testID} data-cy={testID} disabled={disabled} />;
};

export default SubmitButton;
