import type { DataProxy, ApolloClient, InMemoryCache } from '@apollo/client';

const readCacheFragmentApi = <TData, TVariables>(
  apolloClient: ApolloClient<InMemoryCache>,
  options: DataProxy.Fragment<TVariables, TData>,
  optimistic?: boolean,
): TData | null => {
  return apolloClient.readFragment(options, optimistic);
};

export default readCacheFragmentApi;
