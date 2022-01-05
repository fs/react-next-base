import type User from 'domain/User';
import type { Uploaded } from 'hooks/useFileUpload';

export type Me = {
  me: User;
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
