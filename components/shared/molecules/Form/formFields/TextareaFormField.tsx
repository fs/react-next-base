import React from 'react';
import { Field } from 'formik';
import { BaseFormFieldConfig, FormFieldType } from '../forms.types';

export type TextareaFormFieldConfig = BaseFormFieldConfig & {
  type: FormFieldType.textarea;
};

const TextareaFormField = ({ name, testID, disabled }: TextareaFormFieldConfig) => {
  return <Field type="textarea" name={name} id={name} data-testid={testID} data-cy={testID} disabled={disabled} />;
};

export default TextareaFormField;
