/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum ActivityEvent {
  RESET_PASSWORD_REQUESTED = 'RESET_PASSWORD_REQUESTED',
  USER_LOGGED_IN = 'USER_LOGGED_IN',
  USER_REGISTERED = 'USER_REGISTERED',
  USER_RESET_PASSWORD = 'USER_RESET_PASSWORD',
  USER_UPDATED = 'USER_UPDATED',
}

export interface ImageUploader {
  id: string;
  storage?: string | null;
  metadata: ImageUploaderMetadata;
}

export interface ImageUploaderMetadata {
  size: number;
  filename: string;
  mimeType: string;
}

export interface PresignDataInput {
  filename: string;
  type: string;
}

export interface RequestPasswordRecoveryInput {
  email: string;
}

export interface SignInInput {
  email: string;
  password: string;
}

export interface SignOutInput {
  everywhere?: boolean | null;
}

export interface SignUpInput {
  email: string;
  password: string;
  firstName?: string | null;
  lastName?: string | null;
  avatar?: ImageUploader | null;
}

export interface UpdateUserInput {
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  currentPassword?: string | null;
  password?: string | null;
  avatar?: ImageUploader | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
