import React from 'react';
import { Field, ErrorMessage } from 'formik';

import { FormInput, ErrorWrapper } from './styled';

type FormFiledProps = {
  name: string;
  type: 'email' | 'password' | 'text';
  label: string;
};

const FormFieldInput = ({ name, type, label }: FormFiledProps) => {
  return (
    <label htmlFor={name}>
      {label}
      <Field
        type={type}
        name={name}
        id={name}
        data-testid={`input-${name}`}
        data-cy={`input-${name}`}
        as={FormInput}
        autoComplete="on"
      />
      <ErrorMessage name={name}>{(msg) => <ErrorWrapper>{msg}</ErrorWrapper>}</ErrorMessage>
    </label>
  );
};

export default FormFieldInput;
