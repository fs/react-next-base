/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateUserInput } from './../../../__generated__/globalTypes';

// ====================================================
// GraphQL mutation operation: updateUser
// ====================================================

export interface updateUser_updateUser_me {
  __typename: 'CurrentUser';
  avatarUrl: string | null;
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
}

export interface updateUser_updateUser {
  __typename: 'UpdateUserPayload';
  me: updateUser_updateUser_me;
}

export interface updateUser {
  updateUser: updateUser_updateUser | null;
}

export interface updateUserVariables {
  input: UpdateUserInput;
}
