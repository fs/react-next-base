import type { DocumentNode } from 'graphql';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import type { MutationTuple, MutationHookOptions } from '@apollo/client';

import { useMutation } from '@apollo/client';

const useMutationHook = <TData = any, TVariables = Record<string, any>>(
  mutation: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options?: MutationHookOptions<TData, TVariables> | undefined,
): MutationTuple<TData, TVariables> => {
  return useMutation(mutation, options);
};

export default useMutationHook;
