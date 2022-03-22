/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PresignDataInput } from './../../../__generated__/globalTypes';

// ====================================================
// GraphQL mutation operation: presignData
// ====================================================

export interface presignData_presignData_data_fields {
  __typename: 'PresignField';
  key: string;
  value: string;
}

export interface presignData_presignData_data {
  __typename: 'Presign';
  fields: presignData_presignData_data_fields[];
  url: string;
}

export interface presignData_presignData {
  __typename: 'PresignDataPayload';
  data: presignData_presignData_data;
}

export interface presignData {
  presignData: presignData_presignData | null;
}

export interface presignDataVariables {
  input: PresignDataInput;
}
