import { StringSchema } from 'yup';
import { SelectFormFieldConfig } from 'components/molecules/Form/SelectFormField';
import { CheckboxFormFieldConfig } from 'components/molecules/Form/CheckboxFormField';
import { TextFormFieldConfig } from 'components/molecules/Form/TextFormField';

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
  name: string;
  label?: string;
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
