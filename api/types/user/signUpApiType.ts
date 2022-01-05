import User from 'domain/User';

export type SignUpData = {
  me: User;
};

export type SignUpVariables = {
  avatarUrl?: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
};
