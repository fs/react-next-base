import { StringSchema } from 'yup';
import { FormFieldConfig } from '../../../config/types';

interface InitialValues {
  [key: string]: unknown;
}

interface ValidationSchema {
  [key: string]: StringSchema;
}

interface FormikProps {
  initialValues: InitialValues;
  validationSchema: ValidationSchema;
}

export const collectFormikProps = (fields: FormFieldConfig[]): FormikProps => {
  const init: FormikProps = { initialValues: {}, validationSchema: {} };
  return fields.reduce((acc, item) => {
    if (item.initialValue) {
      acc.initialValues[item.name] = item.initialValue;
    }
    if (item.validationSchema) {
      acc.validationSchema[item.name] = item.validationSchema;
    }
    return acc;
  }, init);
};
