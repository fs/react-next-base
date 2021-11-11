import React, { useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import { DefaultTheme, FlattenSimpleInterpolation } from 'styled-components';

import { component as EyeIcon } from 'public/images/icons/eye.svg';
import { component as EyeClosedIcon } from 'public/images/icons/eye-closed.svg';

import { FieldWrapper, ErrorWrapper, FieldLabel, ShowPasswordButton } from './styled';

type TErrors = {
  [key: string]: unknown;
};

type TTouched = {
  [key: string]: unknown;
};

type TValues = {
  [key: string]: unknown;
};

type TInput = {
  type: string;
  name: string;
  testId?: string;
  disabled?: boolean;
  placeholder?: string;
  errors?: TErrors;
  touched?: TTouched;
  values?: TValues;
  customStyles?: (theme: DefaultTheme) => FlattenSimpleInterpolation;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  title?: string;
};

const Input = ({
  type,
  name,
  testId,
  disabled,
  placeholder,
  errors = {},
  touched = {},
  values,
  customStyles,
  onClick,
  onChange,
  onBlur,
  title,
}: TInput) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const hasError = !!(errors[name] && touched[name]);

  const isInput = !(type === 'textarea');
  const inputType = type !== 'password' || !isShowPassword ? type : 'text';

  const actions = Object.entries({ onClick, onChange, onBlur }).reduce(
    (acc, [key, val]) => (val ? { ...acc, [key]: val } : { ...acc }),
    {},
  );
  const getValue = () => {
    const [array, index, fieldName] = name.split('.');
    return values?.[`${array}`]?.[`${index}`]?.[`${fieldName}`];
  };
  const hasValue = name.includes('.') ? getValue() : values?.[name];

  return (
    <FieldWrapper hasError={hasError} customStyles={customStyles}>
      {(hasValue === 0 || hasValue) && title && <FieldLabel htmlFor={title}>{title}</FieldLabel>}
      <Field
        type={inputType}
        as={!isInput && type}
        name={name}
        id={name}
        data-testid={testId}
        data-cy={testId}
        placeholder={placeholder}
        disabled={disabled}
        {...actions}
      />
      {type === 'password' && (
        <ShowPasswordButton onClick={() => setIsShowPassword(!isShowPassword)}>
          {isShowPassword ? <EyeClosedIcon /> : <EyeIcon />}
        </ShowPasswordButton>
      )}
      <ErrorMessage name={name}>{(msg) => <ErrorWrapper>{msg}</ErrorWrapper>}</ErrorMessage>
    </FieldWrapper>
  );
};

export default Input;
