/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SignInInput } from './../../../__generated__/globalTypes';

// ====================================================
// GraphQL mutation operation: signin
// ====================================================

export interface signin_signin_me {
  __typename: 'CurrentUser';
  avatarUrl: string | null;
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
}

export interface signin_signin {
  __typename: 'SignInPayload';
  me: signin_signin_me | null;
  accessToken: string;
  refreshToken: string;
}

export interface signin {
  signin: signin_signin | null;
}

export interface signinVariables {
  input: SignInInput;
}
