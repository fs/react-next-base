import { Field } from 'formik';
import React from 'react';
import { BaseFormFieldConfig, FormFieldType } from 'types/formsType';

export type SelectFormFieldConfig = BaseFormFieldConfig & {
  type: FormFieldType.select;
  options: OptionType[];
  placeholder: string;
};

export type OptionType = {
  label: string | number;
  value: string | number;
};

const SelectFormField = ({ name, testID, placeholder, disabled, options }: SelectFormFieldConfig) => {
  return (
    <Field
      as="select"
      name={name}
      id={name}
      data-testid={testID}
      data-cy={testID}
      placeholder={placeholder}
      disabled={disabled}
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
