import React from 'react';
import { Field } from 'formik';
import { BaseFormFieldConfig, FormFieldType } from 'config/types';

export interface FileFormFieldConfig extends BaseFormFieldConfig {
  type: FormFieldType.file;
  accept: string;
}

const FileFormField = ({ name, accept, testID }: FileFormFieldConfig) => {
  return <Field type="file" name={name} accept={accept} data-testid={testID} data-cy={testID} />;
};

export default FileFormField;
