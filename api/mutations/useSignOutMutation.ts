import type { MutationHookOptions, MutationTuple, MutationResult } from '@apollo/client';

import SignOut from 'graphql/mutations/signOut.graphql';

import type { SignOutData, SignOutVariables } from '../types/user/signOutApiType';
import useMutation from '../hooks/useMutationHook';

type SignOutResponseData = {
  signout: SignOutData;
};

type SignOutRequestVariables = {
  input: SignOutVariables;
};

export type SignOutMutationResult = MutationResult<SignOutResponseData>;

const useSignOutMutation = (
  options: MutationHookOptions<SignOutResponseData, SignOutRequestVariables>,
): MutationTuple<SignOutResponseData, SignOutRequestVariables> => {
  return useMutation<SignOutResponseData, SignOutRequestVariables>(SignOut, options);
};

export default useSignOutMutation;
