import { StringSchema } from 'yup';
import { SelectFormFieldConfig } from 'components/molecules/Form/SelectFormField';
import { CheckboxFormFieldConfig } from '../../components/molecules/Form';

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

export interface FormType {
  fields: FormFieldConfig[];
  submit: any;
}
