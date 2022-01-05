import User from 'domain/User';

export type SignInData = {
  me: User;
};

export type SignInVariables = {
  email: string;
  password: string;
};
