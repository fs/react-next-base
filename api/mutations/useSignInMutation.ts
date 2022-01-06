import type { MutationTuple, MutationResult } from '@apollo/client';

import SignIn from 'graphql/mutations/signIn.graphql';

import type { SignInData, SignInVariables } from '../types/user/signInApiType';
import useMutation from '../hooks/useMutationHook';
import useUpdateCurrentUserCache from '../cache/write/useWriteCurrentUserCache';
import { getResponseDataField, getDataWithoutToken } from '../helpers';

const MUTATION_NAME = 'signin';

type SignInResponseData = {
  [MUTATION_NAME]: SignInData;
};

type SignInRequestVariables = {
  input: SignInVariables;
};

export type SignInMutationResult = MutationResult<SignInResponseData>;

export const getData = (responseData?: SignInResponseData | null): SignInData | undefined | null =>
  getResponseDataField(MUTATION_NAME, responseData);

const useSignInMutation = (): MutationTuple<SignInResponseData, SignInRequestVariables> => {
  return useMutation<SignInResponseData, SignInRequestVariables>(SignIn, {
    update: (cache, mutationResult) =>
      useUpdateCurrentUserCache(cache, { data: getDataWithoutToken(getData(mutationResult.data)) }),
  });
};

export default useSignInMutation;
