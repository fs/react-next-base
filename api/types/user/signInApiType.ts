import { Me } from '../user/user';
import { Token } from '../user/token';

export type SignInData = Me & Token;

export type SignInVariables = {
  email: string;
  password: string;
};
