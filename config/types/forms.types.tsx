import { StringSchema } from 'yup';

export interface FormFieldType {
  action?: void;
  initialValue?: string | number | boolean;
  label?: string;
  name: string;
  options?: OptionType[];
  placeholder?: string | number;
  title?: string;
  type: string;
  validationSchema: StringSchema;
}

export interface FormType {
  fields: FormFieldType[];
  submit: any;
}

export interface OptionType {
  label: string | number;
  value: string | number;
}
