import { StringSchema } from 'yup';
import { SelectFormFieldConfig } from 'components/molecules/Form/SelectFormField';
import { CheckboxFormFieldConfig } from 'components/molecules/Form/CheckboxFormField';
import { TextFormFieldConfig } from 'components/molecules/Form/TextFormField';
import { PasswordFormFieldConfig } from 'components/molecules/Form/PasswordFormField';
import { TextareaFormFieldConfig } from 'components/molecules/Form/TextareaFormField';
import { FileFormFieldConfig } from 'components/molecules/Form/FileFormField';

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
