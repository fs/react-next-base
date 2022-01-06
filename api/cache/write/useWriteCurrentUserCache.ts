import type { ApolloCache, ApolloClient, InMemoryCache, Reference } from '@apollo/client';

import CurrentUserQuery from 'graphql/queries/currentUser.graphql';

import type { Me } from '../../types/user/user';
import useWriteCacheQuery from '../../hooks/useWriteCacheQueryHook';
import writeCacheQueryApi from '../../class/writeCacheQueryApi';

type CustomOptions = {
  data: Me | undefined | null;
};

const useWriteCurrentUserCache = <TResponseData>(
  cache: ApolloCache<TResponseData>,
  { data }: CustomOptions,
): Reference | undefined => {
  console.log('FFFF', data);
  return useWriteCacheQuery(cache, {
    query: CurrentUserQuery,
    data: data ?? null,
  });
};

export const writeCurrentUserCache = (apolloClient: ApolloClient<InMemoryCache>, { data }: CustomOptions): void => {
  console.log('FFFFDDDDD', data);
  return writeCacheQueryApi(apolloClient, {
    query: CurrentUserQuery,
    data: data ?? null,
  });
};

export default useWriteCurrentUserCache;
