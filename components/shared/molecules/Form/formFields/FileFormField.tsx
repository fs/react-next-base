import React, { ChangeEvent } from 'react';
import { Field } from 'formik';
import { BaseFormFieldConfig, FormFieldType } from '../forms.types';

export type FileFormFieldConfig = BaseFormFieldConfig & {
  type: FormFieldType.file;
  accept: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

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
