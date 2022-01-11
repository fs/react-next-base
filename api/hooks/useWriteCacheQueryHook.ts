import type { ApolloCache, Cache, Reference, DataProxy, ApolloClient, InMemoryCache } from '@apollo/client';

export const writeCacheQueryApi = <TData, TVariables>(
  apolloClient: ApolloClient<InMemoryCache>,
  options: DataProxy.WriteQueryOptions<TData, TVariables>,
): void => {
  return apolloClient.writeQuery(options);
};

const useWriteCacheQueryHook = <TResponseData, TData, TVariables>(
  cache: ApolloCache<TResponseData>,
  options: Cache.WriteQueryOptions<TData, TVariables>,
): Reference | undefined => {
  return cache.writeQuery(options);
};

export default useWriteCacheQueryHook;
