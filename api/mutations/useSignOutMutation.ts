import type { MutationTuple, MutationResult } from '@apollo/client';
import { useApolloClient } from '@apollo/client';

import SignOut from 'graphql/mutations/signOut.graphql';

import type { SignOutData, SignOutVariables } from 'api/types/user/signOutApiType';
import useMutation from 'api/hooks/useMutationHook';

const MUTATION_NAME = 'signout';

type SignOutResponseData = {
  [MUTATION_NAME]: SignOutData;
};

type SignOutRequestVariables = {
  input: SignOutVariables;
};

type SignOutMutationTuple = MutationTuple<SignOutResponseData, SignOutRequestVariables>;

export type SignOutMutationResult = MutationResult<SignOutResponseData>;

const useSignOutMutation = (): SignOutMutationTuple => {
  const apolloClient = useApolloClient();

  return useMutation<SignOutResponseData, SignOutRequestVariables>(SignOut, {
    onCompleted: () => {
      apolloClient.clearStore();
    },
  });
};

export default useSignOutMutation;
