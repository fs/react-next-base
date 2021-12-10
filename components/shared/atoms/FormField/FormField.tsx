import React from 'react';
import { Field, ErrorMessage } from 'formik';
import styled from 'styled-components';

import Input from 'components/shared/atoms/Input';

const FormInput = styled(Input)`
  margin-top: 0.5rem;
`;

const ErrorWrapper = styled.div`
  font-size: 0.9rem;
  color: red;
  padding: 0.5rem 0;
`;

type FormFiledProps = {
  name: string;
  type: string;
  label: string;
};

const FormField = ({ name, type, label }: FormFiledProps) => {
  return (
    <label htmlFor={name}>
      {label}
      <Field type={type} name={name} id={name} data-testid={`input-${name}`} as={FormInput} autoComplete="on" />
      <ErrorMessage name={name}>{(msg) => <ErrorWrapper>{msg}</ErrorWrapper>}</ErrorMessage>
    </label>
  );
};

export default FormField;
