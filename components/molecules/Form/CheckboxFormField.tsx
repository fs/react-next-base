import { BaseFormFieldConfig, FormFieldType } from 'config/types';
import { Field } from 'formik';
import React from 'react';

export interface CheckboxFormFieldConfig extends BaseFormFieldConfig {
  type: FormFieldType.checkbox;
}

const CheckboxFormField = ({ name, title, onClick }: CheckboxFormFieldConfig) => {
  return (
    <label htmlFor={name}>
      <Field type={FormFieldType.checkbox} name={name} onClick={onClick} />
      {title}
    </label>
  );
};

export default CheckboxFormField;
