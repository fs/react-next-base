import type { MutationHookOptions, MutationTuple, MutationResult } from '@apollo/client';

import UpdatePasswordMutation from 'graphql/mutations/updatePassword.graphql';

import type { UpdatePasswordVariables, UpdatePasswordData } from '../../types/user/updatePasswordApiType';
import useMutation from '../../hooks/useMutationHook';

type UpdatePasswordResponseData = {
  updatePassword: UpdatePasswordData;
};

type UpdatePasswordRequestVariables = {
  input: UpdatePasswordVariables;
};

type UpdatePasswordMutationOptions = MutationHookOptions<UpdatePasswordResponseData, UpdatePasswordRequestVariables>;

type UpdatePasswordMutationTuple = MutationTuple<UpdatePasswordResponseData, UpdatePasswordRequestVariables>;

export type UpdatePasswordMutationResult = MutationResult<UpdatePasswordResponseData>;

const useUpdatePasswordMutation = (options: UpdatePasswordMutationOptions): UpdatePasswordMutationTuple => {
  return useMutation<UpdatePasswordResponseData, UpdatePasswordRequestVariables>(UpdatePasswordMutation, options);
};

export default useUpdatePasswordMutation;
