import { Me } from './user';
import { Token } from './token';

export type SignUpData = Me & Token;

export type SignUpVariables = {
  avatarUrl?: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
};
