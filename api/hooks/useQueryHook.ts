import type { DocumentNode } from 'graphql';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import type { QueryHookOptions, QueryResult } from '@apollo/client';

import { useQuery } from '@apollo/client';

const useQueryHook = <TData, TVariables>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options?: QueryHookOptions<TData, TVariables> | undefined,
): QueryResult<TData, TVariables> => {
  return useQuery(query, options);
};

export default useQueryHook;
