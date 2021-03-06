import React from 'react';
import { Field } from 'formik';
import { BaseFormFieldConfig, FormFieldType } from '../forms.types';

export interface FileFormFieldConfig extends BaseFormFieldConfig {
  type: FormFieldType.file;
  accept: string;
  onChange?: void;
}

const FileFormField = ({ name, accept, testID, onChange, disabled }: FileFormFieldConfig) => {
  const props = onChange ? { onChange } : {};
  return (
    <Field
      type="file"
      id={name}
      name={name}
      accept={accept}
      data-testid={testID}
      data-cy={testID}
      {...props}
      disabled={disabled}
    />
  );
};

export default FileFormField;
