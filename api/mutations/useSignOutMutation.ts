import type { MutationTuple, MutationResult } from '@apollo/client';
import { useApolloClient } from '@apollo/client';

import SignOut from 'graphql/mutations/signOut.graphql';

import type { SignOutData, SignOutVariables } from '../types/user/signOutApiType';
import useMutation from '../hooks/useMutationHook';

const MUTATION_NAME = 'signout';

type SignOutResponseData = {
  [MUTATION_NAME]: SignOutData;
};

type SignOutRequestVariables = {
  input: SignOutVariables;
};

export type SignOutMutationResult = MutationResult<SignOutResponseData>;

const useSignOutMutation = (): MutationTuple<SignOutResponseData, SignOutRequestVariables> => {
  const apolloClient = useApolloClient();

  return useMutation<SignOutResponseData, SignOutRequestVariables>(SignOut, {
    onCompleted: () => {
      apolloClient.resetStore();
    },
  });
};

export default useSignOutMutation;
