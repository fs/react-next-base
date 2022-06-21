import { Field } from 'formik';
import { BaseFormFieldConfig, FormFieldType } from 'types/formsType';

export type CheckboxFormFieldConfig = BaseFormFieldConfig & {
  type: FormFieldType.checkbox;
};

const CheckboxFormField = ({ name, label, testID, disabled }: CheckboxFormFieldConfig) => {
  return (
    <label htmlFor={name}>
      <Field type="checkbox" name={name} id={name} data-testid={testID} data-cy={testID} disabled={disabled} />
      {label}
    </label>
  );
};

export default CheckboxFormField;
