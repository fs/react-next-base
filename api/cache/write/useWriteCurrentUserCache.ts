import type { ApolloCache, ApolloClient, InMemoryCache, Reference } from '@apollo/client';

import CurrentUserQuery from 'graphql/queries/currentUser.graphql';

import type { Me } from 'api/types/user/user';
import useWriteCacheQuery, { writeCacheQueryApi } from 'api/hooks/useWriteCacheQueryHook';

type CustomOptions = {
  data: Me | undefined | null;
};

const useWriteCurrentUserCache = <TResponseData>(
  cache: ApolloCache<TResponseData>,
  { data }: CustomOptions,
): Reference | undefined => {
  return useWriteCacheQuery(cache, {
    query: CurrentUserQuery,
    data: data ?? null,
  });
};

export const writeCurrentUserCache = (apolloClient: ApolloClient<InMemoryCache>, { data }: CustomOptions): void => {
  return writeCacheQueryApi(apolloClient, {
    query: CurrentUserQuery,
    data: data ?? null,
  });
};

export default useWriteCurrentUserCache;
