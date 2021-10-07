import React, { useState } from 'react';
import { Field, ErrorMessage } from 'formik';

import { ReactComponent as EyeIcon } from 'public/images/icons/eye.svg';
import { ReactComponent as EyeClosedIcon } from 'public/images/icons/eye-closed.svg';

import { FieldWrapper, ErrorWrapper, FieldLabel, ShowPasswordButton } from './styled';

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
  customErrorStyles,
  onClick,
  onChange,
  onBlur,
  title,
  multiple,
  autoComplete,
  accept,
}) => {
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
        multiple={!!multiple}
        autoComplete={autoComplete}
        accept={accept}
        {...actions}
      />
      {type === 'password' && (
        <ShowPasswordButton onClick={() => setIsShowPassword(!isShowPassword)}>
          {isShowPassword ? <EyeClosedIcon /> : <EyeIcon />}
        </ShowPasswordButton>
      )}
      <ErrorMessage name={name}>{(msg) => <ErrorWrapper style={customErrorStyles}>{msg}</ErrorWrapper>}</ErrorMessage>
    </FieldWrapper>
  );
};

export default Input;
