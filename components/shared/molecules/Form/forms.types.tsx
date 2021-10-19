import React from 'react';
import { StringSchema } from 'yup';
import * as formFields from 'components/shared/molecules/Form/formFields';
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
  isFormSubmitting: boolean;
  label?: string;
  title?: string;
  testID?: string;
  disabled?: boolean;
}

interface FormikProps {
  validationSchema?: StringSchema;
  initialValue?: unknown;
}

type FieldsUnionPropsTypes = React.ComponentProps<InferValueTypes<typeof formFields>>;

// (type1|type2) => Omit<type1,'prop1'>|Omit<type1,'prop1'>
// @see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#distributive-conditional-types
type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never;

export type FormFieldConfig = DistributiveOmit<FieldsUnionPropsTypes, 'isFormSubmitting'> & FormikProps;

export interface FormType {
  fields: FormFieldConfig[];
  submit: any;
}
