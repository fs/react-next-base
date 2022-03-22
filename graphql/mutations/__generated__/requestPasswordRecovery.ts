/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RequestPasswordRecoveryInput } from './../../../__generated__/globalTypes';

// ====================================================
// GraphQL mutation operation: requestPasswordRecovery
// ====================================================

export interface requestPasswordRecovery_requestPasswordRecovery {
  __typename: 'RequestPasswordRecoveryPayload';
  detail: string;
  message: string;
}

export interface requestPasswordRecovery {
  requestPasswordRecovery: requestPasswordRecovery_requestPasswordRecovery | null;
}

export interface requestPasswordRecoveryVariables {
  input: RequestPasswordRecoveryInput;
}
