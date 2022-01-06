import type { DataProxy, ApolloClient, InMemoryCache } from '@apollo/client';

const writeCacheQueryApi = <TData, TVariables>(
  apolloClient: ApolloClient<InMemoryCache>,
  options: DataProxy.WriteQueryOptions<TData, TVariables>,
): void => {
  return apolloClient.writeQuery(options);
};

export default writeCacheQueryApi;
