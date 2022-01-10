import type { MutationHookOptions, MutationTuple } from '@apollo/client';

import UpdatePasswordMutation from 'graphql/mutations/updatePassword.graphql';

import type { UpdatePasswordVariables, UpdatePasswordData } from '../../types/user/updatePasswordApiType';
import useMutation from '../../hooks/useMutationHook';

type UpdatePasswordResponseData = {
  updatePassword: UpdatePasswordData;
};

type UpdatePasswordRequestVariables = {
  input: UpdatePasswordVariables;
};

const useUpdatePasswordMutation = (
  options?: MutationHookOptions<UpdatePasswordResponseData, UpdatePasswordRequestVariables>,
): MutationTuple<UpdatePasswordResponseData, UpdatePasswordRequestVariables> => {
  return useMutation<UpdatePasswordResponseData, UpdatePasswordRequestVariables>(UpdatePasswordMutation, options);
};

export default useUpdatePasswordMutation;
