import { Field } from 'formik';
import { BaseFormFieldConfig, FormFieldType } from 'types/formsType';

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
 */
export enum PasswordAutocomplete {
  off = 'off',
  newPassword = 'new-password',
  currentPassword = 'current-password',
}

export type PasswordFormFieldConfig = BaseFormFieldConfig & {
  type: FormFieldType.password;
  autoComplete?: PasswordAutocomplete;
  placeholder?: string;
};

const PasswordFormField = ({ name, autoComplete, disabled, placeholder, testID }: PasswordFormFieldConfig) => {
  return (
    <Field
      type="password"
      data-testid={testID}
      data-cy={testID}
      name={name}
      id={name}
      autoComplete={autoComplete}
      disabled={disabled}
      placeholder={placeholder}
    />
  );
};

export default PasswordFormField;
