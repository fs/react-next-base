export interface FormFieldType {
  action?: void;
  initialValue?: string | number | boolean;
  label?: string;
  name: string;
  options?: OptionType[];
  placeholder?: string | number;
  type: string;
}

export interface FormType {
  fields: FormFieldType[];
  action: any;
}

export interface OptionType {
  label: string | number;
  value: string | number;
}
