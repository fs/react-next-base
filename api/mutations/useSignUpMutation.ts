import type { MutationTuple, MutationResult } from '@apollo/client';

import SignUp from 'graphql/mutations/signUp.graphql';

import type { SignUpData, SignUpVariables } from '../types/user/signUpApiType';
import useMutation from '../hooks/useMutationHook';
import useUpdateCurrentUserCache from '../cache/write/useWriteCurrentUserCache';
import { getResponseDataField, getDataWithoutToken } from '../helpers';

const MUTATION_NAME = 'signup';

type SignUpResponseData = {
  [MUTATION_NAME]: SignUpData;
};

type SignUpRequestVariables = {
  input: SignUpVariables;
};

export type SignUpMutationResult = MutationResult<SignUpResponseData>;

export const getData = (responseData?: SignUpResponseData | null): SignUpData | undefined | null =>
  getResponseDataField(MUTATION_NAME, responseData);

const useSignUpMutation = (): MutationTuple<SignUpResponseData, SignUpRequestVariables> => {
  return useMutation<SignUpResponseData, SignUpRequestVariables>(SignUp, {
    update: (cache, mutationResult) =>
      useUpdateCurrentUserCache(cache, { data: getDataWithoutToken(getData(mutationResult.data)) }),
  });
};

export default useSignUpMutation;
