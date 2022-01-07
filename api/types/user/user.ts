import type { Uploaded } from 'hooks/useFileUpload';
import type { ID } from '../common';

export type CurrentUser = {
  id: ID;
  email: string;
  avatarUrl: string | null;
  firstName: string;
  lastName: string;
};

export type Me = {
  me: CurrentUser;
};

export type UpdateUserData = Me;

export type UpdateUserVariables = {
  avatar?: Uploaded;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  currentPassword: string;
};
