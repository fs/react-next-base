import React, { PropsWithChildren } from 'react';
import { ErrorMessage } from 'formik';
import { BaseFormFieldConfig } from './forms.types';
import { ErrorWrapper, FieldLabel, FieldWrapper } from './styled-components';

type DefaultFieldWrapperProps = {
  name: BaseFormFieldConfig['name'];
  title: BaseFormFieldConfig['title'];
};

const DefaultFieldWrapper = ({ name, title, children }: PropsWithChildren<DefaultFieldWrapperProps>) => {
  return (
    <FieldWrapper key={name}>
      {title && <FieldLabel htmlFor={name}>{title}</FieldLabel>}
      {children}
      <ErrorMessage name={name}>{(msg) => <ErrorWrapper>{msg}</ErrorWrapper>}</ErrorMessage>
    </FieldWrapper>
  );
};

export default DefaultFieldWrapper;
