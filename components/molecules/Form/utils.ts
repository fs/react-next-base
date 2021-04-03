import { FormFieldType } from 'config/types';

export const isFieldTypeInput = (type: FormFieldType): boolean => {
  return !(type === FormFieldType.textarea || type === FormFieldType.select);
};
export const filterExistActions = (onClick?: void, onChange?: void, onBlur?: void) => {
  return Object.entries({ onClick, onChange, onBlur }).reduce(
    (acc, [key, val]) => (val ? { ...acc, [key]: val } : { ...acc }),
    {},
  );
};
