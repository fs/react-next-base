import { Field } from 'formik';
import React from 'react';
import { BaseFormFieldConfig, FormFieldType } from 'config/types';

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
 */
export enum PasswordAutocomplete {
  off = 'off',
  newPassword = 'new-password',
  currentPassword = 'current-password',
}

export interface PasswordFormFieldConfig extends BaseFormFieldConfig {
  type: FormFieldType.password;
  autocomplete?: PasswordAutocomplete;
}

const PasswordFormField = ({ name, autocomplete }: PasswordFormFieldConfig) => {
  return <Field type="password" name={name} autocomplete={autocomplete} />;
};

export default PasswordFormField;
