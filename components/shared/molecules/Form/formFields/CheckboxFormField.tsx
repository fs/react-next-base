import { Field } from 'formik';
import React from 'react';
import styled from 'styled-components';
import { BaseFormFieldConfig, FormFieldType } from 'types/formsType';

export type CheckboxFormFieldConfig = BaseFormFieldConfig & {
  type: FormFieldType.checkbox;
};

const Label = styled.label`
  width: max-content;
`;

const CheckboxFormField = ({ name, label, testID, disabled }: CheckboxFormFieldConfig) => {
  return (
    <Label htmlFor={name}>
      <Field type="checkbox" name={name} id={name} data-testid={testID} data-cy={testID} disabled={disabled} />
      {label}
    </Label>
  );
};

export default CheckboxFormField;
