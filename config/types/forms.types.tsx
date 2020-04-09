export interface FormFieldType {
  initialValue?: string | number | boolean;
  name: string;
  options?: OptionType[];
  placeholder?: string | number;
  type: string;
}

export interface FormType {
  fields: FormFieldType[];
}

export interface OptionType {
  label: string | number;
  value: string | number;
}
