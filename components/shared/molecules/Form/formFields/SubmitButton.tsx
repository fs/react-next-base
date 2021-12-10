import React from 'react';
import { Field } from 'formik';

import Button from 'components/shared/atoms/Button';
import { BaseFormFieldConfig, FormFieldType } from '../forms.types';

export type SubmitButtonFieldConfig = BaseFormFieldConfig & {
  type: FormFieldType.submit;
};

type SubmitButtonProps = {
  testID: string;
  type: 'submit';
  children: string;
};

const SubmitButton = ({ name, testID, disabled }: SubmitButtonFieldConfig) => {
  return (
    <Field
      type="submit"
      id={name}
      name={name}
      disabled={disabled}
      as={(props: SubmitButtonProps) => <Button {...props} testID={testID} />}
    >
      Submit
    </Field>
  );
};

export default SubmitButton;
