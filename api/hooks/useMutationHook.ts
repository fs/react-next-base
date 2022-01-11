import type { DocumentNode } from 'graphql';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import type {
  MutationTuple,
  MutationHookOptions,
  FetchResult,
  MutationOptions,
  ApolloClient,
  InMemoryCache,
} from '@apollo/client';

import { useMutation } from '@apollo/client';

export const mutationApi = <TData, TVariables>(
  apolloClient: ApolloClient<InMemoryCache>,
  options: MutationOptions<TData, TVariables>,
): Promise<FetchResult<TData>> => {
  return apolloClient.mutate(options);
};

const useMutationHook = <TData, TVariables>(
  mutation: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options?: MutationHookOptions<TData, TVariables> | undefined,
): MutationTuple<TData, TVariables> => {
  return useMutation(mutation, options);
};

export default useMutationHook;
