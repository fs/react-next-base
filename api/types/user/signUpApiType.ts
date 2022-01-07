import { Me } from './user';

export type SignUpData = Me;

export type SignUpVariables = {
  avatarUrl?: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
};
