import { FormFieldType, OptionType, SelectFormFieldConfig } from 'config/types';
import { Field } from 'formik';
import React from 'react';

const SelectFormField = ({
  name,
  testID,
  placeholder,
  disabled,
  options,
  onBlur,
  onChange,
  onClick,
}: SelectFormFieldConfig) => {
  return (
    <Field
      as={FormFieldType.select}
      name={name}
      id={name}
      data-testid={testID}
      data-cy={testID}
      placeholder={placeholder}
      disabled={disabled}
      onBlur={onBlur}
      onChange={onChange}
      onClick={onClick}
    >
      {options.map((option: OptionType) => {
        const { value, label: optionLabel } = option;
        return (
          <option value={value} key={value}>
            {optionLabel}
          </option>
        );
      })}
    </Field>
  );
};

export default SelectFormField;
