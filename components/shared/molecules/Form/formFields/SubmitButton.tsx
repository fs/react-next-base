import React from 'react';
import { Field } from 'formik';

import Button from 'components/shared/atoms/Button';
import { BaseFormFieldConfig, FormFieldType } from '../forms.types';

export type SubmitButtonFieldConfig = BaseFormFieldConfig & {
  type: FormFieldType.submit;
};

const SubmitButton = ({ name, testID, disabled }: SubmitButtonFieldConfig) => {
  return (
    <Field type="submit" id={name} name={name} data-testid={testID} data-cy={testID} disabled={disabled} as={Button}>
      Submit
    </Field>
  );
};

export default SubmitButton;
