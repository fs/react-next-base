/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SignOutInput } from './../../../__generated__/globalTypes';

// ====================================================
// GraphQL mutation operation: signout
// ====================================================

export interface signout_signout {
  __typename: 'SignOutPayload';
  message: string;
}

export interface signout {
  signout: signout_signout | null;
}

export interface signoutVariables {
  input: SignOutInput;
}
