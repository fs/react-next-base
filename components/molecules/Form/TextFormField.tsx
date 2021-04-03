import React from 'react';
import { Field } from 'formik';
import { BaseFormFieldConfig, FormFieldType } from 'config/types';

export interface TextFormFieldConfig extends BaseFormFieldConfig {
  type: FormFieldType.text;
  placeholder?: string;
}

const TextFormField = ({ placeholder, disabled, name }: TextFormFieldConfig) => {
  return <Field type="text" placeholder={placeholder} disabled={disabled} name={name} />;
};

export default TextFormField;
