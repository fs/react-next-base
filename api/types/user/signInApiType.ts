import { Me } from './user';

export type SignInData = Me;

export type SignInVariables = {
  email: string;
  password: string;
};
