import { ApolloCache, Cache, Reference } from '@apollo/client';

const useWriteCacheQueryHook = <TResponseData, TData, TVariables>(
  cache: ApolloCache<TResponseData>,
  options: Cache.WriteQueryOptions<TData, TVariables>,
): Reference | undefined => {
  return cache.writeQuery(options);
};

export default useWriteCacheQueryHook;
