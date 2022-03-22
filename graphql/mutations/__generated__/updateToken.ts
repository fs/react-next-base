/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateToken
// ====================================================

export interface updateToken_updateToken_me {
  __typename: 'CurrentUser';
  avatarUrl: string | null;
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
}

export interface updateToken_updateToken {
  __typename: 'UpdateTokenPayload';
  me: updateToken_updateToken_me | null;
  accessToken: string;
  refreshToken: string;
}

export interface updateToken {
  updateToken: updateToken_updateToken | null;
}
