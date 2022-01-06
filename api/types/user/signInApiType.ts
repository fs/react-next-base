import { Me } from './user';
import { Token } from './token';

export type SignInData = Me & Token;

export type SignInVariables = {
  email: string;
  password: string;
};
