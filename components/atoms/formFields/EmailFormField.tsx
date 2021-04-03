import React from 'react';
import { BaseFormFieldConfig, FormFieldType } from 'config/types';
import { Field } from 'formik';

export interface EmailFormFieldConfig extends BaseFormFieldConfig {
  type: FormFieldType.email;
}

const EmailFormField = ({ name, testID, disabled }: EmailFormFieldConfig) => {
  return <Field type="email" name={name} id={name} data-testid={testID} data-cy={testID} disabled={disabled} />;
};

export default EmailFormField;
