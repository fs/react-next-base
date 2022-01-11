import type { MutationTuple, MutationResult } from '@apollo/client';

import SignIn from 'graphql/mutations/signIn.graphql';

import type { SignInData, SignInVariables } from 'api/types/user/signInApiType';
import useMutation from 'api/hooks/useMutationHook';
import useUpdateCurrentUserCache from 'api/cache/write/useWriteCurrentUserCache';
import { getResponseDataField, getDataWithoutToken } from 'api/helpers';

const MUTATION_NAME = 'signin';

type SignInResponseData = {
  [MUTATION_NAME]: SignInData;
};

type SignInRequestVariables = {
  input: SignInVariables;
};

type SignInMutationTuple = MutationTuple<SignInResponseData, SignInRequestVariables>;

export type SignInMutationResult = MutationResult<SignInResponseData>;

export const getData = (responseData?: SignInResponseData | null): SignInData | undefined | null =>
  getResponseDataField(MUTATION_NAME, responseData);

const useSignInMutation = (): SignInMutationTuple => {
  return useMutation<SignInResponseData, SignInRequestVariables>(SignIn, {
    update: (cache, mutationResult) =>
      useUpdateCurrentUserCache(cache, {
        data: getDataWithoutToken(getData(mutationResult.data)),
      }),
  });
};

export default useSignInMutation;
