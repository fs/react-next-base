import type { FetchResult, MutationOptions, ApolloClient, InMemoryCache } from '@apollo/client';

const mutationApi = <TData, TVariables>(
  apolloClient: ApolloClient<InMemoryCache>,
  options: MutationOptions<TData, TVariables>,
): Promise<FetchResult<TData>> => {
  return apolloClient.mutate(options);
};

export default mutationApi;
