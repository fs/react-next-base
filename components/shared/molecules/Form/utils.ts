import type { FormikValues } from 'formik';
import { StringSchema } from 'yup';
import { FormFieldConfig } from './forms.types';

type ValidationSchema = {
  [key: string]: StringSchema;
};

type FormikProps<FormValues> = {
  initialValues: FormValues;
  validationSchema: ValidationSchema;
};

export const collectFormikProps = <FormValues extends FormikValues = FormikValues>(
  fields: FormFieldConfig[],
): FormikProps<FormValues> => {
  const init: FormikProps<FormValues> = { initialValues: {} as FormValues, validationSchema: {} };
  return fields.reduce((acc, item) => {
    if (item.initialValue != null) {
      acc.initialValues[item.name as keyof FormValues] = item.initialValue as FormikValues[typeof item.name];
    }
    if (item.validationSchema) {
      acc.validationSchema[item.name] = item.validationSchema;
    }
    return acc;
  }, init);
};
