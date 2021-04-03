import { StringSchema } from 'yup';

export enum FormFieldType {
  password = 'password',
  textarea = 'textarea',
  select = 'select',
  checkbox = 'checkbox',
  text = 'text',
  file = 'file',
}

export interface BaseFormFieldConfig {
  type: FormFieldType;
  onClick?: void;
  onChange?: void;
  onBlur?: void;
  name: string;
  label?: string;
  placeholder?: string | number;
  title?: string;
  validationSchema?: StringSchema;
  testID?: string;
  disabled?: boolean;
}

export interface SelectFormFieldConfig extends BaseFormFieldConfig {
  type: FormFieldType.select;
  options: OptionType[];
  initialValue?: OptionType;
  validationSchema: StringSchema;
}

export interface FileFormFieldConfig extends BaseFormFieldConfig {
  type: FormFieldType.file;
  accept: string;
}

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
 */
export enum PasswordAutocomplete {
  off = 'off',
  newPassword = 'new-password',
  currentPassword = 'current-password',
}

export interface PasswordFormFieldConfig extends BaseFormFieldConfig {
  type: FormFieldType.password;
  autocomplete?: PasswordAutocomplete;
}

export interface CheckboxFormFieldConfig extends BaseFormFieldConfig {
  type: FormFieldType.checkbox;
}

export interface TextFormFieldConfig extends BaseFormFieldConfig {
  type: FormFieldType.text;
}

export interface TextareaFormFieldConfig extends BaseFormFieldConfig {
  type: FormFieldType.textarea;
}

export type FormFieldConfig =
  | SelectFormFieldConfig
  | FileFormFieldConfig
  | PasswordFormFieldConfig
  | CheckboxFormFieldConfig
  | TextFormFieldConfig
  | TextareaFormFieldConfig;

// export interface FormFieldConfig {
//   accept?: string;
//   initialValue?: string | number | boolean;
//   label?: string;
//   options?: OptionType[];
//   placeholder?: string | number;
//   title?: string;
//   type: FormFieldType;
//   validationSchema: StringSchema;
//   testID?: string;
// }

export interface FormType {
  fields: FormFieldConfig[];
  submit: any;
}

export interface OptionType {
  label: string | number;
  value: string | number;
}
