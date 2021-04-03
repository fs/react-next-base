import { StringSchema } from 'yup';
import { SelectFormFieldConfig } from 'components/atoms/formFields/SelectFormField';
import { CheckboxFormFieldConfig } from 'components/atoms/formFields/CheckboxFormField';
import { TextFormFieldConfig } from 'components/atoms/formFields/TextFormField';
import { PasswordFormFieldConfig } from 'components/atoms/formFields/PasswordFormField';
import { TextareaFormFieldConfig } from 'components/atoms/formFields/TextareaFormField';
import { FileFormFieldConfig } from 'components/atoms/formFields/FileFormField';
import { SubmitButtonFieldConfig } from 'components/atoms/formFields/SubmitButton';
import { EmailFormFieldConfig } from 'components/atoms/formFields/EmailFormField';

export enum FormFieldType {
  password = 'password',
  textarea = 'textarea',
  select = 'select',
  checkbox = 'checkbox',
  text = 'text',
  file = 'file',
  submit = 'submit',
  email = 'email',
}

export interface BaseFormFieldConfig {
  type: FormFieldType;
  name: string;
  label?: string;
  title?: string;
  validationSchema?: StringSchema;
  testID?: string;
  disabled?: boolean;
  initialValue?: unknown;
}

export type FormFieldConfig =
  | SelectFormFieldConfig
  | FileFormFieldConfig
  | PasswordFormFieldConfig
  | CheckboxFormFieldConfig
  | TextFormFieldConfig
  | TextareaFormFieldConfig
  | SubmitButtonFieldConfig
  | EmailFormFieldConfig;

export interface FormType {
  fields: FormFieldConfig[];
  submit: any;
}
