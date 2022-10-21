export type UpdatePasswordData = {
  accessToken: string;
};

export type UpdatePasswordVariables = {
  password: string;
  resetToken: string | string[] | undefined;
};
