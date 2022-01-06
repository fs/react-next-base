import { Me } from '../user/user';
import { Token } from '../user/token';

export type SignUpData = Me & Token;

export type SignUpVariables = {
  avatarUrl?: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
};
