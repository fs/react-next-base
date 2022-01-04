import type { MutationHookOptions, MutationTuple } from '@apollo/client';

import SignUp from 'graphql/mutations/signUp.graphql';

import type { SignUpData, SignUpVariables } from '../types/user/signUpApiType';
import useMutation from '../hooks/useMutationHook';

type SignUpResponseData = {
  signup: SignUpData;
};

type SignUpRequestVariables = {
  input: SignUpVariables;
};

const useSignUpMutation = (
  options: MutationHookOptions<SignUpResponseData, SignUpRequestVariables>,
): MutationTuple<SignUpResponseData, SignUpRequestVariables> => {
  return useMutation<SignUpResponseData, SignUpRequestVariables>(SignUp, options);
};

export default useSignUpMutation;