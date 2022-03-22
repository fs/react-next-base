/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SignUpInput } from './../../../__generated__/globalTypes';

// ====================================================
// GraphQL mutation operation: signup
// ====================================================

export interface signup_signup_me {
  __typename: 'CurrentUser';
  avatarUrl: string | null;
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
}

export interface signup_signup {
  __typename: 'SignUpPayload';
  me: signup_signup_me | null;
  accessToken: string;
  refreshToken: string;
}

export interface signup {
  signup: signup_signup | null;
}

export interface signupVariables {
  input: SignUpInput;
}
