import type { MutationHookOptions, MutationTuple, MutationResult } from '@apollo/client';

import SignIn from 'graphql/mutations/signIn.graphql';

import type { SignInData, SignInVariables } from '../types/user/signInApiType';
import useMutation from '../hooks/useMutationHook';

type SignInResponseData = {
  signin: SignInData;
};

type SignInRequestVariables = {
  input: SignInVariables;
};

export type SignInMutationResult = MutationResult<SignInResponseData>;

const useSignInMutation = (
  options: MutationHookOptions<SignInResponseData, SignInRequestVariables>,
): MutationTuple<SignInResponseData, SignInRequestVariables> => {
  return useMutation<SignInResponseData, SignInRequestVariables>(SignIn, options);
};

export default useSignInMutation;
