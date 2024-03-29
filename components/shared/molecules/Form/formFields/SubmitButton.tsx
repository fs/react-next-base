import { Field } from 'formik';
import { BaseFormFieldConfig, FormFieldType } from 'types/formsType';

export type SubmitButtonFieldConfig = BaseFormFieldConfig & {
  type: FormFieldType.submit;
};

const SubmitButton = ({ name, testID, disabled }: SubmitButtonFieldConfig) => {
  return <Field type="submit" id={name} name={name} data-testid={testID} data-cy={testID} disabled={disabled} />;
};

export default SubmitButton;
