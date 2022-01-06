import type { DataProxy, ApolloClient, InMemoryCache } from '@apollo/client';

const readCacheQueryApi = <TData, TVariables>(
  apolloClient: ApolloClient<InMemoryCache>,
  options: DataProxy.Query<TVariables, TData>,
  optimistic?: boolean,
): TData | null => {
  return apolloClient.readQuery(options, optimistic);
};

export default readCacheQueryApi;
