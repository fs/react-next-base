import type { MutationTuple, MutationResult } from '@apollo/client';

import UpdateUserMutation from 'graphql/mutations/updateUser.graphql';

import type { UpdateUserVariables, UpdateUserData } from '../../types/user/user';
import useMutation from '../../hooks/useMutationHook';
import useUpdateCurrentUserCache from '../../cache/write/useWriteCurrentUserCache';
import getResponseDataField from '../../helpers/getResponseDataField';

const MUTATION_NAME = 'updateUser';

type UpdateUserResponseData = {
  [MUTATION_NAME]: UpdateUserData;
};

type UpdateUserRequestVariables = {
  input: UpdateUserVariables;
};

export type UpdateUserMutationResult = MutationResult<UpdateUserResponseData>;

export const getData = (responseData?: UpdateUserResponseData | null): UpdateUserData | undefined | null =>
  getResponseDataField(MUTATION_NAME, responseData);

const useUpdateUserMutation = (): MutationTuple<UpdateUserResponseData, UpdateUserRequestVariables> => {
  return useMutation<UpdateUserResponseData, UpdateUserRequestVariables>(UpdateUserMutation, {
    update: (cache, mutationResult) => useUpdateCurrentUserCache(cache, { data: getData(mutationResult.data) }),
  });
};

export default useUpdateUserMutation;
