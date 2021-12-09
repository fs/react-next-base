import React from 'react';
import { Field } from 'formik';

import { Input } from 'components/shared/atoms/Input/Input';

type FormFiledProps = {
  name: string;
  type: string;
  label: string;
};

const FormField = ({ name, type, label }: FormFiledProps) => {
  return (
    <label htmlFor={name}>
      {label}
      <Field type={type} name={name} id={name} data-testid={`input-${name}`} as={Input} autoComplete="on" />
    </label>
  );
};

export default FormField;
