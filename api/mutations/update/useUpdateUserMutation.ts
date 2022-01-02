import type { MutationHookOptions, MutationTuple } from '@apollo/client';

import UpdateUserMutation from 'graphql/mutations/updateUser.graphql';

import type { UpdateUserVariables, UpdateUserData } from '../../types/user/user';
import useMutation from '../../hooks/useMutationHook';

type UpdateUserResponseData = {
  updateUser: UpdateUserData;
};

type UpdateUserRequestVariables = { input: UpdateUserVariables };

const useUpdateUserMutation = (
  options?: MutationHookOptions<UpdateUserResponseData, UpdateUserRequestVariables>,
): MutationTuple<UpdateUserResponseData, UpdateUserRequestVariables> => {
  return useMutation<UpdateUserResponseData, UpdateUserRequestVariables>(UpdateUserMutation, options);
};

export default useUpdateUserMutation;
