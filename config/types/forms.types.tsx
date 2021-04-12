import React from 'react';
import { StringSchema } from 'yup';
import formFields from 'components/atoms/formFields';
import { InferValueTypes } from 'utils/ts';

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
  testID?: string;
  disabled?: boolean;
}

interface FormikProps {
  validationSchema?: StringSchema;
  initialValue: unknown;
}

export type FormFieldConfig = React.ComponentProps<InferValueTypes<typeof formFields>> & FormikProps;

export interface FormType {
  fields: FormFieldConfig[];
  submit: any;
}
