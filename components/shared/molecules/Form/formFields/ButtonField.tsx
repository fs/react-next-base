import React from 'react';

import { useField } from 'formik';
import Button, { TButtonProps } from 'components/shared/atoms/Button';
import { BaseFormFieldConfig, FormFieldType } from '../forms.types';

export type SubmitButtonFieldConfig = BaseFormFieldConfig & {
  type: FormFieldType.button;
  buttonType?: 'reset' | 'submit';
  customStyles?: TButtonProps['customStyles'];
};

const ButtonField = ({ name, testID, disabled, buttonType }: SubmitButtonFieldConfig) => {
  const [inputProps] = useField(name);
  return (
    <Button type={buttonType || 'submit'} onChange={inputProps.onChange} testId={testID} disabled={disabled}>
      {inputProps.value}
    </Button>
  );
};

export default ButtonField;
