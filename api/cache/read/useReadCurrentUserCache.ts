import type { ApolloClient, InMemoryCache } from '@apollo/client';

import CurrentUserQuery from 'graphql/queries/currentUser.graphql';

import type { Me } from 'api/types/user/user';
import { readCacheQueryApi } from 'api/hooks/useReadCacheQueryHook';

export const readCurrentUserCache = (apolloClient: ApolloClient<InMemoryCache>): Me | null => {
  return readCacheQueryApi(apolloClient, {
    query: CurrentUserQuery,
  });
};
