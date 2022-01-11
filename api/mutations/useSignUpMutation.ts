import type { MutationTuple, MutationResult } from '@apollo/client';

import SignUp from 'graphql/mutations/signUp.graphql';

import type { SignUpData, SignUpVariables } from 'api/types/user/signUpApiType';
import useMutation from 'api/hooks/useMutationHook';
import useUpdateCurrentUserCache from 'api/cache/write/useWriteCurrentUserCache';
import { getResponseDataField, getDataWithoutToken } from 'api/helpers';

const MUTATION_NAME = 'signup';

type SignUpResponseData = {
  [MUTATION_NAME]: SignUpData;
};

type SignUpRequestVariables = {
  input: SignUpVariables;
};

type SignUpMutationTuple = MutationTuple<SignUpResponseData, SignUpRequestVariables>;

export type SignUpMutationResult = MutationResult<SignUpResponseData>;

export const getData = (responseData?: SignUpResponseData | null): SignUpData | undefined | null =>
  getResponseDataField(MUTATION_NAME, responseData);

const useSignUpMutation = (): SignUpMutationTuple => {
  return useMutation<SignUpResponseData, SignUpRequestVariables>(SignUp, {
    update: (cache, mutationResult) =>
      useUpdateCurrentUserCache(cache, {
        data: getDataWithoutToken(getData(mutationResult.data)),
      }),
  });
};

export default useSignUpMutation;
